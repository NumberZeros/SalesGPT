import { createClient } from '@supabase/supabase-js'
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai'
import { initializeAgentExecutorWithOptions } from 'langchain/agents'
import {
  createRetrieverTool,
  OpenAIAgentTokenBufferMemory
} from 'langchain/agents/toolkits'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { ChatMessageHistory } from 'langchain/memory'
import { AIMessage, ChatMessage, HumanMessage } from 'langchain/schema'
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const convertVercelMessageToLangChainMessage = (message: VercelChatMessage) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content)
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content)
  } else {
    return new ChatMessage(message.content, message.role)
  }
}

const TEMPLATE = `You are a stock assistant in XLancer company. You are helping a customer research a stock. The customer asks you a question about the stock. 
If you don't know how to answer a question, use the available tools to look up relevant information. You must be responsive for customer's questions by vietnamese language.
Answer the question based on the following context:`

/**
 * This handler initializes and calls a retrieval agent. It requires an OpenAI
 * Functions model. See the docs for more information:
 *
 * https://js.langchain.com/docs/use_cases/question_answering/conversational_retrieval_agents
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const messages = (body.messages ?? []).filter(
      (message: VercelChatMessage) =>
        message.role === 'user' || message.role === 'assistant'
    )
    const returnIntermediateSteps = body.show_intermediate_steps
    const previousMessages = messages.slice(0, -1)
    const currentMessageContent = messages[messages.length - 1].content
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: body?.temperature / 100 || 0.2,
      openAIApiKey: body.previewToken
        ? body.previewToken
        : process.env.OPENAI_API_KEY
    })

    const client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PRIVATE_KEY!
    )
    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: process.env.SUPABASE_TABLE_NAME,
      queryName: 'match_documents'
    })

    const chatHistory = new ChatMessageHistory(
      previousMessages.map(convertVercelMessageToLangChainMessage)
    )

    const memory = new OpenAIAgentTokenBufferMemory({
      llm: model,
      memoryKey: 'chat_history',
      outputKey: 'output',
      chatHistory
    })

    const retriever = vectorstore.asRetriever()

    /**
     * Wrap the retriever in a tool to present it to the agent in a
     * usable form.
     */
    const tool = createRetrieverTool(retriever, {
      name: 'search_latest_knowledge',
      description: 'Searches and returns up-to-date general information.'
    })

    const executor = await initializeAgentExecutorWithOptions([tool], model, {
      agentType: 'openai-functions',
      memory,
      returnIntermediateSteps: true,
      verbose: true,
      agentArgs: {
        prefix: TEMPLATE + '\n' + body?.context || '' + '\n'
      }
    })

    const result = await executor.call({
      input: currentMessageContent
    })

    if (returnIntermediateSteps) {
      return NextResponse.json(
        { output: result.output, intermediate_steps: result.intermediateSteps },
        { status: 200 }
      )
    } else {
      // Agent executors don't support streaming responses (yet!), so stream back the complete response one
      // character at a time to simluate it.
      const textEncoder = new TextEncoder()
      const fakeStream = new ReadableStream({
        async start(controller) {
          for (const character of result.output) {
            controller.enqueue(textEncoder.encode(character))
            await new Promise(resolve => setTimeout(resolve, 20))
          }
          controller.close()
        }
      })

      return new StreamingTextResponse(fakeStream)
    }
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
