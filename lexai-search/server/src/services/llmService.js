import axios from 'axios';
import env from '../config/env.js';

const buildFallbackAnswer = ({ question, contextChunks }) => {
  const citations = contextChunks
    .slice(0, 3)
    .map((chunk) => `${chunk.meta.documentTitle}: ${chunk.meta.sectionName}`)
    .join('; ');

  const primary = contextChunks[0]?.meta?.text || '';
  return `Answer drafted from retrieved legal context for "${question}". Primary relevant passage: ${primary.slice(0, 320)}${primary.length > 320 ? '...' : ''}${citations ? ` Sources reviewed: ${citations}.` : ''}`;
};

export const answerQuestion = async ({ question, contextChunks }) => {
  if (!env.openAiApiKey) {
    return buildFallbackAnswer({ question, contextChunks });
  }

  const context = contextChunks
    .map((chunk, index) => `Source ${index + 1} | ${chunk.meta.documentTitle} | ${chunk.meta.sectionName}\n${chunk.meta.text}`)
    .join('\n\n');

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: env.openAiChatModel,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: 'You answer legal document questions using only the provided context. If the context is insufficient, say so clearly.'
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nContext:\n${context}`
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${env.openAiApiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content.trim();
};

