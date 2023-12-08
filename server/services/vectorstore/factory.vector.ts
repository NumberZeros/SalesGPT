import { EVectorStore } from '@/server/interfaces/models.js'

import ElasticSearchVectorStoreService from './elasticsearch.vector.js'
import PineconeVectorStoreService from './pinecone.vector.js'
import RedisVectorStoreServices from './redis.vector.js'
import SupabaseVectorStoreServices from './supabase.vector.js'

import { Embeddings } from 'langchain/dist/embeddings/base.js'

export class VectorFactory {
  static createVector(params: {
    type: EVectorStore
    embeddings: Embeddings
    config: any
  }) {
    switch (params.type) {
      case EVectorStore.PINECONE:
        return PineconeVectorStoreService.getInstance(params)
      case EVectorStore.SUPABASE:
        return SupabaseVectorStoreServices.getInstance(params)
      case EVectorStore.REDIS:
        return RedisVectorStoreServices.getInstance(params)
      case EVectorStore.ELASTICSEARCH:
        return ElasticSearchVectorStoreService.getInstance(params)
      default:
        throw new Error('Invalid vector store type')
    }
  }
}
