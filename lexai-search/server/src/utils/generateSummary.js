export const generateSummary = (text) => {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean)
    .slice(0, 3);

  return sentences.join(' ').slice(0, 420);
};

