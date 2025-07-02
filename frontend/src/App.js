import React, { useState } from 'react';
import './App.css';
import { 
  Header, 
  HeroSection, 
  FeaturesSection, 
  AboutSection, 
  ProductsSection, 
  ContactSection, 
  Footer,
  ProductDetailModal,
  CartModal,
  CheckoutModal
} from './Components';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

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
    } else {
      setCartItems([...cartItems, { 
        ...product, 
        quantity, 
        selectedSize,
        cartId: Date.now() + Math.random()
      }]);
    }
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
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

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="App">
      <Header cartCount={cartCount} onCartClick={() => setShowCart(true)} />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ProductsSection onProductClick={setSelectedProduct} />
      <ContactSection />
      <Footer />
      
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
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
          onOrderComplete={() => {
            setCartItems([]);
            setShowCheckout(false);
            alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.');
          }}
        />
      )}
    </div>
  );
}

export default App;