import Redis from 'ioredis'
import { RedisCache } from 'langchain/cache/ioredis'
import { GooglePaLM, GooglePaLMTextInput } from 'langchain/llms/googlepalm'

import { CONFIGURATION } from '@/configuration'

export default class PalmLLM extends GooglePaLM {
  private static instance: PalmLLM

  private constructor(params: GooglePaLMTextInput) {
    super(params)
  }

  static getInstance(
    params?: GooglePaLMTextInput,
    cache?: RedisCache
  ): PalmLLM {
    if (!PalmLLM.instance) {
      PalmLLM.instance = new PalmLLM({
        apiKey: CONFIGURATION.SERVER_SIDE.LLM.GOOGLE_PALM_CONFIG.apiKey,
        cache,
        ...params
      })
    }
    return PalmLLM.instance
  }
}
