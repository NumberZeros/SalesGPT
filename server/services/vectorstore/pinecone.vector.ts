import { Pinecone } from '@pinecone-database/pinecone'
import { Embeddings } from 'langchain/dist/embeddings/base'
import { PineconeLibArgs, PineconeStore } from 'langchain/vectorstores/pinecone'

import { CONFIGURATION } from '@/configuration'

export default class PineconeVectorStoreService extends PineconeStore {
  constructor(embeddings: Embeddings, config: PineconeLibArgs) {
    super(embeddings, config)
  }

  static getInstance({
    embeddings,
    config
  }: {
    embeddings: Embeddings
    config?: { env: string; apiKey: string; index: string; url: string }
  }) {
    const { PINECONES_CONFIG } = CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG
    const environment = config?.env || PINECONES_CONFIG.env
    const apiKey = config?.apiKey || PINECONES_CONFIG.apiKey
    const index = config?.index || PINECONES_CONFIG.index
    const pinecone = new Pinecone({ environment, apiKey })
    const pineconeIndex = pinecone.Index(index)
    return new PineconeVectorStoreService(embeddings, { pineconeIndex })
  }
}
