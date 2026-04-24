import { Router } from 'express';
import { adminDashboard, userDashboard } from '../controllers/dashboardController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = Router();

router.use(protect);
router.get('/user', userDashboard);
router.get('/admin', authorize('admin'), adminDashboard);

export default router;

