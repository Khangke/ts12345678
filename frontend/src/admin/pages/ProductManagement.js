import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload,
  X,
  Save,
  Eye,
  Image as ImageIcon,
  Package,
  Tag,
  DollarSign,
  Ruler
} from 'lucide-react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const { BACKEND_URL, getAuthHeader } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    detail_description: '',
    price: '',
    images: [],
    category: '',
    material: '',
    sizes: [],
    size_prices: {}
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/products`, {
        headers: getAuthHeader()
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 10) {
      alert('Tối đa 10 ảnh được phép tải lên');
      return;
    }

    const promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(images => {
      setFormData({ ...formData, images: [...formData.images, ...images].slice(0, 10) });
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSizeAdd = () => {
    const sizeName = prompt('Nhập tên kích cỡ (ví dụ: 16mm, 18mm):');
    if (sizeName && !formData.sizes.includes(sizeName)) {
      const newSizes = [...formData.sizes, sizeName];
      setFormData({ 
        ...formData, 
        sizes: newSizes,
        size_prices: { ...formData.size_prices, [sizeName]: '' }
      });
    }
  };

  const handleSizeRemove = (sizeToRemove) => {
    const newSizes = formData.sizes.filter(size => size !== sizeToRemove);
    const newSizePrices = { ...formData.size_prices };
    delete newSizePrices[sizeToRemove];
    setFormData({ 
      ...formData, 
      sizes: newSizes,
      size_prices: newSizePrices
    });
  };

  const handleSizePriceChange = (size, price) => {
    setFormData({ 
      ...formData, 
      size_prices: { ...formData.size_prices, [size]: price }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        image: formData.images[0] || formData.image,
        images: formData.images.length > 0 ? formData.images : [formData.image].filter(Boolean)
      };

      if (editingProduct) {
        await axios.put(`${BACKEND_URL}/api/admin/products/${editingProduct.id}`, productData, {
          headers: getAuthHeader()
        });
      } else {
        await axios.post(`${BACKEND_URL}/api/admin/products`, productData, {
          headers: getAuthHeader()
        });
      }

      fetchProducts();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Có lỗi xảy ra khi lưu sản phẩm');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      detail_description: product.detail_description,
      price: product.price,
      images: product.images || [product.image].filter(Boolean),
      image: product.image,
      category: product.category,
      material: product.material,
      sizes: product.sizes || [],
      size_prices: product.size_prices || {}
    });
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/products/${productId}`, {
        headers: getAuthHeader()
      });
      fetchProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Có lỗi xảy ra khi xóa sản phẩm');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      detail_description: '',
      price: '',
      images: [],
      image: '',
      category: '',
      material: '',
      sizes: [],
      size_prices: {}
    });
    setEditingProduct(null);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category))];

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
            Quản lý sản phẩm
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">Thêm, sửa, xóa sản phẩm trầm hương</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Thêm sản phẩm</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tìm kiếm sản phẩm
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nhập tên hoặc mô tả sản phẩm..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
              />
              <Package className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Lọc theo danh mục
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
            >
              <option value="all">Tất cả danh mục</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              layout
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              <div className="relative">
                {product.images && product.images.length > 0 ? (
                  <div className="relative">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg flex items-center">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {product.images.length}
                      </div>
                    )}
                  </div>
                ) : (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(product)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDeleteConfirm(product)}
                    className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-gray-800 dark:text-white mb-2 text-lg">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                
                {/* Size-based pricing display */}
                {product.size_prices && Object.keys(product.size_prices).length > 0 ? (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                      <Ruler className="w-3 h-3 mr-1" />
                      Giá theo size:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(product.size_prices).slice(0, 2).map(([size, price]) => (
                        <span key={size} className="text-xs bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 text-amber-800 dark:text-amber-400 px-2 py-1 rounded-lg">
                          {size}: {price}
                        </span>
                      ))}
                      {Object.keys(product.size_prices).length > 2 && (
                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                          +{Object.keys(product.size_prices).length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 flex items-center">
                    <DollarSign className="w-4 h-4 text-amber-600 mr-1" />
                    <span className="text-amber-800 dark:text-amber-400 font-bold text-lg">{product.price}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {product.category}
                  </span>
                  {product.images && product.images.length > 0 && (
                    <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg">
                      {product.images.length} ảnh
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
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
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <Package className="w-6 h-6 text-amber-600 mr-2" />
                    {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                  </h2>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal} 
                    className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tên sản phẩm *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Giá *
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="1.500.000đ"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Danh mục *
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="Vòng tay trầm"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Chất liệu *
                      </label>
                      <input
                        type="text"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        placeholder="Trầm hương tự nhiên"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mô tả ngắn *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mô tả chi tiết *
                    </label>
                    <textarea
                      value={formData.detail_description}
                      onChange={(e) => setFormData({ ...formData, detail_description: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kích cỡ và giá theo size
                    </label>
                    <div className="space-y-3">
                      {formData.sizes.map((size, index) => (
                        <motion.div 
                          key={size}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 p-3 rounded-xl"
                        >
                          <span className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-400 px-3 py-2 rounded-lg text-sm font-medium min-w-[100px]">
                            {size}
                          </span>
                          <input
                            type="text"
                            value={formData.size_prices[size] || ''}
                            onChange={(e) => handleSizePriceChange(size, e.target.value)}
                            placeholder="1.500.000đ"
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-600 dark:text-white transition-all"
                          />
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleSizeRemove(size)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={handleSizeAdd}
                        className="w-full text-amber-800 dark:text-amber-400 hover:text-amber-900 dark:hover:text-amber-300 text-sm flex items-center justify-center space-x-2 py-3 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-xl hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm kích cỡ</span>
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Hình ảnh sản phẩm * (Tối đa 10 ảnh)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-amber-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        required={!editingProduct && formData.images.length === 0}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 dark:text-gray-400">Kéo thả ảnh vào đây hoặc click để chọn</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, GIF tối đa 10MB mỗi ảnh</p>
                      </label>
                    </div>
                    
                    {/* Image Preview Grid */}
                    {formData.images.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Đã chọn {formData.images.length}/10 ảnh
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {formData.images.map((image, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative group"
                            >
                              <img 
                                src={image} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 group-hover:border-amber-400 transition-colors"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                              >
                                <X className="w-3 h-3" />
                              </motion.button>
                              <div className="absolute bottom-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {index + 1}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      <span>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                    >
                      Hủy
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
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
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Xác nhận xóa</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Bạn có chắc chắn muốn xóa sản phẩm <br />
                  <span className="font-semibold">"{deleteConfirm.name}"</span>?<br />
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDelete(deleteConfirm.id)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
                  >
                    Xóa sản phẩm
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-500 text-white py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                  >
                    Hủy
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductManagement;