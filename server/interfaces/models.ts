import { GooglePaLMChatInput } from 'langchain/chat_models/googlepalm'
import { OllamaInput } from 'langchain/dist/util/ollama'
import { AI21Input } from 'langchain/llms/ai21'
import { CohereInput } from 'langchain/llms/cohere'
import { GooglePaLMTextInput } from 'langchain/llms/googlepalm'

export enum EModel {
  AI21 = 'AI21',
  COHERE = 'COHERE',
  OLLAMA = 'OLLAMA',
  PALM = 'PALM',
  CHAT_PALM = 'CHAT_PALM'
}

export enum EEmbedding {
  COHERE = 'COHERE',
  OLLAMA = 'OLLAMA',
  PALM = 'PALM'
}

export enum EVectorStore {
  PG = 'PG',
  PINECONE = 'PINECONE',
  REDIS = 'REDIS',
  SUPABASE = 'SUPABASE',
  ELASTICSEARCH = 'ELASTICSEARCH'
}

export interface IModel {
  type: EModel
  params?:
    | AI21Input
    | GooglePaLMTextInput
    | OllamaInput
    | CohereInput
    | GooglePaLMChatInput
}
