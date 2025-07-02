import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../../components/Toast';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
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
  Ruler,
  GripVertical,
  Hash
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
  
  // Loading states for preventing double-click
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Predefined categories and materials
  const [availableCategories, setAvailableCategories] = useState([
    'Vòng tay trầm', 'Tinh dầu trầm', 'Cảnh trầm', 'Nhẫn trầm', 'Dây chuyền trầm'
  ]);
  const [availableMaterials, setAvailableMaterials] = useState([
    'Trầm hương tự nhiên', 'Gỗ trầm hương nguyên khối', 'Tinh dầu nguyên chất', 'Trầm hương cao cấp'
  ]);
  
  // Category and material input states
  const [categoryInput, setCategoryInput] = useState('');
  const [materialInput, setMaterialInput] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showMaterialDropdown, setShowMaterialDropdown] = useState(false);
  
  // Refs for click outside detection
  const categoryRef = useRef(null);
  const materialRef = useRef(null);
  
  const { BACKEND_URL, getAuthHeader } = useAuth();
  const { showSuccess, showError } = useToast();

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

  // New size input state
  const [newSize, setNewSize] = useState({ name: '', price: '' });

  // Price formatting functions
  const formatPrice = (value) => {
    // Remove all non-digits
    const numericValue = value.replace(/\D/g, '');
    
    if (!numericValue) return '';
    
    // Add thousand separators
    const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return formatted + ' VNĐ';
  };

  const unformatPrice = (value) => {
    // Remove formatting to get raw number
    return value.replace(/[^\d]/g, '');
  };

  const handlePriceChange = (value, field = 'price') => {
    const rawValue = unformatPrice(value);
    const formattedValue = formatPrice(rawValue);
    
    if (field === 'price') {
      setFormData({ ...formData, price: formattedValue });
    }
    
    return { raw: rawValue, formatted: formattedValue };
  };

  const handleSizePriceChange = (size, value) => {
    const rawValue = unformatPrice(value);
    const formattedValue = formatPrice(rawValue);
    
    setFormData({ 
      ...formData, 
      size_prices: { ...formData.size_prices, [size]: formattedValue }
    });
  };

  const handleNewSizePriceChange = (value) => {
    const rawValue = unformatPrice(value);
    const formattedValue = formatPrice(rawValue);
    
    setNewSize({ ...newSize, price: formattedValue });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Click outside handlers for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
        setCategoryInput(formData.category); // Reset to current value
      }
      if (materialRef.current && !materialRef.current.contains(event.target)) {
        setShowMaterialDropdown(false);
        setMaterialInput(formData.material); // Reset to current value
      }
    };

    if (showCategoryDropdown || showMaterialDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showCategoryDropdown, showMaterialDropdown, formData.category, formData.material]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/admin/products`, {
        headers: getAuthHeader()
      });
      setProducts(response.data);
      
      // Extract unique categories and materials from existing products
      const categories = [...new Set(response.data.map(p => p.category))];
      const materials = [...new Set(response.data.map(p => p.material))];
      setAvailableCategories(prev => [...new Set([...prev, ...categories])]);
      setAvailableMaterials(prev => [...new Set([...prev, ...materials])]);
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

  // Enhanced size management
  const handleAddSize = () => {
    if (newSize.name && newSize.price && !formData.sizes.includes(newSize.name)) {
      const newSizes = [...formData.sizes, newSize.name];
      setFormData({ 
        ...formData, 
        sizes: newSizes,
        size_prices: { ...formData.size_prices, [newSize.name]: newSize.price }
      });
      setNewSize({ name: '', price: '' });
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



  // Category management
  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    setCategoryInput(category);
    setShowCategoryDropdown(false);
  };

  const handleCategoryAdd = () => {
    if (categoryInput && !availableCategories.includes(categoryInput)) {
      setAvailableCategories([...availableCategories, categoryInput]);
    }
    setFormData({ ...formData, category: categoryInput });
    setShowCategoryDropdown(false);
  };

  const handleCategoryDelete = (categoryToDelete) => {
    const updatedCategories = availableCategories.filter(cat => cat !== categoryToDelete);
    setAvailableCategories(updatedCategories);
    
    // If the deleted category was selected, clear it
    if (formData.category === categoryToDelete) {
      setFormData({ ...formData, category: '' });
      setCategoryInput('');
    }
  };

  // Material management
  const handleMaterialSelect = (material) => {
    setFormData({ ...formData, material });
    setMaterialInput(material);
    setShowMaterialDropdown(false);
  };

  const handleMaterialAdd = () => {
    if (materialInput && !availableMaterials.includes(materialInput)) {
      setAvailableMaterials([...availableMaterials, materialInput]);
    }
    setFormData({ ...formData, material: materialInput });
    setShowMaterialDropdown(false);
  };

  const handleMaterialDelete = (materialToDelete) => {
    const updatedMaterials = availableMaterials.filter(mat => mat !== materialToDelete);
    setAvailableMaterials(updatedMaterials);
    
    // If the deleted material was selected, clear it
    if (formData.material === materialToDelete) {
      setFormData({ ...formData, material: '' });
      setMaterialInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submission
    
    setIsSubmitting(true);
    
    try {
      // Prepare size prices for backend (keep formatted version)
      const processedSizePrices = {};
      Object.entries(formData.size_prices).forEach(([size, price]) => {
        processedSizePrices[size] = price; // Keep the formatted price with vnđ
      });
      
      const productData = {
        ...formData,
        size_prices: processedSizePrices,
        image: formData.images[0] || formData.image,
        images: formData.images.length > 0 ? formData.images : [formData.image].filter(Boolean)
      };

      if (editingProduct) {
        await axios.put(`${BACKEND_URL}/api/admin/products/${editingProduct.id}`, productData, {
          headers: getAuthHeader()
        });
        showSuccess('Cập nhật sản phẩm thành công!');
      } else {
        await axios.post(`${BACKEND_URL}/api/admin/products`, productData, {
          headers: getAuthHeader()
        });
        showSuccess('Thêm sản phẩm mới thành công!');
      }

      fetchProducts();
      setShowModal(false);
      resetForm();
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
      showError('Có lỗi xảy ra khi lưu sản phẩm. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    
    // Format prices when loading for edit
    const formattedPrice = product.price.includes('VNĐ') ? product.price : formatPrice(product.price.replace(/[^\d]/g, ''));
    const formattedSizePrices = {};
    
    if (product.size_prices) {
      Object.entries(product.size_prices).forEach(([size, price]) => {
        formattedSizePrices[size] = price.includes('VNĐ') ? price : formatPrice(price.replace(/[^\d]/g, ''));
      });
    }
    
    setFormData({
      name: product.name,
      description: product.description,
      detail_description: product.detail_description,
      price: formattedPrice,
      images: product.images || [product.image].filter(Boolean),
      image: product.image,
      category: product.category,
      material: product.material,
      sizes: product.sizes || [],
      size_prices: formattedSizePrices
    });
    setCategoryInput(product.category);
    setMaterialInput(product.material);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (isDeleting) return; // Prevent double deletion
    
    setIsDeleting(true);
    
    try {
      await axios.delete(`${BACKEND_URL}/api/admin/products/${productId}`, {
        headers: getAuthHeader()
      });
      
      showSuccess('Xóa sản phẩm thành công!');
      fetchProducts();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting product:', error);
      showError('Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại!');
    } finally {
      setIsDeleting(false);
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
    setCategoryInput('');
    setMaterialInput('');
    setNewSize({ name: '', price: '' });
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
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700"
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
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Basic Info */}
                    <div className="space-y-6">
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
                          Giá cơ bản *
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-amber-600" />
                          <input
                            type="text"
                            value={formData.price}
                            onChange={(e) => handlePriceChange(e.target.value)}
                            placeholder="10.000 VNĐ"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Nhập số, ví dụ: 10000 → 10.000 VNĐ
                        </p>
                      </div>

                      {/* Category with Tags */}
                      <div className="relative" ref={categoryRef}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Tag className="w-4 h-4 inline mr-1" />
                          Danh mục *
                        </label>
                        <input
                          type="text"
                          value={categoryInput}
                          onChange={(e) => setCategoryInput(e.target.value)}
                          onFocus={() => setShowCategoryDropdown(true)}
                          placeholder="Chọn hoặc thêm danh mục mới"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                          required
                        />
                        {showCategoryDropdown && (
                          <div 
                            className="absolute top-full left-0 right-0 z-30 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl mt-1 shadow-lg max-h-60 overflow-y-auto"
                          >
                            {availableCategories
                              .filter(cat => cat.toLowerCase().includes(categoryInput.toLowerCase()))
                              .map((category, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-white group"
                              >
                                <span onClick={() => handleCategorySelect(category)} className="flex-1">
                                  {category}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryDelete(category);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded transition-all"
                                >
                                  <X className="w-3 h-3" />
                                </motion.button>
                              </div>
                            ))}
                            {categoryInput && !availableCategories.includes(categoryInput) && (
                              <div
                                onClick={handleCategoryAdd}
                                className="px-4 py-2 hover:bg-amber-100 dark:hover:bg-amber-900/50 cursor-pointer text-amber-600 dark:text-amber-400 border-t border-gray-200 dark:border-gray-600"
                              >
                                <Plus className="w-4 h-4 inline mr-1" />
                                Thêm "{categoryInput}"
                              </div>
                            )}
                            {availableCategories.filter(cat => cat.toLowerCase().includes(categoryInput.toLowerCase())).length === 0 && !categoryInput && (
                              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                                Không có danh mục nào
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Material with Tags */}
                      <div className="relative" ref={materialRef}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Hash className="w-4 h-4 inline mr-1" />
                          Chất liệu *
                        </label>
                        <input
                          type="text"
                          value={materialInput}
                          onChange={(e) => setMaterialInput(e.target.value)}
                          onFocus={() => setShowMaterialDropdown(true)}
                          placeholder="Chọn hoặc thêm chất liệu mới"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white transition-all"
                          required
                        />
                        {showMaterialDropdown && (
                          <div 
                            className="absolute top-full left-0 right-0 z-30 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl mt-1 shadow-lg max-h-60 overflow-y-auto"
                          >
                            {availableMaterials
                              .filter(mat => mat.toLowerCase().includes(materialInput.toLowerCase()))
                              .map((material, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer text-gray-800 dark:text-white group"
                              >
                                <span onClick={() => handleMaterialSelect(material)} className="flex-1">
                                  {material}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleMaterialDelete(material);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1 rounded transition-all"
                                >
                                  <X className="w-3 h-3" />
                                </motion.button>
                              </div>
                            ))}
                            {materialInput && !availableMaterials.includes(materialInput) && (
                              <div
                                onClick={handleMaterialAdd}
                                className="px-4 py-2 hover:bg-amber-100 dark:hover:bg-amber-900/50 cursor-pointer text-amber-600 dark:text-amber-400 border-t border-gray-200 dark:border-gray-600"
                              >
                                <Plus className="w-4 h-4 inline mr-1" />
                                Thêm "{materialInput}"
                              </div>
                            )}
                            {availableMaterials.filter(mat => mat.toLowerCase().includes(materialInput.toLowerCase())).length === 0 && !materialInput && (
                              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-center">
                                Không có chất liệu nào
                              </div>
                            )}
                          </div>
                        )}
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
                    </div>

                    {/* Right Column - Images and Sizes */}
                    <div className="space-y-6">
                      {/* Image Upload with Drag & Drop */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <ImageIcon className="w-4 h-4 inline mr-1" />
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
                        
                        {/* Image Preview with Drag & Drop Reorder */}
                        {formData.images.length > 0 && (
                          <div className="mt-4">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                              <ImageIcon className="w-4 h-4 mr-1" />
                              Đã chọn {formData.images.length}/10 ảnh - Kéo để sắp xếp lại
                            </div>
                            <Reorder.Group 
                              values={formData.images} 
                              onReorder={(newImages) => setFormData({ ...formData, images: newImages })}
                              className="grid grid-cols-3 sm:grid-cols-4 gap-3"
                            >
                              {formData.images.map((image, index) => (
                                <Reorder.Item key={`${image}-${index}`} value={image}>
                                  <motion.div 
                                    className="relative group cursor-move"
                                    whileHover={{ scale: 1.05 }}
                                    whileDrag={{ scale: 1.1 }}
                                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
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
                                    <div className="absolute top-1 left-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                                      <GripVertical className="w-3 h-3 mr-1" />
                                      {index + 1}
                                    </div>
                                  </motion.div>
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Size Management */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                          <Ruler className="w-5 h-5 text-amber-600 mr-2" />
                          Quản lý kích cỠ và giá
                        </h4>
                        
                        {/* Add Size Form */}
                        <div className="bg-white dark:bg-gray-600 rounded-lg p-4 mb-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input
                              type="text"
                              value={newSize.name}
                              onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
                              placeholder="Tên size (vd: 16mm)"
                              className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white text-base font-medium placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <input
                              type="text"
                              value={newSize.price}
                              onChange={(e) => handleNewSizePriceChange(e.target.value)}
                              placeholder="Giá (vd: 10.000 VNĐ)"
                              className="px-4 py-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white text-base font-medium placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              type="button"
                              onClick={handleAddSize}
                              disabled={!newSize.name || !newSize.price}
                              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-semibold text-base"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Thêm
                            </motion.button>
                          </div>
                        </div>

                        {/* Size List */}
                        <div className="space-y-3">
                          {formData.sizes.map((size, index) => (
                            <motion.div 
                              key={size}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-3 bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500"
                            >
                              <div className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-400 px-3 py-2 rounded-lg text-sm font-medium min-w-[100px] text-center">
                                {size}
                              </div>
                              <input
                                type="text"
                                value={formData.size_prices[size] || ''}
                                onChange={(e) => handleSizePriceChange(size, e.target.value)}
                                placeholder="10.000 VNĐ"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-gray-700 dark:text-white"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => handleSizeRemove(size)}
                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          ))}
                          {formData.sizes.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                              Chưa có size nào. Thêm size để tạo bảng giá theo kích cỡ.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 rounded-xl transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg ${
                        isSubmitting 
                          ? 'opacity-75 cursor-not-allowed' 
                          : 'hover:from-amber-700 hover:to-orange-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Đang xử lý...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          <span>{editingProduct ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</span>
                        </>
                      )}
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
                    whileHover={{ scale: isDeleting ? 1 : 1.02 }}
                    whileTap={{ scale: isDeleting ? 1 : 0.98 }}
                    onClick={() => handleDelete(deleteConfirm.id)}
                    disabled={isDeleting}
                    className={`flex-1 bg-red-600 text-white py-3 rounded-xl transition-colors font-semibold flex items-center justify-center space-x-2 ${
                      isDeleting 
                        ? 'opacity-75 cursor-not-allowed' 
                        : 'hover:bg-red-700'
                    }`}
                  >
                    {isDeleting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Đang xóa...</span>
                      </>
                    ) : (
                      <span>Xóa sản phẩm</span>
                    )}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isDeleting}
                    className={`flex-1 bg-gray-500 text-white py-3 rounded-xl transition-colors font-semibold ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'
                    }`}
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