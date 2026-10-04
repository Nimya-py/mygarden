import express from 'express';
import {
  getNurseries,
  getNurseryBySlug,
  getMyNurseryProfile,
  updateMyNurseryProfile,
  toggleNurseryApproval,
} from '../controllers/nurseryController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getNurseries);
router.get('/my/profile', authenticate, authorize('ADMIN'), getMyNurseryProfile);
router.put('/my/profile', authenticate, authorize('ADMIN'), updateMyNurseryProfile);
router.get('/:slug', getNurseryBySlug);

// Super Admin actions
router.patch('/:id/approve', authenticate, authorize('SUPER_ADMIN'), toggleNurseryApproval);

export default router;
