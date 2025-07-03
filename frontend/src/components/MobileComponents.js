import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  PhoneIcon,
  EmailIcon,
  LocationIcon,
  ClockIcon,
  HomeIcon,
  BookIcon,
  ShoppingBagIcon,
  CloseIcon,
  NewsIcon
} from '../Icons';
import { DarkModeToggle } from '../contexts/DarkModeContext';

export const MobileBottomNav = ({ cartCount, onCartClick }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { 
      path: '/', 
      label: 'Trang chủ', 
      icon: <HomeIcon className="w-5 h-5" />,
      activeColor: 'text-amber-600',
      bgActive: 'bg-amber-50'
    },
    { 
      path: '/products', 
      label: 'Sản phẩm', 
      icon: <ShoppingBagIcon className="w-5 h-5" />,
      activeColor: 'text-blue-600',
      bgActive: 'bg-blue-50'
    },
    { 
      path: '/news', 
      label: 'Tin tức', 
      icon: <NewsIcon className="w-5 h-5" />,
      activeColor: 'text-green-600',
      bgActive: 'bg-green-50'
    },
    { 
      path: '/about', 
      label: 'Giới thiệu', 
      icon: <BookIcon className="w-5 h-5" />,
      activeColor: 'text-purple-600',
      bgActive: 'bg-purple-50'
    },
    { 
      path: '/contact', 
      label: 'Liên hệ', 
      icon: <PhoneIcon className="w-5 h-5" />,
      activeColor: 'text-red-600',
      bgActive: 'bg-red-50'
    },
  ];

  return (
    <>
      {/* Enhanced Mobile Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Modern glass effect background */}
        <div className="relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/90 to-white/80 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/80 backdrop-blur-xl"></div>
          
          {/* Top border with gradient */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-700/50 to-transparent"></div>
          
          {/* Navigation content */}
          <div className="relative px-2 py-2">
            <div className="grid grid-cols-6 gap-1 max-w-md mx-auto">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 group ${
                    isActive(item.path) 
                      ? `${item.activeColor} ${item.bgActive} dark:bg-gray-800/80 shadow-sm` 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-800/50'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-scale-in"></div>
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative transition-transform duration-300 ${
                    isActive(item.path) ? 'scale-110' : 'scale-100 group-hover:scale-105'
                  }`}>
                    {item.icon}
                    
                    {/* Micro animation dot */}
                    {isActive(item.path) && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium mt-1 transition-all duration-300 ${
                    isActive(item.path) ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                  }`}>
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {/* Enhanced Cart button */}
              <button
                onClick={onCartClick}
                className="relative flex flex-col items-center justify-center py-2 px-1 rounded-xl text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50/80 dark:hover:bg-amber-900/30 transition-all duration-300 group"
              >
                {/* Cart icon container */}
                <div className="relative transition-transform duration-300 group-hover:scale-105">
                  <ShoppingCartIcon className="w-5 h-5" />
                  
                  {/* Enhanced cart badge */}
                  {cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg">
                      <span className="animate-pulse">{cartCount > 99 ? '99+' : cartCount}</span>
                    </div>
                  )}
                  
                  {/* Cart empty indicator */}
                  {cartCount === 0 && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  )}
                </div>
                
                <span className="text-xs font-medium mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  Giỏ hàng
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safe area spacing - reduced height */}
      <div className="h-14 lg:hidden"></div>
    </>
  );
};

export const MobileDrawer = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Enhanced backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
      
      {/* Enhanced drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 shadow-2xl transform transition-all duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Enhanced close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 group"
          >
            <CloseIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </button>
          
          {children}
        </div>
      </div>
    </>
  );
};

export const MobileQuickActions = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: <PhoneIcon className="w-4 h-4" />,
      label: 'Gọi ngay',
      href: 'tel:0762222448',
      color: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
      shadowColor: 'shadow-green-500/25'
    },
    {
      icon: <EmailIcon className="w-4 h-4" />,
      label: 'Email',
      href: 'mailto:sonmochuong@gmail.com', 
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
      shadowColor: 'shadow-blue-500/25'
    },
    {
      icon: <LocationIcon className="w-4 h-4" />,
      label: 'Địa chỉ',
      onClick: () => window.open('https://maps.google.com/?q=3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM'),
      color: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600',
      shadowColor: 'shadow-red-500/25'
    }
  ];

  return (
    <div className="fixed right-4 bottom-16 z-40 lg:hidden">
      <div className="flex flex-col-reverse items-end space-y-2 space-y-reverse">
        {/* Enhanced quick actions */}
        {isExpanded && actions.map((action, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 animate-fade-in-right`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {action.href ? (
              <a
                href={action.href}
                className={`${action.color} ${action.shadowColor} text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm`}
              >
                {action.icon}
                <span className="text-sm font-medium pr-1">{action.label}</span>
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className={`${action.color} ${action.shadowColor} text-white px-3 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm`}
              >
                {action.icon}
                <span className="text-sm font-medium pr-1">{action.label}</span>
              </button>
            )}
          </div>
        ))}
        
        {/* Enhanced toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 backdrop-blur-sm ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <span className="text-lg font-bold">+</span>
        </button>
      </div>
    </div>
  );
};

// New Enhanced Mobile Components
export const MobileProductCard = ({ product, onProductClick, className = "" }) => {
  return (
    <div 
      className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden ${className}`}
      onClick={() => onProductClick(product)}
    >
      {/* Compact image container */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Compact overlay info */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span className="bg-amber-600/90 text-white px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm">
            {product.category}
          </span>
          {product.rating && (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
              <span className="text-yellow-500 text-xs">★</span>
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          )}
        </div>
        
        {/* Price overlay */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">{product.price}</span>
              {product.sizes && (
                <span className="text-xs opacity-80">{product.sizes.length} sizes</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Compact content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 dark:text-white text-sm mb-1 line-clamp-1 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2 mb-2">
          {product.description}
        </p>
        
        {/* Quick info row */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-500">{product.material}</span>
          <button className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors">
            Xem
          </button>
        </div>
      </div>
    </div>
  );
};

export const MobileHeader = ({ cartCount, onCartClick, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-sm z-50 lg:hidden transition-all duration-300">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Compact Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-sm">SMH</span>
            </div>
            <span className="text-lg font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-800 transition-colors">
              Sơn Mộc Hương
            </span>
          </Link>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle for Mobile */}
            <div className="flex items-center">
              <DarkModeToggle className="scale-75" />
            </div>

            {/* Compact cart button */}
            <button 
              onClick={onCartClick}
              className="relative bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <ShoppingCartIcon className="w-5 h-5 text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Compact menu button */}
            <button 
              className="p-2 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 rounded-full transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-5 bg-gray-600 dark:bg-gray-400 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};