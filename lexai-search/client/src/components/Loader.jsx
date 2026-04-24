const Loader = ({ label = 'Loading intelligence...' }) => (
  <div className="flex items-center gap-3 text-sm text-slate-300">
    <div className="h-3 w-3 animate-pulse rounded-full bg-gold" />
    <span>{label}</span>
  </div>
);

export default Loader;

