import { Client } from '@elastic/elasticsearch'
import fs from 'fs'
import { Embeddings } from 'langchain/dist/embeddings/base.js'
import {
  ElasticClientArgs,
  ElasticVectorSearch
} from 'langchain/vectorstores/elasticsearch'
import path from 'path'

import { CONFIGURATION } from '@/configuration'

export default class ElasticSearchVectorStoreService extends ElasticVectorSearch {
  constructor(embeddings: Embeddings, args: ElasticClientArgs) {
    super(embeddings, args)
  }

  static getInstance({
    embeddings,
    config
  }: {
    embeddings: Embeddings
    config?: ElasticClientArgs & { index?: string }
  }) {
    const clientConfig = {
      node: CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.ELASTICSEARCH_CONFIG
        .url,
      auth: {
        username:
          CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.ELASTICSEARCH_CONFIG
            .username,
        password:
          CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.ELASTICSEARCH_CONFIG
            .password
      },
      tls: {
        ca: fs.readFileSync(
          path.resolve(
            CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.ELASTICSEARCH_CONFIG
              .ca_path
          ),
          'utf-8'
        ),
        rejectUnauthorized: false
      }
    }
    const args = {
      client: new Client(clientConfig),
      indexName:
        config?.index ||
        CONFIGURATION.SERVER_SIDE.THIRD_PARTY_CONFIG.ELASTICSEARCH_CONFIG.index
    }
    return
    new ElasticSearchVectorStoreService(embeddings, args)
  }
}
