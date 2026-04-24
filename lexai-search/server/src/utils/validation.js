import validator from 'validator';
import ApiError from './ApiError.js';

export const requireFields = (payload, fields) => {
  for (const field of fields) {
    if (!payload[field]) {
      throw new ApiError(400, `${field} is required`);
    }
  }
};

export const validateEmail = (email) => {
  if (!validator.isEmail(email || '')) {
    throw new ApiError(400, 'A valid email is required');
  }
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }
};

