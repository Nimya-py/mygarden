import express from 'express';
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/:slug', getCategoryBySlug);

router.post('/', authenticate, authorize('SUPER_ADMIN', 'ADMIN'), createCategory);
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), updateCategory);
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), deleteCategory);

export default router;
