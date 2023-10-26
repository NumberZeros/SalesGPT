import AI21LLM from './ai21.llm'
import CohereLLM from './cohere.llm'
import OllamaLLM from './ollama.llm'
import PalmLLM from './palm.llm'
import { AI21Input } from 'langchain/llms/ai21'
import { CohereInput } from 'langchain/llms/cohere'
import { GooglePaLMTextInput } from 'langchain/llms/googlepalm'
import { OllamaInput } from 'langchain/dist/util/ollama'
import PalmChat from './palm.chat'
import { GooglePaLMChatInput } from 'langchain/chat_models/googlepalm'
import { EModel, IModel } from '../../interfaces/models'

export class ModelFactory {
  static getInstance({
    type,
    params
  }: IModel): AI21LLM | CohereLLM | OllamaLLM | PalmLLM | PalmChat {
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
