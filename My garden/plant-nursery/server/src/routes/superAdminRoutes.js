import express from 'express';
import {
  getPlatformStats,
  getUsersByRole,
  toggleUserStatus,
} from '../controllers/superAdminController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate, authorize('SUPER_ADMIN'));

router.get('/stats', getPlatformStats);
router.get('/users', getUsersByRole);
router.patch('/users/:id/status', toggleUserStatus);

export default router;
