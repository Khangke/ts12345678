import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  Users, 
  Clock,
  Eye,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { BACKEND_URL, getAuthHeader } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/stats`, {
        headers: getAuthHeader()
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#F59E0B',
      confirmed: '#3B82F6',
      shipping: '#8B5CF6',
      delivered: '#10B981',
      cancelled: '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Chờ xác nhận',
      confirmed: 'Đã xác nhận',
      shipping: 'Đang giao',
      delivered: 'Đã giao',
      cancelled: 'Đã hủy'
    };
    return texts[status] || status;
  };

  // Sample data for charts (in real app, this would come from API)
  const salesData = [
    { name: 'T1/2025', value: 15000000 },
    { name: 'T2/2025', value: 22000000 },
    { name: 'T3/2025', value: 18000000 },
    { name: 'T4/2025', value: 25000000 },
    { name: 'T5/2025', value: 32000000 },
    { name: 'T6/2025', value: 28000000 },
  ];

  const orderStatusData = stats?.orders ? [
    { name: 'Chờ xác nhận', value: stats.orders.pending, color: '#F59E0B' },
    { name: 'Đã xác nhận', value: stats.orders.confirmed, color: '#3B82F6' },
    { name: 'Đang giao', value: stats.orders.shipping, color: '#8B5CF6' },
    { name: 'Đã giao', value: stats.orders.delivered, color: '#10B981' },
    { name: 'Đã hủy', value: stats.orders.cancelled, color: '#EF4444' },
  ].filter(item => item.value > 0) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-200 border-t-amber-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 min-h-screen"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Chào mừng trở lại! Đây là tổng quan Sơn Mộc Hương
            </p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-amber-200 dark:border-amber-800"
          >
            <Activity className="w-8 h-8 text-amber-600" />
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Products */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-lg bg-opacity-80"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tổng sản phẩm</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats?.product_count || 0}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12% tháng này</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-lg bg-opacity-80"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Tổng đơn hàng</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats?.orders?.total || 0}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+8% tháng này</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Pending Orders */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-lg bg-opacity-80"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Chờ xác nhận</p>
              <p className="text-3xl font-bold text-orange-600">{stats?.orders?.pending || 0}</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600 font-medium">Cần xử lý</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Revenue */}
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 backdrop-blur-lg bg-opacity-80"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Doanh thu</p>
              <p className="text-3xl font-bold text-green-600">{formatPrice(stats?.total_revenue || 0)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+15% tháng này</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-amber-600 mr-2" />
            Doanh thu 6 tháng gần đây
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              />
              <Tooltip 
                formatter={(value) => [formatPrice(value), 'Doanh thu']}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, fill: '#f59e0b' }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order Status Pie Chart */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Eye className="w-6 h-6 text-amber-600 mr-2" />
            Trạng thái đơn hàng
          </h3>
          {orderStatusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              Chưa có dữ liệu đơn hàng
            </div>
          )}
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <Activity className="w-6 h-6 text-amber-600 mr-2" />
            Đơn hàng gần đây
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {stats?.recent_orders?.slice(0, 5).map((order, index) => (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{order.order_id.slice(-2)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{order.order_id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer_name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800 dark:text-white">{formatPrice(order.total_price + order.shipping_fee)}</p>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;