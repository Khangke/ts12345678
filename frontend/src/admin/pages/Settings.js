import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Store, 
  Truck, 
  DollarSign, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  Bell,
  Shield,
  Palette,
  Globe
} from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    store: {
      name: 'Sơn Mộc Hương',
      description: 'Chuyên cung cấp sản phẩm trầm hương cao cấp',
      phone: '0123 456 789',
      email: 'contact@sonmochuong.com',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      website: 'https://sonmochuong.com'
    },
    shipping: {
      freeShippingThreshold: 300000,
      standardShippingFee: 30000,
      expressShippingFee: 50000
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      orderUpdates: true,
      lowStockAlerts: true
    },
    security: {
      sessionTimeout: 24,
      requirePasswordChange: false,
      twoFactorAuth: false
    }
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Cài đặt đã được lưu thành công!');
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

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
            Cài đặt hệ thống
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            Quản lý cấu hình cửa hàng và hệ thống
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span className="font-medium">Lưu cài đặt</span>
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Store Settings */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Store className="w-6 h-6 text-amber-600 mr-2" />
            Thông tin cửa hàng
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tên cửa hàng
              </label>
              <input
                type="text"
                value={settings.store.name}
                onChange={(e) => handleInputChange('store', 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mô tả
              </label>
              <textarea
                value={settings.store.description}
                onChange={(e) => handleInputChange('store', 'description', e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={settings.store.phone}
                  onChange={(e) => handleInputChange('store', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  value={settings.store.email}
                  onChange={(e) => handleInputChange('store', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Địa chỉ
              </label>
              <input
                type="text"
                value={settings.store.address}
                onChange={(e) => handleInputChange('store', 'address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Globe className="w-4 h-4 inline mr-1" />
                Website
              </label>
              <input
                type="url"
                value={settings.store.website}
                onChange={(e) => handleInputChange('store', 'website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Shipping Settings */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Truck className="w-6 h-6 text-amber-600 mr-2" />
            Cài đặt vận chuyển
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Miễn phí vận chuyển từ (VNĐ)
              </label>
              <input
                type="number"
                value={settings.shipping.freeShippingThreshold}
                onChange={(e) => handleInputChange('shipping', 'freeShippingThreshold', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phí vận chuyển tiêu chuẩn (VNĐ)
              </label>
              <input
                type="number"
                value={settings.shipping.standardShippingFee}
                onChange={(e) => handleInputChange('shipping', 'standardShippingFee', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phí vận chuyển nhanh (VNĐ)
              </label>
              <input
                type="number"
                value={settings.shipping.expressShippingFee}
                onChange={(e) => handleInputChange('shipping', 'expressShippingFee', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Bell className="w-6 h-6 text-amber-600 mr-2" />
            Thông báo
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Thông báo email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nhận thông báo qua email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Thông báo SMS</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nhận thông báo qua tin nhắn</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.smsNotifications}
                  onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Cập nhật đơn hàng</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Thông báo khi có đơn hàng mới</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.orderUpdates}
                  onChange={(e) => handleInputChange('notifications', 'orderUpdates', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Cảnh báo hết hàng</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Thông báo khi sản phẩm sắp hết</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications.lowStockAlerts}
                  onChange={(e) => handleInputChange('notifications', 'lowStockAlerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <Shield className="w-6 h-6 text-amber-600 mr-2" />
            Bảo mật
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thời gian hết hạn phiên (giờ)
              </label>
              <input
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Bắt buộc đổi mật khẩu</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yêu cầu đổi mật khẩu định kỳ</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.requirePasswordChange}
                  onChange={(e) => handleInputChange('security', 'requirePasswordChange', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">Xác thực 2 lớp</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bảo mật bổ sung cho tài khoản</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.security.twoFactorAuth}
                  onChange={(e) => handleInputChange('security', 'twoFactorAuth', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;