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
  ShoppingBagIcon
} from './Icons';
import { useScrollAnimation, useStaggerAnimation } from './hooks/useScrollAnimation';
import { DarkModeToggle } from './contexts/DarkModeContext';

// Header Component
export const Header = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-800 to-amber-900 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-xl group-hover:animate-pulse">SMH</span>
            </div>
            <span className="text-2xl font-bold text-amber-800 dark:text-amber-400 group-hover:text-amber-900 dark:group-hover:text-amber-300 transition-colors duration-300">Sơn Mộc Hương</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`relative text-gray-700 dark:text-gray-300 hover:text-amber-800 dark:hover:text-amber-400 transition-all duration-300 font-medium group ${
                isActive('/') ? 'text-amber-800 dark:text-amber-400 font-semibold' : ''
              }`}
            >
              Trang chủ
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800 dark:bg-amber-400 transition-all duration-300 group-hover:w-full ${
                isActive('/') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/about" 
              className={`relative text-gray-700 hover:text-amber-800 transition-all duration-300 font-medium group ${
                isActive('/about') ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Giới thiệu
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full ${
                isActive('/about') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/products" 
              className={`relative text-gray-700 hover:text-amber-800 transition-all duration-300 font-medium group ${
                isActive('/products') ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Sản phẩm
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full ${
                isActive('/products') ? 'w-full' : ''
              }`}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`relative text-gray-700 hover:text-amber-800 transition-all duration-300 font-medium group ${
                isActive('/contact') ? 'text-amber-800 font-semibold' : ''
              }`}
            >
              Liên hệ
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-amber-800 transition-all duration-300 group-hover:w-full ${
                isActive('/contact') ? 'w-full' : ''
              }`}></span>
            </Link>
          </nav>

          {/* Contact Info, Dark Mode Toggle & Cart */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm animate-fade-in-right">
              <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <PhoneIcon className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>0762 222 448</span>
              </div>
              <div className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <EmailIcon className="w-4 h-4 text-amber-800 dark:text-amber-400" />
                <span>sonmochuong@gmail.com</span>
              </div>
            </div>
            
            {/* Dark Mode Toggle */}
            <DarkModeToggle />
            
            <button 
              onClick={onCartClick}
              className="relative bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-amber-50 dark:hover:bg-amber-900 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <ShoppingCartIcon className="w-6 h-6 text-amber-800 dark:text-amber-400 group-hover:animate-bounce" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-800 dark:bg-amber-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center cart-badge animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-6 py-2 rounded-full hover:from-amber-900 hover:to-amber-800 dark:hover:from-amber-700 dark:hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform hover:-translate-y-0.5">
              Mua ngay
            </button>
          </div>

          {/* Mobile Cart & Menu */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart Button */}
            <button 
              onClick={onCartClick}
              className="relative bg-gray-100 p-2 rounded-full hover:bg-amber-50 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md group"
            >
              <ShoppingCartIcon className="w-6 h-6 text-amber-800 group-hover:animate-bounce" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center cart-badge animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center">
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-600 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 animate-slide-in-top">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-amber-800 transition-all duration-300 hover:translate-x-2 hover:font-medium ${
                  isActive('/') ? 'text-amber-800 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-700 hover:text-amber-800 transition-all duration-300 hover:translate-x-2 hover:font-medium ${
                  isActive('/about') ? 'text-amber-800 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link 
                to="/products" 
                className={`text-gray-700 hover:text-amber-800 transition-all duration-300 hover:translate-x-2 hover:font-medium ${
                  isActive('/products') ? 'text-amber-800 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-amber-800 transition-all duration-300 hover:translate-x-2 hover:font-medium ${
                  isActive('/contact') ? 'text-amber-800 font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Liên hệ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation(0.2);
  const [statsRef, isStatsVisible] = useScrollAnimation(0.3);

  return (
    <section id="home" className="bg-gradient-to-br from-amber-50 via-orange-50 to-orange-100 pt-20 overflow-hidden">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div 
            ref={heroRef}
            className={`lg:w-1/2 mb-8 lg:mb-0 transition-all duration-1000 ${
              isHeroVisible ? 'animate-fade-in-left' : 'opacity-0 translate-x-[-50px]'
            }`}
          >
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
                <span className="inline-block animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Trầm Hương Thiên Nhiên
                </span>
                <br />
                <span className="text-amber-800 inline-block animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  Chất lượng cao từ
                </span>
                <br />
                <span className="text-amber-800 inline-block animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  đất Việt Nam
                </span>
              </h1>
              <p className={`text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-md transition-all duration-800 ${
                isHeroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[20px]'
              }`} style={{ animationDelay: '0.8s' }}>
                Sơn Mộc Hương - Địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao, 
                vòng tay trầm, nhang trầm và phụ kiện xông trầm đa dạng từ thiên nhiên Việt Nam.
              </p>
              <button className={`bg-gradient-to-r from-amber-800 to-amber-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold hover:from-amber-900 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 ${
                isHeroVisible ? 'animate-bounce-in' : 'opacity-0 scale-50'
              }`} style={{ animationDelay: '1s' }}>
                <span className="relative z-10">Xem thêm</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            <div 
              ref={statsRef}
              className={`flex space-x-6 md:space-x-8 mt-8 md:mt-12 transition-all duration-800 ${
                isStatsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{ animationDelay: '1.2s' }}
            >
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold text-amber-800 group-hover:animate-pulse transition-all duration-300 group-hover:scale-110">100+</div>
                <div className="text-sm md:text-base text-gray-600 group-hover:text-amber-700 transition-colors">Sản phẩm</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-2xl md:text-3xl font-bold text-amber-800 group-hover:animate-pulse transition-all duration-300 group-hover:scale-110">1000+</div>
                <div className="text-sm md:text-base text-gray-600 group-hover:text-amber-700 transition-colors">Khách hàng</div>
              </div>
            </div>
          </div>

          <div className={`lg:w-1/2 flex justify-center transition-all duration-1000 ${
            isHeroVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-[50px]'
          }`} style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <img 
                  src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg"
                  alt="Meditation Space"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-orange-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-16 h-16 md:w-24 md:h-24 bg-white rounded-full shadow-lg flex items-center justify-center animate-float hover:animate-pulse cursor-pointer group">
                <img 
                  src="https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg"
                  alt="Trầm hương"
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-amber-200 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-10 -left-6 w-4 h-4 bg-orange-300 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-2 right-10 w-6 h-6 bg-amber-300 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
            </div>
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
        return <TrophyIcon className="w-16 h-16 text-amber-800 group-hover:animate-bounce" />;
      case 'leaf':
        return <LeafIcon className="w-16 h-16 text-green-600 group-hover:animate-wiggle" />;
      case 'truck':
        return <TruckIcon className="w-16 h-16 text-blue-600 group-hover:animate-pulse" />;
      case 'chat':
        return <ChatIcon className="w-16 h-16 text-purple-600 group-hover:animate-bounce" />;
      default:
        return null;
    }
  };

  const features = [
    {
      iconType: 'trophy',
      title: 'Chất lượng cao',
      description: 'Sản phẩm trầm hương nguyên chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.',
      bgColor: 'hover:bg-amber-50',
      borderColor: 'hover:border-amber-200'
    },
    {
      iconType: 'leaf',
      title: 'Từ thiên nhiên',
      description: 'Tất cả sản phẩm đều từ nguyên liệu tự nhiên, mang lại hương thơm đặc trưng và lợi ích sức khỏe.',
      bgColor: 'hover:bg-green-50',
      borderColor: 'hover:border-green-200'
    },
    {
      iconType: 'truck',
      title: 'Miễn phí ship',
      description: 'Miễn phí ship toàn quốc cho đơn hàng từ 300.000đ, giao hàng nhanh chóng và an toàn.',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'hover:border-blue-200'
    },
    {
      iconType: 'chat',
      title: 'Tư vấn tận tâm',
      description: 'Đội ngũ chuyên gia tư vấn nhiệt tình, giúp bạn chọn lựa sản phẩm phù hợp nhất.',
      bgColor: 'hover:bg-purple-50',
      borderColor: 'hover:border-purple-200'
    }
  ];

  const { visibleItems, setRef } = useStaggerAnimation(features, 150);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Tại sao chọn Sơn Mộc Hương?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-orange-600 mx-auto rounded-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={setRef(index)}
              className={`text-center p-6 rounded-2xl border border-transparent transition-all duration-500 cursor-pointer group ${
                feature.bgColor
              } ${feature.borderColor} hover:shadow-xl hover:transform hover:scale-105 hover:-translate-y-2 ${
                visibleItems.has(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex justify-center mb-6 transform transition-transform duration-300 group-hover:scale-110">
                <div className="p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {getFeatureIcon(feature.iconType)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">{feature.description}</p>
              
              {/* Hover indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-0.5 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85"
                alt="Nhang trầm"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85"
                alt="Vòng tay trầm hương"
                className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85"
                alt="Khói nhang"
                className="w-full h-32 object-cover rounded-lg shadow-lg -mt-4"
              />
              <img 
                src="https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85"
                alt="Gỗ trầm hương"
                className="w-full h-32 object-cover rounded-lg shadow-lg mt-4"
              />
            </div>
          </div>

          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Sơn Mộc Hương
              <br />
              <span className="text-amber-800">Trầm hương chất lượng cao</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Sơn Mộc Hương tự hào mang đến cho khách hàng những sản phẩm trầm hương từ thiên nhiên, 
              với nguyên liệu trầm hương nguyên chất được chọn lọc kỹ lưỡng từ những vùng đất nổi tiếng về trầm hương tại Việt Nam.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Trầm hương nguyên chất 100%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Cam kết chất lượng với giá trị thực</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Dịch vụ tận tâm, uy tín</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Miễn phí ship từ 300.000đ</span>
              </div>
            </div>

            <button className="mt-8 bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition-colors">
              Xem ngay
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      const response = await fetch(`${BACKEND_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static products if API fails
      setProducts(getStaticProducts());
    } finally {
      setLoading(false);
    }
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
      detailDescription: 'Tinh dầu trầm hương được chưng cất từ gỗ trầm hương cao cấp, có tác dụng thư giãn tinh thần, giảm stress.'
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
      detailDescription: 'Cảnh trầm hương được chế tác thủ công từ gỗ trầm hương tự nhiên, mang ý nghĩa phong thủy tốt lành.'
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
      detailDescription: 'Nhang tăm trầm hương được làm từ bột trầm hương pha trộn với chất liệu tự nhiên, tạo hương thơm dễ chịu.'
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
      detailDescription: 'Vòng tay trầm hương bọc vàng 24k là sự kết hợp hoàn hảo giữa trầm hương và vàng, tạo nên sản phẩm đẳng cấp.'
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
      detailDescription: 'Bộ phụ kiện xông trầm gồm lư xông gốm sứ, kẹp gỗ, đế xông và các phụ kiện cần thiết để xông trầm hương.'
    }
  ];

  const { visibleItems, setRef } = useStaggerAnimation(products, 100);

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Sản phẩm trầm hương chất lượng cao
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-800 to-orange-600 mx-auto rounded-full mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Khám phá bộ sưu tập trầm hương đa dạng từ Sơn Mộc Hương - từ vòng tay trầm hương đến nhang nụ, 
            tất cả đều được chọn lọc kỹ lưỡng để mang đến cho bạn chất lượng tốt nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              ref={setRef(index)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer group transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 ${
                visibleItems.has(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-800/0 to-amber-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-bounce-in">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
                    <span className="text-amber-800 text-sm font-bold">HOT</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-800 transition-colors duration-300">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-300">
                    <span className="text-amber-800 text-xs">✓</span>
                  </div>
                  <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">{product.material}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 group-hover:animate-pulse">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-amber-600 font-medium group-hover:text-amber-700 transition-colors">Chất lượng cao</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-800 group-hover:animate-pulse">{product.price}</span>
                  <button 
                    className="bg-amber-800 text-white px-4 py-2 rounded-full hover:bg-amber-900 transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group-hover:animate-bounce"
                    onClick={(e) => {
                      e.stopPropagation();
                      onProductClick(product);
                    }}
                  >
                    Mua ngay
                  </button>
                </div>

                {/* Animated progress bar on hover */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <button className="bg-gradient-to-r from-amber-800 to-amber-900 text-white px-8 py-3 rounded-full hover:from-amber-900 hover:to-amber-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
            Xem tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Liên hệ với
              <br />
              Sơn Mộc Hương
            </h2>
            <p className="text-gray-300 mb-8">
              Liên hệ với chúng tôi để được tư vấn về các sản phẩm trầm hương chất lượng cao. 
              Đội ngũ chuyên gia sẽ giúp bạn chọn lựa sản phẩm phù hợp nhất.
            </p>
            <button className="bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition-colors">
              Liên hệ ngay
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Liên hệ với chúng tôi</h3>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Tin nhắn của bạn"
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold"
              >
                Gửi tin nhắn
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <LocationIcon className="w-5 h-5 text-amber-800" />
                  <span className="text-gray-600">3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-amber-800" />
                  <span className="text-gray-600">0762 222 448</span>
                </div>
                <div className="flex items-center space-x-3">
                  <EmailIcon className="w-5 h-5 text-amber-800" />
                  <span className="text-gray-600">sonmochuong@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">SMH</span>
              </div>
              <span className="text-2xl font-bold">Sơn Mộc Hương</span>
            </div>
            <p className="text-gray-400 mb-4">
              Sơn Mộc Hương - Địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao, 
              từ thiên nhiên Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-800 transition-colors">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-amber-800 transition-colors">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-amber-800 transition-colors">YouTube</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Vòng tay trầm hương</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nhang trầm hương</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nụ trầm hương</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tinh dầu trầm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cảnh trầm phong thủy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tư vấn chọn sản phẩm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Miễn phí ship từ 300k</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cam kết chất lượng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hỗ trợ 24/7</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-2">
              <p className="text-gray-400 flex items-center space-x-2">
                <LocationIcon className="w-4 h-4" />
                <span>3/29E đường 182, Phường Tăng Nhơn Phú A, TP. Thủ Đức, TPHCM</span>
              </p>
              <p className="text-gray-400 flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4" />
                <span>0762 222 448</span>
              </p>
              <p className="text-gray-400 flex items-center space-x-2">
                <EmailIcon className="w-4 h-4" />
                <span>sonmochuong@gmail.com</span>
              </p>
              <p className="text-gray-400 flex items-center space-x-2">
                <ClockIcon className="w-4 h-4" />
                <span>Thứ 2 - Chủ nhật: 8:00 - 20:00</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Sơn Mộc Hương. Tất cả quyền được bảo lưu.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Liên hệ</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Product Detail Modal Component
export const ProductDetailModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedSize);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Chi tiết sản phẩm</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-6">{product.detailDescription}</p>
              
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews?.length || 0} đánh giá)</span>
                </div>
                <p className="text-gray-600">Chất liệu: {product.material}</p>
              </div>

              {/* Size Selection */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Chọn kích cỡ:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedSize === size 
                            ? 'border-amber-800 bg-amber-800 text-white' 
                            : 'border-gray-300 hover:border-amber-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Số lượng:</h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-amber-800 mb-4">{product.price}</div>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button 
                    onClick={handleBuyNow}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="text-2xl font-bold mb-6">Đánh giá khách hàng</h3>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold">{review.name}</span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Giỏ hàng</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
              <button 
                onClick={onClose}
                className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.selectedSize && (
                        <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                      )}
                      <p className="text-amber-800 font-bold">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  {totalPrice < 300000 && (
                    <div className="text-sm text-amber-600">
                      Mua thêm {formatPrice(300000 - totalPrice)} để được miễn phí ship
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-amber-800">{formatPrice(totalPrice + shippingFee)}</span>
                  </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Thanh toán</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Thông tin giao hàng</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Địa chỉ giao hàng *</label>
                  <textarea
                    required
                    rows="3"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ghi chú</label>
                  <textarea
                    rows="2"
                    value={customerInfo.note}
                    onChange={(e) => setCustomerInfo({...customerInfo, note: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-800"
                    placeholder="Ghi chú thêm cho đơn hàng..."
                  ></textarea>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Phương thức thanh toán</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-800"
                    />
                    <div>
                      <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                      <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-800"
                    />
                    <div>
                      <div className="font-medium">Chuyển khoản ngân hàng</div>
                      <div className="text-sm text-gray-600">Chuyển khoản trước khi giao hàng</div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank' && (
                  <div className="mt-4 p-4 bg-amber-50 rounded-lg">
                    <h4 className="font-bold mb-2">Thông tin chuyển khoản:</h4>
                    <div className="text-sm space-y-1">
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
              <h3 className="text-xl font-bold mb-4">Đơn hàng của bạn</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-600">
                          {item.selectedSize && `Size: ${item.selectedSize} - `}
                          Số lượng: {item.quantity}
                        </div>
                      </div>
                      <div className="font-medium">
                        {formatPrice(parseInt(item.price.replace(/[.,đ]/g, '')) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-amber-800">{formatPrice(totalPrice + shippingFee)}</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-6 bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold"
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
    <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-[60] animate-slide-in-right">
      <div className="flex items-center space-x-3">
        <div className="bg-white bg-opacity-20 rounded-full p-1">
          <span className="text-lg">✓</span>
        </div>
        <span className="font-medium">{message}</span>
        <button 
          onClick={onClose}
          className="text-white hover:text-gray-200 text-xl ml-2"
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