const features = [
  {
    title: 'Semantic Search',
    description: 'Query legal knowledge by meaning, not exact keywords, using Endee-powered dense retrieval.'
  },
  {
    title: 'Clause Finder',
    description: 'Surface arbitration, confidentiality, payment, and termination clauses instantly across document collections.'
  },
  {
    title: 'RAG Answers',
    description: 'Ask natural-language questions and receive grounded answers backed by the most relevant passages.'
  }
];

const FeatureCards = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {features.map((feature, index) => (
      <article
        key={feature.title}
        className="glass-panel luxury-border animate-fadeUp p-6"
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-gold/30 to-white/10" />
        <h3 className="font-display text-xl font-semibold text-white">{feature.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
      </article>
    ))}
  </div>
);

export default FeatureCards;

