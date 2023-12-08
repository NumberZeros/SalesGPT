import { CONFIGURATION } from '@/configuration'

import { EModel, IModel } from '../../interfaces/models'

import AI21LLM from './ai21.llm'
import CohereLLM from './cohere.llm'
import OllamaLLM from './ollama.llm'
import PalmChat from './palm.chat'
import PalmLLM from './palm.llm'

import Redis from 'ioredis'
import { RedisCache } from 'langchain/cache/ioredis'
import { GooglePaLMChatInput } from 'langchain/chat_models/googlepalm'
import { OllamaInput } from 'langchain/dist/util/ollama'
import { AI21Input } from 'langchain/llms/ai21'
import { CohereInput } from 'langchain/llms/cohere'
import { GooglePaLMTextInput } from 'langchain/llms/googlepalm'

export class ModelFactory {
  static getInstance({
    type,
    params
  }: IModel): AI21LLM | CohereLLM | OllamaLLM | PalmLLM | PalmChat {
    let cache
    // const client = new Redis(
    //   CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.REDIS_CONFIG.URL
    // )
    // const cache = new RedisCache(client)
    switch (type) {
      case EModel.AI21:
        return AI21LLM.getInstance(params as unknown as AI21Input)
      case EModel.COHERE:
        return CohereLLM.getInstance(params as unknown as CohereInput, cache)
      case EModel.OLLAMA:
        return OllamaLLM.getInstance(params as unknown as OllamaInput)
      case EModel.PALM:
        return PalmLLM.getInstance(
          params as unknown as GooglePaLMTextInput,
          cache
        )
      case EModel.CHAT_PALM:
        return PalmChat.getInstance(params as unknown as GooglePaLMChatInput)
      default:
        throw new Error('Invalid model type')
    }
  }
}
