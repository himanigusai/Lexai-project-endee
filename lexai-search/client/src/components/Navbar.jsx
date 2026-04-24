import { Link, NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/upload', label: 'Upload' },
  { to: '/search', label: 'Search' },
  { to: '/ask-ai', label: 'Ask AI' }
];

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-amber-200 text-midnight font-black">
            L
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white">LexAI Search</p>
            <p className="text-xs text-slate-400">Legal intelligence platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-gold">{user.role}</p>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-gold/60 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-200 hover:text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-gold to-amber-200 px-4 py-2 text-sm font-semibold text-midnight"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

