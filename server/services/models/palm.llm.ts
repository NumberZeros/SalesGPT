import Redis from 'ioredis'
import { RedisCache } from 'langchain/cache/ioredis'
import { GooglePaLM, GooglePaLMTextInput } from 'langchain/llms/googlepalm'

import { CONFIGURATION } from '@/configuration'

export default class PalmLLM extends GooglePaLM {
  private static instance: PalmLLM

  private constructor(params: GooglePaLMTextInput) {
    super(params)
  }

  static getInstance(params?: GooglePaLMTextInput): PalmLLM {
    if (!PalmLLM.instance) {
      const client = new Redis(
        CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.REDIS_CONFIG.URL
      )
      const cache = new RedisCache(client)
      PalmLLM.instance = new PalmLLM({
        apiKey: CONFIGURATION.SERVER_SIDE.LLM.GOOGLE_PALM_CONFIG.apiKey,
        cache,
        ...params
      })
    }
    return PalmLLM.instance
  }
}
