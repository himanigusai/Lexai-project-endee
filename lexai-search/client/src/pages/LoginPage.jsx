import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { pushToast } = useToast();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      pushToast({ type: 'success', title: 'Welcome back', description: 'Your legal intelligence workspace is ready.' });
      navigate('/dashboard');
    } catch (error) {
      pushToast({ type: 'error', title: 'Login failed', description: error.response?.data?.message || 'Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12">
      <div className="mx-auto w-full max-w-lg glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Secure Access</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">Login to LexAI Search</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button disabled={submitting} className="w-full rounded-2xl bg-gradient-to-r from-gold to-amber-200 px-4 py-3 font-semibold text-midnight">
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Need an account? <Link to="/register" className="text-gold">Create one</Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;

