import { getChat } from '@/app/actions'
import { auth } from '@/auth'

import { Chat } from './chat'

import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

// export const runtime = 'edge'
// export const preferredRegion = 'home'

export interface ChatPageProps {
  params: {
    id: string
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const session = await auth()

  if (!session?.user) {
    return {}
  }

  const chat = await getChat(params.id, session.user.id)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth()

  if (!session?.user) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  return <Chat id="1234" api={`${BASE_URL}/alpha`} />
}
