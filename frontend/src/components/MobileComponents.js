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
    { path: '/', label: 'Trang chủ', icon: <HomeIcon className="w-5 h-5" /> },
    { path: '/about', label: 'Giới thiệu', icon: <BookIcon className="w-5 h-5" /> },
    { path: '/products', label: 'Sản phẩm', icon: <ShoppingBagIcon className="w-5 h-5" /> },
    { path: '/news', label: 'Tin tức', icon: <NewsIcon className="w-5 h-5" /> },
    { path: '/contact', label: 'Liên hệ', icon: <PhoneIcon className="w-5 h-5" /> },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      {/* Glass effect background with dark mode */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-amber-900/20 transition-all duration-500">
        <div className="grid grid-cols-5 h-16">
          {navItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1 transition-all duration-300 ${
                isActive(item.path) 
                  ? 'text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`transition-transform duration-300 ${
                isActive(item.path) ? 'scale-110' : 'scale-100'
              }`}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-800 dark:bg-amber-400 rounded-t-full animate-scale-in"></div>
              )}
            </Link>
          ))}
          
          {/* Cart button */}
          <button
            onClick={onCartClick}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 dark:text-gray-400 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 relative"
          >
            <div className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-800 dark:bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Giỏ hàng</span>
          </button>
        </div>
      </div>
    </div>
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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
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
      icon: <PhoneIcon className="w-5 h-5" />,
      label: 'Gọi ngay',
      href: 'tel:0762222448',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: <EmailIcon className="w-5 h-5" />,
      label: 'Email',
      href: 'mailto:sonmochuong@gmail.com',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: <LocationIcon className="w-5 h-5" />,
      label: 'Địa chỉ',
      onClick: () => window.open('https://maps.google.com/?q=3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM'),
      color: 'bg-red-500 hover:bg-red-600'
    }
  ];

  return (
    <div className="fixed right-4 bottom-20 z-40 lg:hidden">
      <div className="flex flex-col-reverse items-end space-y-3 space-y-reverse">
        {/* Quick actions */}
        {isExpanded && actions.map((action, index) => (
          <div
            key={index}
            className={`transform transition-all duration-300 animate-fade-in-right`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {action.href ? (
              <a
                href={action.href}
                className={`${action.color} text-white p-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:shadow-xl`}
              >
                {action.icon}
                <span className="text-sm font-medium pr-1">{action.label}</span>
              </a>
            ) : (
              <button
                onClick={action.onClick}
                className={`${action.color} text-white p-3 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 hover:shadow-xl`}
              >
                {action.icon}
                <span className="text-sm font-medium pr-1">{action.label}</span>
              </button>
            )}
          </div>
        ))}
        
        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`bg-amber-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-amber-900 ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <span className="text-lg">+</span>
        </button>
      </div>
    </div>
  );
};