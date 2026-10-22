import { saveFile } from '../services/storageService.js';

// @desc    Upload a single file (image, document, certificate)
// @route   POST /api/upload
// @access  Private (ADMIN, SUPER_ADMIN)
export const uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file was uploaded. Please attach a file to the "file" or "image" field.',
      });
    }

    const folder = req.body.folder || 'general';
    const result = await saveFile(req.file, folder);

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple files (e.g. product gallery images)
// @route   POST /api/upload/multiple
// @access  Private (ADMIN, SUPER_ADMIN)
export const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files were uploaded. Please attach files to the "files" or "images" field.',
      });
    }

    const folder = req.body.folder || 'products';
    const uploadPromises = req.files.map((file) => saveFile(file, folder));
    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: `${results.length} file(s) uploaded successfully`,
      data: results,
    });
  } catch (error) {
    next(error);
  }
};
