const ResultCards = ({ title, results = [] }) => (
  <section className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
      <span className="text-sm text-slate-400">{results.length} results</span>
    </div>
    <div className="space-y-4">
      {results.map((result) => (
        <article key={result.id} className="glass-panel luxury-border rounded-3xl p-5">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-semibold text-white">{result.documentTitle}</p>
            <span className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold">
              {result.sectionName}
            </span>
            <span className="text-xs text-slate-400">Score {result.score}</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-slate-300">{result.text}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ResultCards;

