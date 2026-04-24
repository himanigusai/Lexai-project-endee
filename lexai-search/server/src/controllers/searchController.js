import Document from '../models/Document.js';
import SearchLog from '../models/SearchLog.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { generateEmbedding } from '../services/embeddingService.js';
import { queryClauses, queryLegalDocs } from '../services/endeeService.js';
import { answerQuestion } from '../services/llmService.js';

const formatResults = (results) =>
  results.map((item) => ({
    id: item.id,
    documentId: item.meta?.documentId || null,
    documentTitle: item.meta?.documentTitle || item.meta?.title || 'Untitled Document',
    sectionName: item.meta?.sectionName || 'General',
    text: item.meta?.text || '',
    category: item.meta?.category || 'general',
    score: Number(item.similarity?.toFixed?.(4) || item.similarity || 0)
  }));

const logSearch = async ({ userId, type, query, resultCount }) => {
  await SearchLog.create({
    user: userId,
    type,
    query,
    resultCount
  });
};

export const semanticSearch = asyncHandler(async (req, res) => {
  if (!req.body.query?.trim()) {
    throw new ApiError(400, 'query is required');
  }

  const vector = await generateEmbedding(req.body.query);
  const results = await queryLegalDocs({
    vector,
    topK: Number(req.body.topK || 8),
    filter: req.body.category ? [{ category: { $eq: req.body.category } }] : []
  });

  const formatted = formatResults(results);
  await logSearch({
    userId: req.user._id,
    type: 'semantic_search',
    query: req.body.query,
    resultCount: formatted.length
  });

  res.json({
    success: true,
    results: formatted
  });
});

export const askAi = asyncHandler(async (req, res) => {
  if (!req.body.question?.trim()) {
    throw new ApiError(400, 'question is required');
  }

  const vector = await generateEmbedding(req.body.question);
  const contextChunks = await queryLegalDocs({
    vector,
    topK: Number(req.body.topK || 5),
    filter: req.body.category ? [{ category: { $eq: req.body.category } }] : []
  });

  const answer = await answerQuestion({
    question: req.body.question,
    contextChunks
  });

  const sources = formatResults(contextChunks);
  await logSearch({
    userId: req.user._id,
    type: 'rag_question',
    query: req.body.question,
    resultCount: sources.length
  });

  res.json({
    success: true,
    answer,
    sources
  });
});

export const searchClauses = asyncHandler(async (req, res) => {
  if (!req.body.query?.trim()) {
    throw new ApiError(400, 'query is required');
  }

  const vector = await generateEmbedding(req.body.query);
  const results = await queryClauses({
    vector,
    topK: Number(req.body.topK || 8)
  });

  const formatted = formatResults(results);
  await logSearch({
    userId: req.user._id,
    type: 'clause_search',
    query: req.body.query,
    resultCount: formatted.length
  });

  res.json({
    success: true,
    results: formatted
  });
});

export const getSearchOverview = asyncHandler(async (_req, res) => {
  const docsCount = await Document.countDocuments();
  const topics = await SearchLog.aggregate([
    { $group: { _id: '$query', total: { $sum: 1 } } },
    { $sort: { total: -1 } },
    { $limit: 5 }
  ]);

  res.json({
    success: true,
    stats: {
      docsCount,
      popularTopics: topics
    }
  });
});
