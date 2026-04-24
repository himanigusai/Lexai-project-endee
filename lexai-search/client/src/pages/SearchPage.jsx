import { useState } from 'react';
import ResultCards from '../components/ResultCards.jsx';
import SearchBar from '../components/SearchBar.jsx';
import useToast from '../hooks/useToast';
import api from '../services/api';

const SearchPage = () => {
  const [query, setQuery] = useState('termination clause with 30 days notice');
  const [results, setResults] = useState([]);
  const [clauses, setClauses] = useState([]);
  const { pushToast } = useToast();

  const runSearch = async (event) => {
    event.preventDefault();
    try {
      const [semantic, clause] = await Promise.all([
        api.post('/search', { query }),
        api.post('/clauses/search', { query })
      ]);
      setResults(semantic.data.results);
      setClauses(clause.data.results);
    } catch (error) {
      pushToast({ type: 'error', title: 'Search failed', description: error.response?.data?.message || 'Unable to search right now.' });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Semantic Retrieval</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white">Search by legal meaning, not exact phrase</h1>
      </div>
      <SearchBar value={query} onChange={setQuery} onSubmit={runSearch} />
      <ResultCards title="Top Semantic Results" results={results} />
      <ResultCards title="Clause Finder Results" results={clauses} />
    </div>
  );
};

export default SearchPage;
