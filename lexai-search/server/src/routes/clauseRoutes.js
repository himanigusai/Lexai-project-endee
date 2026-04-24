import { Router } from 'express';
import { searchClauses } from '../controllers/searchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/search', protect, searchClauses);

export default router;

