import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Eye, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Star,
  Filter
} from 'lucide-react';
import axios from 'axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const { BACKEND_URL, getAuthHeader } = useAuth();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      // Get all orders to extract customer information
      const response = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
        headers: getAuthHeader()
      });
      
      // Process orders to create customer data
      const ordersByCustomer = {};
      response.data.forEach(order => {
        const key = `${order.customer_name}_${order.customer_phone}`;
        if (!ordersByCustomer[key]) {
          ordersByCustomer[key] = {
            id: key,
            name: order.customer_name,
            phone: order.customer_phone,
            email: order.customer_email || '',
            address: order.customer_address,
            orders: [],
            totalSpent: 0,
            orderCount: 0,
            lastOrderDate: order.created_at
          };
        }
        
        ordersByCustomer[key].orders.push(order);
        ordersByCustomer[key].totalSpent += (order.total_price + order.shipping_fee);
        ordersByCustomer[key].orderCount += 1;
        
        // Update last order date
        if (new Date(order.created_at) > new Date(ordersByCustomer[key].lastOrderDate)) {
          ordersByCustomer[key].lastOrderDate = order.created_at;
        }
      });
      
      setCustomers(Object.values(ordersByCustomer));
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getCustomerLevel = (totalSpent) => {
    if (totalSpent >= 10000000) return { level: 'VIP', color: 'from-purple-500 to-purple-600' };
    if (totalSpent >= 5000000) return { level: 'Gold', color: 'from-yellow-500 to-yellow-600' };
    if (totalSpent >= 2000000) return { level: 'Silver', color: 'from-gray-400 to-gray-500' };
    return { level: 'Bronze', color: 'from-amber-500 to-amber-600' };
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

  // Filter and sort customers
  const filteredCustomers = customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.lastOrderDate) - new Date(a.lastOrderDate);
        case 'spending':
          return b.totalSpent - a.totalSpent;
        case 'orders':
          return b.orderCount - a.orderCount;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100
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
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-800 bg-clip-text text-transparent">
            Quản lý khách hàng
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Theo dõi thông tin và lịch sử mua hàng của khách hàng
          </p>
        </div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-amber-200 dark:border-amber-800"
        >
          <Users className="w-8 h-8 text-amber-600" />
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng khách hàng</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{customers.length}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Khách VIP</p>
              <p className="text-3xl font-bold text-purple-600">
                {customers.filter(c => getCustomerLevel(c.totalSpent).level === 'VIP').length}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Star className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng đơn hàng</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">
                {customers.reduce((sum, c) => sum + c.orderCount, 0)}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Doanh thu</p>
              <p className="text-3xl font-bold text-green-600">
                {formatPrice(customers.reduce((sum, c) => sum + c.totalSpent, 0))}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tìm kiếm khách hàng
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên, số điện thoại hoặc email..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sắp xếp theo
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="recent">Mua hàng gần đây</option>
              <option value="spending">Chi tiêu nhiều nhất</option>
              <option value="orders">Số đơn hàng</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Customers List */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCustomers.map((customer, index) => {
            const customerLevel = getCustomerLevel(customer.totalSpent);
            return (
              <motion.div
                key={customer.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group cursor-pointer"
                onClick={() => setSelectedCustomer(customer)}
              >
                <div className={`h-2 bg-gradient-to-r ${customerLevel.color}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${customerLevel.color} rounded-xl flex items-center justify-center`}>
                        <span className="text-white font-bold text-lg">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 dark:text-white">{customer.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${customerLevel.color} text-white font-medium`}>
                          {customerLevel.level}
                        </span>
                      </div>
                    </div>
                    <Eye className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4 mr-2 text-amber-600" />
                      <span>{customer.phone}</span>
                    </div>
                    
                    {customer.email && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Mail className="w-4 h-4 mr-2 text-amber-600" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                      <span className="truncate">{customer.address}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Đơn hàng</p>
                        <p className="text-xl font-bold text-gray-800 dark:text-white">{customer.orderCount}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chi tiêu</p>
                        <p className="text-xl font-bold text-green-600">{formatPrice(customer.totalSpent)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Mua lần cuối: {new Date(customer.lastOrderDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Customer Detail Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-4">
                    {(() => {
                      const level = getCustomerLevel(selectedCustomer.totalSpent);
                      return (
                        <div className={`w-16 h-16 bg-gradient-to-br ${level.color} rounded-2xl flex items-center justify-center`}>
                          <span className="text-white font-bold text-2xl">
                            {selectedCustomer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{selectedCustomer.name}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCustomerLevel(selectedCustomer.totalSpent).color} text-white`}>
                        Khách hàng {getCustomerLevel(selectedCustomer.totalSpent).level}
                      </span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedCustomer(null)} 
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    ×
                  </motion.button>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <Users className="w-5 h-5 text-amber-600 mr-2" />
                      Thông tin liên hệ
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 text-amber-600 mr-3" />
                        <span className="text-gray-800 dark:text-white">{selectedCustomer.phone}</span>
                      </div>
                      {selectedCustomer.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-amber-600 mr-3" />
                          <span className="text-gray-800 dark:text-white">{selectedCustomer.email}</span>
                        </div>
                      )}
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-amber-600 mr-3 mt-1" />
                        <span className="text-gray-800 dark:text-white">{selectedCustomer.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                      <TrendingUp className="w-5 h-5 text-amber-600 mr-2" />
                      Thống kê mua hàng
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{selectedCustomer.orderCount}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Đơn hàng</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{formatPrice(selectedCustomer.totalSpent)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Chi tiêu</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">
                          {formatPrice(Math.round(selectedCustomer.totalSpent / selectedCustomer.orderCount))}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Trung bình/đơn</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          {new Date(selectedCustomer.lastOrderDate).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mua lần cuối</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order History */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                      <ShoppingBag className="w-6 h-6 text-amber-600 mr-2" />
                      Lịch sử đơn hàng ({selectedCustomer.orders.length})
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 max-h-60 overflow-y-auto">
                      {selectedCustomer.orders
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((order, index) => (
                        <motion.div 
                          key={order.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{order.order_id.slice(-2)}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white">{order.order_id}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(order.created_at).toLocaleDateString('vi-VN')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800 dark:text-white">
                              {formatPrice(order.total_price + order.shipping_fee)}
                            </p>
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
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomerManagement;