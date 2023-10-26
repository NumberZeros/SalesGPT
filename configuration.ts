export const CONFIGURATION = {
  SERVER_SIDE: {
    LLM: {
      OLLAMA_CONFIG: {
        URL: process.env.LLAMA2_URL || 'http://localhost:11434',
        MODEL: process.env.LLAMA2_MODEL || 'llama2',
        REQUEST_OPTIONS: {
          useMMap: process.env.LLAMA2_USE_MMAP === 'true' || true,
          numThreads: Number(process.env.LLAMA2_NUM_THREADS) || 6,
          numGpu: Number(process.env.LLAMA2_NUM_GPU) || 1
        }
      },
      COHERE_CONFIG: {
        apiKey: process.env.COHERE_API_KEY || ''
      },
      AI21_CONFIG: {
        apiKey: process.env.AI21_API_KEY || ''
      },
      GOOGLE_PALM_CONFIG: {
        apiKey: process.env.GOOGLE_PALM_API_KEY || ''
      }
    },
    THIRD_PARTY_CONFIG: {
      REDIS_CONFIG: {
        URL: process.env.REDIS_URL || ''
      },
      PINECONES_CONFIG: {
        apiKey: process.env.PINECONES_API_KEY || '',
        url: process.env.PINECONES_URL || '',
        env: process.env.PINECONES_ENV || '',
        index: process.env.PINECONES_INDEX || ''
      },
      ELASTICSEARCH_CONFIG: {
        username: process.env.ELASTICSEARCH_USERNAME || '',
        password: process.env.ELASTICSEARCH_PASSWORD || '',
        url: process.env.ELASTICSEARCH_URL || '',
        index: process.env.ELASTICSEARCH_INDEX || '',
        ca_path: process.env.ELASTICSEARCH_CA_PATH || '',
        unauthorized: process.env.ELASTICSEARCH_UNAUTHORIZED || ''
      },
      KV_CONFIG: {
        url: process.env.KV_URL || '',
        api_url: process.env.KV_REST_API_URL || '',
        api_token: process.env.KV_REST_API_TOKEN || '',
        readonly: process.env.KV_REST_API_READ_ONLY_TOKEN || ''
      },
      QUEUE_CONFIG: {
        URL: process.env.QUEUE_URL || ''
      },
      SERP_API_KEY: process.env.SERP_API_KEY || ''
    }
  },
  APP: {
    AUTH_SECRET: process.env.AUTH_SECRET || '',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    SUPABASE_CONFIG: {
      PRIVATE_KEY: process.env.SUPABASE_PRIVATE_KEY || '',
      URL: process.env.SUPABASE_URL || '',
      TABLE_NAME: process.env.SUPABASE_TABLE_NAME || '',
      DATABASE: {
        type: process.env.SUPABASE_DB_TYPE || 'postgres',
        host: process.env.SUPABASE_DB_HOST || '',
        port: Number(process.env.SUPABASE_DB_PORT) || 5432,
        username: process.env.SUPABASE_DB_USERNAME || '',
        password: process.env.SUPABASE_DB_PASSWORD || '',
        database: process.env.SUPABASE_DB_NAME || 'postgres',
        synchronize: process.env.SUPABASE_SYNCHRONIZE === 'true' || false,
        logging: process.env.SUPABASE_LOGGING === 'true' || false
      }
    }
  }
}
