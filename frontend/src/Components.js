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
      <div className="container mx-auto px-4 lg:px-6">
        <div className={`flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-2.5' : 'py-4'
        }`}>
          
          {/* Enhanced Logo - More sophisticated */}
          <Link to="/" className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-xl p-1">
            <div className={`bg-gradient-to-br from-amber-700 via-amber-800 to-amber-900 dark:from-amber-500 dark:via-amber-600 dark:to-amber-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 ${
              scrolled ? 'w-10 h-10' : 'w-12 h-12'
            }`}>
              <span className={`text-white font-bold transition-all duration-300 group-hover:animate-pulse ${
                scrolled ? 'text-lg' : 'text-xl'
              }`}>SMH</span>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>
            
            <div className="flex flex-col">
              <span className={`font-bold text-gray-800 dark:text-white transition-all duration-500 group-hover:text-amber-800 dark:group-hover:text-amber-400 ${
                scrolled ? 'text-xl' : 'text-2xl'
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

// Hero Section Component - Modern, Elegant & Clean
export const HeroSection = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation(0.2);
  const [statsRef, isStatsVisible] = useScrollAnimation(0.3);

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-500">
      
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle geometric patterns */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-orange-100/20 dark:from-amber-900/10 dark:to-orange-900/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-yellow-100/20 dark:from-orange-900/10 dark:to-yellow-900/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-amber-400/30 rounded-full animate-float"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-orange-400/30 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-yellow-400/30 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Enhanced Content Section */}
          <div 
            ref={heroRef}
            className={`space-y-8 lg:space-y-12 transition-all duration-1000 ${
              isHeroVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-50px]'
            }`}
          >
            {/* Subtitle Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">
                Trầm hương nguyên chất Việt Nam
              </span>
            </div>

            {/* Main Title - More sophisticated typography */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-none">
                <span className="block text-gray-900 dark:text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Tinh Hoa
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-orange-600 dark:from-amber-400 dark:via-amber-500 dark:to-orange-400 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Trầm Hương
                </span>
                <span className="block text-gray-700 dark:text-gray-300 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Thiên Nhiên Việt
                </span>
              </h1>
            </div>

            {/* Enhanced Description */}
            <p className={`text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl font-light transition-all duration-800 ${
              isHeroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[20px]'
            }`} style={{ animationDelay: '0.8s' }}>
              Khám phá bộ sưu tập trầm hương cao cấp từ 
              <span className="text-amber-700 dark:text-amber-400 font-medium"> Sơn Mộc Hương</span>
              <br />
              Nơi hội tụ tinh hoa của đất trời và nghệ thuật chế tác truyền thống.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
              isHeroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[30px]'
            }`} style={{ animationDelay: '1s' }}>
              
              <Link 
                to="/products"
                className="group relative bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 dark:from-amber-600 dark:via-amber-700 dark:to-amber-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-amber-400/50 overflow-hidden"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Khám phá bộ sưu tập</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                {/* Enhanced hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Link>

              <button className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-800 dark:text-white px-8 py-4 rounded-2xl text-lg font-medium border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400/50">
                <span className="flex items-center space-x-2">
                  <PhoneIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Tư vấn ngay</span>
                </span>
              </button>
            </div>

            {/* Enhanced Stats Section */}
            <div 
              ref={statsRef}
              className={`grid grid-cols-3 gap-8 pt-8 transition-all duration-800 ${
                isStatsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{ animationDelay: '1.2s' }}
            >
              {[
                { number: '500+', label: 'Sản phẩm', icon: '🏆' },
                { number: '5000+', label: 'Khách hàng', icon: '❤️' },
                { number: '10+', label: 'Năm kinh nghiệm', icon: '⭐' }
              ].map((stat, index) => (
                <div key={index} className="group text-center cursor-pointer">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-800 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-light group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Visual Section */}
          <div className={`relative flex justify-center lg:justify-end transition-all duration-1000 ${
            isHeroVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-[50px]'
          }`} style={{ animationDelay: '0.5s' }}>
            
            <div className="relative group">
              {/* Main Hero Image */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group-hover:shadow-3xl dark:shadow-amber-900/20 dark:hover:shadow-amber-800/30 transition-all duration-700">
                <img 
                  src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg"
                  alt="Meditation Space"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 filter group-hover:brightness-110"
                />
                
                {/* Elegant overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-xl font-semibold mb-2">Không gian thiền định</h3>
                  <p className="text-sm text-gray-200">Tạo nên sự bình an trong tâm hồn</p>
                </div>
              </div>

              {/* Floating Product Showcase */}
              <div className="absolute -top-4 -right-4 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-center backdrop-blur-sm group-hover:scale-105 transition-transform duration-500" style={{ animationDelay: '0.3s' }}>
                <div className="text-center space-y-2">
                  <img 
                    src="https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg"
                    alt="Trầm hương"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl object-cover mx-auto shadow-lg"
                  />
                  <div className="space-y-1">
                    <h4 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-white">Vòng tay trầm</h4>
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Từ 1.2M VNĐ</p>
                  </div>
                </div>
              </div>

              {/* Quality Badge */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-2xl shadow-xl backdrop-blur-sm group-hover:scale-105 transition-transform duration-500" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <div className="text-lg font-bold">100%</div>
                  <div className="text-xs font-medium">Nguyên chất</div>
                </div>
              </div>

              {/* Decorative Elements - More refined */}
              <div className="absolute top-1/4 -left-8 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute bottom-1/3 -right-6 w-6 h-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -left-4 w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
            <div className="w-1 h-3 bg-amber-600 dark:bg-amber-400 rounded-full mx-auto animate-pulse"></div>
          </div>
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

// Products Section Component
export const ProductsSection = ({ onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Cache products in localStorage để tăng tốc load
  const CACHE_KEY = 'products_cache';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Filter products based on category and search term
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  // Get unique categories from products
  const getCategories = () => {
    const categories = products.map(product => product.category);
    return ['all', ...new Set(categories)];
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

  const getStaticProducts = () => [
    {
      id: '1',
      name: 'Vòng tay trầm hương tự nhiên',
      description: 'Vòng tay trầm hương nguyên chất, mang lại sự bình an và may mắn, kết nối tinh thần và tăng cường năng lượng tích cực.',
      price: '1.500.000đ',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      category: 'Vòng tay trầm',
      material: 'Trầm hương tự nhiên',
      rating: 4.9,
      sizes: ['16mm', '18mm', '20mm'],
      reviews: [
        { name: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất đẹp, hương thơm tự nhiên' },
        { name: 'Trần Thị B', rating: 5, comment: 'Chất lượng tốt, đúng như mô tả' }
      ],
      detail_description: 'Vòng tay trầm hương tự nhiên được chế tác từ gỗ trầm hương Việt Nam cao cấp. Sản phẩm có hương thơm nhẹ nhàng, mang lại cảm giác thư giãn và bình an cho người đeo.'
    },
    {
      id: '2',
      name: 'Nhang nụ trầm hương',
      description: 'Nhang nụ trầm hương cao cấp, cháy lâu và tỏa hương đều, tạo không gian thư giãn và thanh tịnh.',
      price: '280.000đ',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      category: 'Nhang nụ trầm',
      material: 'Trầm hương nguyên chất',
      rating: 4.9,
      sizes: ['Hộp 50 nụ', 'Hộp 100 nụ'],
      reviews: [
        { name: 'Hoàng Văn E', rating: 5, comment: 'Nhang nụ chất lượng, hương thơm tự nhiên' }
      ],
      detail_description: 'Nhang nụ trầm hương được làm từ bột trầm hương nguyên chất, không chất phụ gia, tạo khói nhẹ và hương thơm dễ chịu.'
    },
    {
      id: '3',
      name: 'Vòng tay trầm hương chìm nước',
      description: 'Vòng tay trầm hương chìm nước cao cấp, hương thơm đặc trưng và bền lâu, phù hợp làm quà tặng.',
      price: '12.000.000đ',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85',
      category: 'Vòng tay cao cấp',
      material: 'Trầm hương chìm nước',
      rating: 4.8,
      sizes: ['16mm', '18mm', '20mm', '22mm'],
      reviews: [
        { name: 'Lê Văn C', rating: 5, comment: 'Trầm chìm nước thật, hương rất thơm' },
        { name: 'Phạm Thị D', rating: 4, comment: 'Đắt nhưng xứng đáng với giá tiền' }
      ],
      detail_description: 'Vòng tay trầm hương chìm nước là loại trầm hương cao cấp nhất, có mật độ cao, chìm trong nước và tỏa hương đặc trưng khi đốt.'
    },
    {
      id: 4,
      name: 'Tinh dầu trầm hương',
      description: 'Tinh dầu trầm hương nguyên chất 100%, dùng cho liệu pháp thư giãn và xông hương.',
      price: '5.500.000đ',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85',
      category: 'Tinh dầu trầm',
      material: 'Tinh dầu nguyên chất',
      rating: 4.7,
      sizes: ['5ml', '10ml', '20ml'],
      reviews: [
        { name: 'Vũ Thị F', rating: 5, comment: 'Tinh dầu thật 100%, rất thơm' }
      ],
      detail_description: 'Tinh dầu trầm hương được chưng cất từ gỗ trầm hương cao cấp, có tác dụng thư giãn tinh thần, giảm stress.'
    },
    {
      id: 5,
      name: 'Cảnh trầm hương phong thủy',
      description: 'Tác phẩm nghệ thuật từ trầm hương tự nhiên, dùng trang trí và phong thủy, mang lại may mắn.',
      price: '15.000.000đ',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85',
      category: 'Cảnh trầm',
      material: 'Gỗ trầm hương nguyên khối',
      rating: 4.8,
      sizes: ['Size S (10-15cm)', 'Size M (15-20cm)', 'Size L (20-30cm)'],
      reviews: [
        { name: 'Đỗ Văn G', rating: 5, comment: 'Cảnh trầm đẹp, thích hợp trang trí' }
      ],
      detail_description: 'Cảnh trầm hương được chế tác thủ công từ gỗ trầm hương tự nhiên, mang ý nghĩa phong thủy tốt lành.'
    },
    {
      id: 6,
      name: 'Nhang tăm trầm hương',
      description: 'Nhang tăm trầm hương thơm nhẹ, phù hợp đốt hàng ngày trong gia đình và nơi thờ cúng.',
      price: '350.000đ',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
      category: 'Nhang tăm',
      material: 'Trầm hương tự nhiên',
      rating: 4.6,
      sizes: ['Hộp 100 que', 'Hộp 200 que'],
      reviews: [
        { name: 'Bùi Thị H', rating: 4, comment: 'Nhang tăm dễ sử dụng, hương nhẹ nhàng' }
      ],
      detail_description: 'Nhang tăm trầm hương được làm từ bột trầm hương pha trộn với chất liệu tự nhiên, tạo hương thơm dễ chịu.'
    },
    {
      id: 7,
      name: 'Vòng tay trầm hương bọc vàng',
      description: 'Vòng tay trầm hương kết hợp với vàng 24k, sang trọng và đẳng cấp, phù hợp làm quà tặng.',
      price: '25.000.000đ',
      image: 'https://images.unsplash.com/photo-1608393189376-5264bcca3582?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHZ2aWV0bmFtZXNlJTIwYWdhcndvb2R8ZW58MHx8fHwxNzUxNDI5ODg0fDA&ixlib=rb-4.1.0&q=85',
      category: 'Vòng tay cao cấp',
      material: 'Trầm hương + Vàng 24k',
      rating: 4.7,
      sizes: ['16mm', '18mm', '20mm'],
      reviews: [
        { name: 'Trương Văn I', rating: 5, comment: 'Sản phẩm cao cấp, rất đẹp và sang trọng' }
      ],
      detail_description: 'Vòng tay trầm hương bọc vàng 24k là sự kết hợp hoàn hảo giữa trầm hương và vàng, tạo nên sản phẩm đẳng cấp.'
    },
    {
      id: 8,
      name: 'Bộ phụ kiện xông trầm',
      description: 'Bộ phụ kiện xông trầm hoàn chỉnh, bao gồm lư xông, kẹp trầm và phụ kiện cần thiết.',
      price: '3.200.000đ',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      category: 'Phụ kiện xông trầm',
      material: 'Gốm sứ cao cấp',
      rating: 4.9,
      sizes: ['Bộ cơ bản', 'Bộ cao cấp', 'Bộ VIP'],
      reviews: [
        { name: 'Ngô Thị J', rating: 5, comment: 'Bộ phụ kiện đầy đủ, chất lượng tốt' }
      ],
      detail_description: 'Bộ phụ kiện xông trầm gồm lư xông gốm sứ, kẹp gỗ, đế xông và các phụ kiện cần thiết để xông trầm hương.'
    }
  ];

  const { visibleItems, setRef } = useStaggerAnimation(filteredProducts, 100);

  return (
    <section id="products" className="py-6 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-3 lg:px-4">
        {/* Compact Mobile Header */}
        <div className="text-center mb-4 lg:mb-16">
          <h2 className="text-xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 lg:mb-4 animate-fade-in-up transition-colors duration-300">
            Tất cả sản phẩm
          </h2>
          <div className="w-12 lg:w-32 h-1 bg-gradient-to-r from-amber-800 to-orange-600 dark:from-amber-400 dark:to-orange-400 mx-auto rounded-full mb-2 lg:mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
          <p className="text-xs lg:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up transition-colors duration-300 px-2 leading-relaxed" style={{ animationDelay: '0.4s' }}>
            Khám phá bộ sưu tập trầm hương đa dạng từ Sơn Mộc Hương - từ vòng tay trầm hương đến nhang nụ, 
            tất cả đều được chọn lọc kỹ lưỡng để mang đến cho bạn chất lượng tốt nhất.
          </p>
        </div>

        {/* Compact Search Bar */}
        <div className="max-w-2xl mx-auto mb-3 lg:mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 lg:px-6 py-2.5 lg:py-4 pl-9 lg:pl-12 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-amber-800 dark:focus:border-amber-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-lg focus:shadow-xl text-sm lg:text-base"
            />
            <div className="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Compact Category Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 lg:gap-3 mb-4 lg:mb-12">
          {getCategories().map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2.5 lg:px-6 py-1 lg:py-3 rounded-full text-[11px] lg:text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-amber-800 dark:bg-amber-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-md'
              }`}
            >
              {getCategoryDisplayName(category)}
            </button>
          ))}
        </div>

        {/* Compact Products Count */}
        <div className="text-center mb-3 lg:mb-8">
          <p className="text-[11px] lg:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Hiển thị <span className="font-semibold text-amber-800 dark:text-amber-400">{filteredProducts.length}</span> sản phẩm
            {searchTerm && (
              <span> cho từ khóa "<span className="font-semibold text-amber-800 dark:text-amber-400">{searchTerm}</span>"</span>
            )}
          </p>
        </div>

        {/* Mobile Optimized Loading State */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl lg:rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-28 lg:h-48 bg-gray-300 dark:bg-gray-600"></div>
                <div className="p-2 lg:p-6 space-y-1.5 lg:space-y-3">
                  <div className="h-2.5 lg:h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-2 lg:h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                  <div className="h-2 lg:h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-3 lg:h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                    <div className="h-4 lg:h-8 bg-gray-300 dark:bg-gray-600 rounded w-12 lg:w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          // Mobile Optimized No products found
          <div className="text-center py-6 lg:py-16">
            <div className="mb-2 lg:mb-4">
              <svg className="w-10 h-10 lg:w-16 lg:h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-base lg:text-xl font-semibold text-gray-800 dark:text-white mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-xs lg:text-base text-gray-600 dark:text-gray-400 mb-3 lg:mb-4 px-4">
              {searchTerm 
                ? `Không có sản phẩm nào phù hợp với từ khóa "${searchTerm}"`
                : 'Không có sản phẩm nào trong danh mục này'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-amber-800 dark:bg-amber-600 text-white px-3 lg:px-6 py-2 rounded-full hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 text-xs lg:text-base"
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          /* Mobile First Product Grid - 2 columns on mobile, 4 on desktop */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                ref={setRef(index)}
                className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-amber-900/10 overflow-hidden hover:shadow-2xl dark:hover:shadow-amber-900/20 cursor-pointer group transition-all duration-500 hover:transform hover:scale-102 lg:hover:scale-105 hover:-translate-y-1 lg:hover:-translate-y-2 ${
                  visibleItems.has(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onProductClick(product)}
              >
                {/* Mobile Optimized Image Container */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/30 lg:from-amber-800/0 lg:to-amber-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Compact Category Badge */}
                  <div className="absolute top-1.5 lg:top-4 left-1.5 lg:left-4">
                    <span className="bg-amber-600/90 dark:bg-amber-500/90 text-white px-1.5 lg:px-3 py-0.5 lg:py-1 rounded-lg lg:rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                      {product.category.length > 10 ? product.category.substring(0, 10) + '...' : product.category}
                    </span>
                  </div>
                  
                  {/* Mobile Rating Badge */}
                  <div className="absolute top-1.5 lg:top-4 right-1.5 lg:right-4">
                    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-1.5 lg:px-2 py-0.5 lg:py-1 rounded-lg lg:rounded-full shadow-sm flex items-center space-x-1">
                      <span className="text-yellow-500 text-xs">★</span>
                      <span className="text-xs font-medium text-gray-800 dark:text-white">{product.rating}</span>
                    </div>
                  </div>
                  
                  {/* Mobile Price Overlay */}
                  <div className="absolute bottom-1.5 lg:bottom-4 left-1.5 lg:left-4 right-1.5 lg:right-4">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs lg:text-sm font-bold">{product.price}</span>
                        {product.sizes && (
                          <span className="text-xs opacity-80">{product.sizes.length} size</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Optimized Content */}
                <div className="p-2.5 lg:p-6">
                  <h3 className="text-sm lg:text-xl font-semibold lg:font-bold text-gray-800 dark:text-white mb-1 lg:mb-2 line-clamp-1 lg:line-clamp-2 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  {/* Mobile Only: Compact Description */}
                  <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-1 lg:hidden transition-colors duration-300">
                    {product.description}
                  </p>
                  
                  {/* Desktop Only: Full Description */}
                  <p className="hidden lg:block text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 transition-colors duration-300">
                    {product.description}
                  </p>
                  
                  {/* Mobile Material Info */}
                  <div className="flex items-center justify-between text-xs lg:hidden mb-2">
                    <span className="text-gray-500 dark:text-gray-400 truncate flex-1">
                      {product.material.length > 15 ? product.material.substring(0, 15) + '...' : product.material}
                    </span>
                    <button className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full font-medium hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors ml-2">
                      Xem
                    </button>
                  </div>
                  
                  {/* Desktop Full Info */}
                  <div className="hidden lg:flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors duration-300">
                      <span className="text-amber-800 dark:text-amber-400 text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">{product.material}</span>
                  </div>
                  
                  <div className="hidden lg:flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400 group-hover:animate-pulse">★</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <span className="text-sm text-amber-600 dark:text-amber-400 font-medium group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">Chất lượng cao</span>
                  </div>
                  
                  <div className="hidden lg:flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-800 dark:text-amber-400 group-hover:animate-pulse">{product.price}</span>
                    <button 
                      className="bg-amber-800 dark:bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-900 dark:hover:bg-amber-700 transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:animate-bounce"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProductClick(product);
                      }}
                    >
                      Mua ngay
                    </button>
                  </div>

                  {/* Animated progress bar on hover */}
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-full bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <button className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-8 py-3 rounded-full hover:from-amber-900 hover:to-amber-800 dark:hover:from-amber-700 dark:hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
            Xem tất cả sản phẩm
          </button>
        </div>
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
    <div className={`fixed top-20 right-4 z-50 transition-all duration-500 transform ${
      showSuccess ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-2xl max-w-md border border-green-400/30">
        <div className="flex items-start space-x-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <CheckCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-lg mb-1">Gửi thành công!</h4>
            <p className="text-green-100 leading-relaxed">
              Cảm ơn bạn đã liên hệ với <strong>Sơn Mộc Hương</strong>. 
              Chúng tôi đã nhận được yêu cầu của bạn và sẽ phản hồi trong vòng 24 giờ.
            </p>
            <div className="mt-3 flex items-center space-x-4 text-sm text-green-100">
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>Phản hồi trong 24h</span>
              </div>
              <div className="flex items-center space-x-1">
                <PhoneIcon className="w-4 h-4" />
                <span>Hotline: 0762 222 448</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowSuccess(false)}
          className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors duration-200"
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SuccessNotification />
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Liên hệ với
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Sơn Mộc Hương</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn về các sản phẩm trầm hương chất lượng cao. 
            Đội ngũ chuyên gia với hơn 10 năm kinh nghiệm sẽ giúp bạn chọn lựa sản phẩm phù hợp nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contact Information Cards */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-gradient-to-br from-amber-800/20 to-orange-900/20 backdrop-blur-sm border border-amber-700/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <ContactSupportIcon className="w-7 h-7 text-amber-400 mr-3" />
                Liên hệ nhanh
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Hotline</p>
                    <p className="text-white font-semibold text-lg">0762 222 448</p>
                    <p className="text-amber-400 text-sm">24/7 hỗ trợ khách hàng</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <EmailIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-semibold">sonmochuong@gmail.com</p>
                    <p className="text-blue-400 text-sm">Phản hồi trong 24h</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">WhatsApp</p>
                    <p className="text-white font-semibold">+84 762 222 448</p>
                    <p className="text-green-400 text-sm">Chat trực tiếp</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gradient-to-br from-purple-800/20 to-pink-900/20 backdrop-blur-sm border border-purple-700/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <LocationIcon className="w-7 h-7 text-purple-400 mr-3" />
                Địa chỉ cửa hàng
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapsIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold leading-relaxed">
                      3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <ClockIcon className="w-4 h-4 text-purple-400" />
                      <p className="text-purple-400 text-sm">Thứ 2 - Chủ nhật: 8:00 - 20:00</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                  <MapsIcon className="w-5 h-5" />
                  <span>Xem bản đồ</span>
                </button>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-gradient-to-br from-blue-800/20 to-indigo-900/20 backdrop-blur-sm border border-blue-700/30 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <SupportAgentIcon className="w-7 h-7 text-blue-400 mr-3" />
                Mạng xã hội
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <a href="#" className="group bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <FacebookIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Facebook</p>
                </a>
                
                <a href="#" className="group bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <InstagramIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Instagram</p>
                </a>
                
                <a href="#" className="group bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <YouTubeIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">YouTube</p>
                </a>
                
                <a href="#" className="group bg-black hover:bg-gray-800 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <TikTokIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">TikTok</p>
                </a>
                
                <a href="#" className="group bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <ZaloIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Zalo</p>
                </a>
                
                <a href="#" className="group bg-blue-400 hover:bg-blue-500 p-3 rounded-lg transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <TelegramIcon className="w-6 h-6 text-white mx-auto" />
                  <p className="text-white text-xs text-center mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Telegram</p>
                </a>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-700/30">
                <p className="text-center text-blue-300 text-sm">
                  Theo dõi chúng tôi để cập nhật tin tức mới nhất về trầm hương
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
                <LiveHelpIcon className="w-8 h-8 text-amber-400 mr-3" />
                Gửi tin nhắn cho chúng tôi
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Họ và tên *
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập họ và tên của bạn"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white/20 text-white placeholder-gray-300 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Số điện thoại *
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white/20 text-white placeholder-gray-300 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Nhập email của bạn"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white/20 text-white placeholder-gray-300 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Chủ đề
                    </label>
                    <div className="relative">
                      <select 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white/20 text-white transition-all duration-300 appearance-none cursor-pointer hover:bg-white/15"
                        style={{
                          color: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                        <ChevronDownIcon className="w-5 h-5 text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    Tin nhắn *
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Chia sẻ chi tiết về nhu cầu của bạn để chúng tôi có thể hỗ trợ tốt nhất..."
                    rows="5"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-amber-400 focus:bg-white/20 text-white placeholder-gray-300 transition-all duration-300 resize-none"
                  ></textarea>
                </div>

                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="privacy"
                    required
                    className="mt-1 w-4 h-4 text-amber-600 bg-white/10 border-white/20 rounded focus:ring-amber-400"
                  />
                  <label htmlFor="privacy" className="text-gray-300 text-sm">
                    Tôi đồng ý với việc xử lý thông tin cá nhân theo 
                    <a href="#" className="text-amber-400 hover:text-amber-300 ml-1">Chính sách bảo mật</a>
                  </label>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <EmailIcon className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <ShieldIcon className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 text-sm">Bảo mật thông tin</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <ClockIcon className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300 text-sm">Phản hồi nhanh</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <SupportAgentIcon className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300 text-sm">Tư vấn chuyên nghiệp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Cần tư vấn ngay lập tức?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Gọi hotline hoặc chat với chuyên gia của chúng tôi ngay bây giờ!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0762222448"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
              >
                <PhoneIcon className="w-6 h-6" />
                <span>Gọi ngay: 0762 222 448</span>
              </a>
              <a 
                href="https://wa.me/84762222448"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold flex items-center justify-center space-x-2"
              >
                <WhatsAppIcon className="w-6 h-6" />
                <span>Chat WhatsApp</span>
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
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden transition-all duration-500 pb-6 lg:pb-0">
      
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
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        
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