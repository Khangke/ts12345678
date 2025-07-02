import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../Icons';
import { newsData } from '../data/newsData';

const NewsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [readProgress, setReadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newsData = [
    {
      id: 1,
      title: "Bí mật của trầm hương tự nhiên: Cách nhận biết trầm thật và giả",
      category: "Kiến thức",
      excerpt: "Trầm hương thật có những đặc điểm riêng biệt. Hãy cùng tìm hiểu cách phân biệt trầm hương tự nhiên với hàng giả để đầu tư đúng giá trị.",
      content: `
        <div class="prose prose-lg max-w-none dark:prose-invert">
          <p class="text-lg text-gray-700 dark:text-amber-200 mb-6 leading-relaxed">Trầm hương được mệnh danh là "vàng của rừng", nhưng làm sao để phân biệt được trầm hương thật và giả? Đây là câu hỏi mà nhiều người quan tâm đến trầm hương thường đặt ra.</p>
          
          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">1. Quan sát bằng mắt thường</h3>
          <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-600/30 mb-6">
            <ul class="space-y-3">
              <li class="flex items-start space-x-3">
                <span class="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                <div>
                  <strong class="text-gray-800 dark:text-amber-100">Trầm thật:</strong> 
                  <span class="text-gray-700 dark:text-amber-200"> Có vân gỗ tự nhiên, màu sắc không đều, có những đường vân kẽ chỉ đặc trưng</span>
                </div>
              </li>
              <li class="flex items-start space-x-3">
                <span class="text-red-500 font-bold">✗</span>
                <div>
                  <strong class="text-gray-800 dark:text-amber-100">Trầm giả:</strong> 
                  <span class="text-gray-700 dark:text-amber-200"> Màu sắc đồng đều, vân gỗ giả tạo, thường có màu đen đậm bất thường</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZXh0cmFjdGlvbnxlbnwwfHx8fDE3NTE0Mjk4Njh8MA&ixlib=rb-4.1.0&q=85",
      author: "Chuyên gia Nguyễn Văn Minh",
      date: "2025-01-02",
      readTime: "8 phút đọc"
    },
    {
      id: 2,
      title: "Lợi ích tuyệt vời của trầm hương đối với sức khỏe và tâm linh",
      category: "Sức khỏe",
      excerpt: "Khám phá những tác dụng kỳ diệu của trầm hương trong việc cải thiện sức khỏe tinh thần, giảm stress và tăng cường năng lượng tích cực.",
      content: `
        <div class="prose prose-lg max-w-none dark:prose-invert">
          <p class="text-lg text-gray-700 dark:text-amber-200 mb-6 leading-relaxed">Trầm hương không chỉ có giá trị kinh tế cao mà còn mang lại nhiều lợi ích thiết thực cho sức khỏe và đời sống tinh thần của con người.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85",
      author: "Tiến sĩ Trần Thị Lan",
      date: "2025-01-01",
      readTime: "6 phút đọc"
    },
    {
      id: 3,
      title: "Cách bảo quản trầm hương đúng cách để giữ được hương thơm lâu dài",
      category: "Hướng dẫn",
      excerpt: "Hướng dẫn chi tiết cách bảo quản vòng tay trầm hương, nhang trầm và các sản phẩm trầm hương khác để duy trì chất lượng tốt nhất.",
      content: `<div class="prose prose-lg max-w-none dark:prose-invert"><p class="text-lg text-gray-700 dark:text-amber-200 mb-6 leading-relaxed">Trầm hương là sản phẩm tự nhiên cần được bảo quản đúng cách để duy trì hương thơm và chất lượng trong thời gian dài.</p></div>`,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib3h8ZW58MHx8fHwxNzUxNDI5ODczfDA&ixlib=rb-4.1.0&q=85",
      author: "Thầy Phạm Minh Đức",
      date: "2024-12-30",
      readTime: "5 phút đọc"
    }
  ];

  const news = newsData.find(item => item.id === parseInt(id));

  if (!news) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-amber-100 mb-4">Bài viết không tồn tại</h1>
          <Link to="/news" className="text-amber-800 dark:text-amber-300 hover:underline">
            ← Quay lại trang tin tức
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`pt-20 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10 min-h-screen transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 transition-all duration-300 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col space-y-3">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <button 
          onClick={() => navigate('/news')}
          className="w-12 h-12 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Enhanced Back Navigation */}
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in-left">
          <button 
            onClick={() => navigate('/news')}
            className="group flex items-center space-x-3 text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 transition-all duration-500 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-600/30 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-500/50 transition-colors duration-300">
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-semibold">Quay lại tin tức</span>
          </button>
        </div>
      </div>

      {/* Enhanced Article Header */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Category Badge */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="inline-flex items-center bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {news.category}
            </span>
          </div>

          {/* Enhanced Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-amber-100 mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="bg-gradient-to-r from-gray-800 via-amber-800 to-gray-800 dark:from-amber-100 dark:via-amber-300 dark:to-amber-100 bg-clip-text text-transparent animate-gradient-x">
              {news.title}
            </span>
          </h1>

          {/* Enhanced Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-amber-300/70 mb-10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center space-x-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">
                  {news.author.split(' ').pop().charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-amber-200">✍️ {news.author}</p>
                <p className="text-xs text-gray-500 dark:text-amber-300/70">Tác giả</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium dark:text-amber-200">{formatDate(news.date)}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium dark:text-amber-200">{news.readTime}</span>
            </div>
          </div>

          {/* Enhanced Featured Image */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl dark:shadow-amber-900/30 transform hover:scale-105 transition-all duration-700">
              <img 
                src={news.image}
                alt={news.title}
                className="w-full h-72 md:h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <p className="text-lg font-semibold mb-2">{news.title}</p>
                <p className="text-sm text-gray-200">{news.excerpt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Article Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl dark:shadow-amber-900/30 border border-gray-100 dark:border-amber-700/30 overflow-hidden animate-fade-in-up" style={{ animationDelay: '1s' }}>
            
            {/* Enhanced Excerpt */}
            <div className="relative">
              <div className="text-xl text-gray-700 dark:text-amber-200 p-8 md:p-12 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 dark:from-amber-900/30 dark:via-orange-900/30 dark:to-amber-900/30 leading-relaxed border-l-8 border-amber-600 dark:border-amber-400">
                <div className="absolute top-4 left-4 text-6xl text-amber-300 dark:text-amber-600 opacity-50 font-serif">"</div>
                <p className="italic text-lg md:text-xl pl-8">
                  {news.excerpt}
                </p>
                <div className="absolute bottom-4 right-4 text-6xl text-amber-300 dark:text-amber-600 opacity-50 font-serif rotate-180">"</div>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-amber-800 dark:prose-headings:text-amber-300 prose-a:text-amber-700 dark:prose-a:text-amber-400 prose-strong:text-amber-900 dark:prose-strong:text-amber-200"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>

            {/* Article Footer */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-8 md:p-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-800/50">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {news.author.split(' ').pop().charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-amber-100">{news.author}</h4>
                    <p className="text-sm text-gray-600 dark:text-amber-300/70">Chuyên gia trầm hương</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Yêu thích</span>
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Suggestion */}
          <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <button 
              onClick={() => navigate('/news')}
              className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 hover:from-amber-900 hover:to-amber-800 dark:hover:from-amber-700 dark:hover:to-amber-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 text-lg"
            >
              Đọc thêm bài viết khác →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;