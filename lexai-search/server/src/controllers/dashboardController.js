import Document from '../models/Document.js';
import User from '../models/User.js';
import SearchLog from '../models/SearchLog.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getEndeeHealth } from '../services/endeeService.js';

export const userDashboard = asyncHandler(async (req, res) => {
  const [documentsUploaded, recentSearches, aiQueriesCount] = await Promise.all([
    Document.countDocuments({ uploadedBy: req.user._id }),
    SearchLog.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(6),
    SearchLog.countDocuments({ user: req.user._id, type: 'rag_question' })
  ]);

  res.json({
    success: true,
    stats: {
      documentsUploaded,
      recentSearches,
      aiQueriesCount
    }
  });
});

export const adminDashboard = asyncHandler(async (_req, res) => {
  const [totalUsers, totalDocs, mostSearchedTopics] = await Promise.all([
    User.countDocuments(),
    Document.countDocuments(),
    SearchLog.aggregate([
      { $group: { _id: '$query', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 6 }
    ])
  ]);

  res.json({
    success: true,
    stats: {
      totalUsers,
      totalDocs,
      mostSearchedTopics,
      endee: getEndeeHealth()
    }
  });
});

