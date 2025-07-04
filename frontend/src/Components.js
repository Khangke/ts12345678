import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  TrophyIcon, 
  LeafIcon, 
  TruckIcon, 
  ChatIcon, 
  PhoneIcon, 
  EmailIcon, 
  LocationIcon,
  ClockIcon,
  ShoppingBagIcon,
  NewsIcon,
  CheckCircleIcon,
  CloseIcon,
  ChevronDownIcon,
  // Social Media Icons
  FacebookIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  ZaloIcon,
  WhatsAppIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedInIcon,
  // Maps and Support Icons
  MapsIcon,
  ContactSupportIcon,
  SupportAgentIcon,
  LiveHelpIcon,
  ShieldIcon
} from './Icons';
import { useScrollAnimation, useStaggerAnimation } from './hooks/useScrollAnimation';
import { DarkModeToggle } from './contexts/DarkModeContext';

// Header Component - Modern, Clean & Sophisticated
export const Header = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced prefetch with immediate cache and background refresh
  const prefetchProducts = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const CACHE_KEY = 'products_cache';
      const CACHE_DURATION = 10 * 60 * 1000; // Extend to 10 phút
      
      // Immediate cache check
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { timestamp } = JSON.parse(cachedData);
        const isValid = Date.now() - timestamp < CACHE_DURATION;
        if (isValid) return; // Cache still fresh
      }

      // Background fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
      
      const response = await fetch(`${BACKEND_URL}/api/products`, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=300', // Browser cache for 5 minutes
        }
      });
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        // Preload images for better UX
        data.slice(0, 4).forEach(product => {
          if (product.image) {
            const img = new Image();
            img.src = product.image;
          }
        });
      }
    } catch (error) {
      console.log('Prefetch optimized');
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
      scrolled 
        ? 'bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-xl border-b border-gray-100/20 dark:border-gray-800/20' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="container mx-auto px-2 lg:px-4">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-1' : 'py-1.5'
        }`}>
          
          {/* Enhanced Logo - More sophisticated */}
          <Link to="/" className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-xl p-1">
            <div className={`bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 ${
              scrolled ? 'w-6 h-6' : 'w-8 h-8'
            }`}>
              <span className={`text-white font-bold transition-all duration-300 group-hover:animate-pulse ${
                scrolled ? 'text-xs' : 'text-sm'
              }`}>SMH</span>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>
            
            <div className="flex flex-col">
              <span className={`font-bold text-gray-800 dark:text-white transition-all duration-500 group-hover:text-amber-800 dark:group-hover:text-amber-400 ${
                scrolled ? 'text-base' : 'text-lg'
              }`}>
                Sơn Mộc Hương
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-light tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                Trầm hương cao cấp
              </span>
            </div>
          </Link>

          {/* Modern Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-2 py-1.5 border border-gray-200/50 dark:border-gray-700/50">
            {[
              { path: '/', label: 'Trang chủ' },
              { path: '/about', label: 'Giới thiệu' },
              { path: '/products', label: 'Sản phẩm' },
              { path: '/news', label: 'Tin tức' },
              { path: '/contact', label: 'Liên hệ' },
              { path: '/admin', label: 'Admin' }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 ${
                  isActive(item.path)
                    ? 'bg-white dark:bg-gray-700 text-amber-800 dark:text-amber-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-amber-800 dark:hover:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
                onMouseEnter={item.path === '/products' ? prefetchProducts : undefined}
              >
                {item.label}
                
                {/* Active indicator */}
                {isActive(item.path) && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Enhanced Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Contact Info - More elegant */}
            <div className="text-right animate-fade-in-right">
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end space-x-1.5 mb-0.5">
                <PhoneIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="font-medium">0762 222 448</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-end space-x-1.5">
                <EmailIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>sonmochuong@gmail.com</span>
              </div>
            </div>
            
            {/* Divider */}
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            {/* Enhanced Cart Button */}
            <button 
              onClick={onCartClick}
              className="relative group bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-3 rounded-2xl hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/30 dark:hover:to-orange-900/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400/50 border border-gray-200/50 dark:border-gray-600/50"
            >
              <ShoppingCartIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300" />
              
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-lg">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* CTA Button - More sophisticated */}
            <Link 
              to="/products"
              className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 dark:from-amber-600 dark:via-amber-700 dark:to-amber-800 text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:from-amber-800 hover:via-amber-900 hover:to-amber-950 dark:hover:from-amber-700 dark:hover:via-amber-800 dark:hover:to-amber-900 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-amber-400/50 relative overflow-hidden"
            >
              <span className="relative z-10">Mua ngay</span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Link>
          </div>

          {/* Mobile Section - Enhanced */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart Button */}
            <button 
              onClick={onCartClick}
              className="relative group bg-gray-50 dark:bg-gray-800 p-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 focus:outline-none border border-gray-200/50 dark:border-gray-600/50"
            >
              <ShoppingCartIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-lg">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* Enhanced Mobile menu button */}
            <button 
              className="p-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 focus:outline-none border border-gray-200/50 dark:border-gray-600/50 shadow-md hover:shadow-lg"
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

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-6 animate-slide-in-top">
            <div className="bg-white/95 dark:bg-gray-900/95 rounded-3xl backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <nav className="p-6 space-y-1">
                {[
                  { path: '/', label: 'Trang chủ' },
                  { path: '/about', label: 'Giới thiệu' },
                  { path: '/products', label: 'Sản phẩm' },
                  { path: '/news', label: 'Tin tức' },
                  { path: '/contact', label: 'Liên hệ' },
                  { path: '/admin', label: 'Admin' }
                ].map((item) => (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-2xl transition-all duration-300 font-medium ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-800 dark:text-amber-400 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-amber-800 dark:hover:text-amber-400 hover:translate-x-2'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile Dark Mode Toggle */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">Giao diện tối:</span>
                  <DarkModeToggle />
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Ultra-Luxury Hero Section - Premium Design
export const HeroSection = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation(0.2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const slides = [
    {
      title: "Trầm Hương",
      titleAccent: "Cao Cấp",
      subtitle: "Premium Collection",
      description: "Khám phá bộ sưu tập trầm hương nguyên chất từ thiên nhiên Việt Nam với chất lượng luxury đỉnh cao.",
      badge: "Sơn Mộc Hương",
      image: "https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Sơn Mộc",
      titleAccent: "Hương",
      subtitle: "Premium Brand", 
      description: "Thương hiệu Sơn Mộc Hương - Người bạn đồng hành tin cậy trong hành trình khám phá vẻ đẹp tinh túy của trầm hương Việt Nam.",
      badge: "Sơn Mộc Hương",
      image: "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
    },
    {
      title: "Chất Lượng",
      titleAccent: "Đỉnh Cao",
      subtitle: "Premium Quality",
      description: "Sản phẩm được tuyển chọn từ những vùng đất linh thiêng, mang đến trải nghiệm tinh túy nhất.",
      badge: "Sơn Mộc Hương",
      image: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      
      {/* Luxury Background Effects */}
      <div className="absolute inset-0">
        {/* Premium Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-violet-900/10 animate-gradient-luxury"></div>
        
        {/* Floating Luxury Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-500/15 to-orange-500/15 rounded-full blur-3xl animate-luxury-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-luxury-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-2xl animate-luxury-float" style={{animationDelay: '6s'}}></div>
        
        {/* Luxury Geometric Patterns */}
        <div className="absolute top-32 right-32 w-40 h-40 border border-amber-400/20 rotate-45 animate-spin-luxury"></div>
        <div className="absolute bottom-40 left-40 w-32 h-32 border border-violet-400/15 rotate-12 animate-scale-breath"></div>
        
        {/* Premium Light Rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-400/15 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-400/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          
          {/* Left Section - Ultra-Modern Content */}
          <div 
            ref={heroRef}
            className={`space-y-8 lg:space-y-12 transition-all duration-1500 ${
              isHeroVisible ? 'animate-cinematic-entrance' : 'opacity-0 translate-y-20'
            }`}
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-3 glass-morphism-luxury px-6 py-3 rounded-2xl border border-amber-400/50 shadow-lg">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-premium-pulse shadow-md"></div>
              <span className="text-sm font-bold text-amber-200 uppercase tracking-wider drop-shadow-md">
                {slides[currentSlide].badge}
              </span>
            </div>

            {/* Cinematic Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight">
                <span className="block text-white mb-2 animate-text-glow drop-shadow-2xl">
                  {slides[currentSlide].title}
                </span>
                <span className="block text-gradient-premium animate-shimmer-premium drop-shadow-xl">
                  {slides[currentSlide].titleAccent}
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-shimmer-premium shadow-lg"></div>
            </div>

            {/* Luxury Subtitle */}
            <div className="space-y-2">
              <p className="text-xl lg:text-2xl font-medium text-amber-200 tracking-wide drop-shadow-lg">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            {/* Premium Description */}
            <div className="max-w-2xl">
              <p className="text-lg lg:text-xl text-gray-100 leading-relaxed font-normal drop-shadow-md">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Luxury CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link 
                to="/products"
                className="btn-luxury group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Khám Phá Ngay</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link 
                to="/contact"
                className="glass-morphism-luxury px-8 py-4 rounded-2xl text-white font-semibold hover:bg-white/10 transition-all duration-500 border border-white/20 hover:border-amber-400/50 flex items-center space-x-2 group"
              >
                <PhoneIcon className="w-5 h-5 text-amber-400 group-hover:animate-pulse" />
                <span>Liên hệ ngay</span>
              </Link>
            </div>

            {/* Premium Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-12">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto glass-morphism-luxury rounded-2xl flex items-center justify-center border border-amber-400/30">
                  <CheckCircleIcon className="w-6 h-6 text-amber-400" />
                </div>
                <p className="text-sm text-slate-400 font-medium">Chất Lượng<br/>Đảm Bảo</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto glass-morphism-luxury rounded-2xl flex items-center justify-center border border-blue-400/30">
                  <TruckIcon className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-sm text-slate-400 font-medium">Miễn Phí<br/>Vận Chuyển</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto glass-morphism-luxury rounded-2xl flex items-center justify-center border border-violet-400/30">
                  <ShieldIcon className="w-6 h-6 text-violet-400" />
                </div>
                <p className="text-sm text-slate-400 font-medium">Uy Tín<br/>10+ Năm</p>
              </div>
            </div>
          </div>

          {/* Right Section - Luxury Visual */}
          <div 
            className={`relative transition-all duration-1500 ${
              isHeroVisible ? 'animate-cinematic-entrance' : 'opacity-0 translate-y-20'
            }`}
            style={{ animationDelay: '0.5s' }}
          >
            <div className="relative">
              {/* Main Premium Image */}
              <div className="relative glass-morphism-premium rounded-[4rem] p-8 overflow-hidden">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative">
                  <img 
                    src={slides[currentSlide].image}
                    alt={`${slides[currentSlide].title} ${slides[currentSlide].titleAccent}`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 image-luxury"
                  />
                  
                  {/* Image Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"></div>
                </div>
                
                {/* Floating Quality Badge */}
                <div className="absolute top-12 right-12 glass-morphism-premium px-4 py-2 rounded-xl border border-amber-400/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">Premium</span>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 glass-morphism-luxury rounded-3xl border border-amber-400/20 animate-luxury-float"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 glass-morphism-luxury rounded-full border border-violet-400/20 animate-luxury-float" style={{animationDelay: '2s'}}></div>
              
              {/* Premium Particle Effects */}
              <div className="absolute top-20 left-10 w-3 h-3 bg-amber-400 rounded-full animate-particle-dance"></div>
              <div className="absolute bottom-32 right-16 w-2 h-2 bg-violet-400 rounded-full animate-particle-dance" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-40 right-8 w-4 h-4 bg-blue-400 rounded-full animate-particle-dance" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
        </div>

        {/* Luxury Navigation Controls */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 glass-morphism-luxury rounded-full flex items-center justify-center border border-white/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronDownIcon className="w-5 h-5 text-white rotate-90" />
          </button>
          
          <div className="flex items-center space-x-3">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-amber-500 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextSlide}
            className="w-12 h-12 glass-morphism-luxury rounded-full flex items-center justify-center border border-white/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-110"
          >
            <ChevronDownIcon className="w-5 h-5 text-white -rotate-90" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-6 text-slate-400 text-sm flex items-center space-x-2 animate-bounce">
          <span>Khám phá thêm</span>
          <ChevronDownIcon className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
};



// Features Section Component
export const FeaturesSection = () => {
  const getFeatureIcon = (iconType) => {
    switch(iconType) {
      case 'trophy':
        return <TrophyIcon className="w-16 h-16 text-amber-800 dark:text-amber-400 group-hover:animate-bounce" />;
      case 'leaf':
        return <LeafIcon className="w-16 h-16 text-green-600 dark:text-green-400 group-hover:animate-wiggle" />;
      case 'truck':
        return <TruckIcon className="w-16 h-16 text-blue-600 dark:text-blue-400 group-hover:animate-pulse" />;
      case 'chat':
        return <ChatIcon className="w-16 h-16 text-purple-600 dark:text-purple-400 group-hover:animate-bounce" />;
      default:
        return null;
    }
  };

  const features = [
    {
      iconType: 'trophy',
      title: 'Chất lượng cao',
      description: 'Sản phẩm trầm hương nguyên chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.',
      bgColor: 'hover:bg-amber-50 dark:hover:bg-amber-900/20',
      borderColor: 'hover:border-amber-200 dark:hover:border-amber-700'
    },
    {
      iconType: 'leaf',
      title: 'Từ thiên nhiên',
      description: 'Tất cả sản phẩm đều từ nguyên liệu tự nhiên, mang lại hương thơm đặc trưng và lợi ích sức khỏe.',
      bgColor: 'hover:bg-green-50 dark:hover:bg-green-900/20',
      borderColor: 'hover:border-green-200 dark:hover:border-green-700'
    },
    {
      iconType: 'truck',
      title: 'Miễn phí ship',
      description: 'Miễn phí ship toàn quốc cho đơn hàng từ 300.000đ, giao hàng nhanh chóng và an toàn.',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      borderColor: 'hover:border-blue-200 dark:hover:border-blue-700'
    },
    {
      iconType: 'chat',
      title: 'Tư vấn tận tâm',
      description: 'Đội ngũ chuyên gia tư vấn nhiệt tình, giúp bạn chọn lựa sản phẩm phù hợp nhất.',
      bgColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
      borderColor: 'hover:border-purple-200 dark:hover:border-purple-700'
    }
  ];

  const { visibleItems, setRef } = useStaggerAnimation(features, 150);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-[10px] sm:text-xs lg:text-sm font-bold text-gray-800 dark:text-white mb-3 animate-fade-in-up transition-colors duration-300">
            Tại sao chọn Sơn Mộc Hương?
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-amber-800 to-orange-600 dark:from-amber-400 dark:to-orange-400 mx-auto rounded-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={setRef(index)}
              className={`relative text-center p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm transition-all duration-500 cursor-pointer group hover:shadow-2xl dark:hover:shadow-amber-900/20 hover:transform hover:scale-[1.02] hover:-translate-y-1 ${
                visibleItems.has(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-orange-50/30 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className="relative flex justify-center mb-2 sm:mb-3 lg:mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-700 dark:to-gray-800 shadow-lg group-hover:shadow-xl dark:shadow-amber-900/20 transition-all duration-300 flex items-center justify-center border border-gray-200/50 dark:border-gray-600/50">
                  <div className="scale-50 sm:scale-60 lg:scale-75">
                    {getFeatureIcon(feature.iconType)}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-[9px] sm:text-[10px] lg:text-xs font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[7px] sm:text-[8px] lg:text-[10px] text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover indicator */}
              <div className="relative mt-2 sm:mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-6 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-1 h-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products Section Component
export const FeaturedProductsSection = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Animation hook
  const [featuredRef, isFeaturedVisible] = useScrollAnimation(0.2);

  // Cache cho featured products
  const CACHE_KEY = 'featured_products_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // Priority 1: Check cache first for instant load
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isValid = Date.now() - timestamp < CACHE_DURATION;
        
        if (isValid && data && data.length > 0) {
          setProducts(data.slice(0, 4)); // Chỉ lấy 4 sản phẩm đầu
          setLoading(false);
          setIsInitialLoad(false);
          
          // Refresh cache in background
          fetchFromAPI(true);
          return;
        }
      }

      // Priority 2: Fast API call with timeout and fallback
      setLoading(true);
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Race between API call and fallback timeout
      const apiCall = fetch(`${BACKEND_URL}/api/products`);
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 3000) // 3s timeout
      );
      
      try {
        const response = await Promise.race([apiCall, timeout]);
        
        if (response.ok) {
          const data = await response.json();
          
          // Cache the data
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
          }));
          
          setProducts(data.slice(0, 4)); // Chỉ lấy 4 sản phẩm nổi bật
        } else {
          throw new Error('API response not ok');
        }
      } catch (error) {
        // Fallback to static featured products for instant display
        console.log('Using fallback featured products for better UX');
        const staticProducts = getStaticFeaturedProducts();
        setProducts(staticProducts);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      // Final fallback
      const staticProducts = getStaticFeaturedProducts();
      setProducts(staticProducts);
    } finally {
      setLoading(false);
      setIsInitialLoad(false);
    }
  };

  const fetchFromAPI = async (isBackground = false) => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${BACKEND_URL}/api/products`);
      
      if (response.ok) {
        const data = await response.json();
        
        // Cache the data
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        // Only update UI if not background refresh
        if (!isBackground && data && data.length > 0) {
          setProducts(data.slice(0, 4));
        }
      }
    } catch (error) {
      console.error('Background fetch failed:', error);
      // Don't show error for background fetches
    }
  };

  // Fallback static featured products when API fails
  const getStaticFeaturedProducts = () => [
    {
      id: '1',
      name: 'Vòng tay trầm hương tự nhiên',
      description: 'Vòng tay trầm hương nguyên chất, mang lại sự bình an và may mắn.',
      price: '1.500.000đ',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      category: 'Vòng tay trầm',
      material: 'Trầm hương tự nhiên',
      rating: 4.9,
      sizes: ['16mm', '18mm', '20mm'],
      size_prices: {
        '16mm': '1200000',
        '18mm': '1500000', 
        '20mm': '1800000'
      }
    },
    {
      id: '2',
      name: 'Nhang nụ trầm hương',
      description: 'Nhang nụ trầm hương cao cấp, cháy lâu và tỏa hương đều.',
      price: '280.000đ',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      category: 'Nhang nụ trầm',
      material: 'Trầm hương nguyên chất',
      rating: 4.9,
      sizes: ['Hộp 50 nụ', 'Hộp 100 nụ'],
      size_prices: {
        'Hộp 50 nụ': '280000',
        'Hộp 100 nụ': '550000'
      }
    },
    {
      id: '3',
      name: 'Vòng tay trầm hương chìm nước',
      description: 'Vòng tay trầm hương chìm nước cao cấp, hương thơm đặc trưng.',
      price: '12.000.000đ',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85',
      category: 'Vòng tay cao cấp',
      material: 'Trầm hương chìm nước',
      rating: 4.8,
      sizes: ['16mm', '18mm', '20mm'],
      size_prices: {
        '16mm': '10000000',
        '18mm': '12000000',
        '20mm': '15000000'
      }
    },
    {
      id: '4',
      name: 'Tinh dầu trầm hương',
      description: 'Tinh dầu trầm hương nguyên chất 100%, dùng cho liệu pháp thư giãn.',
      price: '5.500.000đ',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85',
      category: 'Tinh dầu trầm',
      material: 'Tinh dầu nguyên chất',
      rating: 4.7,
      sizes: ['5ml', '10ml', '20ml'],
      size_prices: {
        '5ml': '3500000',
        '10ml': '5500000',
        '20ml': '9500000'
      }
    }
  ];

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <section className="py-6 sm:py-8 lg:py-16 bg-gradient-to-br from-amber-50/70 via-orange-50/50 to-yellow-50/70 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decorative Elements - Smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-48 lg:w-72 h-48 lg:h-72 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 lg:w-96 h-64 lg:h-96 bg-gradient-to-br from-orange-200/20 to-yellow-200/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-2 sm:px-3 lg:px-4 relative">
        {/* Enhanced Header - Ultra compact on mobile */}
        <div 
          ref={featuredRef}
          className={`text-center mb-4 sm:mb-6 lg:mb-16 transition-all duration-1000 ${
            isFeaturedVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Badge - Smaller on mobile */}
          <div className="inline-flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 rounded-full mb-2 sm:mb-3 lg:mb-6 border border-amber-200/50 dark:border-amber-800/50">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-amber-800 dark:text-amber-200 uppercase tracking-wide">
              {loading || isInitialLoad ? 'Đang tải...' : 'Sản phẩm nổi bật'}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-3 lg:mb-6 leading-tight">
            Trầm hương{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 dark:from-amber-400 dark:via-orange-400 dark:to-yellow-400 relative drop-shadow-lg">
              chất lượng cao
            </span>
          </h2>
          
          <p className="text-[11px] sm:text-xs lg:text-lg xl:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-light px-1 sm:px-2">
            {loading || isInitialLoad ? (
              <>Đang tải những sản phẩm trầm hương tốt nhất cho bạn...</>
            ) : (
              <>
                Khám phá những sản phẩm trầm hương được khách hàng yêu thích nhất
                <br className="hidden sm:block" />
                <span className="text-amber-700 dark:text-amber-300 font-medium block mt-1">
                  Chất lượng cao cấp, giá cả hợp lý
                </span>
              </>
            )}
          </p>

          {/* Decorative Line - Smaller on mobile */}
          <div className="flex items-center justify-center mt-2 sm:mt-4 lg:mt-8">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-8 sm:w-16 lg:w-32"></div>
            <div className="mx-1 sm:mx-2 lg:mx-4 w-1.5 sm:w-2 lg:w-3 h-1.5 sm:h-2 lg:h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-8 sm:w-16 lg:w-32"></div>
          </div>
        </div>

        {/* Enhanced Loading State with Better Animation and Indicators */}
        {loading || isInitialLoad ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse group">
                {/* Enhanced Card Structure */}
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg border border-white/20 dark:border-gray-700/50 relative overflow-hidden">
                  
                  {/* Shimmer overlay for better loading effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-gray-600/40 to-transparent -translate-x-full animate-shimmer"></div>
                  
                  {/* Image skeleton with gradient */}
                  <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 h-28 sm:h-32 lg:h-48 rounded-md lg:rounded-xl mb-2 sm:mb-3 lg:mb-4 shadow-inner relative overflow-hidden">
                    {/* Pulsing indicator */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-200/30 to-transparent animate-pulse"></div>
                    {/* Loading icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-amber-300 border-t-amber-600 rounded-full animate-spin opacity-60"></div>
                    </div>
                  </div>
                  
                  {/* Content skeleton with staggered animation */}
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                    {/* Title skeleton */}
                    <div 
                      className="bg-gray-300 dark:bg-gray-700 h-2.5 sm:h-3 lg:h-4 rounded-full animate-pulse"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    
                    {/* Description skeleton - 2 lines */}
                    <div className="space-y-1">
                      <div 
                        className="bg-gray-300 dark:bg-gray-700 h-1.5 sm:h-2 lg:h-3 rounded-full w-full animate-pulse"
                        style={{ animationDelay: `${index * 100 + 50}ms` }}
                      ></div>
                      <div 
                        className="bg-gray-300 dark:bg-gray-700 h-1.5 sm:h-2 lg:h-3 rounded-full w-3/4 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 100}ms` }}
                      ></div>
                    </div>
                    
                    {/* Price and button skeleton */}
                    <div className="flex items-center justify-between pt-1">
                      <div 
                        className="bg-gradient-to-r from-amber-300 to-orange-300 dark:from-amber-700 dark:to-orange-700 h-3 sm:h-4 lg:h-6 rounded-full w-1/3 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 150}ms` }}
                      ></div>
                      <div 
                        className="bg-gray-300 dark:bg-gray-700 h-4 sm:h-5 lg:h-8 rounded-full w-12 sm:w-16 lg:w-20 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 200}ms` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Loading indicator badge */}
                  <div className="absolute top-1 right-1 bg-amber-200 dark:bg-amber-800 text-amber-800 dark:text-amber-200 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">
                    Đang tải...
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          /* Enhanced Empty State with Better Messaging */
          <div className="text-center py-8 lg:py-16">
            <div className="mb-4 lg:mb-6">
              {/* Enhanced empty state icon */}
              <div className="relative mx-auto w-16 h-16 lg:w-24 lg:h-24">
                <svg className="w-full h-full text-gray-400 dark:text-gray-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5.5l6 3m0 0V15" />
                </svg>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-200 dark:bg-amber-600 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-200 dark:bg-orange-600 rounded-full animate-pulse opacity-40"></div>
              </div>
            </div>
            
            <h3 className="text-lg lg:text-2xl font-bold text-gray-800 dark:text-white mb-2 lg:mb-4">
              Đang cập nhật sản phẩm nổi bật
            </h3>
            <p className="text-xs lg:text-base text-gray-600 dark:text-gray-400 mb-4 lg:mb-6 px-4 max-w-md mx-auto">
              Chúng tôi đang cập nhật danh sách sản phẩm nổi bật. Vui lòng quay lại sau hoặc xem tất cả sản phẩm.
            </p>
            
            {/* Action button */}
            <Link 
              to="/products"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500 dark:to-orange-500 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full text-xs lg:text-base font-semibold hover:from-amber-700 hover:to-orange-700 dark:hover:from-amber-600 dark:hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span>Xem tất cả sản phẩm</span>
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-700 h-full flex flex-col ${
                  isFeaturedVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg lg:rounded-2xl p-2 sm:p-3 lg:p-4 shadow-lg hover:shadow-xl dark:shadow-amber-900/20 transition-all duration-500 transform hover:scale-[1.02] lg:hover:scale-105 hover:-translate-y-0.5 lg:hover:-translate-y-2 border border-white/20 dark:border-gray-700/50 relative overflow-hidden h-full flex flex-col">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-amber-50/30 dark:from-gray-800/50 dark:to-amber-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Product Image - Larger for better display */}
                  <div className="relative overflow-hidden rounded-md lg:rounded-xl mb-2 sm:mb-3 lg:mb-4 h-28 sm:h-32 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex-shrink-0">
                    <img 
                      src={product.image || `https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Enhanced Badge - Ultra small on mobile */}
                    <div className="absolute top-0.5 sm:top-1 lg:top-2 left-0.5 sm:left-1 lg:left-2">
                      <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-[8px] sm:text-[9px] lg:text-xs font-bold px-1 sm:px-1.5 lg:px-3 py-0.5 lg:py-1 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center space-x-0.5 sm:space-x-1">
                        <span className="w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 bg-white rounded-full animate-pulse"></span>
                        <span className="hidden sm:inline">Nổi bật</span>
                      </span>
                    </div>

                    {/* Discount Badge - Ultra small on mobile */}
                    <div className="absolute top-0.5 sm:top-1 lg:top-2 right-0.5 sm:right-1 lg:right-2">
                      <span className="bg-red-500 text-white text-[8px] sm:text-[9px] lg:text-xs font-bold px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-full shadow-lg">
                        Hot
                      </span>
                    </div>
                  </div>

                  {/* Enhanced Product Info - Mobile optimized with action button */}
                  <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 relative flex-1 flex flex-col">
                    <h3 className="font-bold text-[10px] sm:text-xs lg:text-base text-gray-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300 leading-tight flex-1" 
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                      {product.name}
                    </h3>
                    
                    <p className="text-[8px] sm:text-[10px] lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed lg:line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 hidden lg:block"
                       style={{
                         display: '-webkit-box',
                         WebkitLineClamp: 2,
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden'
                       }}>
                      {product.description}
                    </p>

                    {/* Category badge and rating - Compact */}
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-[7px] sm:text-[8px] lg:text-xs px-1 sm:px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                      
                      {/* Rating - Ultra small on mobile */}
                      <div className="flex items-center space-x-0.5">
                        <span className="text-yellow-400 text-[8px] sm:text-[10px] lg:text-sm">★</span>
                        <span className="text-[7px] sm:text-[9px] lg:text-xs text-gray-600 dark:text-gray-400">{product.rating || 4.5}</span>
                      </div>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-center justify-between pt-1.5 lg:pt-2 mt-auto">
                      <div>
                        <span className="text-base sm:text-lg lg:text-3xl font-bold text-amber-600 dark:text-amber-400">
                          {formatPrice(product.price)}
                        </span>
                        {product.sizes && product.sizes.length > 1 && (
                          <p className="text-[8px] sm:text-[9px] lg:text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Từ {product.sizes[0]}
                          </p>
                        )}
                      </div>
                      
                      {/* Action Button - Smaller size */}
                      <button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-[7px] sm:text-[9px] lg:text-xs px-1.5 sm:px-2.5 lg:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced CTA Section - Always visible with loading state */}
        <div className="text-center mt-4 sm:mt-6 lg:mt-16">
          {loading || isInitialLoad ? (
            /* Loading CTA */
            <div className="animate-pulse">
              <div className="inline-flex items-center space-x-2 bg-gray-300 dark:bg-gray-700 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full">
                <div className="w-4 h-4 border-2 border-amber-400 border-t-amber-600 rounded-full animate-spin"></div>
                <span className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-600 dark:text-gray-400">
                  Đang tải sản phẩm...
                </span>
              </div>
            </div>
          ) : (
            /* Normal CTA */
            <Link 
              to="/products"
              className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-amber-600 dark:from-amber-500 to-orange-600 dark:to-orange-500 text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full text-xs sm:text-sm lg:text-lg font-semibold hover:from-amber-700 hover:to-orange-700 dark:hover:from-amber-600 dark:hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-102 group"
            >
              <span>Xem tất cả sản phẩm</span>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

// About Section Component
export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
                alt="Nhang trầm"
                className="w-full h-48 object-cover rounded-lg shadow-lg dark:shadow-amber-900/20"
              />
              <img 
                src="https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85"
                alt="Vòng tay trầm hương"
                className="w-full h-48 object-cover rounded-lg shadow-lg dark:shadow-amber-900/20 mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85"
                alt="Khói nhang"
                className="w-full h-32 object-cover rounded-lg shadow-lg dark:shadow-amber-900/20 -mt-4"
              />
              <img 
                src="https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85"
                alt="Gỗ trầm hương"
                className="w-full h-32 object-cover rounded-lg shadow-lg dark:shadow-amber-900/20 mt-4"
              />
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 transition-colors duration-300">
              Sơn Mộc Hương
              <br />
              <span className="text-amber-800 dark:text-amber-400">Trầm hương chất lượng cao</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg transition-colors duration-300">
              Sơn Mộc Hương tự hào mang đến cho khách hàng những sản phẩm trầm hương từ thiên nhiên, 
              với nguyên liệu trầm hương nguyên chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 dark:bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Trầm hương nguyên chất 100%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 dark:bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Cam kết chất lượng với giá trị thực</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 dark:bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Dịch vụ tận tâm, uy tín</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 dark:bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Miễn phí ship từ 300.000đ</span>
              </div>
            </div>

            <button className="mt-8 bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-8 py-3 rounded-full hover:from-amber-900 hover:to-amber-800 dark:hover:from-amber-700 dark:hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Ultra-Modern Luxury Products Section - Complete UX/UI Overhaul
export const ProductsSection = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [priceRange, setPriceRange] = useState([0, 30000000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [compareList, setCompareList] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);
  const itemsPerPage = 12;

  // Cache products in localStorage để tăng tốc load
  const CACHE_KEY = 'products_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

  useEffect(() => {
    fetchProducts();
    loadUserPreferences();
  }, []);

  const loadUserPreferences = () => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('user_wishlist');
    if (savedWishlist) {
      setWishlist(new Set(JSON.parse(savedWishlist)));
    }
    
    // Load compare list from localStorage
    const savedCompareList = localStorage.getItem('user_compare');
    if (savedCompareList) {
      setCompareList(new Set(JSON.parse(savedCompareList)));
    }
  };

  const fetchProducts = async () => {
    try {
      // Priority 1: Check cache first for instant load
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isValid = Date.now() - timestamp < CACHE_DURATION;
        
        if (isValid) {
          setProducts(data);
          setFilteredProducts(data);
          setLoading(false);
          return; // Instant load từ cache
        }
      }

      // Priority 2: Fast API call with race condition handling
      setLoading(true);
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Race between API call and fallback timeout
      const apiCall = fetch(`${BACKEND_URL}/api/products`);
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 2000)
      );
      
      try {
        const response = await Promise.race([apiCall, timeout]);
        const data = await response.json();
        
        // Update cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        // Fallback to static products for instant display
        console.log('Using fallback products for speed');
        const staticProducts = getStaticProducts();
        setProducts(staticProducts);
        setFilteredProducts(staticProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      const staticProducts = getStaticProducts();
      setProducts(staticProducts);
      setFilteredProducts(staticProducts);
    } finally {
      setLoading(false);
    }
  };

  // Advanced filtering and sorting system
  useEffect(() => {
    setIsFilterAnimating(true);
    setTimeout(() => setIsFilterAnimating(false), 300);
    
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by material
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(product =>
        product.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      );
    }

    // Filter by search term with advanced search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.material.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const price = parsePrice(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedCategory, selectedMaterial, searchTerm, priceRange, selectedRating, sortBy]);

  const parsePrice = (priceStr) => {
    if (typeof priceStr === 'number') return priceStr;
    return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
  };

  const sortProducts = (productList, sortType) => {
    switch (sortType) {
      case 'price-low':
        return productList.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      case 'price-high':
        return productList.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      case 'rating':
        return productList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'name':
        return productList.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return productList.reverse();
      default: // featured
        return productList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
  };

  // Get unique categories from products
  const getCategories = () => {
    const categories = products.map(product => product.category);
    return ['all', ...new Set(categories)];
  };

  // Get unique materials from products
  const getMaterials = () => {
    const materials = products.map(product => product.material);
    return ['all', ...new Set(materials)];
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'all': 'Tất cả',
      'Vòng tay trầm': 'Vòng tay trầm',
      'Nhang nụ trầm': 'Nhang nụ',
      'Vòng tay cao cấp': 'Vòng tay cao cấp',
      'Tinh dầu trầm': 'Tinh dầu',
      'Cảnh trầm': 'Cảnh trầm',
      'Nhang tăm': 'Nhang tăm',
      'Phụ kiện xông trầm': 'Phụ kiện xông trầm'
    };
    return categoryNames[category] || category;
  };

  // Wishlist functions
  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist);
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
    } else {
      newWishlist.add(productId);
    }
    setWishlist(newWishlist);
    localStorage.setItem('user_wishlist', JSON.stringify([...newWishlist]));
  };

  // Compare functions
  const toggleCompare = (productId) => {
    const newCompareList = new Set(compareList);
    if (newCompareList.has(productId)) {
      newCompareList.delete(productId);
    } else if (newCompareList.size < 3) { // Max 3 products to compare
      newCompareList.add(productId);
    }
    setCompareList(newCompareList);
    localStorage.setItem('user_compare', JSON.stringify([...newCompareList]));
  };

  // Pagination
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getStaticProducts = () => [
    {
      id: '1',
      name: 'Vòng tay trầm hương tự nhiên cao cấp',
      description: 'Vòng tay trầm hương nguyên chất, mang lại sự bình an và may mắn, kết nối tinh thần và tăng cường năng lượng tích cực với hương thơm tự nhiên đặc trưng.',
      price: '1.500.000đ',
      originalPrice: '2.000.000đ',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      images: [
        'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
        'https://images.unsplash.com/photo-1581669808238-7f73311e2031?w=400',
        'https://images.unsplash.com/photo-1608393189376-5264bcca3582?w=400'
      ],
      category: 'Vòng tay trầm',
      material: 'Trầm hương tự nhiên',
      rating: 4.9,
      reviewCount: 245,
      inStock: true,
      isNew: false,
      isFeatured: true,
      discount: 25,
      sizes: ['16mm', '18mm', '20mm'],
      reviews: [
        { name: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất đẹp, hương thơm tự nhiên', date: '2024-12-15' },
        { name: 'Trần Thị B', rating: 5, comment: 'Chất lượng tốt, đúng như mô tả', date: '2024-12-10' }
      ],
      detail_description: 'Vòng tay trầm hương tự nhiên được chế tác từ gỗ trầm hương Việt Nam cao cấp. Sản phẩm có hương thơm nhẹ nhàng, mang lại cảm giác thư giãn và bình an cho người đeo.',
      features: ['100% tự nhiên', 'Hương thơm bền lâu', 'Tăng cường may mắn', 'Chống stress']
    },
    {
      id: '2',
      name: 'Nhang nụ trầm hương premium',
      description: 'Nhang nụ trầm hương cao cấp, cháy lâu và tỏa hương đều, tạo không gian thư giãn và thanh tịnh cho ngôi nhà của bạn.',
      price: '280.000đ',
      originalPrice: '350.000đ',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      images: [
        'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
        'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?w=400'
      ],
      category: 'Nhang nụ trầm',
      material: 'Trầm hương nguyên chất',
      rating: 4.9,
      reviewCount: 178,
      inStock: true,
      isNew: true,
      isFeatured: true,
      discount: 20,
      sizes: ['Hộp 50 nụ', 'Hộp 100 nụ'],
      reviews: [
        { name: 'Hoàng Văn E', rating: 5, comment: 'Nhang nụ chất lượng, hương thơm tự nhiên', date: '2024-12-12' }
      ],
      detail_description: 'Nhang nụ trầm hương được làm từ bột trầm hương nguyên chất, không chất phụ gia, tạo khói nhẹ và hương thơm dễ chịu.',
      features: ['Không phụ gia', 'Cháy đều lâu', 'Khói nhẹ', 'Hương thơm tự nhiên']
    },
    {
      id: '3',
      name: 'Vòng tay trầm hương chìm nước siêu cấp',
      description: 'Vòng tay trầm hương chìm nước cao cấp, hương thơm đặc trưng và bền lâu, phù hợp làm quà tặng sang trọng cho những dịp đặc biệt.',
      price: '12.000.000đ',
      originalPrice: '15.000.000đ',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85',
      images: [
        'https://images.unsplash.com/photo-1581669808238-7f73311e2031?w=400',
        'https://images.unsplash.com/photo-1608393189376-5264bcca3582?w=400'
      ],
      category: 'Vòng tay cao cấp',
      material: 'Trầm hương chìm nước',
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
      isNew: false,
      isFeatured: true,
      discount: 20,
      sizes: ['16mm', '18mm', '20mm', '22mm'],
      reviews: [
        { name: 'Lê Văn C', rating: 5, comment: 'Trầm chìm nước thật, hương rất thơm', date: '2024-12-08' },
        { name: 'Phạm Thị D', rating: 4, comment: 'Đắt nhưng xứng đáng với giá tiền', date: '2024-12-05' }
      ],
      detail_description: 'Vòng tay trầm hương chìm nước là loại trầm hương cao cấp nhất, có mật độ cao, chìm trong nước và tỏa hương đặc trưng khi đốt.',
      features: ['Chìm nước 100%', 'Mật độ cao', 'Hương đặc trưng', 'Giá trị đầu tư']
    },
    {
      id: '4',
      name: 'Tinh dầu trầm hương nguyên chất',
      description: 'Tinh dầu trầm hương nguyên chất 100%, dùng cho liệu pháp thư giãn và xông hương, mang lại hiệu quả thư giãn tinh thần tối ưu.',
      price: '5.500.000đ',
      originalPrice: '7.000.000đ',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85',
      images: [
        'https://images.unsplash.com/photo-1742474561321-10e657e125f4?w=400'
      ],
      category: 'Tinh dầu trầm',
      material: 'Tinh dầu nguyên chất',
      rating: 4.7,
      reviewCount: 156,
      inStock: true,
      isNew: false,
      isFeatured: false,
      discount: 21,
      sizes: ['5ml', '10ml', '20ml'],
      reviews: [
        { name: 'Vũ Thị F', rating: 5, comment: 'Tinh dầu thật 100%, rất thơm', date: '2024-12-07' }
      ],
      detail_description: 'Tinh dầu trầm hương được chưng cất từ gỗ trầm hương cao cấp, có tác dụng thư giãn tinh thần, giảm stress.',
      features: ['100% nguyên chất', 'Không pha trộn', 'Hiệu quả cao', 'An toàn sử dụng']
    },
    {
      id: '5',
      name: 'Cảnh trầm hương phong thủy cao cấp',
      description: 'Tác phẩm nghệ thuật từ trầm hương tự nhiên, dùng trang trí và phong thủy, mang lại may mắn và thịnh vượng cho gia đình.',
      price: '15.000.000đ',
      originalPrice: '18.000.000đ',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85',
      images: [
        'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?w=400'
      ],
      category: 'Cảnh trầm',
      material: 'Gỗ trầm hương nguyên khối',
      rating: 4.8,
      reviewCount: 67,
      inStock: true,
      isNew: true,
      isFeatured: false,
      discount: 17,
      sizes: ['Size S (10-15cm)', 'Size M (15-20cm)', 'Size L (20-30cm)'],
      reviews: [
        { name: 'Đỗ Văn G', rating: 5, comment: 'Cảnh trầm đẹp, thích hợp trang trí', date: '2024-12-06' }
      ],
      detail_description: 'Cảnh trầm hương được chế tác thủ công từ gỗ trầm hương tự nhiên, mang ý nghĩa phong thủy tốt lành.',
      features: ['Thủ công cao cấp', 'Phong thủy tốt', 'Trang trí đẹp', 'Giá trị nghệ thuật']
    },
    {
      id: '6',
      name: 'Nhang tăm trầm hương gia đình',
      description: 'Nhang tăm trầm hương thơm nhẹ, phù hợp đốt hàng ngày trong gia đình và nơi thờ cúng, mang lại không gian thanh tịnh.',
      price: '350.000đ',
      originalPrice: '420.000đ',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
      images: [
        'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?w=400'
      ],
      category: 'Nhang tăm',
      material: 'Trầm hương tự nhiên',
      rating: 4.6,
      reviewCount: 201,
      inStock: true,
      isNew: false,
      isFeatured: false,
      discount: 16,
      sizes: ['Hộp 100 que', 'Hộp 200 que'],
      reviews: [
        { name: 'Bùi Thị H', rating: 4, comment: 'Nhang tăm dễ sử dụng, hương nhẹ nhàng', date: '2024-12-04' }
      ],
      detail_description: 'Nhang tăm trầm hương được làm từ bột trầm hương pha trộn với chất liệu tự nhiên, tạo hương thơm dễ chịu.',
      features: ['Hương nhẹ nhàng', 'Dễ sử dụng', 'Cháy đều', 'Giá cả hợp lý']
    },
    {
      id: '7',
      name: 'Vòng tay trầm hương bọc vàng 24k',
      description: 'Vòng tay trầm hương kết hợp với vàng 24k, sang trọng và đẳng cấp, phù hợp làm quà tặng cho những dịp quan trọng.',
      price: '25.000.000đ',
      originalPrice: '30.000.000đ',
      image: 'https://images.unsplash.com/photo-1608393189376-5264bcca3582?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHZ2aWV0bmFtZXNlJTIwYWdhcndvb2R8ZW58MHx8fHwxNzUxNDI5ODg0fDA&ixlib=rb-4.1.0&q=85',
      images: [
        'https://images.unsplash.com/photo-1608393189376-5264bcca3582?w=400'
      ],
      category: 'Vòng tay cao cấp',
      material: 'Trầm hương + Vàng 24k',
      rating: 4.7,
      reviewCount: 34,
      inStock: true,
      isNew: false,
      isFeatured: true,
      discount: 17,
      sizes: ['16mm', '18mm', '20mm'],
      reviews: [
        { name: 'Trương Văn I', rating: 5, comment: 'Sản phẩm cao cấp, rất đẹp và sang trọng', date: '2024-12-02' }
      ],
      detail_description: 'Vòng tay trầm hương bọc vàng 24k là sự kết hợp hoàn hảo giữa trầm hương và vàng, tạo nên sản phẩm đẳng cấp.',
      features: ['Vàng 24k thật', 'Thiết kế độc đáo', 'Đẳng cấp luxury', 'Tăng giá trị theo thời gian']
    },
    {
      id: '8',
      name: 'Bộ phụ kiện xông trầm professional',
      description: 'Bộ phụ kiện xông trầm hoàn chỉnh, bao gồm lư xông, kẹp trầm và phụ kiện cần thiết cho trải nghiệm xông trầm hoàn hảo.',
      price: '3.200.000đ',
      originalPrice: '4.000.000đ',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      images: [
        'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg'
      ],
      category: 'Phụ kiện xông trầm',
      material: 'Gốm sứ cao cấp',
      rating: 4.9,
      reviewCount: 112,
      inStock: true,
      isNew: true,
      isFeatured: false,
      discount: 20,
      sizes: ['Bộ cơ bản', 'Bộ cao cấp', 'Bộ VIP'],
      reviews: [
        { name: 'Ngô Thị J', rating: 5, comment: 'Bộ phụ kiện đầy đủ, chất lượng tốt', date: '2024-12-01' }
      ],
      detail_description: 'Bộ phụ kiện xông trầm gồm lư xông gốm sứ, kẹp gỗ, đế xông và các phụ kiện cần thiết để xông trầm hương.',
      features: ['Bộ đầy đủ', 'Chất liệu cao cấp', 'Dễ sử dụng', 'Bền lâu']
    }
  ];

  const { visibleItems, setRef } = useStaggerAnimation(paginatedProducts, 100);

  // Enhanced Quick View Modal
  const QuickViewModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Enhanced Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        ></div>
        
        {/* Modal Content */}
        <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/50">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300"
          >
            <CloseIcon className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1).map((img, index) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <img src={img} alt="" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              {/* Product Title & Rating */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">Mới</span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-medium">Nổi bật</span>
                  )}
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviewCount || 0} đánh giá)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Đặc điểm nổi bật:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Material & Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Chất liệu:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{product.material}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Danh mục:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{product.category}</p>
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && (
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Kích thước:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full text-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => onProductClick(product)}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Chi tiết đầy đủ
                </button>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    wishlist.has(product.id)
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-red-100 hover:text-red-600'
                  }`}
                >
                  <svg className="w-6 h-6" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="products" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 dark:from-slate-900 dark:via-gray-900 dark:to-orange-900/20 relative overflow-hidden">
      
      {/* Ultra-Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic Background Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 dark:from-orange-800/10 dark:to-amber-800/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-luxury-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 dark:from-amber-800/10 dark:to-orange-800/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-luxury-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-orange-300/20 to-amber-300/20 dark:from-orange-700/10 dark:to-amber-700/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 animate-luxury-float" style={{animationDelay: '4s'}}></div>
        
        {/* Luxury Geometric Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-amber-400/20 rotate-45 animate-spin-luxury"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-orange-400/15 rotate-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-3 lg:px-6 py-6 lg:py-12 relative z-10">
        
        {/* Enhanced Luxury Header */}
        <div className="text-center mb-6 lg:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 dark:from-orange-600 dark:via-amber-600 dark:to-orange-700 rounded-2xl lg:rounded-3xl shadow-xl mb-4 lg:mb-6 animate-premium-pulse">
            <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <h1 className="text-2xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-amber-700 to-orange-600 dark:from-white dark:via-amber-300 dark:to-orange-400 bg-clip-text text-transparent mb-3 lg:mb-4 animate-text-glow">
            Bộ Sưu Tập Trầm Hương
          </h1>
          <p className="text-sm lg:text-lg xl:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Khám phá những sản phẩm trầm hương cao cấp được tuyển chọn kỹ lưỡng, mang đến trải nghiệm thư giãn và tinh tế nhất với chất lượng luxury đỉnh cao.
          </p>
        </div>

        {/* Ultra-Modern Search & Filter Bar */}
        <div className="max-w-6xl mx-auto mb-6 lg:mb-8">
          <div className="glass-morphism-luxury rounded-2xl lg:rounded-3xl p-4 lg:p-6 border border-white/20 dark:border-gray-700/30 shadow-xl">
            
            {/* Main Search Bar */}
            <div className="relative group mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-xl lg:rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-xl lg:rounded-2xl shadow-lg">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm trầm hương yêu thích..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-transparent text-slate-700 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm lg:text-base font-medium"
                />
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <CloseIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filter Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              
              {/* View Mode Toggle */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 rounded-xl p-1 border border-white/30 dark:border-gray-700/50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <svg className="w-4 h-4 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="lg:col-span-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full py-3 px-4 bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/50 rounded-xl text-sm font-medium text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-sm"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                  <option value="name">Tên A-Z</option>
                  <option value="newest">Mới nhất</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div className="lg:col-span-1">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(Number(e.target.value))}
                  className="w-full py-3 px-4 bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/50 rounded-xl text-sm font-medium text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 backdrop-blur-sm"
                >
                  <option value={0}>Tất cả đánh giá</option>
                  <option value={4.5}>4.5★ trở lên</option>
                  <option value={4}>4★ trở lên</option>
                  <option value={3.5}>3.5★ trở lên</option>
                </select>
              </div>

              {/* Advanced Filters Toggle */}
              <div className="lg:col-span-1">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    <span>Bộ lọc</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white/40 dark:bg-gray-800/40 rounded-xl border border-white/20 dark:border-gray-700/30 backdrop-blur-sm animate-slide-down">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Danh mục</label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {getCategories().map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category}
                            checked={selectedCategory === category}
                            onChange={() => setSelectedCategory(category)}
                            className="text-amber-500 focus:ring-amber-500"
                          />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {getCategoryDisplayName(category)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Material Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Chất liệu</label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="w-full py-2 px-3 bg-white/60 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/50 rounded-lg text-sm text-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="all">Tất cả chất liệu</option>
                      {getMaterials().slice(1).map((material) => (
                        <option key={material} value={material}>{material}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Slider */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Khoảng giá: {new Intl.NumberFormat('vi-VN').format(priceRange[0])}đ - {new Intl.NumberFormat('vi-VN').format(priceRange[1])}đ
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="30000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-amber"
                      />
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedMaterial('all');
                      setSelectedRating(0);
                      setPriceRange([0, 30000000]);
                      setSearchTerm('');
                      setSortBy('featured');
                    }}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {filteredProducts.length} sản phẩm được tìm thấy
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats & Actions Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 lg:mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="inline-flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/40 dark:border-gray-700/40">
              <span className="text-sm lg:text-base text-slate-600 dark:text-slate-400">
                Hiển thị <span className="font-semibold text-orange-600 dark:text-orange-400">{paginatedProducts.length}</span> 
                / <span className="font-semibold text-amber-600 dark:text-amber-400">{filteredProducts.length}</span> sản phẩm
              </span>
            </div>
            
            {/* Wishlist & Compare Indicators */}
            <div className="flex items-center space-x-2">
              {wishlist.size > 0 && (
                <div className="inline-flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span>{wishlist.size}</span>
                </div>
              )}
              {compareList.size > 0 && (
                <div className="inline-flex items-center space-x-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{compareList.size}/3</span>
                </div>
              )}
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-2">
            {searchTerm && (
              <span className="text-xs lg:text-sm text-slate-500 dark:text-slate-500 bg-white/40 dark:bg-gray-800/40 px-3 py-1 rounded-full">
                cho "{searchTerm}"
              </span>
            )}
          </div>
        </div>

        {/* Ultra-Modern Loading State with Luxury Animation */}
        {loading ? (
          <div className={`grid gap-3 lg:gap-6 transition-all duration-500 ${
            viewMode === 'grid' 
              ? 'grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="group">
                <div className="glass-morphism-luxury rounded-3xl shadow-xl overflow-hidden animate-pulse border border-white/20 dark:border-gray-700/30">
                  {/* Enhanced Image Skeleton */}
                  <div className="relative">
                    <div className="w-full h-40 lg:h-56 bg-gradient-to-br from-slate-200 via-amber-100 to-orange-200 dark:from-slate-700 dark:via-amber-900/30 dark:to-orange-900/30 animate-shimmer"></div>
                    {/* Floating badges skeleton */}
                    <div className="absolute top-3 left-3 w-16 h-6 bg-amber-300/50 rounded-full animate-pulse"></div>
                    <div className="absolute top-3 right-3 w-12 h-6 bg-orange-300/50 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="p-3 lg:p-4 space-y-3">
                    {/* Title skeleton with stagger */}
                    <div 
                      className="h-4 lg:h-5 bg-gradient-to-r from-slate-200 to-amber-200 dark:from-slate-700 dark:to-amber-800 rounded-lg animate-pulse"
                      style={{ animationDelay: `${index * 100}ms` }}
                    ></div>
                    
                    {/* Description skeleton */}
                    <div className="space-y-2">
                      <div 
                        className="h-3 lg:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full animate-pulse"
                        style={{ animationDelay: `${index * 100 + 50}ms` }}
                      ></div>
                      <div 
                        className="h-3 lg:h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 100}ms` }}
                      ></div>
                    </div>
                    
                    {/* Price and CTA skeleton */}
                    <div className="flex items-center justify-between pt-2">
                      <div 
                        className="h-6 lg:h-8 bg-gradient-to-r from-amber-300 to-orange-300 dark:from-amber-700 dark:to-orange-700 rounded-lg w-1/3 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 150}ms` }}
                      ></div>
                      <div 
                        className="h-8 lg:h-10 bg-slate-200 dark:bg-slate-700 rounded-full w-16 lg:w-24 animate-pulse"
                        style={{ animationDelay: `${index * 100 + 200}ms` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Loading progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-loading-progress"
                      style={{ animationDelay: `${index * 200}ms` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          /* Enhanced No Results State with Better UX */
          <div className="text-center py-12 lg:py-20">
            <div className="glass-morphism-luxury rounded-3xl p-8 lg:p-12 max-w-md mx-auto border border-white/20 dark:border-gray-700/30 shadow-xl">
              {/* Enhanced empty state icon with animation */}
              <div className="relative mx-auto w-20 h-20 lg:w-24 lg:h-24 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-amber-100 dark:from-slate-700 dark:to-amber-800 rounded-full animate-luxury-float"></div>
                <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 lg:w-12 lg:h-12 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 005.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                {/* Floating decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-40"></div>
              </div>
              
              <h3 className="text-lg lg:text-2xl font-bold text-slate-800 dark:text-white mb-3">
                Không tìm thấy sản phẩm
              </h3>
              <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {searchTerm 
                  ? `Không có sản phẩm nào phù hợp với "${searchTerm}". Hãy thử từ khóa khác hoặc điều chỉnh bộ lọc.`
                  : 'Không có sản phẩm nào trong danh mục này. Hãy thử thay đổi bộ lọc.'
                }
              </p>
              
              {/* Enhanced action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedMaterial('all');
                    setSelectedRating(0);
                    setPriceRange([0, 30000000]);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Xem tất cả sản phẩm</span>
                  </span>
                </button>
                
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="w-full bg-white/60 dark:bg-gray-800/60 text-slate-700 dark:text-white py-2 px-4 rounded-xl font-medium hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 border border-white/30 dark:border-gray-700/50"
                  >
                    Xóa từ khóa tìm kiếm
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Ultra-Modern Product Grid/List View */}
            <div className={`grid gap-3 lg:gap-6 transition-all duration-500 ${
              isFilterAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            } ${viewMode === 'grid' 
              ? 'grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {paginatedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  ref={setRef(index)}
                  className={`group cursor-pointer transition-all duration-700 h-full ${
                    visibleItems.has(index) ? 'animate-cinematic-entrance opacity-100' : 'opacity-0'
                  } ${viewMode === 'list' ? 'transform hover:scale-[1.01]' : 'transform hover:scale-[1.02] lg:hover:scale-105'}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => onProductClick(product)}
                >
                  {/* Ultra-Luxury Product Card */}
                  <div className={`relative glass-morphism-luxury border border-white/40 dark:border-gray-700/40 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-700 h-full ${
                    viewMode === 'list' 
                      ? 'flex hover:-translate-y-1' 
                      : 'flex flex-col hover:-translate-y-2'
                  } group-hover:border-amber-400/50 dark:group-hover:border-amber-600/50`}>
                    
                    {/* Enhanced Image Container */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' 
                        ? 'w-48 lg:w-64 flex-shrink-0' 
                        : 'w-full aspect-square lg:aspect-[4/5]'
                    } rounded-t-3xl ${viewMode === 'list' ? 'lg:rounded-l-3xl lg:rounded-t-none' : ''}`}>
                      
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      
                      {/* Premium Gradient Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent"></div>
                      
                      {/* Enhanced Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {product.isNew && (
                          <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse">
                            Mới
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                            Nổi bật
                          </span>
                        )}
                        {product.discount && (
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                      
                      {/* Enhanced Rating Badge */}
                      <div className="absolute top-3 right-3">
                        <div className="glass-morphism-luxury px-2 py-1 rounded-full shadow-md flex items-center space-x-1 border border-white/30">
                          <span className="text-amber-400 text-xs">★</span>
                          <span className="text-xs font-bold text-white">{product.rating}</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Quick Action Buttons */}
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 space-y-2">
                        {/* Quick View Button */}
                        <button 
                          className="block w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setQuickViewProduct(product);
                          }}
                          title="Xem nhanh"
                        >
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        {/* Wishlist Button */}
                        <button 
                          className={`block w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                            wishlist.has(product.id)
                              ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                              : 'bg-white/90 text-gray-600 hover:bg-red-100 hover:text-red-600'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product.id);
                          }}
                          title={wishlist.has(product.id) ? 'Bỏ yêu thích' : 'Thêm yêu thích'}
                        >
                          <svg className="w-5 h-5 mx-auto" fill={wishlist.has(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        
                        {/* Compare Button */}
                        <button 
                          className={`block w-10 h-10 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/20 ${
                            compareList.has(product.id)
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                              : 'bg-white/90 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                          } ${compareList.size >= 3 && !compareList.has(product.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (compareList.size < 3 || compareList.has(product.id)) {
                              toggleCompare(product.id);
                            }
                          }}
                          title={compareList.has(product.id) ? 'Bỏ so sánh' : 'Thêm so sánh'}
                          disabled={compareList.size >= 3 && !compareList.has(product.id)}
                        >
                          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Enhanced Content Area */}
                    <div className={`p-3 lg:p-5 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-between' : ''}`}>
                      
                      {/* Product Header */}
                      <div className="flex-1">
                        <h3 className={`font-bold text-slate-800 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 leading-tight ${
                          viewMode === 'list' 
                            ? 'text-lg lg:text-xl line-clamp-2' 
                            : 'text-sm lg:text-lg line-clamp-2'
                        }`}>
                          {product.name}
                        </h3>
                        
                        {/* Description - More prominent in list view */}
                        <p className={`text-slate-600 dark:text-slate-300 mb-3 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300 ${
                          viewMode === 'list' 
                            ? 'text-sm lg:text-base line-clamp-3' 
                            : 'text-xs lg:text-sm line-clamp-2 lg:block hidden'
                        }`}>
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Enhanced Meta Information */}
                      <div className="space-y-3">
                        
                        {/* Category & Material Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
                            <span className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 truncate">
                              {product.material.length > 20 ? product.material.substring(0, 20) + '...' : product.material}
                            </span>
                          </div>
                          
                          {/* Enhanced Review Count */}
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400 text-xs">★</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                        </div>
                        
                        {/* Features Preview (List view only) */}
                        {viewMode === 'list' && product.features && (
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 3).map((feature, idx) => (
                              <span key={idx} className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full text-xs">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Enhanced Price Section */}
                        <div className={`flex items-center justify-between ${viewMode === 'list' ? 'pt-2' : ''}`}>
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-2">
                              <span className={`font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent ${
                                viewMode === 'list' ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                              }`}>
                                {product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-slate-500 line-through">
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {product.sizes ? `${product.sizes.length} size` : 'Giá tốt nhất'}
                              </span>
                              {product.inStock ? (
                                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Còn hàng</span>
                              ) : (
                                <span className="text-xs text-red-600 dark:text-red-400 font-medium">Hết hàng</span>
                              )}
                            </div>
                          </div>
                          
                          {/* Enhanced CTA Button */}
                          <button 
                            className={`bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-amber-600 ${
                              viewMode === 'list' 
                                ? 'px-6 py-3 text-sm lg:text-base' 
                                : 'px-3 py-2 lg:px-5 lg:py-2.5 text-xs lg:text-sm'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onProductClick(product);
                            }}
                          >
                            {viewMode === 'list' ? 'Xem chi tiết' : 'Xem'}
                          </button>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress Indicator */}
                      <div className="mt-3 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 lg:mt-16 space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 glass-morphism-luxury rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 dark:border-gray-700/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  const isNearCurrent = Math.abs(page - currentPage) <= 2;
                  const isFirstOrLast = page === 1 || page === totalPages;
                  
                  if (!isNearCurrent && !isFirstOrLast) {
                    if (page === currentPage - 3 || page === currentPage + 3) {
                      return <span key={page} className="text-slate-400">...</span>;
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg transform scale-110'
                          : 'glass-morphism-luxury text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 border border-white/20 dark:border-gray-700/30'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 glass-morphism-luxury rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 dark:border-gray-700/30"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

        {/* Enhanced CTA Section with Advanced Features */}
        <div className="text-center mt-12 lg:mt-20">
          <div className="glass-morphism-luxury rounded-3xl px-8 py-8 lg:py-12 shadow-xl border border-white/20 dark:border-gray-700/30 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
              
              {/* Premium Features */}
              <div className="lg:col-span-2 text-left">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white mb-1">
                      Khám phá bộ sưu tập hoàn chỉnh
                    </h3>
                    <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400">
                      Hơn {products.length} sản phẩm trầm hương cao cấp từ khắp Việt Nam
                    </p>
                  </div>
                </div>
                
                {/* Premium Benefits */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Miễn phí vận chuyển</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Chất lượng đảm bảo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Tư vấn chuyên nghiệp</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-600 dark:text-slate-400">Uy tín 10+ năm</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchTerm('');
                    setCurrentPage(1);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 px-6 rounded-2xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Xem tất cả sản phẩm
                </button>
                
                {(wishlist.size > 0 || compareList.size > 0) && (
                  <div className="flex space-x-2">
                    {wishlist.size > 0 && (
                      <button className="flex-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 py-2 px-4 rounded-xl font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300">
                        Yêu thích ({wishlist.size})
                      </button>
                    )}
                    {compareList.size > 0 && (
                      <button className="flex-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 py-2 px-4 rounded-xl font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300">
                        So sánh ({compareList.size})
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </div>
    </section>
  );
};

// Contact Section Component
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success notification
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  // Success notification component
  const SuccessNotification = () => (
    <div className={`fixed top-20 right-4 left-4 sm:left-auto sm:right-4 z-50 transition-all duration-700 transform ${
      showSuccess ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-2xl shadow-2xl max-w-md mx-auto border border-green-400/30 backdrop-blur-md">
        <div className="flex items-start space-x-3 sm:space-x-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-base sm:text-lg mb-1">Gửi thành công!</h4>
            <p className="text-green-100 leading-relaxed text-sm sm:text-base">
              Cảm ơn bạn đã liên hệ với <strong>Sơn Mộc Hương</strong>. 
              Chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Phản hồi trong 24h</span>
              </div>
              <div className="flex items-center space-x-1">
                <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Hotline: 0762 222 448</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowSuccess(false)}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white/80 hover:text-white transition-colors duration-200"
        >
          <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SuccessNotification />
      <section id="contact" className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-36 sm:h-36 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          
          {/* Floating particles */}
          <div className="absolute top-10 left-10 w-1 h-1 bg-amber-400/30 rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-purple-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          
          {/* Gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.4),transparent_70%)]"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-block mb-4 sm:mb-6 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-full border border-amber-500/30 backdrop-blur-sm">
              <span className="text-amber-400 text-sm sm:text-base font-medium">✨ Liên hệ với chúng tôi</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              Kết nối với
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 animate-gradient">
                Sơn Mộc Hương
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4">
              Đội ngũ chuyên gia với <strong className="text-amber-400">hơn 10 năm kinh nghiệm</strong> sẵn sàng tư vấn 
              và hỗ trợ bạn chọn lựa sản phẩm trầm hương chất lượng cao nhất.
            </p>
          </div>

          {/* Modern Layout - Mobile First */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
            {/* Contact Information - Mobile Optimized */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-6">
              {/* Quick Contact Card - Compact Mobile */}
              <div className="group bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-amber-800/20 backdrop-blur-md border border-amber-600/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:border-amber-500/50">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white flex items-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    Liên hệ nhanh
                  </h3>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <a href="tel:0762222448" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl sm:rounded-2xl hover:from-white/10 hover:to-white/20 transition-all duration-300 group/item border border-white/5 hover:border-white/20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg group-hover/item:shadow-2xl transition-all duration-300 group-hover/item:scale-110">
                      <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs sm:text-sm">Hotline</p>
                      <p className="text-white font-bold text-sm sm:text-base lg:text-lg">0762 222 448</p>
                      <p className="text-amber-400 text-xs sm:text-sm">24/7 hỗ trợ khách hàng</p>
                    </div>
                  </a>

                  <a href="mailto:sonmochuong@gmail.com" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl sm:rounded-2xl hover:from-white/10 hover:to-white/20 transition-all duration-300 group/item border border-white/5 hover:border-white/20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover/item:shadow-2xl transition-all duration-300 group-hover/item:scale-110">
                      <EmailIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs sm:text-sm">Email</p>
                      <p className="text-white font-bold text-sm sm:text-base break-all">sonmochuong@gmail.com</p>
                      <p className="text-blue-400 text-xs sm:text-sm">Phản hồi trong 24h</p>
                    </div>
                  </a>

                  <a href="https://wa.me/84762222448" className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl sm:rounded-2xl hover:from-white/10 hover:to-white/20 transition-all duration-300 group/item border border-white/5 hover:border-white/20">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover/item:shadow-2xl transition-all duration-300 group-hover/item:scale-110">
                      <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs sm:text-sm">WhatsApp</p>
                      <p className="text-white font-bold text-sm sm:text-base">+84 762 222 448</p>
                      <p className="text-green-400 text-xs sm:text-sm">Chat trực tiếp</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Location Card - Compact */}
              <div className="group bg-gradient-to-br from-purple-900/20 via-indigo-900/20 to-purple-800/20 backdrop-blur-md border border-purple-600/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/50">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <LocationIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  Showroom
                </h3>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl sm:rounded-2xl border border-white/5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapsIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm sm:text-base leading-relaxed">
                        3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                        <p className="text-purple-400 text-xs sm:text-sm">Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                    <MapsIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Xem bản đồ</span>
                  </button>
                </div>
              </div>

              {/* Social Media Card - Compact Grid */}
              <div className="group bg-gradient-to-br from-slate-900/40 via-gray-900/40 to-slate-800/40 backdrop-blur-md border border-slate-600/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:border-slate-500/50">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <SupportAgentIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  Mạng xã hội
                </h3>
                
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 sm:gap-3">
                  <a href="#" className="group/social bg-blue-600 hover:bg-blue-700 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">Facebook</p>
                  </a>
                  
                  <a href="#" className="group/social bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">Instagram</p>
                  </a>
                  
                  <a href="#" className="group/social bg-red-600 hover:bg-red-700 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <YouTubeIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">YouTube</p>
                  </a>
                  
                  <a href="#" className="group/social bg-blue-500 hover:bg-blue-600 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <ZaloIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">Zalo</p>
                  </a>
                  
                  <a href="#" className="group/social bg-green-600 hover:bg-green-700 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">WhatsApp</p>
                  </a>
                  
                  <a href="#" className="group/social bg-blue-400 hover:bg-blue-500 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                    <TelegramIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white mx-auto" />
                    <p className="text-white text-xs text-center mt-1 opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 hidden sm:block">Telegram</p>
                  </a>
                </div>
                
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-600/30">
                  <p className="text-center text-slate-300 text-xs sm:text-sm">
                    Theo dõi để nhận tin tức mới nhất
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form - Enhanced Mobile */}
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-white/30">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white flex items-center">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                      <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <span className="hidden sm:inline">Gửi tin nhắn cho chúng tôi</span>
                    <span className="sm:hidden">Gửi tin nhắn</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs sm:text-sm font-medium">Online</span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="relative">
                      <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                        focusedField === 'name' || formData.name 
                          ? 'top-2 text-xs text-amber-400 bg-slate-800/80 px-2 rounded' 
                          : 'top-3 text-sm text-gray-400'
                      }`}>
                        Họ và tên *
                      </label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 hover:bg-white/10"
                      />
                    </div>
                    <div className="relative">
                      <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                        focusedField === 'phone' || formData.phone 
                          ? 'top-2 text-xs text-amber-400 bg-slate-800/80 px-2 rounded' 
                          : 'top-3 text-sm text-gray-400'
                      }`}>
                        Số điện thoại *
                      </label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 hover:bg-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="relative">
                      <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email 
                          ? 'top-2 text-xs text-amber-400 bg-slate-800/80 px-2 rounded' 
                          : 'top-3 text-sm text-gray-400'
                      }`}>
                        Email *
                      </label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 hover:bg-white/10"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-white text-sm font-semibold mb-2">
                        Chủ đề
                      </label>
                      <div className="relative">
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 sm:px-4 sm:py-4 pr-8 sm:pr-10 bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 appearance-none cursor-pointer hover:bg-white/10"
                          style={{
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            colorScheme: 'dark'
                          }}
                        >
                          <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>Chọn chủ đề</option>
                          <option value="product-inquiry" style={{ backgroundColor: '#1f2937', color: 'white' }}>Tư vấn sản phẩm</option>
                          <option value="order-support" style={{ backgroundColor: '#1f2937', color: 'white' }}>Hỗ trợ đặt hàng</option>
                          <option value="wholesale" style={{ backgroundColor: '#1f2937', color: 'white' }}>Mua sỉ</option>
                          <option value="partnership" style={{ backgroundColor: '#1f2937', color: 'white' }}>Hợp tác kinh doanh</option>
                          <option value="other" style={{ backgroundColor: '#1f2937', color: 'white' }}>Khác</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <label className={`absolute left-3 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message 
                        ? 'top-2 text-xs text-amber-400 bg-slate-800/80 px-2 rounded' 
                        : 'top-3 text-sm text-gray-400'
                    }`}>
                      Tin nhắn *
                    </label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="4"
                      className="w-full px-3 py-3 sm:px-4 sm:py-4 bg-white/5 border border-white/20 rounded-xl sm:rounded-2xl focus:outline-none focus:border-amber-400 focus:bg-white/10 text-white transition-all duration-300 resize-none hover:bg-white/10"
                    ></textarea>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input 
                      type="checkbox" 
                      id="privacy"
                      required
                      className="mt-1 w-4 h-4 text-amber-600 bg-white/10 border-white/20 rounded focus:ring-amber-400 focus:ring-2"
                    />
                    <label htmlFor="privacy" className="text-gray-300 text-sm leading-relaxed">
                      Tôi đồng ý với việc xử lý thông tin cá nhân theo 
                      <a href="#" className="text-amber-400 hover:text-amber-300 ml-1 underline">Chính sách bảo mật</a>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Đang gửi...</span>
                      </>
                    ) : (
                      <>
                        <EmailIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Gửi tin nhắn</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                    <div className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-white/5 rounded-xl">
                      <ShieldIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">Bảo mật thông tin</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-white/5 rounded-xl">
                      <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">Phản hồi nhanh</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 p-2 sm:p-3 bg-white/5 rounded-xl">
                      <SupportAgentIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">Tư vấn chuyên nghiệp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action - Mobile Optimized */}
          <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
            <div className="bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-amber-600/20 backdrop-blur-lg border border-amber-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto shadow-2xl">
              <div className="mb-4 sm:mb-6">
                <div className="inline-block px-3 py-1 bg-amber-500/20 rounded-full border border-amber-400/30 mb-3 sm:mb-4">
                  <span className="text-amber-400 text-xs sm:text-sm font-medium">🚀 Hỗ trợ tức thì</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                  Cần tư vấn ngay lập tức?
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
                  Kết nối với chuyên gia của chúng tôi để được tư vấn chi tiết về sản phẩm trầm hương!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a 
                  href="tel:0762222448"
                  className="group bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold flex items-center justify-center space-x-2"
                >
                  <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                  <span className="text-sm sm:text-base">Gọi ngay: 0762 222 448</span>
                </a>
                <a 
                  href="https://wa.me/84762222448"
                  className="group bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] font-semibold flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                  <span className="text-sm sm:text-base">Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Modern Footer Component - Elegant, Sophisticated & Responsive
export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden transition-all duration-500 pb-0">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
        
        {/* Subtle geometric patterns */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-amber-900/10 to-orange-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-orange-900/10 to-yellow-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-amber-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-orange-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-yellow-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 py-4 md:py-6 m-0">
        
        {/* Top Section - Mobile optimized layout */}
        <div className="space-y-6">
          
          {/* Mobile: Brand Section - Always visible */}
          <div className="lg:hidden">
            <div className="group text-center">
              {/* Logo */}
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <span className="text-white font-bold text-base">SMH</span>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                    Sơn Mộc Hương
                  </h3>
                  <p className="text-xs text-gray-400 group-hover:text-amber-200 transition-colors duration-300">
                    Trầm hương cao cấp
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-sm text-gray-300 dark:text-gray-200 mb-4 leading-relaxed transition-colors duration-300 px-4">
                Địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao từ thiên nhiên Việt Nam.
              </p>
              
              {/* Enhanced Social Media */}
              <div className="flex justify-center gap-3 mb-6">
                <a href="#" className="group relative w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <FacebookIcon className="w-4 h-4 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-9 h-9 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <InstagramIcon className="w-4 h-4 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-9 h-9 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <YouTubeIcon className="w-4 h-4 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <ZaloIcon className="w-4 h-4 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: Products and Services - 2 columns */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {/* Products Section */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <ShoppingBagIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Sản phẩm</h4>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Vòng tay trầm hương',
                  'Nhang trầm hương', 
                  'Nụ trầm hương',
                  'Tinh dầu trầm',
                  'Cảnh trầm phong thủy'
                ].map((item, index) => (
                  <li key={index}>
                    <Link to="/products" className="group text-xs text-gray-300 dark:text-gray-200 hover:text-amber-300 dark:hover:text-amber-300 transition-all duration-300 flex items-center space-x-2 hover:translate-x-1">
                      <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <ShieldIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Dịch vụ</h4>
              </div>
              <ul className="space-y-1.5">
                {[
                  'Tư vấn chọn sản phẩm',
                  'Miễn phí ship từ 300k',
                  'Cam kết chất lượng',
                  'Hỗ trợ 24/7'
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="group text-xs text-gray-300 dark:text-gray-200 hover:text-amber-300 dark:hover:text-amber-300 transition-all duration-300 flex items-center space-x-2 hover:translate-x-1">
                      <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile: Contact Section */}
          <div className="lg:hidden">
            <div className="group">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <PhoneIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Liên hệ</h4>
              </div>
              <div className="space-y-3">
                
                <div className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                      <LocationIcon className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-xs text-gray-300 dark:text-gray-200 leading-relaxed group-hover/item:text-white transition-colors duration-300">
                      3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <a href="tel:0762222448" className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <PhoneIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300 font-medium">0762 222 448</span>
                    </div>
                  </a>
                  
                  <a href="mailto:sonmochuong@gmail.com" className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <EmailIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300">sonmochuong@gmail.com</span>
                    </div>
                  </a>
                  
                  <div className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <ClockIcon className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300">Thứ 2 - CN: 8:00 - 20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 4 columns */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            
            {/* Brand Section - Desktop */}
            <div className="group">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3">
                    <span className="text-white font-bold text-xl">SMH</span>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                    Sơn Mộc Hương
                  </h3>
                  <p className="text-xs text-gray-400 group-hover:text-amber-200 transition-colors duration-300">
                    Trầm hương cao cấp
                  </p>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-base text-gray-300 dark:text-gray-200 mb-6 leading-relaxed transition-colors duration-300">
                Địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao từ thiên nhiên Việt Nam.
              </p>
              
              {/* Enhanced Social Media */}
              <div className="flex flex-wrap gap-3">
                <a href="#" className="group relative w-11 h-11 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <FacebookIcon className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-11 h-11 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:from-purple-400 hover:via-pink-400 hover:to-red-400 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <InstagramIcon className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-400/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-11 h-11 bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <YouTubeIcon className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                
                <a href="#" className="group relative w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <ZaloIcon className="w-5 h-5 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>

            {/* Products Section - Desktop */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <ShoppingBagIcon className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Sản phẩm</h4>
              </div>
              <ul className="space-y-3">
                {[
                  'Vòng tay trầm hương',
                  'Nhang trầm hương', 
                  'Nụ trầm hương',
                  'Tinh dầu trầm',
                  'Cảnh trầm phong thủy'
                ].map((item, index) => (
                  <li key={index}>
                    <Link to="/products" className="group text-base text-gray-300 dark:text-gray-200 hover:text-amber-300 dark:hover:text-amber-300 transition-all duration-300 flex items-center space-x-2 hover:translate-x-1">
                      <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Section - Desktop */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <ShieldIcon className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Dịch vụ</h4>
              </div>
              <ul className="space-y-3">
                {[
                  'Tư vấn chọn sản phẩm',
                  'Miễn phí ship từ 300k',
                  'Cam kết chất lượng',
                  'Hỗ trợ 24/7'
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="group text-base text-gray-300 dark:text-gray-200 hover:text-amber-300 dark:hover:text-amber-300 transition-all duration-300 flex items-center space-x-2 hover:translate-x-1">
                      <div className="w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section - Desktop */}
            <div className="group">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <PhoneIcon className="w-3 h-3 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors duration-300">Liên hệ</h4>
              </div>
              <div className="space-y-4">
                
                <div className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                      <LocationIcon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm text-gray-300 dark:text-gray-200 leading-relaxed group-hover/item:text-white transition-colors duration-300">
                      3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <a href="tel:0762222448" className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <PhoneIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300 font-medium">0762 222 448</span>
                    </div>
                  </a>
                  
                  <a href="mailto:sonmochuong@gmail.com" className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <EmailIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300">sonmochuong@gmail.com</span>
                    </div>
                  </a>
                  
                  <div className="group/item bg-white/5 dark:bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/10 dark:hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-amber-400/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                        <ClockIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-gray-300 dark:text-gray-200 group-hover/item:text-white transition-colors duration-300">Thứ 2 - CN: 8:00 - 20:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className="relative mt-4 md:mt-6 pt-4 md:pt-6">
          {/* Gradient divider */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 dark:text-gray-300 transition-colors duration-300">
                © 2025 <span className="text-amber-400 font-medium">Sơn Mộc Hương</span>. Tất cả quyền được bảo lưu.
              </p>
            </div>
            
            {/* Policy Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              {[
                'Chính sách bảo mật',
                'Điều khoản sử dụng', 
                'Liên hệ'
              ].map((item, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="group text-sm text-gray-400 dark:text-gray-300 hover:text-amber-300 dark:hover:text-amber-300 transition-all duration-300 relative"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Back to top hint */}
          <div className="text-center mt-4 md:mt-6">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 hover:text-amber-400 dark:hover:text-amber-300 transition-all duration-300"
            >
              <div className="w-6 h-6 border border-gray-500 dark:border-gray-400 group-hover:border-amber-400 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <svg className="w-3 h-3 transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                </svg>
              </div>
              <span>Về đầu trang</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Product Detail Modal Component - Ultra Compact Layout
export const ProductDetailModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Create array of 10 images (use product images + fallback images)
  const productImages = [
    product.image || 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwzfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw0fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1586699253793-c0f2ad995d6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw1fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1544967142-b048c6bb4da9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw2fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw3fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1588080962687-8d6ecf4c76f8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw4fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1549894977-6889ed8ab5db?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHw5fHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1582546812820-0b68a3e1e772?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxMHx8aW5jZW5zZSUyMHN0aWNrc3xlbnwwfHx8fDE3NTE0Mjk4Njh8MA&ixlib=rb-4.1.0&q=85'
  ];

  // Lock body scroll when modal opens
  useEffect(() => {
    // Store original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore scroll when modal closes
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Auto-slide functionality - updated to 2s interval
  useEffect(() => {
    if (!isAutoSliding || isPaused) return;
    
    const autoSlideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 2000); // Auto-slide every 2 seconds
    
    return () => clearInterval(autoSlideInterval);
  }, [isAutoSliding, isPaused, productImages.length]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        if (showLightbox) {
          setShowLightbox(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose, showLightbox]);

  // Utility function to get price based on selected size
  const getPriceForSize = (size) => {
    if (product.size_prices && product.size_prices[size]) {
      return product.size_prices[size];
    }
    return product.price; // fallback to base price
  };

  // Get current price based on selected size
  const currentPrice = selectedSize ? getPriceForSize(selectedSize) : product.price;

  const handleAddToCart = () => {
    const productWithCurrentPrice = {
      ...product,
      price: currentPrice // Use size-specific price
    };
    onAddToCart(productWithCurrentPrice, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    const productWithCurrentPrice = {
      ...product,
      price: currentPrice // Use size-specific price
    };
    onBuyNow(productWithCurrentPrice, quantity, selectedSize);
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (showLightbox) {
        setShowLightbox(false);
      } else {
        onClose();
      }
    }
  };

  // Navigation functions
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    setIsPaused(true); // Pause auto-slide when user manually navigates
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    setIsPaused(true); // Pause auto-slide when user manually navigates
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    setIsPaused(true); // Pause auto-slide when user clicks thumbnail
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
  };

  // Lightbox Component
  const Lightbox = () => {
    if (!showLightbox) return null;

    return (
      <div 
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
        onClick={handleBackdropClick}
      >
        <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
          {/* Close button */}
          <button 
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all duration-200"
          >
            <CloseIcon className="w-6 h-6" />
          </button>

          {/* Navigation arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all duration-200"
          >
            ←
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-all duration-200"
          >
            →
          </button>

          {/* Main image */}
          <img 
            src={productImages[currentImageIndex]}
            alt={`${product.name} - ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {productImages.length}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4 transition-all duration-300 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div 
          className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl h-[80vh] overflow-hidden shadow-2xl border border-gray-200/20 dark:border-gray-700/30 transition-all duration-500 flex flex-col"
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking inside
        >
          
          {/* Ultra Compact Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 flex-shrink-0">
            <h2 className="text-base font-bold text-gray-800 dark:text-white">Chi tiết sản phẩm</h2>
            <button 
              onClick={onClose} 
              className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Main Content - Fixed Height with Internal Scroll if Needed */}
          <div className="flex-1 p-2 grid grid-cols-1 lg:grid-cols-2 gap-3 min-h-0 overflow-y-auto">
            
            {/* Left Column - Image Gallery + Minimal Info */}
            <div className="space-y-2">
              {/* Image Gallery */}
              <div className="relative">
                {/* Main Image Display */}
                <div 
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-md cursor-pointer relative group"
                  onClick={() => setShowLightbox(true)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="relative w-full h-full flex transition-transform duration-500 ease-in-out" 
                       style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                    {productImages.map((image, index) => (
                      <img 
                        key={index}
                        src={image}
                        alt={`${product.name} - ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                  
                  {/* Auto-slide control button */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setIsAutoSliding(!isAutoSliding);
                      setIsPaused(false);
                    }}
                    className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
                    title={isAutoSliding ? 'Tạm dừng tự động' : 'Bật tự động'}
                  >
                    {isAutoSliding ? '⏸️' : '▶️'}
                  </button>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      Click để xem lớn
                    </span>
                  </div>

                  {/* Navigation arrows on main image */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
                  >
                    ←
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/70"
                  >
                    →
                  </button>

                  {/* Image counter */}
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                    {currentImageIndex + 1}/{productImages.length}
                  </div>
                </div>

                {/* Thumbnail Navigation - Smaller for minimal space */}
                <div className="flex space-x-1 mt-2 overflow-x-auto pb-1">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`flex-shrink-0 w-6 h-6 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        currentImageIndex === index 
                          ? 'border-amber-500 shadow-md ring-2 ring-amber-500/50' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-amber-300'
                      }`}
                      title={`Ảnh ${index + 1}`}
                    >
                      <img 
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Ultra Compact Product Info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-900/20 px-1.5 py-0.5 rounded-full">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{product.rating || 4.5}</span>
                  </div>
                </div>
                
                {/* Product name - 30% smaller */}
                <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                  {product.name}
                </h1>
                
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Chất liệu:</span> {product.material}
                </div>

                {/* Compact Description */}
                {product.detail_description && (
                  <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">
                      {product.detail_description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Price, Size, Actions */}
            <div className="space-y-2 flex flex-col min-h-0">
              
              {/* Ultra Compact Price Display - Even smaller */}
              <div className="text-center p-1.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-md border border-amber-200/30 dark:border-amber-700/30 flex-shrink-0">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-0.5">Giá bán</div>
                <div className="text-base font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  {currentPrice}
                </div>
                {selectedSize && (
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    Kích cỡ: {selectedSize}
                  </div>
                )}
              </div>

              {/* Compact Size Selection */}
              {product.sizes && (
                <div className="flex-shrink-0">
                  <h3 className="text-sm font-bold mb-2 text-gray-800 dark:text-white flex items-center space-x-1">
                    <span className="w-3 h-3 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">S</span>
                    </span>
                    <span>Chọn kích cỡ</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`relative p-2 border-2 rounded-lg transition-all duration-200 text-center ${
                          selectedSize === size 
                            ? 'border-amber-500 bg-amber-500 text-white shadow-md' 
                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                        }`}
                      >
                        <div className={`text-xs font-bold ${
                          selectedSize === size ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                        }`}>
                          {size}
                        </div>
                        {product.size_prices && product.size_prices[size] && (
                          <div className={`text-xs mt-1 ${
                            selectedSize === size ? 'text-white' : 'text-amber-600 dark:text-amber-400'
                          }`}>
                            {product.size_prices[size]}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Quantity Selector */}
              <div className="flex-shrink-0">
                <h3 className="text-sm font-bold mb-2 text-gray-800 dark:text-white">Số lượng</h3>
                <div className="flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    −
                  </button>
                  <span className="text-lg font-bold min-w-[2rem] text-center text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Compact Info Tip */}
              {product.size_prices && Object.keys(product.size_prices).length > 1 && (
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-700/50 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">💡</span>
                    <p className="text-xs text-blue-800 dark:text-blue-300">Giá thay đổi theo kích cỡ</p>
                  </div>
                </div>
              )}

              {/* Compact Action Buttons */}
              <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                <button 
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2.5 px-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-1"
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  <span>Thêm giỏ</span>
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2.5 px-3 rounded-lg font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-1"
                >
                  <span>⚡</span>
                  <span>Mua ngay</span>
                </button>
              </div>

              {/* Compact Reviews Section */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50 flex-1 min-h-0">
                  <h3 className="text-sm font-bold mb-2 text-gray-800 dark:text-white flex items-center space-x-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span>Đánh giá ({product.reviews.length})</span>
                  </h3>
                  <div className="space-y-1 max-h-20 overflow-y-auto">
                    {product.reviews.slice(0, 2).map((review, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-800 dark:text-white">{review.name}</span>
                          <div className="flex text-xs">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">★</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox />
    </>
  );
};

// Cart Modal Component
export const CartModal = ({ 
  cartItems, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  totalPrice, 
  shippingFee 
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-amber-900/20 transition-all duration-500">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">Giỏ hàng</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl transition-colors duration-300">
            ×
          </button>
        </div>

        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors duration-300">Giỏ hàng trống</p>
              <button 
                onClick={onClose}
                className="mt-4 bg-amber-800 dark:bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white transition-colors duration-300">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-amber-800 dark:text-amber-400 font-bold transition-colors duration-300">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center text-gray-800 dark:text-white transition-colors duration-300">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-500 transition-all duration-300"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 transition-colors duration-300"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 transition-colors duration-300">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-800 dark:text-white transition-colors duration-300">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 dark:text-white transition-colors duration-300">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {totalPrice < 300000 && (
                    <div className="text-sm text-amber-600 dark:text-amber-400 transition-colors duration-300">
                      Mua thêm {formatPrice(300000 - totalPrice)} để được miễn phí ship
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2 transition-colors duration-300">
                    <span className="text-gray-800 dark:text-white">Tổng cộng:</span>
                    <span className="text-amber-800 dark:text-amber-400">{formatPrice(totalPrice + shippingFee)}</span>
                  </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full bg-amber-800 dark:bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Tiến hành thanh toán
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Checkout Modal Component
export const CheckoutModal = ({ 
  cartItems, 
  onClose, 
  totalPrice, 
  shippingFee, 
  onOrderComplete 
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    onOrderComplete(customerInfo);
  };

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-amber-900/20 transition-all duration-500">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">Thanh toán</h2>
          <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl transition-colors duration-300">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">Thông tin giao hàng</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Địa chỉ giao hàng *</label>
                  <textarea
                    required
                    rows="3"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 transition-colors duration-300">Ghi chú</label>
                  <textarea
                    rows="2"
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300"
                    placeholder="Ghi chú thêm cho đơn hàng..."
                  ></textarea>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">Phương thức thanh toán</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-800 dark:text-amber-400"
                    />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Thanh toán bằng tiền mặt khi nhận hàng</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-800 dark:text-amber-400"
                    />
                    <div>
                      <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Chuyển khoản trước khi giao hàng</div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors duration-300">
                    <h4 className="font-bold mb-2 text-amber-800 dark:text-amber-400">Thông tin chuyển khoản:</h4>
                    <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                      <p><strong>Ngân hàng:</strong> Vietcombank</p>
                      <p><strong>Số tài khoản:</strong> 1234567890</p>
                      <p><strong>Chủ tài khoản:</strong> Sơn Mộc Hương</p>
                      <p><strong>Nội dung:</strong> [Tên khách hàng] - [Số điện thoại]</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">Đơn hàng của bạn</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex justify-between">
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">{item.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                          {item.selectedSize && `Size: ${item.selectedSize} - `}
                          Số lượng: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium text-gray-800 dark:text-white transition-colors duration-300">
                        {formatPrice(parseInt(item.price.replace(/[.,đ]/g, '')) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3 space-y-2 transition-colors duration-300">
                  <div className="flex justify-between text-gray-800 dark:text-white transition-colors duration-300">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-800 dark:text-white transition-colors duration-300">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-white'}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-600 pt-2 transition-colors duration-300">
                    <span className="text-gray-800 dark:text-white">Tổng cộng:</span>
                    <span className="text-amber-800 dark:text-amber-400">{formatPrice(totalPrice + shippingFee)}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 bg-amber-800 dark:bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Toast Notification Component
export const ToastNotification = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-600 dark:bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg dark:shadow-green-900/20 z-[60] animate-slide-in-right transition-all duration-300">
      <div className="flex items-center space-x-3">
        <div className="bg-white bg-opacity-20 dark:bg-white dark:bg-opacity-30 rounded-full p-1">
          <span className="text-lg">✓</span>
        </div>
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 dark:hover:text-gray-300 text-xl ml-2 transition-colors duration-300"
        >
          ×
        </button>
      </div>
    </div>
  );
};

// Success Page Component
export const SuccessPage = ({ orderInfo, onContinueShopping }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon & Message */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Đặt hàng thành công!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Cảm ơn bạn đã tin tưởng Sơn Mộc Hương. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.
          </p>
        </div>

        {/* Order Information Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin đơn hàng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Mã đơn hàng:</span>
                <p className="font-bold text-amber-800">{orderInfo.orderId}</p>
              </div>
              <div>
                <span className="text-gray-600">Ngày đặt:</span>
                <p className="font-medium">{orderInfo.orderDate}</p>
              </div>
              <div>
                <span className="text-gray-600">Khách hàng:</span>
                <p className="font-medium">{orderInfo.customer.name}</p>
              </div>
              <div>
                <span className="text-gray-600">Điện thoại:</span>
                <p className="font-medium">{orderInfo.customer.phone}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-gray-600">Địa chỉ giao hàng:</span>
              <p className="font-medium">{orderInfo.customer.address}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Sản phẩm đã đặt</h3>
            <div className="space-y-4">
              {orderInfo.items.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-800">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-6">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">{formatPrice(orderInfo.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className={`font-medium ${orderInfo.shippingFee === 0 ? 'text-green-600' : ''}`}>
                  {orderInfo.shippingFee === 0 ? 'Miễn phí' : formatPrice(orderInfo.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-2">
                <span>Tổng cộng:</span>
                <span className="text-amber-800">{formatPrice(orderInfo.totalPrice + orderInfo.shippingFee)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button 
            onClick={onContinueShopping}
            className="bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-colors shadow-lg w-full md:w-auto"
          >
            <ShoppingBagIcon className="w-6 h-6 mr-2" />
            Tiếp tục mua sắm
          </button>
          
          <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4 mt-6">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <PhoneIcon className="w-5 h-5" />
              <span>Hotline: 0762 222 448</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <ClockIcon className="w-5 h-5" />
              <span>Giao hàng: 1-3 ngày</span>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-8 p-6 bg-white bg-opacity-70 rounded-xl">
          <p className="text-gray-600 mb-2">
            <strong>Lưu ý:</strong> Chúng tôi sẽ gọi điện xác nhận đơn hàng trong vòng 30 phút.
          </p>
          <p className="text-sm text-gray-500">
            Nếu có thắc mắc, vui lòng liên hệ hotline: <strong>0762 222 448</strong>
          </p>
        </div>
      </div>
    </div>
  );
};