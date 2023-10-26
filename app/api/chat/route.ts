import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

// export const runtime = 'edge'

import { NextRequest, NextResponse } from 'next/server'
import { SimpleQAChat } from '@/server/services/agents/simple-qa/simple-qa-chat'
const simpleQAChat = new SimpleQAChat()

// export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { messages, previewToken } = json

    const stream = await simpleQAChat.execute(messages)
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 })
  }
}
