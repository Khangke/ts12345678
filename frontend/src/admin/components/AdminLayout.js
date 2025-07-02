import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DarkModeToggle } from '../../contexts/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Home,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  User
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { name: 'Quản lý sản phẩm', href: '/admin/products', icon: Package, color: 'from-green-500 to-green-600' },
    { name: 'Quản lý đơn hàng', href: '/admin/orders', icon: ShoppingCart, color: 'from-purple-500 to-purple-600' },
    { name: 'Khách hàng', href: '/admin/customers', icon: Users, color: 'from-pink-500 to-pink-600' },
    { name: 'Cài đặt', href: '/admin/settings', icon: Settings, color: 'from-gray-500 to-gray-600' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:inset-0`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
          <Link to="/admin/dashboard" className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-amber-600 font-bold text-lg">SMH</span>
            </motion.div>
            <div>
              <span className="text-white font-bold text-xl">Admin Panel</span>
              <p className="text-amber-100 text-xs">Sơn Mộc Hương</p>
            </div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item, index) => {
              const isCurrentPage = isActive(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isCurrentPage
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      isCurrentPage 
                        ? 'bg-white/20' 
                        : `bg-gradient-to-br ${item.color} text-white shadow-md group-hover:shadow-lg transition-shadow`
                    }`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="group flex items-center px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white transition-all duration-200"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center mr-3 text-white shadow-md group-hover:shadow-lg transition-shadow">
                <Home className="w-5 h-5" />
              </div>
              <span className="font-medium">Về trang chủ</span>
            </Link>
          </div>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800 dark:text-white">{admin?.username}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị viên</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 backdrop-blur-lg bg-opacity-90"
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500 lg:hidden dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Menu className="h-6 w-6" />
              </motion.button>

              {/* Search Bar */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="block w-80 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white relative rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </motion.button>

              <DarkModeToggle />
              
              {/* User Menu */}
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-300 dark:border-gray-600">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {admin?.username}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Quản trị viên</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:block font-medium">Đăng xuất</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;