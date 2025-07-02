import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../../components/Toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchIcon, 
  PackageIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  EyeIcon, 
  EditIcon, 
  CloseIcon,
  UserIcon,
  PhoneIcon,
  EmailIcon,
  LocationIcon,
  CalendarIcon,
  FileTextIcon,
  FilterIcon
} from '../../Icons';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'processed'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const { BACKEND_URL, getAuthHeader } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
        headers: getAuthHeader()
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    if (isUpdatingStatus) return; // Prevent double updates
    
    setIsUpdatingStatus(true);
    
    try {
      await axios.put(`${BACKEND_URL}/api/admin/orders/${orderId}/status`, 
        { status }, 
        { headers: getAuthHeader() }
      );
      
      const statusTexts = {
        pending: 'Chờ xác nhận',
        confirmed: 'Đã xác nhận',
        shipping: 'Đang giao',
        delivered: 'Đã giao',
        cancelled: 'Đã hủy'
      };
      
      showSuccess(`Cập nhật trạng thái đơn hàng thành "${statusTexts[status]}" thành công!`);
      fetchOrders();
      
      if (selectedOrder && selectedOrder.id === orderId) {
        const updatedOrder = { ...selectedOrder, status };
        setSelectedOrder(updatedOrder);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      showError('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng. Vui lòng thử lại!');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
      confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
      shipping: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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

  // Filter orders based on tab and search
  const filteredOrders = orders.filter(order => {
    // Tab filter
    const isPending = ['pending'].includes(order.status);
    const isProcessed = ['confirmed', 'shipping', 'delivered', 'cancelled'].includes(order.status);
    
    const tabMatch = activeTab === 'pending' ? isPending : isProcessed;
    
    // Status filter (within the tab)
    const statusMatch = statusFilter === 'all' || order.status === statusFilter;
    
    // Search filter
    const searchMatch = !searchTerm || 
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer_email && order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return tabMatch && statusMatch && searchMatch;
  });

  // Get counts for tabs
  const pendingCount = orders.filter(order => ['pending'].includes(order.status)).length;
  const processedCount = orders.filter(order => ['confirmed', 'shipping', 'delivered', 'cancelled'].includes(order.status)).length;

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
            Quản lý đơn hàng
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Theo dõi và cập nhật trạng thái đơn hàng</p>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div variants={itemVariants} className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Customer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <UserIcon className="w-4 h-4 inline mr-1" />
              Tìm kiếm khách hàng
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tên, SĐT, email, mã đơn hàng..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FilterIcon className="w-4 h-4 inline mr-1" />
              Lọc theo trạng thái
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
            >
              <option value="all">Tất cả trạng thái</option>
              {activeTab === 'pending' ? (
                <option value="pending">Chờ xác nhận</option>
              ) : (
                <>
                  <option value="confirmed">Đã xác nhận</option>
                  <option value="shipping">Đang giao</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã hủy</option>
                </>
              )}
            </select>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Thống kê nhanh
            </label>
            <div className="flex space-x-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 px-3 py-2 rounded-lg">
                <div className="text-xs text-amber-600 dark:text-amber-400">Chờ xử lý</div>
                <div className="text-lg font-bold text-amber-800 dark:text-amber-400">{pendingCount}</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900/50 px-3 py-2 rounded-lg">
                <div className="text-xs text-green-600 dark:text-green-400">Đã xử lý</div>
                <div className="text-lg font-bold text-green-800 dark:text-green-400">{processedCount}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-2">
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab('pending');
                setStatusFilter('all');
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20'
              }`}
            >
              <ClockIcon className="w-5 h-5" />
              <span>Chờ xử lý ({pendingCount})</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab('processed');
                setStatusFilter('all');
              }}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'processed'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
              }`}
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>Đã xử lý ({processedCount})</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <PackageIcon className="w-4 h-4 inline mr-2" />
                  Mã đơn hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <User className="w-4 h-4 inline mr-2" />
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <AnimatePresence>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-amber-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-amber-800 dark:text-amber-400">{order.order_id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{order.customer_name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              {order.customer_phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900 dark:text-white">
                          {formatPrice(order.total_price + order.shipping_fee)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(order.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedOrder(order)}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg flex items-center space-x-1"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Chi tiết</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <PackageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">Không tìm thấy đơn hàng</p>
                        <p className="text-sm">
                          {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Chưa có đơn hàng nào trong mục này'}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
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
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <PackageIcon className="w-6 h-6 text-amber-600 mr-2" />
                    Chi tiết đơn hàng {selectedOrder.order_id}
                  </h2>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedOrder(null)} 
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Customer Info */}
                <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-amber-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center text-lg">
                    <User className="w-5 h-5 text-amber-600 mr-2" />
                    Thông tin khách hàng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Tên khách hàng</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.customer_name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Số điện thoại</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.customer_phone}</p>
                      </div>
                    </div>
                    {selectedOrder.customer_email && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Email</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.customer_email}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Địa chỉ giao hàng</p>
                        <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.customer_address}</p>
                      </div>
                    </div>
                    {selectedOrder.note && (
                      <div className="flex items-start space-x-3 md:col-span-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Ghi chú</p>
                          <p className="font-semibold text-gray-800 dark:text-white">{selectedOrder.note}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center text-lg">
                    <PackageIcon className="w-5 h-5 text-amber-600 mr-2" />
                    Sản phẩm đặt hàng
                  </h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{item.product_name}</p>
                            {item.selected_size && (
                              <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">Size: {item.selected_size}</p>
                            )}
                            <p className="text-sm text-gray-600 dark:text-gray-400">Số lượng: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-lg text-amber-800 dark:text-amber-400">{item.price}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-green-200 dark:border-gray-600">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">Tóm tắt đơn hàng</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Tạm tính:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">{formatPrice(selectedOrder.total_price)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Phí vận chuyển:</span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {selectedOrder.shipping_fee === 0 ? 'Miễn phí' : formatPrice(selectedOrder.shipping_fee)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold border-t border-green-200 dark:border-gray-600 pt-3">
                      <span className="text-gray-800 dark:text-white">Tổng cộng:</span>
                      <span className="text-green-700 dark:text-green-400">
                        {formatPrice(selectedOrder.total_price + selectedOrder.shipping_fee)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Update */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center text-lg">
                    <Edit className="w-5 h-5 text-amber-600 mr-2" />
                    Cập nhật trạng thái
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {['pending', 'confirmed', 'shipping', 'delivered', 'cancelled'].map((status) => (
                      <motion.button
                        key={status}
                        whileHover={{ scale: (selectedOrder.status === status || isUpdatingStatus) ? 1 : 1.05 }}
                        whileTap={{ scale: (selectedOrder.status === status || isUpdatingStatus) ? 1 : 0.95 }}
                        onClick={() => updateOrderStatus(selectedOrder.id, status)}
                        disabled={selectedOrder.status === status || isUpdatingStatus}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all shadow-md flex items-center space-x-2 ${
                          selectedOrder.status === status
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : isUpdatingStatus
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200 hover:border-amber-300 hover:text-amber-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                        }`}
                      >
                        {isUpdatingStatus ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"
                            />
                            <span>Đang cập nhật...</span>
                          </>
                        ) : (
                          <span>{getStatusText(status)}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>Ngày tạo: {new Date(selectedOrder.created_at).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Cập nhật cuối: {new Date(selectedOrder.updated_at).toLocaleString('vi-VN')}</span>
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

export default OrderManagement;