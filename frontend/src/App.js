import React, { useState } from 'react';
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
import { HomePage, AboutPage, ProductsPage, ContactPage } from './pages';
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

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    const existingItem = cartItems.find(item => 
      item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      showToastMessage(`Đã cập nhật ${product.name} trong giỏ hàng!`);
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity, 
        selectedSize,
        cartId: Date.now() + Math.random()
      }]);
      showToastMessage(`Đã thêm ${product.name} vào giỏ hàng!`);
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
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
    showToastMessage('Đã xóa sản phẩm khỏi giỏ hàng!');
  };

  const updateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
    } else {
      setCartItems(cartItems.map(item =>
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      ));
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

  const handleOrderComplete = (customerInfo) => {
    // Tạo order info để hiển thị trên trang success
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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage onProductClick={setSelectedProduct} />} />
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