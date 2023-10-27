import Redis from 'ioredis'
import { RedisCache } from 'langchain/cache/ioredis'
import {
  ChatGooglePaLM,
  GooglePaLMChatInput
} from 'langchain/chat_models/googlepalm'

import { CONFIGURATION } from '@/configuration'

export default class PalmChat extends ChatGooglePaLM {
  private static instance: PalmChat

  private constructor(params: GooglePaLMChatInput) {
    super(params)
  }

  static getInstance(params?: GooglePaLMChatInput): PalmChat {
    if (!PalmChat.instance) {
      // const client = new Redis(
      //   CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.REDIS_CONFIG.URL
      // )
      // const cache = new RedisCache(client)
      PalmChat.instance = new PalmChat({
        apiKey: CONFIGURATION.SERVER_SIDE.LLM.GOOGLE_PALM_CONFIG.apiKey,
        // cache,
        temperature: 0.8,
        ...params
      })
    }
    return PalmChat.instance
  }
}
