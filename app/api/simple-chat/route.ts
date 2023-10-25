import { NextRequest, NextResponse } from 'next/server'

import { ChatGooglePaLM } from 'langchain/chat_models/googlepalm'
import { PromptTemplate } from 'langchain/prompts'
import { StringOutputParser } from 'langchain/schema/output_parser'
const promptTemplate =
  PromptTemplate.fromTemplate(`You are asistent of a company. You are tasked to answer any question about the company. Using the provided context, answer the user's question to the best of your ability using the resources provided.
<question>
{question}
</question>

Classification:`)

const model = new ChatGooglePaLM({
  apiKey: 'AIzaSyD4EmQ7bLRk043CtEYsaHU6J0ssgW-WpYU', // or set it in environment variable as `GOOGLE_PALM_API_KEY`
  temperature: 0.8
})

// const classificationChain = RunnableSequence.from([
//   promptTemplate,
//   model,
//   new StringOutputParser()
// ])

const chain = promptTemplate.pipe(model).pipe(new StringOutputParser())

const textEncoder = new TextEncoder()

export const GET = async (req: NextRequest) => {
  try {
    const message = req.nextUrl.searchParams.get('message') || ''

    const stream = await chain.stream({
      question: message
    })

    // Only return a selection of output to the frontend
    const clientStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(
            textEncoder.encode(
              'event: data\ndata: ' + JSON.stringify(chunk) + '\n\n'
            )
          )
        }
        controller.enqueue(textEncoder.encode('event: end\n\n'))
        controller.close()
      }
    })

    return new Response(clientStream, {
      headers: { 'Content-Type': 'text/event-stream' }
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
