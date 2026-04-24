import { Router } from 'express';
import { askAi, getSearchOverview, searchClauses, semanticSearch } from '../controllers/searchController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.post('/', semanticSearch);
router.post('/ask', askAi);
router.post('/clauses/search', searchClauses);
router.get('/overview', getSearchOverview);

export default router;

