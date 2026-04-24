import { NavLink } from 'react-router-dom';

const items = [
  ['Overview', '/dashboard'],
  ['Upload Docs', '/upload'],
  ['Semantic Search', '/search'],
  ['Ask AI', '/ask-ai'],
  ['Admin', '/admin']
];

const Sidebar = () => (
  <aside className="glass-panel luxury-border hidden h-fit w-64 p-4 lg:block">
    <p className="mb-4 text-xs uppercase tracking-[0.34em] text-gold">Workspace</p>
    <div className="space-y-2">
      {items.map(([label, to]) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `block rounded-2xl px-4 py-3 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  </aside>
);

export default Sidebar;

