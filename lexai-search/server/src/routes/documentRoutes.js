import { Router } from 'express';
import {
  deleteDocument,
  getDocumentById,
  getMyDocuments,
  similarDocuments,
  uploadDocument
} from '../controllers/documentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.use(protect);
router.post('/upload', upload.single('file'), uploadDocument);
router.get('/my', getMyDocuments);
router.get('/similar/:id', similarDocuments);
router.get('/:id', getDocumentById);
router.delete('/:id', deleteDocument);

export default router;

