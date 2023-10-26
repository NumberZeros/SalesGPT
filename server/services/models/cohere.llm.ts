import { Cohere, CohereInput } from 'langchain/llms/cohere'
import { RedisCache } from 'langchain/cache/ioredis'
import Redis from 'ioredis'
import { CONFIGURATION } from '@/configuration'

export default class CohereLLM extends Cohere {
  private static instance: CohereLLM

  private constructor(params: CohereInput) {
    super(params)
  }

  static getInstance(params?: CohereInput): CohereLLM {
    if (!CohereLLM.instance) {
      const client = new Redis(
        CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.REDIS_CONFIG.URL
      )
      const cache = new RedisCache(client)

      CohereLLM.instance = new CohereLLM({
        apiKey: CONFIGURATION.SERVER_SIDE.LLM.COHERE_CONFIG.apiKey,
        cache,
        ...params
      })
    }
    return CohereLLM.instance
  }
}
