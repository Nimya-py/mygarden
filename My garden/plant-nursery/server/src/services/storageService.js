import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

// Configure Cloudinary if environment variables are provided
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  console.log('[STORAGE] Cloudinary storage configured successfully.');
} else {
  console.log('[STORAGE] Cloudinary credentials not detected. Using local disk storage (/uploads).');
}

/**
 * Uploads a file buffer either to Cloudinary or saves to local disk
 * @param {Object} file - Multer file object containing buffer, originalname, mimetype
 * @param {string} folder - Optional destination subfolder
 * @returns {Promise<{ url: string, filename: string, storage: string, size: number, mimetype: string }>}
 */
export const saveFile = async (file, folder = 'nursery') => {
  if (!file || !file.buffer) {
    throw new Error('No valid file buffer provided for upload.');
  }

  // 1. If Cloudinary is configured, stream to Cloudinary
  if (isCloudinaryConfigured) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `plant-nursery/${folder}`,
          resource_type: file.mimetype.startsWith('image/') ? 'image' : 'raw',
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            filename: result.original_filename || file.originalname,
            storage: 'cloudinary',
            size: result.bytes || file.size,
            mimetype: file.mimetype,
          });
        }
      );
      uploadStream.end(file.buffer);
    });
  }

  // 2. Otherwise, save locally to disk in /uploads
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileExt = path.extname(file.originalname).toLowerCase() || '.jpg';
  const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${fileExt}`;
  const filePath = path.join(uploadsDir, uniqueName);

  await fs.promises.writeFile(filePath, file.buffer);

  // Return path relative to base server URL
  const localUrl = `/uploads/${uniqueName}`;

  return {
    url: localUrl,
    filename: uniqueName,
    originalName: file.originalname,
    storage: 'local',
    size: file.size,
    mimetype: file.mimetype,
  };
};
