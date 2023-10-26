import AI21LLM from './ai21.llm.js'
import CohereLLM from './cohere.llm.js'
import OllamaLLM from './ollama.llm.js'
import PalmLLM from './palm.llm.js'
import { AI21Input } from 'langchain/llms/ai21.js'
import { CohereInput } from 'langchain/llms/cohere.js'
import { GooglePaLMTextInput } from 'langchain/llms/googlepalm.js'
import { OllamaInput } from 'langchain/dist/util/ollama'
import PalmChat from './palm.chat.js'
import { GooglePaLMChatInput } from 'langchain/chat_models/googlepalm.js'
import { EModel, IModel } from './interfaces.js'

export class ModelFactory {
  static getInstance({ type, params }: IModel) {
    switch (type) {
      case EModel.AI21:
        return AI21LLM.getInstance(params as unknown as AI21Input)
      case EModel.COHERE:
        return CohereLLM.getInstance(params as unknown as CohereInput)
      case EModel.OLLAMA:
        return OllamaLLM.getInstance(params as unknown as OllamaInput)
      case EModel.PALM:
        return PalmLLM.getInstance(params as unknown as GooglePaLMTextInput)
      case EModel.CHAT_PALM:
        return PalmChat.getInstance(params as unknown as GooglePaLMChatInput)
      default:
        throw new Error('Invalid model type')
    }
  }
}
