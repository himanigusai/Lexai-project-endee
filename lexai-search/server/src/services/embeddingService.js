import crypto from 'crypto';
import axios from 'axios';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

const dimension = env.embeddingDimension;

const normalize = (vector) => {
  const magnitude = Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0)) || 1;
  return vector.map((value) => value / magnitude);
};

const createDeterministicEmbedding = (text) => {
  const vector = new Array(dimension).fill(0);
  const tokens = text.toLowerCase().match(/[a-z0-9]+/g) || [];

  tokens.forEach((token, tokenIndex) => {
    const digest = crypto.createHash('sha256').update(`${token}:${tokenIndex % 7}`).digest();
    for (let index = 0; index < dimension; index += 1) {
      const byte = digest[index % digest.length];
      vector[index] += (byte / 255 - 0.5) * (1 + (token.length % 5) * 0.15);
    }
  });

  return normalize(vector);
};

const createOpenAiEmbedding = async (text) => {
  if (!env.openAiApiKey) {
    throw new ApiError(500, 'OPENAI_API_KEY is required when EMBEDDING_PROVIDER=openai');
  }

  const response = await axios.post(
    'https://api.openai.com/v1/embeddings',
    {
      model: env.openAiEmbeddingModel,
      input: text
    },
    {
      headers: {
        Authorization: `Bearer ${env.openAiApiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.data[0].embedding;
};

export const generateEmbedding = async (text) => {
  if (!text?.trim()) {
    throw new ApiError(400, 'Text is required for embedding generation');
  }

  if (env.embeddingProvider === 'openai') {
    return createOpenAiEmbedding(text);
  }

  return createDeterministicEmbedding(text);
};

export const getEmbeddingDimension = () => dimension;

