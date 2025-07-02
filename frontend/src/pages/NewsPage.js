import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { newsData } from '../data/newsData';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsRef, isNewsVisible] = useScrollAnimation(0.1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Simulate loading for smooth entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setVisibleCards(prev => new Set([...prev, index]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const cards = document.querySelectorAll('[data-index]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Enhanced scroll and parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const parallaxSpeed = 0.5;
        heroRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['all', 'Kiến thức', 'Sức khỏe', 'Hướng dẫn', 'Văn hóa', 'Đầu tư', 'Xu hướng', 'Phong thủy', 'Y học', 'Lịch sử', 'Kỹ thuật', 'Kinh nghiệm', 'Spa & Wellness', 'Tâm linh', 'Thị trường', 'Bảo dưỡng', 'Liệu pháp', 'An toàn', 'Kiến trúc', 'Môi trường', 'Công nghệ', 'Nghệ thuật', 'Ẩm thực', 'Pháp lý', 'Nghiên cứu', 'Tương lai'];

  const filteredNews = selectedCategory === 'all' 
    ? newsData.filter(item => 
        searchTerm === '' || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : newsData.filter(item => 
        item.category === selectedCategory && 
        (searchTerm === '' || 
         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10 min-h-screen transition-colors duration-500 overflow-hidden">
      
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative py-20 bg-gradient-to-r from-amber-800/10 to-orange-600/10 dark:from-amber-500/20 dark:to-orange-500/20 overflow-hidden">
        {/* Animated Background Elements */}
        <div ref={heroRef} className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-orange-300 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-amber-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 dark:text-amber-100 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-amber-800 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent animate-gradient-x">
                Tin Tức
              </span>
              <br />
              <span className="text-amber-800 dark:text-amber-300 block mt-2 text-4xl md:text-5xl">Trầm Hương</span>
            </h1>
          </div>
          
          <div className="w-40 h-1.5 bg-gradient-to-r from-amber-800 via-orange-600 to-amber-800 dark:from-amber-400 dark:via-orange-400 dark:to-amber-400 mx-auto rounded-full mb-8 animate-fade-in-up animate-shimmer" style={{ animationDelay: '0.3s' }}></div>
          
          <p className="text-xl text-gray-600 dark:text-amber-200 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Khám phá thế giới trầm hương qua những bài viết chuyên sâu, từ kiến thức cơ bản đến xu hướng hiện đại. 
            <br className="hidden md:block" />
            <span className="text-amber-700 dark:text-amber-300 font-medium">Cập nhật thông tin mới nhất về văn hóa, sức khỏe và nghệ thuật sống với trầm hương.</span>
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-8 py-5 pl-16 pr-12 text-lg border-2 border-amber-200 dark:border-amber-600/30 rounded-2xl focus:outline-none focus:border-amber-600 dark:focus:border-amber-400 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-500 shadow-xl focus:shadow-2xl group-hover:shadow-xl transform focus:scale-105"
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-all duration-300 hover:scale-110 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-orange-200/20 dark:from-amber-600/10 dark:to-orange-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 dark:bg-amber-300 rounded-full opacity-20 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Enhanced Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`group px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 hover:shadow-2xl transform hover:scale-110 hover:-translate-y-1 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white shadow-2xl scale-110 -translate-y-1'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:border-amber-400 dark:hover:border-amber-500'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="relative z-10">
                {category === 'all' ? 'Tất cả' : category}
              </span>
              <div className={`absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                selectedCategory === category ? 'opacity-100' : ''
              }`}></div>
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <span className="text-amber-800 dark:text-amber-400 font-bold text-xl">{filteredNews.length}</span> bài viết
            {searchTerm && (
              <span> cho "<span className="font-semibold text-amber-800 dark:text-amber-400">{searchTerm}</span>"</span>
            )}
            {selectedCategory !== 'all' && !searchTerm && (
              <span> trong danh mục <span className="font-semibold text-amber-800 dark:text-amber-400">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Enhanced News Grid with Staggered Animations */}
        <div className="relative">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden animate-pulse">
                  <div className="w-full h-56 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"></div>
                  <div className="p-8 space-y-4">
                    <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-2/3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-1/3"></div>
                      <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-8 animate-bounce">
                <svg className="w-20 h-20 text-amber-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Không tìm thấy bài viết</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                {searchTerm 
                  ? `Không có bài viết nào phù hợp với từ khóa "${searchTerm}"`
                  : 'Không có bài viết nào trong danh mục này'
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-8 py-4 rounded-2xl hover:from-amber-900 hover:to-amber-800 dark:hover:from-amber-700 dark:hover:to-amber-600 transition-all duration-500 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Xem tất cả bài viết
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <article 
                  key={news.id}
                  data-index={index}
                  className={`group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-xl dark:shadow-amber-900/20 overflow-hidden hover:shadow-2xl dark:hover:shadow-amber-500/30 transition-all duration-700 hover:transform hover:scale-105 hover:-translate-y-3 cursor-pointer border border-gray-100/50 dark:border-amber-700/30 ${
                    visibleCards.has(index) ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onClick={() => navigate(`/news/${news.id}`)}
                >
                  {/* Enhanced Image Section */}
                  <div className="relative overflow-hidden h-56">
                    <img 
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 ease-out"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 transform group-hover:scale-110 transition-transform duration-300">
                      <span className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                        {news.category}
                      </span>
                    </div>
                    
                    {/* Read Time */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm text-amber-800 dark:text-amber-400 font-semibold flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {news.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Floating Read Button */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <button className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Content Section */}
                  <div className="p-8 relative">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 dark:text-amber-100 mb-4 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-500 line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-amber-200/80 text-sm mb-6 line-clamp-3 transition-colors duration-500 leading-relaxed">
                      {news.excerpt}
                    </p>
                    
                    {/* Author & Date */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-amber-300/70 mb-6">
                      <span className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <span className="text-white font-bold text-sm">
                            {news.author.split(' ').pop().charAt(0)}
                          </span>
                        </div>
                        <span className="dark:text-amber-200 font-medium">{news.author}</span>
                      </span>
                      <span className="dark:text-amber-200 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                        {formatDate(news.date)}
                      </span>
                    </div>

                    {/* Enhanced Action Button */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/news/${news.id}`);
                        }}
                        className="group/btn text-amber-800 dark:text-amber-300 font-semibold text-sm hover:text-amber-900 dark:hover:text-amber-200 transition-all duration-300 flex items-center space-x-2"
                      >
                        <span>Đọc thêm</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-600/30 dark:to-amber-500/30 rounded-full flex items-center justify-center group-hover:from-amber-200 group-hover:to-amber-300 dark:group-hover:from-amber-500/50 dark:group-hover:to-amber-400/50 transition-all duration-500 shadow-md group-hover:shadow-lg transform group-hover:rotate-12">
                        <span className="text-amber-800 dark:text-amber-300 text-sm">📖</span>
                      </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="mt-6 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 dark:from-amber-400 dark:via-orange-400 dark:to-amber-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"></div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default NewsPage;