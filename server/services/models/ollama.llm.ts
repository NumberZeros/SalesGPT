import { OllamaInput } from 'langchain/dist/util/ollama'
import { Ollama } from 'langchain/llms/ollama'

import { CONFIGURATION } from '@/configuration'

export default class OllamaLLM extends Ollama {
  private static instance: OllamaLLM

  private constructor(params: OllamaInput) {
    super(params)
  }

  static getInstance(params?: OllamaInput): OllamaLLM {
    if (!OllamaLLM.instance) {
      const { MODEL, URL } = CONFIGURATION.SERVER_SIDE.LLM.OLLAMA_CONFIG

      OllamaLLM.instance = new OllamaLLM({
        model: MODEL,
        baseUrl: URL,
        ...params
      })
    }

    return OllamaLLM.instance
  }
}
