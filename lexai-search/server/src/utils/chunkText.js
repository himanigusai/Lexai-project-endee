const normalizeWhitespace = (value) => value.replace(/\r/g, '').replace(/\t/g, ' ').replace(/[ ]{2,}/g, ' ').trim();

const pickSectionName = (text, fallback) => {
  const firstLine = text.split('\n').map((line) => line.trim()).find(Boolean);
  if (!firstLine) {
    return fallback;
  }

  if (firstLine.length <= 80) {
    return firstLine;
  }

  return fallback;
};

export const chunkText = (text, options = {}) => {
  const maxChars = options.maxChars || 1200;
  const overlap = options.overlap || 180;
  const cleanText = normalizeWhitespace(text);

  if (!cleanText) {
    return [];
  }

  const paragraphs = cleanText.split(/\n{2,}/).flatMap((paragraph) => {
    if (paragraph.length <= maxChars) {
      return [paragraph];
    }

    const sentences = paragraph.split(/(?<=[.!?])\s+/);
    const chunks = [];
    let current = '';

    for (const sentence of sentences) {
      const next = current ? `${current} ${sentence}` : sentence;
      if (next.length > maxChars && current) {
        chunks.push(current.trim());
        current = sentence;
      } else {
        current = next;
      }
    }

    if (current.trim()) {
      chunks.push(current.trim());
    }

    return chunks;
  });

  const chunks = [];

  for (let index = 0; index < paragraphs.length; index += 1) {
    const current = paragraphs[index];
    const previousTail = chunks.length ? chunks[chunks.length - 1].text.slice(-overlap) : '';
    const textValue = previousTail ? `${previousTail} ${current}`.trim() : current;

    chunks.push({
      chunkId: `chunk-${index + 1}`,
      sectionName: pickSectionName(current, `Section ${index + 1}`),
      text: textValue,
      tokenEstimate: Math.ceil(textValue.length / 4)
    });
  }

  return chunks;
};

