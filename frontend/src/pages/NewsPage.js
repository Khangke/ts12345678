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
    { id: 'lifestyle', name: 'Phong cách', color: 'pink' },
    { id: 'technique', name: 'Kỹ thuật', color: 'indigo' },
    { id: 'history', name: 'Lịch sử', color: 'gray' }
  ];

  const articles = [
    {
      id: 1,
      title: 'Cách phân biệt trầm hương thật và giả',
      excerpt: 'Hướng dẫn chi tiết các phương pháp nhận biết trầm hương chất lượng cao và tránh mua phải hàng giả.',
      category: 'guide',
      readTime: '5 phút đọc',
      date: '15/12/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c',
      content: 'Trầm hương là một trong những loại gỗ quý hiếm nhất thế giới...'
    },
    {
      id: 2,
      title: 'Công dụng của trầm hương đối với sức khỏe và tinh thần',
      excerpt: 'Tìm hiểu về những lợi ích tuyệt vời của trầm hương trong việc thư giãn, giảm stress và cải thiện sức khỏe.',
      category: 'health',
      readTime: '7 phút đọc',
      date: '12/12/2024',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7',
      content: 'Trầm hương không chỉ được biết đến như một loại gỗ quý hiếm...'
    },
    {
      id: 3,
      title: 'Lịch sử và nguồn gốc của trầm hương Việt Nam',
      excerpt: 'Khám phá lịch sử hàng nghìn năm của trầm hương tại Việt Nam và vị trí đặc biệt trong văn hóa dân tộc.',
      category: 'history',
      readTime: '8 phút đọc',
      date: '10/12/2024',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      content: 'Trầm hương Việt Nam có lịch sử phát triển lâu đời...'
    },
    {
      id: 4,
      title: 'Cách chọn vòng tay trầm hương phù hợp',
      excerpt: 'Hướng dẫn lựa chọn vòng tay trầm hương phù hợp với tuổi tác, phong thủy và sở thích cá nhân.',
      category: 'guide',
      readTime: '6 phút đọc',
      date: '08/12/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Vòng tay trầm hương không chỉ là trang sức mà còn mang ý nghĩa phong thủy...'
    },
    {
      id: 5,
      title: 'Kỹ thuật xông trầm hương đúng cách',
      excerpt: 'Học cách xông trầm hương đúng kỹ thuật để tận hưởng hương thơm và công dụng tối đa.',
      category: 'technique',
      readTime: '5 phút đọc',
      date: '05/12/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Xông trầm hương là một nghệ thuật tinh tế đòi hỏi kỹ thuật...'
    },
    {
      id: 6,
      title: 'Trầm hương trong văn hóa Phật giáo',
      excerpt: 'Vai trò thiêng liêng của trầm hương trong các nghi lễ Phật giáo và ý nghĩa tâm linh.',
      category: 'culture',
      readTime: '9 phút đọc',
      date: '03/12/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Trong Phật giáo, trầm hương được coi là một trong những...'
    },
    {
      id: 7,
      title: 'Đầu tư trầm hương: Cơ hội và rủi ro',
      excerpt: 'Phân tích thị trường đầu tư trầm hương, tiềm năng sinh lời và những rủi ro cần lưu ý.',
      category: 'investment',
      readTime: '10 phút đọc',
      date: '01/12/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Trầm hương đã trở thành một kênh đầu tư hấp dẫn...'
    },
    {
      id: 8,
      title: 'Cách bảo quản trầm hương để giữ hương thơm',
      excerpt: 'Những mẹo hay để bảo quản trầm hương luôn giữ được hương thơm và chất lượng theo thời gian.',
      category: 'guide',
      readTime: '4 phút đọc',
      date: '28/11/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c',
      content: 'Bảo quản trầm hương đúng cách là yếu tố quan trọng...'
    },
    {
      id: 9,
      title: 'Phong thủy và trầm hương trong nhà ở',
      excerpt: 'Cách bố trí và sử dụng trầm hương trong nhà để tạo không gian tích cực và may mắn.',
      category: 'culture',
      readTime: '7 phút đọc',
      date: '25/11/2024',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7',
      content: 'Theo phong thủy, trầm hương có tác dụng thanh tẩy...'
    },
    {
      id: 10,
      title: 'Trầm hương và thiền định',
      excerpt: 'Tác dụng của trầm hương trong thiền định và cách sử dụng để nâng cao hiệu quả tĩnh tâm.',
      category: 'health',
      readTime: '6 phút đọc',
      date: '22/11/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Thiền định với trầm hương là phương pháp đã được áp dụng...'
    },
    {
      id: 11,
      title: 'Các vùng trầm hương nổi tiếng Việt Nam',
      excerpt: 'Tìm hiểu về các vùng đất nổi tiếng sản xuất trầm hương chất lượng cao tại Việt Nam.',
      category: 'culture',
      readTime: '8 phút đọc',
      date: '20/11/2024',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      content: 'Việt Nam có nhiều vùng đất nổi tiếng về trầm hương...'
    },
    {
      id: 12,
      title: 'Làm nhang từ trầm hương tại nhà',
      excerpt: 'Hướng dẫn chi tiết cách làm nhang trầm hương tự nhiên tại nhà một cách đơn giản.',
      category: 'technique',
      readTime: '12 phút đọc',
      date: '18/11/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Làm nhang trầm hương tại nhà không quá phức tạp...'
    },
    {
      id: 13,
      title: 'Trầm hương trong y học cổ truyền',
      excerpt: 'Vai trò của trầm hương trong y học cổ truyền Việt Nam và các bài thuốc truyền thống.',
      category: 'health',
      readTime: '9 phút đọc',
      date: '15/11/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Y học cổ truyền Việt Nam đã sử dụng trầm hương...'
    },
    {
      id: 14,
      title: 'Xu hướng sử dụng trầm hương hiện đại',
      excerpt: 'Những xu hướng mới trong việc sử dụng trầm hương trong đời sống hiện đại và spa.',
      category: 'lifestyle',
      readTime: '5 phút đọc',
      date: '12/11/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Trầm hương ngày nay không chỉ được sử dụng truyền thống...'
    },
    {
      id: 15,
      title: 'Cách chế biến tinh dầu trầm hương',
      excerpt: 'Quy trình chế biến tinh dầu trầm hương và những lợi ích tuyệt vời của sản phẩm này.',
      category: 'technique',
      readTime: '8 phút đọc',
      date: '10/11/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c',
      content: 'Tinh dầu trầm hương là sản phẩm quý giá được chưng cất...'
    },
    {
      id: 16,
      title: 'Giá trị kinh tế của trầm hương Việt Nam',
      excerpt: 'Phân tích giá trị kinh tế và tiềm năng xuất khẩu của ngành trầm hương Việt Nam.',
      category: 'investment',
      readTime: '11 phút đọc',
      date: '08/11/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Ngành trầm hương Việt Nam đang có những bước phát triển...'
    },
    {
      id: 17,
      title: 'Trầm hương và tâm linh học',
      excerpt: 'Khám phá mối liên hệ giữa trầm hương và các hoạt động tâm linh, năng lượng.',
      category: 'culture',
      readTime: '7 phút đọc',
      date: '05/11/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Trong tâm linh học, trầm hương được cho là có khả năng...'
    },
    {
      id: 18,
      title: 'Cách sử dụng vòng tay trầm hương đúng cách',
      excerpt: 'Hướng dẫn đeo và chăm sóc vòng tay trầm hương để mang lại may mắn và sức khỏe.',
      category: 'guide',
      readTime: '6 phút đọc',
      date: '03/11/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Vòng tay trầm hương cần được sử dụng đúng cách...'
    },
    {
      id: 19,
      title: 'Trầm hương trong ẩm thực và trà đạo',
      excerpt: 'Ứng dụng độc đáo của trầm hương trong ẩm thực và nghệ thuật pha trà Việt Nam.',
      category: 'lifestyle',
      readTime: '8 phút đọc',
      date: '01/11/2024',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      content: 'Trầm hương không chỉ dùng để xông mà còn có thể...'
    },
    {
      id: 20,
      title: 'Bí quyết nhận biết trầm hương chìm nước',
      excerpt: 'Những đặc điểm và cách nhận biết trầm hương chìm nước - loại trầm hương quý nhất.',
      category: 'guide',
      readTime: '9 phút đọc',
      date: '28/10/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Trầm hương chìm nước là loại trầm hương có chất lượng...'
    },
    {
      id: 21,
      title: 'Trầm hương trong kiến trúc cổ Việt Nam',
      excerpt: 'Vai trò của trầm hương trong kiến trúc và trang trí các công trình cổ tại Việt Nam.',
      category: 'history',
      readTime: '10 phút đọc',
      date: '25/10/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Trong kiến trúc cổ Việt Nam, trầm hương được sử dụng...'
    },
    {
      id: 22,
      title: 'Cách tăng giá trị trầm hương theo thời gian',
      excerpt: 'Những phương pháp để tăng giá trị và chất lượng trầm hương qua thời gian.',
      category: 'investment',
      readTime: '7 phút đọc',
      date: '22/10/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c',
      content: 'Trầm hương có thể tăng giá trị theo thời gian nếu...'
    },
    {
      id: 23,
      title: 'Trầm hương và môi trường sống',
      excerpt: 'Tác động tích cực của trầm hương đến môi trường sống và chất lượng không khí.',
      category: 'health',
      readTime: '6 phút đọc',
      date: '20/10/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Trầm hương có tác dụng tích cực đến môi trường sống...'
    },
    {
      id: 24,
      title: 'Nghệ thuật chạm khắc trên gỗ trầm hương',
      excerpt: 'Khám phá nghệ thuật chạm khắc tinh xảo trên gỗ trầm hương và các tác phẩm nghệ thuật.',
      category: 'culture',
      readTime: '8 phút đọc',
      date: '18/10/2024',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7',
      content: 'Nghệ thuật chạm khắc trên gỗ trầm hương là một lĩnh vực...'
    },
    {
      id: 25,
      title: 'Trầm hương trong các lễ hội truyền thống',
      excerpt: 'Vai trò của trầm hương trong các lễ hội và nghi lễ truyền thống Việt Nam.',
      category: 'culture',
      readTime: '9 phút đọc',
      date: '15/10/2024',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      content: 'Trong các lễ hội truyền thống Việt Nam, trầm hương...'
    },
    {
      id: 26,
      title: 'Kỹ thuật trồng cây trầm hương',
      excerpt: 'Hướng dẫn kỹ thuật trồng và chăm sóc cây trầm hương từ gieo hạt đến thu hoạch.',
      category: 'technique',
      readTime: '15 phút đọc',
      date: '12/10/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Trồng cây trầm hương đòi hỏi kỹ thuật và kiên nhẫn...'
    },
    {
      id: 27,
      title: 'Trầm hương trong trang sức hiện đại',
      excerpt: 'Xu hướng sử dụng trầm hương trong thiết kế trang sức hiện đại và thời trang.',
      category: 'lifestyle',
      readTime: '5 phút đọc',
      date: '10/10/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Trầm hương ngày càng được ưa chuộng trong ngành trang sức...'
    },
    {
      id: 28,
      title: 'Bí mật về hương thơm của trầm hương',
      excerpt: 'Khám phá bí mật tạo nên hương thơm đặc trưng và cuốn hút của trầm hương.',
      category: 'technique',
      readTime: '7 phút đọc',
      date: '08/10/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Hương thơm của trầm hương được tạo ra từ quá trình...'
    },
    {
      id: 29,
      title: 'Trầm hương và phong thủy văn phòng',
      excerpt: 'Cách bố trí trầm hương trong văn phòng để tăng vận may và tập trung làm việc.',
      category: 'culture',
      readTime: '6 phút đọc',
      date: '05/10/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Sử dụng trầm hương trong văn phòng có thể mang lại...'
    },
    {
      id: 30,
      title: 'Cách làm sạch và bảo dưỡng đồ trầm hương',
      excerpt: 'Hướng dẫn chi tiết cách làm sạch và bảo dưỡng các sản phẩm từ trầm hương.',
      category: 'guide',
      readTime: '5 phút đọc',
      date: '03/10/2024',
      image: 'https://images.unsplash.com/photo-1509726360306-3f44543aea4c',
      content: 'Việc làm sạch và bảo dưỡng đồ trầm hương đúng cách...'
    },
    {
      id: 31,
      title: 'Trầm hương trong điều trị bệnh',
      excerpt: 'Ứng dụng của trầm hương trong điều trị một số bệnh lý theo y học cổ truyền.',
      category: 'health',
      readTime: '10 phút đọc',
      date: '01/10/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Theo y học cổ truyền, trầm hương có thể hỗ trợ điều trị...'
    },
    {
      id: 32,
      title: 'Thị trường trầm hương quốc tế',
      excerpt: 'Phân tích thị trường trầm hương thế giới và vị thế của Việt Nam.',
      category: 'investment',
      readTime: '12 phút đọc',
      date: '28/09/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Thị trường trầm hương quốc tế đang có những biến động...'
    },
    {
      id: 33,
      title: 'Trầm hương và ngũ hành phong thủy',
      excerpt: 'Mối quan hệ giữa trầm hương và ngũ hành trong phong thủy Việt Nam.',
      category: 'culture',
      readTime: '8 phút đọc',
      date: '25/09/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Trong ngũ hành phong thủy, trầm hương thuộc hành Thổ...'
    },
    {
      id: 34,
      title: 'Công nghệ bảo quản trầm hương hiện đại',
      excerpt: 'Những công nghệ tiên tiến trong bảo quản và duy trì chất lượng trầm hương.',
      category: 'technique',
      readTime: '7 phút đọc',
      date: '22/09/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Công nghệ hiện đại đã mang lại những phương pháp...'
    },
    {
      id: 35,
      title: 'Trầm hương trong spa và massage',
      excerpt: 'Ứng dụng của trầm hương trong ngành spa và massage để thư giãn, chữa lành.',
      category: 'lifestyle',
      readTime: '6 phút đọc',
      date: '20/09/2024',
      image: 'https://images.pexels.com/photos/2297252/pexels-photo-2297252.jpeg',
      content: 'Các spa và trung tâm massage ngày càng sử dụng...'
    },
    {
      id: 36,
      title: 'Những câu chuyện huyền thoại về trầm hương',
      excerpt: 'Khám phá những câu chuyện huyền thoại và truyền thuyết về trầm hương Việt Nam.',
      category: 'history',
      readTime: '11 phút đọc',
      date: '18/09/2024',
      image: 'https://images.unsplash.com/photo-1541795083-1b160cf4f3d7',
      content: 'Trong văn hóa dân gian Việt Nam có nhiều câu chuyện...'
    },
    {
      id: 37,
      title: 'Cách chọn mua trầm hương chất lượng',
      excerpt: 'Bí quyết chọn mua trầm hương chất lượng cao với giá hợp lý từ chuyên gia.',
      category: 'guide',
      readTime: '9 phút đọc',
      date: '15/09/2024',
      image: 'https://images.unsplash.com/photo-1581669808238-7f73311e2031',
      content: 'Để chọn mua được trầm hương chất lượng, bạn cần...'
    },
    {
      id: 38,
      title: 'Trầm hương và âm nhạc thiền',
      excerpt: 'Sự kết hợp hoàn hảo giữa trầm hương và âm nhạc thiền trong thực hành tâm linh.',
      category: 'health',
      readTime: '6 phút đọc',
      date: '12/09/2024',
      image: 'https://images.unsplash.com/photo-1742474561321-10e657e125f4',
      content: 'Âm nhạc thiền kết hợp với hương trầm tạo nên...'
    },
    {
      id: 39,
      title: 'Xu hướng trầm hương trong thiết kế nội thất',
      excerpt: 'Cách tích hợp trầm hương vào thiết kế nội thất hiện đại một cách tinh tế.',
      category: 'lifestyle',
      readTime: '8 phút đọc',
      date: '10/09/2024',
      image: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg',
      content: 'Thiết kế nội thất hiện đại ngày càng chú trọng...'
    },
    {
      id: 40,
      title: 'Tương lai của ngành trầm hương Việt Nam',
      excerpt: 'Dự báo và định hướng phát triển của ngành trầm hương Việt Nam trong tương lai.',
      category: 'investment',
      readTime: '13 phút đọc',
      date: '08/09/2024',
      image: 'https://images.pexels.com/photos/8484055/pexels-photo-8484055.jpeg',
      content: 'Ngành trầm hương Việt Nam đang đứng trước những cơ hội...'
    }
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
      pink: 'bg-pink-100 text-pink-800 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
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
                    <p className="text-sm lg:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      {selectedArticle.content}
                    </p>
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
                Cập nhật những thông tin mới nhất về trầm hương với 40 bài viết chuyên sâu
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

            {/* Articles Count */}
            <div className="text-center mb-4 lg:mb-6">
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                Hiển thị <span className="font-semibold text-amber-800 dark:text-amber-400">{filteredArticles.length}</span> bài viết
                {selectedCategory !== 'all' && (
                  <span> trong danh mục "<span className="font-semibold text-amber-800 dark:text-amber-400">{categories.find(c => c.id === selectedCategory)?.name}</span>"</span>
                )}
              </p>
            </div>

            {/* Compact Articles Grid - Mobile First */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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