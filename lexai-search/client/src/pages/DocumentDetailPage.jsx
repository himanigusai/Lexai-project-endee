import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import api from '../services/api';
import { formatDate } from '../utils/format';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [docResponse, similarResponse] = await Promise.all([
        api.get(`/docs/${id}`),
        api.get(`/docs/similar/${id}`)
      ]);
      setDocument(docResponse.data.document);
      setSimilar(similarResponse.data.results);
    };
    load();
  }, [id]);

  if (!document) {
    return <Loader label="Loading document..." />;
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gold">{document.category}</span>
          <span className="text-sm text-slate-400">Uploaded {formatDate(document.createdAt)}</span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">{document.title}</h1>
        <p className="mt-4 max-w-4xl text-base leading-8 text-slate-200">{document.summary}</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Metadata</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>Original name: {document.originalName}</li>
              <li>Chunks indexed: {document.chunks.length}</li>
              <li>Embedding dimension: {document.embeddingDimension}</li>
              <li>Status: {document.ingestionStatus}</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Extracted Text</p>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">{document.extractedText.slice(0, 5000)}</p>
      </section>

      <section className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Similar Documents</p>
        <div className="mt-4 space-y-4">
          {similar.map((item) => (
            <article key={item._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-2 text-sm text-slate-400">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DocumentDetailPage;

