import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { 
  Header, 
  Footer,
  ProductDetailModal,
  CartModal,
  CheckoutModal,
  ToastNotification,
  SuccessPage
} from './Components';
import { MobileBottomNav, MobileQuickActions } from './components/MobileComponents';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { HomePage, AboutPage, ProductsPage, ContactPage, NewsPage, NewsDetailPage } from './pages';
import AdminApp from './admin/AdminApp';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart_items');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.warn('Error loading cart from localStorage:', error);
      localStorage.removeItem('cart_items'); // Clear corrupted data
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cart_items', JSON.stringify(cartItems));
    } catch (error) {
      console.warn('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    try {
      const newCartId = Date.now() + Math.random();
      const existingItem = cartItems.find(item => 
        item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        const updatedItems = cartItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        setCartItems(updatedItems);
        showToastMessage(`Đã cập nhật ${product.name} trong giỏ hàng!`);
      } else {
        const newItem = { 
          ...product, 
          quantity, 
          selectedSize,
          cartId: newCartId,
          addedAt: Date.now() // Add timestamp for debugging
        };
        const updatedItems = [...cartItems, newItem];
        setCartItems(updatedItems);
        showToastMessage(`Đã thêm ${product.name} vào giỏ hàng!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToastMessage('Có lỗi khi thêm sản phẩm vào giỏ hàng!');
    }
  };

  const buyNow = (product, quantity = 1, selectedSize = null) => {
    // Thêm sản phẩm vào giỏ hàng trước
    const newItem = { 
      ...product, 
      quantity, 
      selectedSize,
      cartId: Date.now() + Math.random()
    };
    
    // Clear giỏ hàng hiện tại và chỉ giữ sản phẩm mua ngay
    setCartItems([newItem]);
    
    // Đóng modal sản phẩm và chuyển thẳng đến checkout
    setSelectedProduct(null);
    setShowCheckout(true);
    
    showToastMessage(`Tiến hành thanh toán cho ${product.name}`);
  };

  const removeFromCart = (cartId) => {
    try {
      const updatedItems = cartItems.filter(item => item.cartId !== cartId);
      setCartItems(updatedItems);
      showToastMessage('Đã xóa sản phẩm khỏi giỏ hàng!');
    } catch (error) {
      console.error('Error removing from cart:', error);
      showToastMessage('Có lỗi khi xóa sản phẩm!');
    }
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        removeFromCart(cartId);
      } else {
        const updatedItems = cartItems.map(item =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedItems);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      showToastMessage('Có lỗi khi cập nhật số lượng!');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[.,đ]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getShippingFee = () => {
    const total = getTotalPrice();
    return total >= 300000 ? 0 : 30000;
  };

  const handleOrderComplete = async (customerInfo) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Prepare order data
      const orderData = {
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        customer_address: customerInfo.address,
        note: customerInfo.note,
        items: cartItems.map(item => ({
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
          selected_size: item.selectedSize
        })),
        total_price: getTotalPrice(),
        shipping_fee: getShippingFee(),
        payment_method: customerInfo.paymentMethod || 'cod'
      };

      // Send order to backend
      const response = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const savedOrder = await response.json();
      
      // Create order info for success page
      const newOrderInfo = {
        orderId: savedOrder.order_id,
        items: [...cartItems],
        customer: customerInfo,
        totalPrice: getTotalPrice(),
        shippingFee: getShippingFee(),
        orderDate: new Date().toLocaleDateString('vi-VN')
      };
      
      setOrderInfo(newOrderInfo);
      setCartItems([]);
      setShowCheckout(false);
      setShowSuccess(true);
    } catch (error) {
      console.error('Error creating order:', error);
      // Fallback to original behavior if API fails
      const newOrderInfo = {
        orderId: 'DH' + Date.now().toString().slice(-6),
        items: [...cartItems],
        customer: customerInfo,
        totalPrice: getTotalPrice(),
        shippingFee: getShippingFee(),
        orderDate: new Date().toLocaleDateString('vi-VN')
      };
      
      setOrderInfo(newOrderInfo);
      setCartItems([]);
      setShowCheckout(false);
      setShowSuccess(true);
    }
  };

  const continueShopping = () => {
    setShowSuccess(false);
    setOrderInfo(null);
    // Scroll to products section
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Show success page if order completed
  if (showSuccess && orderInfo) {
    return (
      <SuccessPage 
        orderInfo={orderInfo}
        onContinueShopping={continueShopping}
      />
    );
  }

  return (
    <DarkModeProvider>
      <Router>
        <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
        
        <Routes>
          <Route path="/" element={<HomePage onProductClick={setSelectedProduct} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage onProductClick={setSelectedProduct} />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
        
        <Footer />
        
        {/* Mobile-specific components */}
        <MobileBottomNav cartCount={cartCount} onCartClick={() => setShowCart(true)} />
        <MobileQuickActions />
        
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        )}
        
        {showCart && (
          <CartModal
            cartItems={cartItems}
            onClose={() => setShowCart(false)}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={() => {
              setShowCart(false);
              setShowCheckout(true);
            }}
            totalPrice={getTotalPrice()}
            shippingFee={getShippingFee()}
          />
        )}
        
        {showCheckout && (
          <CheckoutModal
            cartItems={cartItems}
            onClose={() => setShowCheckout(false)}
            totalPrice={getTotalPrice()}
            shippingFee={getShippingFee()}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {showToast && (
          <ToastNotification
            message={toastMessage}
            onClose={() => setShowToast(false)}
          />
        )}
        
        {/* Add bottom padding for mobile navigation */}
        <div className="h-16 lg:hidden"></div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;