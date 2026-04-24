import fs from 'fs';
import path from 'path';
import multer from 'multer';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

const uploadPath = path.resolve(process.cwd(), env.uploadDir);
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadPath),
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '');
    cb(null, `${Date.now()}-${safeName}`);
  }
});

const allowedTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain'
];

const fileFilter = (_req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new ApiError(400, 'Only PDF, DOCX, and TXT files are supported'));
    return;
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.maxFileSizeMb * 1024 * 1024
  }
});

