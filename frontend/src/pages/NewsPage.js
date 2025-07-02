import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsRef, isNewsVisible] = useScrollAnimation(0.1);

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
      readTime: "8 phút đọc"
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
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const [selectedNews, setSelectedNews] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-20 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 dark:from-gray-900 dark:via-amber-900/10 dark:to-orange-900/10 min-h-screen transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-amber-800/10 to-orange-600/10 dark:from-amber-900/20 dark:to-orange-900/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in-up">
            Tin Tức
            <span className="text-amber-800 dark:text-amber-400 block mt-2">Trầm Hương</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-800 to-orange-600 dark:from-amber-400 dark:to-orange-400 mx-auto rounded-full mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Khám phá thế giới trầm hương qua những bài viết chuyên sâu, từ kiến thức cơ bản đến xu hướng hiện đại. 
            Cập nhật thông tin mới nhất về văn hóa, sức khỏe và nghệ thuật sống với trầm hương.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 dark:from-amber-600 dark:to-amber-700 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-600'
              }`}
            >
              {category === 'all' ? 'Tất cả' : category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div ref={newsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((news, index) => (
            <article 
              key={news.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-amber-900/10 overflow-hidden hover:shadow-2xl dark:hover:shadow-amber-900/20 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 cursor-pointer border border-gray-100 dark:border-gray-700 ${
                isNewsVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedNews(news)}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-800 dark:bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                    {news.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-amber-800 dark:text-amber-400 font-medium">{news.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 transition-colors duration-300">
                  {news.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <span className="text-amber-800 dark:text-amber-400 font-bold text-xs">A</span>
                    </div>
                    <span>{news.author}</span>
                  </span>
                  <span>{formatDate(news.date)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <button className="text-amber-800 dark:text-amber-400 font-medium text-sm hover:text-amber-900 dark:hover:text-amber-300 transition-colors duration-300 group-hover:underline">
                    Đọc thêm →
                  </button>
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800/50 transition-colors duration-300">
                    <span className="text-amber-800 dark:text-amber-400 text-xs">📖</span>
                  </div>
                </div>

                {/* Animated progress bar */}
                <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-full bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No results */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Chưa có bài viết</h3>
            <p className="text-gray-600 dark:text-gray-400">Không có bài viết nào trong danh mục này</p>
          </div>
        )}
      </div>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 flex items-center justify-center z-50 p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-amber-900/20">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-4">
                  <span className="bg-amber-800 dark:bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {selectedNews.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-3 leading-tight">
                    {selectedNews.title}
                  </h2>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <span>✍️ {selectedNews.author}</span>
                    <span>📅 {formatDate(selectedNews.date)}</span>
                    <span>⏱️ {selectedNews.readTime}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedNews(null)} 
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <img 
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg dark:shadow-amber-900/20 mb-8"
              />
              <div 
                className="prose prose-lg max-w-none dark:prose-invert prose-amber"
                dangerouslySetInnerHTML={{ __html: selectedNews.content }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;