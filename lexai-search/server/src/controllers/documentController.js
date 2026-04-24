import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import Document from '../models/Document.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { ingestUploadedDocument } from '../services/documentIngestionService.js';
import { generateEmbedding } from '../services/embeddingService.js';
import { querySimilarDocuments } from '../services/endeeService.js';

export const uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, 'Document file is required');
  }

  const documentId = new mongoose.Types.ObjectId();
  const payload = await ingestUploadedDocument({
    file: req.file,
    title: req.body.title || path.parse(req.file.originalname).name,
    category: req.body.category || 'general',
    tags: (req.body.tags || '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    userId: req.user._id,
    documentId
  });

  const document = await Document.create({
    _id: documentId,
    ...payload,
    uploadedBy: req.user._id
  });

  res.status(201).json({
    success: true,
    document
  });
});

export const getMyDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find({ uploadedBy: req.user._id })
    .sort({ createdAt: -1 })
    .select('-extractedText');

  res.json({
    success: true,
    documents
  });
});

export const getDocumentById = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id).populate('uploadedBy', 'name email role');
  if (!document) {
    throw new ApiError(404, 'Document not found');
  }

  const isOwner = String(document.uploadedBy._id) === String(req.user._id);
  if (!isOwner && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized to view this document');
  }

  res.json({
    success: true,
    document
  });
});

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) {
    throw new ApiError(404, 'Document not found');
  }

  const isOwner = String(document.uploadedBy) === String(req.user._id);
  if (!isOwner && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized to delete this document');
  }

  const localPath = path.resolve(process.cwd(), `.${document.fileUrl}`);
  await Document.findByIdAndDelete(req.params.id);

  try {
    await fs.unlink(localPath);
  } catch {
    // File may already be gone; DB deletion is the source of truth here.
  }

  res.json({
    success: true,
    message: 'Document deleted successfully'
  });
});

export const similarDocuments = asyncHandler(async (req, res) => {
  const document = await Document.findById(req.params.id);
  if (!document) {
    throw new ApiError(404, 'Document not found');
  }

  const vector = await generateEmbedding(document.summary || document.extractedText.slice(0, 2400));
  const matches = await querySimilarDocuments({ vector, topK: 20 });
  const uniqueIds = [
    ...new Set(
      matches
        .map((item) => item.meta?.documentId)
        .filter((id) => id && id !== String(document._id))
    )
  ].slice(0, 5);

  const similar = await Document.find({ _id: { $in: uniqueIds } }).select('title summary category tags createdAt');

  res.json({
    success: true,
    documentId: document._id,
    results: similar
  });
});
