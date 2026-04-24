const StatsCards = ({ stats }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {stats.map((stat) => (
      <article key={stat.label} className="glass-panel luxury-border rounded-3xl p-5">
        <p className="text-sm text-slate-400">{stat.label}</p>
        <p className="mt-4 font-display text-4xl font-bold text-white">{stat.value}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">{stat.caption}</p>
      </article>
    ))}
  </div>
);

export default StatsCards;

