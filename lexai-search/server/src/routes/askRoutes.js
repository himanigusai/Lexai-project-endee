import { Router } from 'express';
import { askAi } from '../controllers/searchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, askAi);

export default router;

