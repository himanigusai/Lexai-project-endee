import mongoose from 'mongoose';

const searchLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['semantic_search', 'rag_question', 'clause_search'],
      required: true
    },
    query: { type: String, required: true, trim: true },
    resultCount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

searchLogSchema.index({ user: 1, createdAt: -1 });
searchLogSchema.index({ query: 1 });

const SearchLog = mongoose.model('SearchLog', searchLogSchema);

export default SearchLog;

