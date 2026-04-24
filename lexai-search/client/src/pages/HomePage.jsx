import { Link } from 'react-router-dom';
import FeatureCards from '../components/FeatureCards.jsx';

const steps = [
  'Upload legal files and extract text securely',
  'Generate embeddings and index chunks in Endee',
  'Run semantic search, clause retrieval, and grounded AI answers'
];

const testimonials = [
  '"Clause discovery that used to take hours now happens in seconds."',
  '"Our HR contract reviews became searchable across every template we own."',
  '"The Endee-backed retrieval quality made the platform feel enterprise-ready immediately."'
];

const HomePage = () => (
  <main>
    <section className="mx-auto max-w-7xl px-6 pb-20 pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.34em] text-gold">
            AI Legal Search Platform
          </span>
          <h1 className="mt-8 max-w-3xl font-display text-5xl font-bold leading-tight text-white md:text-7xl">
            Search Legal Documents Intelligently with AI
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mist">
            LexAI Search gives law firms, HR teams, and business operators a production-style document intelligence layer built on semantic retrieval, RAG, and Endee Vector Database.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register" className="rounded-full bg-gradient-to-r from-gold to-amber-200 px-6 py-3 font-semibold text-midnight">
              Launch Workspace
            </Link>
            <Link to="/search" className="rounded-full border border-white/15 px-6 py-3 text-white">
              Explore Search
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ['Semantic Recall', 'High relevance across dense legal meaning'],
              ['Clause Extraction', 'Fast pattern and intent-based retrieval'],
              ['RAG Ready', 'Grounded answers with source passages']
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel luxury-border animate-float rounded-[36px] p-6">
          <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-white">Knowledge Graph Console</p>
              <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">Live</span>
            </div>
            <div className="mt-6 space-y-4">
              {[
                ['Document Indexed', 'Vendor Master Services Agreement.pdf'],
                ['Top Match', 'Termination clause with 30 day notice'],
                ['AI Answer', 'Penalty exposure limited to delayed milestone fees']
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-gold">{label}</p>
                  <p className="mt-2 text-sm text-slate-200">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-6 py-10">
      <FeatureCards />
    </section>

    <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-2">
      <div className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">How It Works</p>
        <div className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                {index + 1}
              </div>
              <p className="text-slate-200">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-panel luxury-border rounded-[32px] p-8">
        <p className="text-xs uppercase tracking-[0.34em] text-gold">Trusted Workflow Style</p>
        <div className="mt-6 space-y-4">
          {testimonials.map((quote) => (
            <blockquote key={quote} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-200">
              {quote}
            </blockquote>
          ))}
        </div>
      </div>
    </section>

    <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400">
      LexAI Search. Legal document intelligence for modern teams.
    </footer>
  </main>
);

export default HomePage;

