import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Storage configuration for media uploads
const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/media';  // Media folder
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });  // Create the directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Unique filename with timestamp
  },
});

// File filter to restrict allowed file types
const mediaFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mkv', 'audio/mpeg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, MP4, MKV, and MP3 are allowed.'));
  }
};

// Media upload setup with limits (e.g., 10MB limit)
export const mediaUpload = multer({
  storage: mediaStorage,
  limits: { fileSize: 10 * 1024 * 1024 },  // 10MB limit for media files
  fileFilter: mediaFileFilter,
});
