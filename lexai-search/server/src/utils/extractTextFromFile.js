import fs from 'fs/promises';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import ApiError from './ApiError.js';

export const extractTextFromFile = async (file) => {
  if (!file) {
    throw new ApiError(400, 'No file provided');
  }

  if (file.mimetype === 'application/pdf') {
    const buffer = await fs.readFile(file.path);
    const parsed = await pdf(buffer);
    return parsed.text.trim();
  }

  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ path: file.path });
    return result.value.trim();
  }

  if (file.mimetype === 'text/plain') {
    const content = await fs.readFile(file.path, 'utf8');
    return content.trim();
  }

  throw new ApiError(400, 'Unsupported file type');
};

