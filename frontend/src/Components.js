import React, { useState } from 'react';

// Header Component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">SMH</span>
            </div>
            <span className="text-2xl font-bold text-amber-800">Sơn Mộc Hương</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">Trang chủ</a>
            <a href="#about" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">Giới thiệu</a>
            <a href="#products" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">Sản phẩm</a>
            <a href="#contact" className="text-gray-700 hover:text-amber-800 transition-colors font-medium">Liên hệ</a>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-sm">
              <div className="text-gray-600">📞 0762 222 448</div>
              <div className="text-gray-600">✉️ sonmochuong@gmail.com</div>
            </div>
            <button className="bg-amber-800 text-white px-6 py-2 rounded-full hover:bg-amber-900 transition-colors">
              Mua ngay
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center">
              <span className={`block h-0.5 w-6 bg-gray-600 transform transition ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 my-1 transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-gray-600 transform transition ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-gray-700 hover:text-amber-800 transition-colors">Trang chủ</a>
              <a href="#about" className="text-gray-700 hover:text-amber-800 transition-colors">Giới thiệu</a>
              <a href="#products" className="text-gray-700 hover:text-amber-800 transition-colors">Sản phẩm</a>
              <a href="#contact" className="text-gray-700 hover:text-amber-800 transition-colors">Liên hệ</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Hero Section Component
export const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Trầm Hương Thiên Nhiên
                <br />
                <span className="text-amber-800">Chất lượng cao từ</span>
                <br />
                <span className="text-amber-800">đất Việt Nam</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md">
                Sơn Mộc Hương - Địa chỉ uy tín chuyên cung cấp các sản phẩm trầm hương chất lượng cao, 
                vòng tay trầm, nhang trầm và phụ kiện xông trầm đa dạng từ thiên nhiên Việt Nam.
              </p>
              <button className="bg-amber-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-900 transition-colors shadow-lg">
                Xem thêm
              </button>
            </div>

            <div className="flex space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-800">50+</div>
                <div className="text-gray-600">Sản phẩm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-800">300+</div>
                <div className="text-gray-600">Khách hàng</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg"
                  alt="Meditation Space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg"
                  alt="Trầm hương"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
export const FeaturesSection = () => {
  const features = [
    {
      icon: '🏆',
      title: 'Chuyên nghiệp',
      description: 'Hơn 10 năm kinh nghiệm trong lĩnh vực trầm hương và các sản phẩm thiền định.'
    },
    {
      icon: '🌿',
      title: 'Không gian thư giãn',
      description: 'Mang đến không gian an yên với hương thơm tự nhiên từ trầm hương chất lượng cao.'
    },
    {
      icon: '📱',
      title: 'Lộ trình linh hoạt',
      description: 'Tư vấn chọn sản phẩm phù hợp với nhu cầu và sở thích của từng khách hàng.'
    },
    {
      icon: '📞',
      title: 'Tư vấn miễn phí',
      description: 'Tư vấn chi tiết về cách sử dụng và bảo quản sản phẩm trầm hương một cách tốt nhất.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
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
              Đến với Trầm Hương
              <br />
              <span className="text-amber-800">Cuộc sống nhẹ nhàng hơn</span>
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Chúng tôi mang đến cho bạn những sản phẩm trầm hương cao cấp, được tuyển chọn kỹ lưỡng từ những vùng đất nổi tiếng với trầm hương chất lượng tốt nhất.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Hỗp mỗi lòn mối ngủ</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Tiết kiệm chi phí</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Hướng tư vấn miễn phí</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-gray-700">Dịch vụ chăm sóc chu đáo</span>
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
export const ProductsSection = () => {
  const products = [
    {
      id: 1,
      name: 'Prenatal Trầm Hương',
      description: 'Vòng tay trầm hương cao cấp, mang lại sự bình an và may mắn.',
      price: '2,500,000đ',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      instructor: 'Nguyễn Thị Lan',
      duration: '45 phút',
      rating: 4.9
    },
    {
      id: 2,
      name: 'Bikram Trầm',
      description: 'Nhang trầm hương thơm nhẹ, tạo không gian thư giãn hoàn hảo.',
      price: '450,000đ',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
      instructor: 'Lê Văn Minh',
      duration: '60 phút',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Restorative Trầm',
      description: 'Nụ trầm hương cao cấp, cháy lâu và tỏa hương đều.',
      price: '1,200,000đ',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      instructor: 'Trần Thị Mai',
      duration: '30 phút',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Power Trầm',
      description: 'Tinh dầu trầm hương nguyên chất, dùng cho liệu pháp thư giãn.',
      price: '3,500,000đ',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxhZ2Fyd29vZCUyMG9pbHxlbnwwfHx8fDE3NTE0Mjk4NzN8MA&ixlib=rb-4.1.0&q=85',
      instructor: 'Phạm Văn Tuấn',
      duration: '90 phút',
      rating: 4.7
    },
    {
      id: 5,
      name: 'Yin Trầm',
      description: 'Cảnh trầm hương tự nhiên, làm đồ trang trí và phong thủy.',
      price: '5,800,000đ',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85',
      instructor: 'Vũ Thị Hồng',
      duration: '75 phút',
      rating: 4.8
    },
    {
      id: 6,
      name: 'Ashtanga Trầm',
      description: 'Bộ sưu tập trầm hương hỗn hợp, đa dạng mùi hương.',
      price: '2,200,000đ',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHx3b29kZW4lMjBiZWFkc3xlbnwwfHx8fDE3NTE0Mjk4OTR8MA&ixlib=rb-4.1.0&q=85',
      instructor: 'Đỗ Văn Hùng',
      duration: '50 phút',
      rating: 4.6
    },
    {
      id: 7,
      name: 'Vinyasa Trầm',
      description: 'Nhang côn trầm hương, dễ sử dụng và thích hợp cho mọi không gian.',
      price: '680,000đ',
      image: 'https://images.unsplash.com/photo-1608393189376-5264bcca3582?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHZ2aWV0bmFtZXNlJTIwYWdhcndvb2R8ZW58MHx8fHwxNzUxNDI5ODg0fDA&ixlib=rb-4.1.0&q=85',
      instructor: 'Bùi Thị Lan',
      duration: '40 phút',
      rating: 4.7
    },
    {
      id: 8,
      name: 'Hatha Trầm',
      description: 'Gỗ trầm hương nguyên khối, dùng để đốt trực tiếp hoặc trang trí.',
      price: '8,900,000đ',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      instructor: 'Hoàng Văn Nam',
      duration: '65 phút',
      rating: 4.9
    }
  ];

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Tham gia lớp học Trầm Hương</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến cho bạn những sản phẩm trầm hương chất lượng cao, 
            giúp bạn có được những phút giây thư giãn và bình an trong cuộc sống.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Nổi bật
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-600">{product.instructor}</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">{product.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-800">{product.price}</span>
                  <button className="bg-amber-800 text-white px-4 py-2 rounded-full hover:bg-amber-900 transition-colors text-sm">
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-amber-800 text-white px-8 py-3 rounded-full hover:bg-amber-900 transition-colors">
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
              Let You Talk To
              <br />
              Trầm Hương Trainer
            </h2>
            <p className="text-gray-300 mb-8">
              Liên hệ với chúng tôi để được tư vấn về các sản phẩm trầm hương phù hợp nhất với nhu cầu của bạn.
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
                  <span className="text-amber-800">📍</span>
                  <span className="text-gray-600">123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-amber-800">📞</span>
                  <span className="text-gray-600">0909 123 456</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-amber-800">✉️</span>
                  <span className="text-gray-600">tramhuong@shop.com</span>
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
                <span className="text-white font-bold text-xl">TH</span>
              </div>
              <span className="text-2xl font-bold">Trầm Hương Shop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Mang đến cho bạn những sản phẩm trầm hương cao cấp, giúp tạo không gian thư giãn và bình an.
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
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nhang trầm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nụ trầm hương</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tinh dầu trầm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cảnh trầm</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tư vấn sản phẩm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Giao hàng tận nơi</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bảo hành sản phẩm</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Hỗ trợ 24/7</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <div className="space-y-2">
              <p className="text-gray-400">📍 123 Đường ABC, Quận 1, TP.HCM</p>
              <p className="text-gray-400">📞 0909 123 456</p>
              <p className="text-gray-400">✉️ tramhuong@shop.com</p>
              <p className="text-gray-400">🕐 Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 Trầm Hương Shop. Tất cả quyền được bảo lưu.</p>
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