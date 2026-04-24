import { initDefaultIndexes } from '../services/endeeService.js';
import { getEmbeddingDimension } from '../services/embeddingService.js';

const run = async () => {
  await initDefaultIndexes(getEmbeddingDimension());
  console.log('Endee indexes initialized successfully');
};

run().catch((error) => {
  console.error('Failed to initialize Endee indexes', error);
  process.exit(1);
});

