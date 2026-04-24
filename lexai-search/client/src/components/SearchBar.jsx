const SearchBar = ({ value, onChange, placeholder = 'Search legal intent...', onSubmit, buttonLabel = 'Search' }) => (
  <form onSubmit={onSubmit} className="glass-panel luxury-border flex flex-col gap-4 rounded-3xl p-4 md:flex-row">
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-500"
    />
    <button
      type="submit"
      className="rounded-2xl bg-gradient-to-r from-gold to-amber-200 px-5 py-3 font-semibold text-midnight"
    >
      {buttonLabel}
    </button>
  </form>
);

export default SearchBar;

