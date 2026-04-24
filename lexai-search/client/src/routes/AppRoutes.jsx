import { Navigate, Route, Routes } from 'react-router-dom';
import MarketingLayout from '../layouts/MarketingLayout.jsx';
import AppLayout from '../layouts/AppLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import RegisterPage from '../pages/RegisterPage.jsx';
import DashboardPage from '../pages/DashboardPage.jsx';
import UploadPage from '../pages/UploadPage.jsx';
import SearchPage from '../pages/SearchPage.jsx';
import AskAiPage from '../pages/AskAiPage.jsx';
import DocumentDetailPage from '../pages/DocumentDetailPage.jsx';
import AdminDashboardPage from '../pages/AdminDashboardPage.jsx';

const AppRoutes = () => (
  <Routes>
    <Route element={<MarketingLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/ask-ai" element={<AskAiPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;

