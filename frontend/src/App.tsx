import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import Cameras from './pages/Cameras';
import DashboardPage from './pages/Dashboard';
import LiveMonitoringPage from './pages/LiveMonitoring';
import AlertsLogPage from './pages/AlertsLog';
import UserManagementPage from './pages/UserManagement';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            token ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/live"
          element={
            token ? (
              <LiveMonitoringPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/alerts"
          element={
            token ? (
              <AlertsLogPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/users"
          element={
            token ? (
              <UserManagementPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/cameras"
          element={
            token ? (
              <Cameras />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={token ? '/dashboard' : '/login'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
