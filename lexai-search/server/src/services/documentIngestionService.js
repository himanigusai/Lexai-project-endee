import path from 'path';
import { chunkText } from '../utils/chunkText.js';
import { generateSummary } from '../utils/generateSummary.js';
import { generateEmbedding, getEmbeddingDimension } from './embeddingService.js';
import { extractTextFromFile } from '../utils/extractTextFromFile.js';
import { initDefaultIndexes, upsertClauseChunks, upsertDocumentChunks } from './endeeService.js';

const CLAUSE_TERMS = ['arbitration', 'payment', 'confidentiality', 'non compete', 'termination', 'penalty', 'liability', 'governing law'];

const inferClauses = (chunks) =>
  chunks.filter((chunk) => CLAUSE_TERMS.some((term) => chunk.text.toLowerCase().includes(term)));

export const ingestUploadedDocument = async ({ file, title, category, tags, userId, documentId }) => {
  const extractedText = await extractTextFromFile(file);
  const summary = generateSummary(extractedText);
  const chunks = chunkText(extractedText);
  const dimension = getEmbeddingDimension();

  await initDefaultIndexes(dimension);

  const denseChunks = await Promise.all(
    chunks.map(async (chunk) => {
      const vector = await generateEmbedding(chunk.text);
      return {
        chunkId: chunk.chunkId,
        sectionName: chunk.sectionName,
        text: chunk.text,
        tokenEstimate: chunk.tokenEstimate,
        vector
      };
    })
  );

  const documentVectors = denseChunks.map((chunk) => ({
    id: `${title.replace(/\s+/g, '-').toLowerCase()}-${chunk.chunkId}-${Date.now()}`,
    vector: chunk.vector,
    meta: {
      documentId: String(documentId),
      title,
      documentTitle: title,
      sectionName: chunk.sectionName,
      text: chunk.text,
      category,
      tags
    },
    filter: {
      documentId: String(documentId),
      category,
      uploadedBy: String(userId)
    }
  }));

  await upsertDocumentChunks(documentVectors);

  const clauseVectors = inferClauses(denseChunks).map((chunk) => ({
    id: `clause-${title.replace(/\s+/g, '-').toLowerCase()}-${chunk.chunkId}-${Date.now()}`,
    vector: chunk.vector,
    meta: {
      documentId: String(documentId),
      title,
      documentTitle: title,
      sectionName: chunk.sectionName,
      text: chunk.text,
      category,
      tags
    },
    filter: {
      documentId: String(documentId),
      category,
      uploadedBy: String(userId)
    }
  }));

  if (clauseVectors.length) {
    await upsertClauseChunks(clauseVectors);
  }

  return {
    title,
    originalName: file.originalname,
    fileUrl: path.posix.join('/uploads', path.basename(file.path)),
    category,
    tags,
    extractedText,
    summary,
    mimeType: file.mimetype,
    size: file.size,
    chunks: denseChunks.map(({ vector, ...chunk }) => chunk),
    embeddingDimension: dimension,
    ingestionStatus: 'processed'
  };
};
