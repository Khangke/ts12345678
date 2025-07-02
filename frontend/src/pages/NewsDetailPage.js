import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../Icons';

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

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">2. Kiểm tra mùi hương</h3>
          <p class="mb-6 text-gray-700 dark:text-amber-200 leading-relaxed">Trầm hương thật có mùi thơm nhẹ nhàng, thanh tao, không gắt. Khi đốt, hương thơm lan tỏa đều và bền lâu. Trầm giả thường có mùi hắc hoặc quá nồng, gây khó chịu khi hít vào.</p>

          <div class="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-xl border border-amber-300 dark:border-amber-600/50 mb-6">
            <h4 class="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3">💡 Mẹo nhận biết:</h4>
            <p class="text-gray-700 dark:text-amber-200">Trầm hương thật khi cạo nhẹ sẽ có mùi thơm thoang thoảng. Nếu phải cạo mạnh mới có mùi hoặc mùi quá nồng thì có thể là hàng giả.</p>
          </div>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">3. Test chìm nước</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Trầm hương chất lượng cao có tỷ trọng lớn sẽ chìm xuống nước. Tuy nhiên, không phải trầm chìm nước nào cũng là trầm thật, cần kết hợp nhiều yếu tố khác để đánh giá chính xác.</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-600/30">
              <h5 class="font-semibold text-green-800 dark:text-green-300 mb-2">✓ Trầm chìm nước thật</h5>
              <p class="text-sm text-green-700 dark:text-green-200">Chìm từ từ, không tạo bọt khí, nước vẫn trong</p>
            </div>
            <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-600/30">
              <h5 class="font-semibold text-red-800 dark:text-red-300 mb-2">✗ Trầm giả</h5>
              <p class="text-sm text-red-700 dark:text-red-200">Nổi hoặc chìm nhanh, có thể tạo bọt, nước bị đục</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">4. Kiểm tra nguồn gốc</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Chọn mua từ những nhà cung cấp uy tín, có giấy tờ chứng nhận nguồn gốc xuất xứ rõ ràng. Tránh mua từ những nguồn không rõ ràng hoặc giá quá rẻ so với thị trường.</p>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-600/30 mb-6">
            <h4 class="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-3">⚠️ Lưu ý quan trọng:</h4>
            <ul class="space-y-2 text-yellow-700 dark:text-yellow-200">
              <li>• Không nên chỉ dựa vào một yếu tố để đánh giá</li>
              <li>• Cần tìm hiểu kỹ về người bán và nguồn gốc sản phẩm</li>
              <li>• Nếu không am hiểu, nên nhờ chuyên gia tư vấn</li>
              <li>• Giá quá rẻ thường là dấu hiệu của hàng giả</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">5. Kết luận</h3>
          <p class="text-gray-700 dark:text-amber-200 leading-relaxed">Việc nhận biết trầm hương thật giả đòi hỏi kinh nghiệm và kiến thức. Hãy luôn thận trọng khi mua và không ngần ngại hỏi ý kiến chuyên gia. Đầu tư vào trầm hương thật sẽ mang lại giá trị lâu dài và sự an tâm cho người sử dụng.</p>
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
          
          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">1. Tác dụng thư giãn tinh thần</h3>
          <p class="mb-6 text-gray-700 dark:text-amber-200 leading-relaxed">Hương thơm của trầm hương có khả năng kích thích hệ thần kinh phó giao cảm, giúp cơ thể thư giãn, giảm căng thẳng và lo âu hiệu quả. Các nghiên cứu khoa học đã chứng minh rằng việc hít hương trầm có thể làm giảm nồng độ cortisol - hormone gây stress trong máu.</p>

          <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-600/30 mb-6">
            <h4 class="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-3">🧠 Cơ chế hoạt động:</h4>
            <ul class="space-y-2 text-blue-700 dark:text-blue-200">
              <li>• Kích thích giải phóng endorphin tự nhiên</li>
              <li>• Tăng cường hoạt động của hệ thần kinh phó giao cảm</li>
              <li>• Giảm sản xuất hormone stress cortisol</li>
              <li>• Cân bằng các chất dẫn truyền thần kinh</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">2. Cải thiện chất lượng giấc ngủ</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Xông trầm hương trước khi ngủ giúp tạo không gian yên tĩnh, thúc đẩy giấc ngủ sâu và chất lượng. Nhiều người sử dụng trầm hương đã báo cáo giảm thời gian rơi vào giấc ngủ và ít bị thức giấc trong đêm.</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-600/30 text-center">
              <div class="text-2xl mb-2">🌙</div>
              <h5 class="font-semibold text-purple-800 dark:text-purple-300 mb-1">Ngủ sâu hơn</h5>
              <p class="text-sm text-purple-700 dark:text-purple-200">Tăng 30% thời gian ngủ sâu</p>
            </div>
            <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-600/30 text-center">
              <div class="text-2xl mb-2">⏰</div>
              <h5 class="font-semibold text-indigo-800 dark:text-indigo-300 mb-1">Ngủ nhanh hơn</h5>
              <p class="text-sm text-indigo-700 dark:text-indigo-200">Giảm 40% thời gian rơi vào giấc ngủ</p>
            </div>
            <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-600/30 text-center">
              <div class="text-2xl mb-2">😴</div>
              <h5 class="font-semibold text-green-800 dark:text-green-300 mb-1">Ít thức giấc</h5>
              <p class="text-sm text-green-700 dark:text-green-200">Giảm 50% số lần thức giấc</p>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">3. Tăng cường khả năng tập trung</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Nhiều nghiên cứu cho thấy hương trầm giúp cải thiện khả năng tập trung và làm việc hiệu quả hơn. Đặc biệt hữu ích cho những người làm việc trí óc hoặc học sinh, sinh viên cần tập trung cao độ.</p>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">4. Hỗ trợ thiền định và yoga</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Trầm hương được sử dụng rộng rãi trong các buổi thiền và yoga để tạo không gian thiêng liêng, giúp tâm trí an tĩnh và đạt được trạng thái mindfulness sâu hơn.</p>

          <h3 class="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-6 border-l-4 border-amber-600 dark:border-amber-400 pl-4">5. Thanh lọc không khí</h3>
          <p class="mb-4 text-gray-700 dark:text-amber-200 leading-relaxed">Khói trầm hương có tác dụng khử trùng, thanh lọc không khí, loại bỏ các vi khuẩn có hại trong môi trường, tạo ra không gian sống trong lành và an toàn.</p>

          <div class="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-600/30 mb-6">
            <h4 class="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-3">🌿 Lưu ý sử dụng an toàn:</h4>
            <ul class="space-y-2 text-amber-700 dark:text-amber-200">
              <li>• Sử dụng trong không gian thông thoáng</li>
              <li>• Không xông quá lâu (tối đa 30 phút/lần)</li>
              <li>• Tránh sử dụng khi có trẻ nhỏ hoặc người mẫn cảm</li>
              <li>• Chọn trầm hương chất lượng cao, không hóa chất</li>
            </ul>
          </div>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85",
      author: "Tiến sĩ Trần Thị Lan",
      date: "2025-01-01",
      readTime: "6 phút đọc"
    },
    // Thêm các bài viết khác tương tự...
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

      {/* Article Header */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {news.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-amber-100 mb-6 leading-tight">
            {news.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center space-x-6 text-gray-600 dark:text-amber-300/70 mb-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-100 dark:bg-amber-600/30 rounded-full flex items-center justify-center">
                <span className="text-amber-800 dark:text-amber-300 font-bold text-sm">A</span>
              </div>
              <span className="dark:text-amber-200">✍️ {news.author}</span>
            </div>
            <span className="dark:text-amber-200">📅 {formatDate(news.date)}</span>
            <span className="dark:text-amber-200">⏱️ {news.readTime}</span>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl dark:shadow-amber-900/30">
            <img 
              src={news.image}
              alt={news.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800/90 dark:backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-amber-900/20 p-8 md:p-12 border border-gray-100 dark:border-amber-700/30">
            
            {/* Excerpt */}
            <div className="text-xl text-gray-600 dark:text-amber-200/90 mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-amber-600 dark:border-amber-400 italic leading-relaxed">
              {news.excerpt}
            </div>

            {/* Main Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-amber dark:prose-headings:text-amber-200 dark:prose-p:text-amber-100 dark:prose-strong:text-amber-200 dark:prose-li:text-amber-100"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />

            {/* Tags/Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-amber-700/30">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-3 mb-4 md:mb-0">
                  <span className="text-gray-600 dark:text-amber-300 font-medium">Tags:</span>
                  <span className="bg-amber-100 dark:bg-amber-600/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm">
                    {news.category}
                  </span>
                  <span className="bg-amber-100 dark:bg-amber-600/30 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full text-sm">
                    Trầm hương
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 dark:text-amber-300 font-medium">Chia sẻ:</span>
                  <button className="text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 transition-colors">
                    📘 Facebook
                  </button>
                  <button className="text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 transition-colors">
                    🐦 Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-amber-100 mb-8 text-center">
              Bài viết liên quan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {newsData.filter(item => item.id !== news.id).slice(0, 2).map((relatedNews) => (
                <Link
                  key={relatedNews.id}
                  to={`/news/${relatedNews.id}`}
                  className="group bg-white dark:bg-gray-800/90 dark:backdrop-blur-sm rounded-xl shadow-lg dark:shadow-amber-900/20 overflow-hidden hover:shadow-2xl dark:hover:shadow-amber-500/30 transition-all duration-500 hover:transform hover:scale-105 border border-gray-100 dark:border-amber-700/30"
                >
                  <img 
                    src={relatedNews.image}
                    alt={relatedNews.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="p-6">
                    <span className="bg-amber-800 dark:bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {relatedNews.category}
                    </span>
                    <h4 className="text-lg font-bold text-gray-800 dark:text-amber-100 mt-3 mb-2 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
                      {relatedNews.title}
                    </h4>
                    <p className="text-gray-600 dark:text-amber-200/80 text-sm line-clamp-2">
                      {relatedNews.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;