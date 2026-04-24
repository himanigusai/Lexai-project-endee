import app from './app.js';
import env from './config/env.js';
import { connectDb } from './config/db.js';

const startServer = async () => {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`LexAI Search server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});

