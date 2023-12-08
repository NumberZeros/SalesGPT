import { ExternalLink } from '@/components/external-link'
import { cn } from '@/lib/utils'

import React from 'react'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      © Copyright Xlancer 2023
      {/* <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
      <ExternalLink href="https://vercel.com/storage/kv">
        Vercel KV
      </ExternalLink> */}
    </p>
  )
}
