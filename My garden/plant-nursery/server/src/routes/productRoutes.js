import express from 'express';
import {
  getProducts,
  getProductBySlug,
  getMyProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/my/all', authenticate, authorize('ADMIN'), getMyProducts);
router.get('/:slug', getProductBySlug);

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), createProduct);
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), deleteProduct);

export default router;
