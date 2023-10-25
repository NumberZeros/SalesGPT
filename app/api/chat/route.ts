import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

// export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { Message as VercelChatMessage } from 'ai'

import { ChatOpenAI } from 'langchain/chat_models/openai'
import { BytesOutputParser } from 'langchain/schema/output_parser'
import { PromptTemplate } from 'langchain/prompts'
import { ChatGooglePaLM } from 'langchain/chat_models/googlepalm'

// export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`
}

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.

Current conversation:
{chat_history}

User: {input}
AI:`

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { messages, previewToken } = json

    // const userId = (await auth())?.user.id

    // if (!userId) {
    //   return new Response('Unauthorized', {
    //     status: 401
    //   })
    // }

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage)
    const currentMessageContent = messages[messages.length - 1].content
    const prompt = PromptTemplate.fromTemplate(TEMPLATE)
    const model = new ChatGooglePaLM({
      temperature: 0.8,
      apiKey: 'AIzaSyD4EmQ7bLRk043CtEYsaHU6J0ssgW-WpYU'
    })
    const outputParser = new BytesOutputParser()
    const chain = prompt.pipe(model).pipe(outputParser)

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join('\n'),
      input: currentMessageContent
    })

    return new StreamingTextResponse(stream)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }
}
