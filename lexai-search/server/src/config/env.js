import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lexai-search',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  endeeToken: process.env.ENDEE_TOKEN || '',
  endeeBaseUrl: process.env.ENDEE_BASE_URL || 'http://127.0.0.1:8080/api/v1',
  embeddingProvider: process.env.EMBEDDING_PROVIDER || 'local-hash',
  embeddingDimension: Number(process.env.EMBEDDING_DIMENSION || 384),
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiEmbeddingModel: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small',
  openAiChatModel: process.env.OPENAI_CHAT_MODEL || 'gpt-4.1-mini',
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 12),
  uploadDir: process.env.UPLOAD_DIR || 'uploads'
};

export default env;
