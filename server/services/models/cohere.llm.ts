import { CONFIGURATION } from '@/configuration'

import Redis from 'ioredis'
import { RedisCache } from 'langchain/cache/ioredis'
import { Cohere, CohereInput } from 'langchain/llms/cohere'

export default class CohereLLM extends Cohere {
  private static instance: CohereLLM

  private constructor(params: CohereInput) {
    super(params)
  }

  static getInstance(params?: CohereInput, cache?: RedisCache): CohereLLM {
    if (!CohereLLM.instance) {
      CohereLLM.instance = new CohereLLM({
        apiKey: CONFIGURATION.SERVER_SIDE.LLM.COHERE_CONFIG.apiKey,
        cache,
        ...params
      })
    }
    return CohereLLM.instance
  }
}
