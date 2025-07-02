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

  // Parallax effect for hero section
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

  const newsData = [
    {
      id: 1,
      title: "Bí mật của trầm hương tự nhiên: Cách nhận biết trầm thật và giả",
      category: "Kiến thức",
      excerpt: "Trầm hương thật có những đặc điểm riêng biệt. Hãy cùng tìm hiểu cách phân biệt trầm hương tự nhiên với hàng giả để đầu tư đúng giá trị.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương được mệnh danh là "vàng của rừng", nhưng làm sao để phân biệt được trầm hương thật và giả? Đây là câu hỏi mà nhiều người quan tâm đến trầm hương thường đặt ra.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Quan sát bằng mắt thường</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Trầm thật:</strong> Có vân gỗ tự nhiên, màu sắc không đều, có những đường vân kẽ chỉ đặc trưng</li>
            <li>• <strong>Trầm giả:</strong> Màu sắc đồng đều, vân gỗ giả tạo, thường có màu đen đậm bất thường</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Kiểm tra mùi hương</h3>
          <p class="mb-4">Trầm hương thật có mùi thơm nhẹ nhàng, thanh tao, không gắt. Khi đốt, hương thơm lan tỏa đều và bền lâu. Trầm giả thường có mùi hắc hoặc quá nồng.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Test chìm nước</h3>
          <p class="mb-4">Trầm hương chất lượng cao có tỷ trọng lớn sẽ chìm xuống nước. Tuy nhiên, không phải trầm chìm nước nào cũng là trầm thật, cần kết hợp nhiều yếu tố khác.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Kiểm tra nguồn gốc</h3>
          <p class="mb-4">Chọn mua từ những nhà cung cấp uy tín, có giấy tờ chứng nhận nguồn gốc xuất xứ rõ ràng.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZXh0cmFjdGlvbnxlbnwwfHx8fDE3NTE0Mjk4Njh8MA&ixlib=rb-4.1.0&q=85",
      author: "Chuyên gia Nguyễn Văn Minh",
      date: "2025-01-02",
      readTime: "8 phút đọc",
      sourceUrl: "https://sonmochuong.vn/cach-nhan-biet-tram-huong-that-gia"
    },
    {
      id: 2,
      title: "Lợi ích tuyệt vời của trầm hương đối với sức khỏe và tâm linh",
      category: "Sức khỏe",
      excerpt: "Khám phá những tác dụng kỳ diệu của trầm hương trong việc cải thiện sức khỏe tinh thần, giảm stress và tăng cường năng lượng tích cực.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương không chỉ có giá trị kinh tế cao mà còn mang lại nhiều lợi ích thiết thực cho sức khỏe và đời sống tinh thần của con người.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Tác dụng thư giãn tinh thần</h3>
          <p class="mb-4">Hương thơm của trầm hương có khả năng kích thích hệ thần kinh phó giao cảm, giúp cơ thể thư giãn, giảm căng thẳng và lo âu hiệu quả.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Cải thiện chất lượng giấc ngủ</h3>
          <p class="mb-4">Xông trầm hương trước khi ngủ giúp tạo không gian yên tĩnh, thúc đẩy giấc ngủ sâu và chất lượng.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Tăng cường khả năng tập trung</h3>
          <p class="mb-4">Nhiều nghiên cứu cho thấy hương trầm giúp cải thiện khả năng tập trung và làm việc hiệu quả hơn.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Hỗ trợ thiền định và yoga</h3>
          <p class="mb-4">Trầm hương được sử dụng rộng rãi trong các buổi thiền và yoga để tạo không gian thiêng liêng, giúp tâm trí an tĩnh.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">5. Thanh lọc không khí</h3>
          <p class="mb-4">Khói trầm hương có tác dụng khử trùng, thanh lọc không khí, loại bỏ các vi khuẩn có hại trong môi trường.</p>
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
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương là sản phẩm tự nhiên cần được bảo quản đúng cách để duy trì hương thơm và chất lượng trong thời gian dài.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Bảo quản vòng tay trầm hương</h3>
          <ul class="space-y-2 mb-6">
            <li>• Tránh tiếp xúc trực tiếp với nước, xà phòng, dầu gội</li>
            <li>• Cất trong hộp gỗ hoặc túi vải thoáng khí</li>
            <li>• Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp</li>
            <li>• Thỉnh thoảng lấy ra đeo để trầm "hút" dầu cơ thể tự nhiên</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Bảo quản nhang và nụ trầm</h3>
          <ul class="space-y-2 mb-6">
            <li>• Bọc kín trong túi nilon hoặc hộp kín</li>
            <li>• Để nơi khô ráo, thoáng mát</li>
            <li>• Tránh ẩm mốc và côn trùng</li>
            <li>• Sử dụng hộp hút ẩm nếu cần thiết</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Bảo quản tinh dầu trầm hương</h3>
          <ul class="space-y-2 mb-6">
            <li>• Để trong chai thủy tinh tối màu</li>
            <li>• Nắp kín, tránh bay hơi</li>
            <li>• Bảo quản ở nhiệt độ phòng</li>
            <li>• Tránh ánh sáng mặt trời</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Lưu ý quan trọng</h3>
          <p class="mb-4">Trầm hương cao cấp sẽ có hương thơm tăng theo thời gian nếu bảo quản đúng cách. Không nên cất trong tủ lạnh hoặc nơi quá lạnh.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib3h8ZW58MHx8fHwxNzUxNDI5ODczfDA&ixlib=rb-4.1.0&q=85",
      author: "Thầy Phạm Minh Đức",
      date: "2024-12-30",
      readTime: "5 phút đọc"
    },
    {
      id: 4,
      title: "Văn hóa thờ cúng và trầm hương trong truyền thống Việt Nam",
      category: "Văn hóa", 
      excerpt: "Tìm hiểu về vai trò quan trọng của trầm hương trong văn hóa thờ cúng tổ tiên và các nghi lễ tâm linh của người Việt qua các thế hệ.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương đã gắn liền với văn hóa tâm linh của người Việt Nam từ hàng nghìn năm qua, trở thành một phần không thể thiếu trong các nghi lễ thiêng liêng.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Trầm hương trong thờ cúng tổ tiên</h3>
          <p class="mb-4">Người Việt tin rằng khói trầm hương có thể kết nối thế giới âm và dương, giúp tâm linh tổ tiên được thăng hoa và phù hộ cho con cháu.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Nghi lễ cúng Phật và các vị thần</h3>
          <p class="mb-4">Trong Phật giáo, trầm hương được coi là "thập đại công đức" - một trong những lễ vật cao quý nhất để dâng lên Phật, Pháp, Tăng.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Các dịp lễ tết truyền thống</h3>
          <ul class="space-y-2 mb-6">
            <li>• Tết Nguyên Đán: Xông nhà, cúng giao thừa</li>
            <li>• Tết Trung thu: Cúng trăng, cầu may mắn</li>
            <li>• Giỗ tổ: Tưởng nhớ và tri ân tổ tiên</li>
            <li>• Các ngày rằm: Cầu bình an, tài lộc</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Ý nghĩa tâm linh sâu sắc</h3>
          <p class="mb-4">Trầm hương không chỉ là hương liệu mà còn thể hiện lòng thành kính, sự tôn kính và mong cầu được phù hộ từ các đấng thiêng liêng.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">5. Truyền thống trồng và khai thác</h3>
          <p class="mb-4">Việt Nam có truyền thống trồng và khai thác trầm hương lâu đời, đặc biệt ở các tỉnh miền Trung và Tây Nguyên với những vùng trầm nổi tiếng.</p>
        </div>
      `,
      image: "https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg",
      author: "Giáo sư Lê Văn Kiên", 
      date: "2024-12-28",
      readTime: "7 phút đọc"
    },
    {
      id: 5,
      title: "Đầu tư trầm hương: Cơ hội và rủi ro cần biết",
      category: "Đầu tư",
      excerpt: "Phân tích thị trường trầm hương, xu hướng giá cả và những yếu tố cần cân nhắc khi đầu tư vào 'vàng đen' của rừng.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương được nhiều nhà đầu tư coi là "vàng đen" với tiềm năng tăng giá cao. Tuy nhiên, việc đầu tư cần có kiến thức và chiến lược phù hợp.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Tại sao trầm hương có giá trị đầu tư cao?</h3>
          <ul class="space-y-2 mb-6">
            <li>• Nguồn cung ngày càng khan hiếm do khai thác quá mức</li>
            <li>• Thời gian hình thành trầm tự nhiên rất lâu (10-20 năm)</li>
            <li>• Nhu cầu sử dụng ngày càng tăng trên toàn thế giới</li>
            <li>• Tính chất bền vững, không bị hư hỏng theo thời gian</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Các hình thức đầu tư phổ biến</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Trầm nguyên liệu:</strong> Mua trầm thô để chế biến hoặc bán lại</li>
            <li>• <strong>Sản phẩm hoàn thiện:</strong> Vòng tay, tượng phong thủy, tinh dầu</li>
            <li>• <strong>Đầu tư vào vườn trầm:</strong> Trồng và chăm sóc cây trầm</li>
            <li>• <strong>Kinh doanh sản phẩm:</strong> Mở cửa hàng, bán online</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Rủi ro cần lưu ý</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Rủi ro về chất lượng:</strong> Khó phân biệt hàng thật giả</li>
            <li>• <strong>Rủi ro pháp lý:</strong> Quy định về CITES và xuất nhập khẩu</li>
            <li>• <strong>Rủi ro thị trường:</strong> Biến động giá, thanh khoản thấp</li>
            <li>• <strong>Rủi ro bảo quản:</strong> Cần điều kiện lưu trữ phù hợp</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Lời khuyên cho nhà đầu tư</h3>
          <p class="mb-4">Cần có kiến thức sâu về trầm hương, xây dựng mạng lưới cung cấp uy tín và không đầu tư quá 10-15% tổng tài sản vào trầm hương.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">5. Xu hướng thị trường 2025</h3>
          <p class="mb-4">Thị trường trầm hương dự kiến tiếp tục tăng trưởng mạnh nhờ sự phát triển của ngành du lịch tâm linh và nhu cầu sưu tập tại châu Á.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwc2N1bHB0dXJlfGVufDB8fHx8MTc1MTQyOTg2OHww&ixlib=rb-4.1.0&q=85",
      author: "Chuyên gia Hoàng Minh Tuấn",
      date: "2024-12-25", 
      readTime: "10 phút đọc"
    },
    {
      id: 6,
      title: "Nghệ thuật xông trầm: Từ cơ bản đến nâng cao",
      category: "Hướng dẫn",
      excerpt: "Hướng dẫn chi tiết cách xông trầm hương đúng cách, từ việc chọn dụng cụ, chuẩn bị nguyên liệu đến các kỹ thuật xông chuyên nghiệp.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Xông trầm là một nghệ thuật tinh tế, đòi hỏi kiến thức và kỹ thuật để có thể tận hưởng trọn vẹn hương thơm quý giá của trầm hương.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Chuẩn bị dụng cụ xông trầm</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Lư xông:</strong> Chọn lư bằng gốm hoặc đồng thau chất lượng</li>
            <li>• <strong>Than tổ ong:</strong> Sử dụng than không khói, cháy đều</li>
            <li>• <strong>Kẹp tre:</strong> Để gắp than và trầm một cách an toàn</li>
            <li>• <strong>Tấm mica:</strong> Đặt giữa than và trầm để điều tiết nhiệt</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Quy trình xông trầm chuẩn</h3>
          <div class="space-y-4 mb-6">
            <div class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p><strong>Bước 1:</strong> Đốt than tổ ong đến khi có màu đỏ đều</p>
              <p><strong>Bước 2:</strong> Đặt than vào lư, phủ tro mỏng lên trên</p>
              <p><strong>Bước 3:</strong> Đặt tấm mica lên than, chờ 2-3 phút</p>
              <p><strong>Bước 4:</strong> Đặt miếng trầm nhỏ lên mica</p>
              <p><strong>Bước 5:</strong> Thưởng thức hương thơm từ từ tỏa ra</p>
            </div>
          </div>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Các kỹ thuật nâng cao</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Điều chỉnh nhiệt độ:</strong> Di chuyển mica để tăng giảm nhiệt</li>
            <li>• <strong>Xông nhiều loại trầm:</strong> Kết hợp các loại trầm khác nhau</li>
            <li>• <strong>Thời gian xông:</strong> Mỗi miếng trầm xông 15-30 phút</li>
            <li>• <strong>Không gian xông:</strong> Phòng kín, diện tích 15-20m²</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Lưu ý an toàn</h3>
          <ul class="space-y-2 mb-6">
            <li>• Luôn có người trông coi khi xông trầm</li>
            <li>• Đặt lư xông ở vị trí an toàn, không gần vật liệu dễ cháy</li>
            <li>• Không xông trong phòng ngủ khi đang ngủ</li>
            <li>• Đảm bảo thông gió phù hợp</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">5. Thời điểm xông trầm tốt nhất</h3>
          <p class="mb-4">Buổi tối (19h-21h) là thời gian lý tưởng để xông trầm, giúp thư giãn sau một ngày làm việc căng thẳng. Cũng có thể xông vào buổi sáng sớm để bắt đầu ngày mới với tinh thần thoải mái.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBib3h8ZW58MHx8fHwxNzUxNDI5ODczfDA&ixlib=rb-4.1.0&q=85",
      author: "Nghệ nhân Nguyễn Thanh Sơn",
      date: "2024-12-22",
      readTime: "9 phút đọc"
    },
    {
      id: 7,
      title: "Xu hướng sử dụng trầm hương trong lifestyle hiện đại",
      category: "Xu hướng",
      excerpt: "Khám phá cách thế hệ trẻ Việt Nam đang ứng dụng trầm hương vào cuộc sống hiện đại, từ trang trí nhà cửa đến wellness và self-care.",
      content: `
        <div class="prose prose-lg max-w-none">
          <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">Trầm hương không còn chỉ gắn liền với thế hệ lớn tuổi mà đang trở thành xu hướng lifestyle được nhiều bạn trẻ yêu thích và ứng dụng vào cuộc sống hiện đại.</p>
          
          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">1. Trầm hương trong home decor</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Trang trí phòng khách:</strong> Cảnh trầm, vòng tay trưng bày</li>
            <li>• <strong>Phòng ngủ zen:</strong> Tạo không gian thiền định, thư giãn</li>
            <li>• <strong>Góc làm việc:</strong> Xông trầm nhẹ để tăng concentration</li>
            <li>• <strong>Phòng yoga:</strong> Kết hợp với luyện tập thể dục</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">2. Wellness và self-care routine</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Morning ritual:</strong> Xông trầm 10 phút mỗi sáng</li>
            <li>• <strong>Evening routine:</strong> Thư giãn sau ngày làm việc</li>
            <li>• <strong>Weekend detox:</strong> Tắm với tinh dầu trầm hương</li>
            <li>• <strong>Meditation time:</strong> Hỗ trợ thiền định hiệu quả</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">3. Fashion và accessories</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Vòng tay trầm hương:</strong> Phụ kiện thời trang độc đáo</li>
            <li>• <strong>Đá may mắn:</strong> Kết hợp với các loại đá quý khác</li>
            <li>• <strong>Minimalist style:</strong> Phù hợp với phong cách tối giản</li>
            <li>• <strong>Unisex appeal:</strong> Cả nam và nữ đều có thể sử dụng</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">4. Social media và lifestyle content</h3>
          <p class="mb-4">Trầm hương đang trở thành chủ đề hot trên các platform như Instagram, TikTok với hashtags #tramhuong #wellness #mindfulness thu hút hàng triệu lượt xem.</p>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">5. Ứng dụng trong công việc</h3>
          <ul class="space-y-2 mb-6">
            <li>• <strong>Coworking spaces:</strong> Một số không gian làm việc chung đã ứng dụng</li>
            <li>• <strong>Creative industries:</strong> Ngành thiết kế, nghệ thuật sử dụng để tăng inspiration</li>
            <li>• <strong>Hospitality:</strong> Khách sạn, spa cao cấp sử dụng để tạo experience</li>
            <li>• <strong>Remote working:</strong> Tạo môi trường làm việc tại nhà tích cực</li>
          </ul>

          <h3 class="text-xl font-bold text-amber-800 dark:text-amber-400 mb-4">6. Tương lai của trầm hương lifestyle</h3>
          <p class="mb-4">Dự kiến trong 2025-2026, trầm hương sẽ tiếp tục phát triển mạnh trong segment luxury lifestyle, kết hợp với technology và sustainable living để tạo ra những sản phẩm và dịch vụ mới phù hợp với thế hệ Z và Alpha.</p>
        </div>
      `,
      image: "https://images.unsplash.com/photo-1567473030492-533b30c5494c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3BhY2V8ZW58MHx8fHwxNzUxNDI5ODg5fDA&ixlib=rb-4.1.0&q=85",
      author: "Blogger Phạm Minh Anh",
      date: "2024-12-20",
      readTime: "8 phút đọc"
    }
  ];

  const categories = ['all', 'Kiến thức', 'Sức khỏe', 'Hướng dẫn', 'Văn hóa', 'Đầu tư', 'Xu hướng'];

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