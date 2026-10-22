import express from 'express';
import { uploadSingle, uploadMultiple } from '../controllers/uploadController.js';
import { uploadMiddleware } from '../middleware/upload.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Middleware wrapper to accept either 'file' or 'image' field for single uploads
const singleUploadWrapper = (req, res, next) => {
  const upload = uploadMiddleware.fields([
    { name: 'file', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Normalize req.file
    if (req.files?.file?.[0]) {
      req.file = req.files.file[0];
    } else if (req.files?.image?.[0]) {
      req.file = req.files.image[0];
    }

    next();
  });
};

// Middleware wrapper to accept either 'files' or 'images' field for multiple uploads
const multipleUploadWrapper = (req, res, next) => {
  const upload = uploadMiddleware.fields([
    { name: 'files', maxCount: 10 },
    { name: 'images', maxCount: 10 },
  ]);

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Normalize req.files to array
    req.files = req.files?.files || req.files?.images || [];
    next();
  });
};

// @route  POST /api/upload
// @access Private (ADMIN, SUPER_ADMIN)
router.post('/', requireAdmin, singleUploadWrapper, uploadSingle);

// @route  POST /api/upload/multiple
// @access Private (ADMIN, SUPER_ADMIN)
router.post('/multiple', requireAdmin, multipleUploadWrapper, uploadMultiple);

export default router;
