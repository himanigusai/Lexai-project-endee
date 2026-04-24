import { Endee, Precision } from 'endee';
import env from '../config/env.js';

const LEGAL_DOCS_INDEX = 'legal_docs_index';
const CLAUSES_INDEX = 'clauses_index';

let endeeClient;

const getClient = () => {
  if (!endeeClient) {
    endeeClient = env.endeeToken ? new Endee(env.endeeToken) : new Endee();

    if (env.endeeBaseUrl) {
      endeeClient.setBaseUrl(env.endeeBaseUrl);
    }
  }

  return endeeClient;
};

export const ensureIndex = async (name, dimension) => {
  const client = getClient();

  try {
    await client.createIndex({
      name,
      dimension,
      spaceType: 'cosine',
      precision: Precision.INT8
    });
  } catch (error) {
    const message = error?.message || '';
    if (!message.toLowerCase().includes('exists')) {
      throw error;
    }
  }
};

export const initDefaultIndexes = async (dimension) => {
  await ensureIndex(LEGAL_DOCS_INDEX, dimension);
  await ensureIndex(CLAUSES_INDEX, dimension);
};

const getIndex = async (name) => {
  const client = getClient();
  return client.getIndex(name);
};

export const upsertDocumentChunks = async (chunks) => {
  const index = await getIndex(LEGAL_DOCS_INDEX);
  await index.upsert(chunks);
};

export const upsertClauseChunks = async (chunks) => {
  const index = await getIndex(CLAUSES_INDEX);
  await index.upsert(chunks);
};

export const queryLegalDocs = async ({ vector, topK = 8, filter = [] }) => {
  const index = await getIndex(LEGAL_DOCS_INDEX);
  return index.query({
    vector,
    topK,
    ef: 128,
    includeVectors: false,
    filter
  });
};

export const queryClauses = async ({ vector, topK = 8, filter = [] }) => {
  const index = await getIndex(CLAUSES_INDEX);
  return index.query({
    vector,
    topK,
    ef: 128,
    includeVectors: false,
    filter
  });
};

export const querySimilarDocuments = async ({ vector, topK = 12 }) => {
  const index = await getIndex(LEGAL_DOCS_INDEX);
  return index.query({
    vector,
    topK,
    ef: 128,
    includeVectors: false,
    filter: []
  });
};

export const getEndeeHealth = () => ({
  indexNames: {
    legalDocs: LEGAL_DOCS_INDEX,
    clauses: CLAUSES_INDEX
  },
  baseUrl: env.endeeBaseUrl
});

export { LEGAL_DOCS_INDEX, CLAUSES_INDEX };
