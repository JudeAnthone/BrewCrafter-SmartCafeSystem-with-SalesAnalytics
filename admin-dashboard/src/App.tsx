import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout'; // Change to Layout instead of AdminLayout
import Dashboard from './pages/Dashboard';
import MenuManager from './pages/MenuManager';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Login from './pages/AdminLogin';
import Register from './pages/AdminRegister';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/AdminProtectedRoute';
import { AuthProvider } from './contexts/AdminAuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}> {/* Changed from AdminLayout to Layout */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<MenuManager />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          
          {/* Redirect root to login or dashboard */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;