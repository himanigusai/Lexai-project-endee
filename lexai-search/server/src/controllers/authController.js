import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import env from '../config/env.js';
import asyncHandler from '../utils/asyncHandler.js';
import { requireFields, validateEmail, validatePassword } from '../utils/validation.js';
import ApiError from '../utils/ApiError.js';

const createToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  organization: user.organization
});

export const register = asyncHandler(async (req, res) => {
  requireFields(req.body, ['name', 'email', 'password']);
  validateEmail(req.body.email);
  validatePassword(req.body.password);

  const existing = await User.findOne({ email: req.body.email.toLowerCase() });
  if (existing) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    organization: req.body.organization,
    role: req.body.role === 'admin' ? 'admin' : 'user'
  });

  res.status(201).json({
    success: true,
    token: createToken(user),
    user: serializeUser(user)
  });
});

export const login = asyncHandler(async (req, res) => {
  requireFields(req.body, ['email', 'password']);
  validateEmail(req.body.email);

  const user = await User.findOne({ email: req.body.email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, 'Invalid credentials');
  }

  res.json({
    success: true,
    token: createToken(user),
    user: serializeUser(user)
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: serializeUser(req.user)
  });
});

