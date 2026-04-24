import { useEffect, useState } from 'react';
import StatsCards from '../components/StatsCards.jsx';
import Loader from '../components/Loader.jsx';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/dashboard/admin');
        setStats(data.stats);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'Unable to load admin dashboard.');
      }
    };
    load();
  }, []);

  if (user?.role !== 'admin') {
    return (
      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Restricted</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white">Admin access required</h1>
        <p className="mt-4 text-slate-300">This dashboard is available only to organization administrators.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">System Message</p>
        <p className="mt-4 text-slate-300">{error}</p>
      </section>
    );
  }

  if (!stats) {
    return <Loader label="Loading admin dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Admin View</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white">Organization intelligence and system health</h1>
      </div>
      <StatsCards
        stats={[
          { label: 'Total Users', value: stats.totalUsers, caption: 'Workspace members' },
          { label: 'Total Documents', value: stats.totalDocs, caption: 'Knowledge assets' },
          { label: 'Endee Base URL', value: 'Online', caption: stats.endee.baseUrl }
        ]}
      />
      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Most Searched Topics</p>
        <div className="mt-4 space-y-4">
          {stats.mostSearchedTopics.map((topic) => (
            <div key={topic._id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-slate-200">{topic._id}</span>
              <span className="text-gold">{topic.total} searches</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
