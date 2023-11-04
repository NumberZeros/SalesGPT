'use client'

import { useCookies } from 'react-cookie'
import { toast } from 'react-hot-toast'
import { type Message, useChat } from 'ai/react'

import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { EmptyScreen } from '@/components/empty-screen'
import { cn } from '@/lib/utils'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  api?: string
}

export function Chat({ id, initialMessages, className, api }: ChatProps) {
  const [cookies, setCookie] = useCookies([
    'temperature',
    'size',
    'overlap',
    'open-api-key',
    'context'
  ])

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      api,
      initialMessages,
      id,
      body: {
        id,
        previewToken: cookies['open-api-key'] ?? null,
        ...cookies
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText)
        }
      }
    })
  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
      />
    </>
  )
}
