import { useState } from 'react';
import UploadCard from '../components/UploadCard.jsx';
import useToast from '../hooks/useToast';
import api from '../services/api';

const UploadPage = () => {
  const { pushToast } = useToast();
  const [form, setForm] = useState({
    title: '',
    category: 'contract',
    tags: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      pushToast({ type: 'error', title: 'File required', description: 'Choose a PDF, DOCX, or TXT file first.' });
      return;
    }

    const payload = new FormData();
    payload.append('file', file);
    payload.append('title', form.title);
    payload.append('category', form.category);
    payload.append('tags', form.tags);

    setLoading(true);
    try {
      await api.post('/docs/upload', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      pushToast({ type: 'success', title: 'Document indexed', description: 'Your file is now searchable inside Endee.' });
      setForm({ title: '', category: 'contract', tags: '' });
      setFile(null);
    } catch (error) {
      pushToast({ type: 'error', title: 'Upload failed', description: error.response?.data?.message || 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadCard>
      <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" placeholder="Document title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <select className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          <option value="contract">Contract</option>
          <option value="policy">Policy</option>
          <option value="judgment">Judgment</option>
          <option value="compliance">Compliance</option>
          <option value="general">General</option>
        </select>
        <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none md:col-span-2" placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <label className="rounded-2xl border border-dashed border-gold/40 bg-gold/5 px-4 py-10 text-center md:col-span-2">
          <span className="block text-white">{file ? file.name : 'Choose file for ingestion'}</span>
          <span className="mt-2 block text-sm text-slate-400">PDF, DOCX, TXT up to 12 MB</span>
          <input className="hidden" type="file" accept=".pdf,.docx,.txt" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </label>
        <button disabled={loading} className="rounded-2xl bg-gradient-to-r from-gold to-amber-200 px-4 py-3 font-semibold text-midnight md:col-span-2">
          {loading ? 'Processing and indexing...' : 'Upload and Index'}
        </button>
      </form>
    </UploadCard>
  );
};

export default UploadPage;

