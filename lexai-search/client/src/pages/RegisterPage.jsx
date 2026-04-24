import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { pushToast } = useToast();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    role: 'user'
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      pushToast({ type: 'success', title: 'Workspace created', description: 'Your LexAI organization is live.' });
      navigate('/dashboard');
    } catch (error) {
      pushToast({ type: 'error', title: 'Registration failed', description: error.response?.data?.message || 'Please try again.' });
    }
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-12">
      <div className="mx-auto w-full max-w-xl glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Create Organization</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">Start your legal search workspace</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Organization" value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="rounded-2xl bg-gradient-to-r from-gold to-amber-200 px-4 py-3 font-semibold text-midnight md:col-span-2">
            Create Account
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Already have access? <Link to="/login" className="text-gold">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default RegisterPage;

