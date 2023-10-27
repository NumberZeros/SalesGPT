import { CONFIGURATION } from '@/configuration'
import { Embeddings } from 'langchain/dist/embeddings/base'
import {
  RedisVectorStore,
  RedisVectorStoreConfig
} from 'langchain/vectorstores/redis'

import { createClient } from 'redis'

export default class RedisVectorStoreServices extends RedisVectorStore {
  constructor(embeddings: Embeddings, config: RedisVectorStoreConfig) {
    super(embeddings, config)
  }

  static getInstance({
    embeddings,
    config
  }: {
    embeddings: Embeddings
    config?: {
      url: string
      indexName: string
    }
  }) {
    const { REDIS_CONFIG } = CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG
    const redisClient = createClient({
      url: REDIS_CONFIG.URL
    })
    const indexName = REDIS_CONFIG.index
    return new RedisVectorStoreServices(embeddings, {
      redisClient,
      indexName
    })
  }
}
