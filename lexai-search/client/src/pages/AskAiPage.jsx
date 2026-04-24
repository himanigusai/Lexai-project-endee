import { useState } from 'react';
import SearchBar from '../components/SearchBar.jsx';
import ResultCards from '../components/ResultCards.jsx';
import useToast from '../hooks/useToast';
import api from '../services/api';

const AskAiPage = () => {
  const [question, setQuestion] = useState('What is the penalty clause in this contract?');
  const [answer, setAnswer] = useState('');
  const [sources, setSources] = useState([]);
  const { pushToast } = useToast();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post('/ask', { question });
      setAnswer(data.answer);
      setSources(data.sources);
    } catch (error) {
      pushToast({ type: 'error', title: 'AI request failed', description: error.response?.data?.message || 'Unable to answer right now.' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-gold">RAG Assistant</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white">Ask grounded legal questions</h1>
      </div>
      <SearchBar value={question} onChange={setQuestion} onSubmit={onSubmit} placeholder="Ask about liability, penalties, obligations..." buttonLabel="Ask AI" />
      <section className="glass-panel luxury-border rounded-[32px] p-6">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Answer</p>
        <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-slate-200">{answer || 'Run a question to generate a grounded answer with sources.'}</p>
      </section>
      <ResultCards title="Sources" results={sources} />
    </div>
  );
};

export default AskAiPage;
