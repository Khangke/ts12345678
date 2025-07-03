import React, { useState } from 'react';
import { ChevronDownIcon, CloseIcon } from '../Icons';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const categories = [
    { id: 'all', name: 'Tất cả', color: 'amber' },
    { id: 'guide', name: 'Hướng dẫn', color: 'blue' },
    { id: 'health', name: 'Sức khỏe', color: 'green' },
    { id: 'culture', name: 'Văn hóa', color: 'purple' },
    { id: 'investment', name: 'Đầu tư', color: 'red' },
    { id: 'lifestyle', name: 'Phong cách', color: 'pink' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Cách phân biệt trầm hương thật và giả',
      excerpt: 'Hướng dẫn chi tiết các phương pháp nhận biết trầm hương chất lượng cao và tránh mua phải hàng giả.',
      category: 'guide',
      readTime: '5 phút đọc',
      date: '15/12/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwc3RpY2tzfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85',
      content: `Trầm hương là một trong những loại gỗ quý hiếm nhất thế giới, có giá trị cao cả về mặt kinh tế lẫn tinh thần. Tuy nhiên, trên thị trường hiện nay có rất nhiều sản phẩm trầm hương giả hoặc chất lượng kém được bán với giá cao. Để tránh bị lừa dối, bạn cần biết cách phân biệt trầm hương thật và giả.

**1. Quan sát màu sắc và vân gỗ**

Trầm hương thật thường có màu nâu đến nâu đen, với những vân gỗ tự nhiên không đều đặn. Vân gỗ phải mịn màng, có độ bóng tự nhiên. Trầm hương giả thường có màu sắc đồng đều, vân gỗ nhân tạo hoặc được sơn màu.

**2. Kiểm tra mùi hương**

Đây là cách quan trọng nhất để nhận biết trầm hương thật. Trầm hương chất lượng cao có mùi hương đặc trưng, ngọt ngào, ấm áp và bền lâu. Khi đốt, khói sẽ có màu trắng và hương thơm lan tỏa đều. Trầm hương giả thường có mùi nhựa thông, khó chịu hoặc không có mùi gì.

**3. Thử nghiệm chìm nước**

Trầm hương chất lượng cao (trầm chìm) sẽ chìm xuống nước do mật độ cao. Tuy nhiên, không phải tất cả trầm hương thật đều chìm nước, vì vậy đây chỉ là một trong các tiêu chí tham khảo.

**4. Kiểm tra giá cả**

Trầm hương thật có giá rất cao do sự khan hiếm. Nếu gặp sản phẩm có giá quá rẻ so với thị trường, bạn cần cảnh giác vì có thể đó là hàng giả.

**5. Mua từ nguồn uy tín**

Để đảm bảo chất lượng, bạn nên mua trầm hương từ những cơ sở có uy tín, có chứng nhận chất lượng và cam kết đổi trả nếu sản phẩm không đúng mô tả.

Việc đầu tư vào trầm hương chất lượng cao không chỉ mang lại giá trị sưu tầm mà còn có tác dụng tốt cho sức khỏe và tinh thần. Hãy trang bị cho mình những kiến thức cần thiết để có thể lựa chọn được sản phẩm trầm hương chất lượng nhất.`
    },
    {
      id: 2,
      title: 'Công dụng của trầm hương đối với sức khỏe và tinh thần',
      excerpt: 'Tìm hiểu về những lợi ích tuyệt vời của trầm hương trong việc thư giãn, giảm stress và cải thiện sức khỏe.',
      category: 'health',
      readTime: '7 phút đọc',
      date: '12/12/2024',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxpbmNlbnNlJTIwYnVybmluZ3xlbnwwfHx8fDE3NTE0Mjk4ODl8MA&ixlib=rb-4.1.0&q=85',
      content: `Trầm hương không chỉ được biết đến như một loại gỗ quý hiếm mà còn là "thần dược" trong y học cổ truyền với nhiều công dụng tuyệt vời đối với sức khỏe và tinh thần con người.

**1. Tác dụng an thần, giảm stress**

Hương thơm của trầm hương có tác dụng làm dịu hệ thần kinh, giúp giảm căng thẳng, lo âu và stress. Khi xông trầm hương, não bộ sẽ tiết ra các chất endorphin giúp tạo cảm giác thư giãn và hạnh phúc.

**2. Cải thiện chất lượng giấc ngủ**

Trầm hương được sử dụng như một liệu pháp tự nhiên để điều trị mất ngủ. Hương thơm nhẹ nhàng giúp thư giãn tinh thần, tạo môi trường thuận lợi cho giấc ngủ sâu và ngon.

**3. Tăng cường khả năng tập trung**

Trong thiền định và yoga, trầm hương được sử dụng để giúp tăng cường khả năng tập trung và thanh lọc tâm trí. Hương thơm giúp tạo không gian yên tĩnh, thích hợp cho việc thiền và tĩnh tâm.

**4. Hỗ trợ hệ hô hấp**

Khói trầm hương có tác dụng kháng khuẩn, giúp làm sạch không khí và hỗ trợ hệ hô hấp. Tuy nhiên, cần sử dụng đúng cách và không lạm dụng.

**5. Cân bằng năng lượng**

Theo phong thủy và y học cổ truyền, trầm hương có tác dụng cân bằng âm dương, điều hòa khí huyết trong cơ thể, mang lại cảm giác cân bằng và bình an.

**Cách sử dụng trầm hương đúng cách:**

- Xông trầm trong không gian thoáng mát
- Không xông quá lâu (15-30 phút/lần)
- Kết hợp với thiền định hoặc yoga
- Sử dụng lư xông chất lượng tốt

Việc sử dụng trầm hương đúng cách sẽ mang lại những lợi ích tuyệt vời cho sức khỏe và tinh thần. Tuy nhiên, cần chọn trầm hương chất lượng cao và sử dụng có tiết độ để đạt được hiệu quả tốt nhất.`
    },
    // ... thêm các bài viết khác
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getCategoryColor = (color) => {
    const colors = {
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      pink: 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[color] || colors.amber;
  };

  if (selectedArticle) {
    return (
      <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="pt-16 lg:pt-20">
          {/* Article Detail View - Mobile Optimized */}
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-3 lg:px-4 py-4 lg:py-8">
              {/* Compact Header */}
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium">Quay lại</span>
                </button>
                
                <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>{selectedArticle.readTime}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              {/* Article Content - Mobile First */}
              <article className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                {/* Compact Featured Image */}
                <div className="relative h-48 lg:h-64 overflow-hidden">
                  <img 
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(categories.find(c => c.id === selectedArticle.category)?.color)}`}>
                      {categories.find(c => c.id === selectedArticle.category)?.name}
                    </span>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4 lg:p-8">
                  <h1 className="text-xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 lg:mb-4 leading-tight">
                    {selectedArticle.title}
                  </h1>
                  
                  <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 italic">
                    {selectedArticle.excerpt}
                  </p>
                  
                  <div className="prose prose-sm lg:prose-lg max-w-none dark:prose-invert prose-amber">
                    {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-3 lg:mb-4 text-sm lg:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                          <strong className="text-amber-700 dark:text-amber-400 text-base lg:text-lg">
                            {paragraph.slice(2, -2)}
                          </strong>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="pt-16 lg:pt-20">
        {/* Mobile Optimized News Page */}
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-3 lg:px-4 py-4 lg:py-12">
            {/* Compact Header */}
            <div className="text-center mb-6 lg:mb-12">
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2 lg:mb-4">
                Tin tức về trầm hương
              </h1>
              <div className="w-16 lg:w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full mb-2 lg:mb-4"></div>
              <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
                Cập nhật những thông tin mới nhất về trầm hương, hướng dẫn sử dụng và chia sẻ kinh nghiệm
              </p>
            </div>

            {/* Compact Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6 lg:mb-8 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === category.id
                      ? `${getCategoryColor(category.color)} shadow-md scale-105`
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:shadow-md backdrop-blur-sm'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Compact Articles Grid - Mobile First */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {filteredArticles.map((article, index) => (
                <article 
                  key={article.id}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-white/20 dark:border-gray-700/20"
                  onClick={() => setSelectedArticle(article)}
                >
                  {/* Compact Image */}
                  <div className="relative h-40 lg:h-48 overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm ${getCategoryColor(categories.find(c => c.id === article.category)?.color)}`}>
                        {categories.find(c => c.id === article.category)?.name}
                      </span>
                    </div>
                    
                    {/* Read Time */}
                    <div className="absolute bottom-2 right-2">
                      <span className="bg-black/50 text-white px-2 py-1 rounded-lg text-xs backdrop-blur-sm">
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Compact Content */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{article.date}</span>
                    </div>
                    
                    <h2 className="text-base lg:text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {article.excerpt}
                    </p>
                    
                    <button className="text-xs lg:text-sm text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300 transition-colors flex items-center space-x-1 group">
                      <span>Đọc thêm</span>
                      <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* No articles message */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291.94-5.709 2.291M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Chưa có bài viết
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Hiện tại chưa có bài viết nào trong danh mục này.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;