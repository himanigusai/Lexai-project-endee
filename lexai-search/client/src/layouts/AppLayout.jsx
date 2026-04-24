import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader.jsx';

const AppLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mesh">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-mesh">
      <Navbar />
      <main className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;

