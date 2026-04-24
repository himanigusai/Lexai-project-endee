import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import ApiError from '../utils/ApiError.js';

export const protect = async (req, _res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    next(new ApiError(401, 'Authentication required'));
    return;
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      next(new ApiError(401, 'User no longer exists'));
      return;
    }

    req.user = user;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    next(new ApiError(403, 'You are not allowed to access this resource'));
    return;
  }

  next();
};

