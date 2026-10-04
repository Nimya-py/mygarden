import express from 'express';
import {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), getEnquiries);
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), updateEnquiryStatus);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), deleteEnquiry);

export default router;
