import { AI21, AI21Input } from 'langchain/llms/ai21'

import { CONFIGURATION } from '@/configuration'

export default class AI21LLM extends AI21 {
  private static instance: AI21LLM
  constructor(params?: AI21Input) {
    super({
      ai21ApiKey: CONFIGURATION.SERVER_SIDE.LLM.AI21_CONFIG.apiKey,
      ...params
    })
  }
  static getInstance(params?: AI21Input) {
    if (!AI21LLM.instance) {
      AI21LLM.instance = new AI21LLM(params)
    }
    return AI21LLM.instance
  }
}
