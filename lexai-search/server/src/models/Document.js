import mongoose from 'mongoose';

const chunkSchema = new mongoose.Schema(
  {
    chunkId: { type: String, required: true },
    sectionName: { type: String, default: 'General' },
    text: { type: String, required: true },
    tokenEstimate: { type: Number, default: 0 }
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    originalName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, default: 'general' },
    tags: [{ type: String }],
    extractedText: { type: String, required: true },
    summary: { type: String, default: '' },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    chunks: [chunkSchema],
    embeddingDimension: { type: Number, required: true },
    ingestionStatus: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'processed'
    }
  },
  { timestamps: true }
);

documentSchema.index({ uploadedBy: 1, createdAt: -1 });
documentSchema.index({ title: 'text', summary: 'text', extractedText: 'text' });

const Document = mongoose.model('Document', documentSchema);

export default Document;

