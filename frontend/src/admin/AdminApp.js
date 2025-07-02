import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from '../components/Toast';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import OrderManagement from './pages/OrderManagement';
import CustomerManagement from './pages/CustomerManagement';
import Settings from './pages/Settings';

const AdminApp = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/products" element={<ProductManagement />} />
                  <Route path="/orders" element={<OrderManagement />} />
                  <Route path="/customers" element={<CustomerManagement />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AdminApp;