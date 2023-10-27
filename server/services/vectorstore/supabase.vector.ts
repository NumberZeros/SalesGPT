import { createClient } from '@supabase/supabase-js'
import { Embeddings } from 'langchain/dist/embeddings/base'
import {
  SupabaseLibArgs,
  SupabaseVectorStore
} from 'langchain/vectorstores/supabase'

import { CONFIGURATION } from '@/configuration'

export default class SupabaseVectorStoreServices extends SupabaseVectorStore {
  private static instance: SupabaseVectorStoreServices

  constructor(embeddings: Embeddings, config: SupabaseLibArgs) {
    super(embeddings, config)
  }

  static getInstance({
    embeddings,
    config
  }: {
    embeddings: any
    config?: {
      url?: string
      privateKey?: string
      index?: string
    }
  }) {
    const { SUPABASE_CONFIG } = CONFIGURATION.APP
    const url = config?.url || SUPABASE_CONFIG.URL
    const privateKey = config?.privateKey || SUPABASE_CONFIG.PRIVATE_KEY
    const tableName = config?.index || SUPABASE_CONFIG.TABLE_NAME

    const client = createClient(url, privateKey)
    return new SupabaseVectorStoreServices(embeddings, {
      client,
      tableName
    })
  }
}
