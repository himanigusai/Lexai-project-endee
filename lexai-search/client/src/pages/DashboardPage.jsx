import { useEffect, useState } from 'react';
import StatsCards from '../components/StatsCards.jsx';
import DocumentTable from '../components/DocumentTable.jsx';
import Loader from '../components/Loader.jsx';
import api from '../services/api';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [dashboard, docs] = await Promise.all([api.get('/dashboard/user'), api.get('/docs/my')]);
      setStats(dashboard.data.stats);
      setDocuments(docs.data.documents);
    };
    load();
  }, []);

  if (!stats) {
    return <Loader label="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white">Your legal knowledge control room</h1>
      </div>

      <StatsCards
        stats={[
          { label: 'Documents Uploaded', value: stats.documentsUploaded, caption: 'Indexed assets' },
          { label: 'AI Queries', value: stats.aiQueriesCount, caption: 'Grounded answers' },
          { label: 'Recent Searches', value: stats.recentSearches.length, caption: 'Search activity' }
        ]}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-white">Recent documents</h2>
        </div>
        <DocumentTable documents={documents} />
      </section>
    </div>
  );
};

export default DashboardPage;

