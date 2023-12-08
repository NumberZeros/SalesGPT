import { EModel } from '@/server/interfaces/models'

import { ModelFactory } from '../../models/factory.model'
import PalmChat from '../../models/palm.chat'

import { TEMPLATE } from './prompt'

import { Runnable } from 'langchain/dist/schema/runnable'
import { PromptTemplate } from 'langchain/prompts'
import { BytesOutputParser } from 'langchain/schema/output_parser'

export class SimpleQAChat {
  private model: PalmChat
  private prompt: PromptTemplate
  private outputParser: BytesOutputParser
  private chain: Runnable
  constructor() {
    this.model = ModelFactory.getInstance({
      type: EModel.CHAT_PALM
    }) as PalmChat
    this.prompt = PromptTemplate.fromTemplate(TEMPLATE)
    this.outputParser = new BytesOutputParser()
    this.chain = this.prompt.pipe(this.model).pipe(this.outputParser)
  }

  execute = (messages: Array<{ role: string; content: string }>) => {
    const formatMessage = (message: { role: string; content: string }) =>
      `${message.role}: ${message.content}`
    const previousMessages = messages.slice(0, -1).map(formatMessage)
    const input = messages[messages.length - 1].content
    return this.chain.stream({
      chat_history: previousMessages.join('\n'),
      input
    })
  }
}
