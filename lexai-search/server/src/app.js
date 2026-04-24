import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import path from 'path';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import askRoutes from './routes/askRoutes.js';
import clauseRoutes from './routes/clauseRoutes.js';
import env from './config/env.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use('/uploads', express.static(path.resolve(process.cwd(), env.uploadDir)));
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'LexAI Search API is healthy'
  });
});
app.use('/api/auth', authRoutes);
app.use('/api/docs', documentRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ask', askRoutes);
app.use('/api/clauses', clauseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
