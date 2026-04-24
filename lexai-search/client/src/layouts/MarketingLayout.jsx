import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

const MarketingLayout = () => (
  <div className="min-h-screen bg-mesh">
    <Navbar />
    <Outlet />
  </div>
);

export default MarketingLayout;

