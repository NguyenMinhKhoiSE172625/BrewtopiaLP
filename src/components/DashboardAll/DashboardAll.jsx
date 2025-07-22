import React, { useEffect, useState } from 'react';
import './DashboardAll.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useNavigate } from 'react-router-dom';
// import apiService from '../../services/apiService'; // Bỏ gọi API
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

const palette = {
  bg: '#F6EEE9',
  card: '#FFF',
  accent: '#C7A17A',
  brown: '#8B5E3C',
  brownDark: '#6B3F25',
  brownLight: '#E9DED6',
  border: '#E5D3C0',
  text: '#3E2723',
  statBg: '#F8F6F3',
};

const icons = [
  '📅', // Sự kiện
  '📝', // Bài viết
  '👥', // Tổng user
  '🛡️', // Admin
  '🙋', // User thường
  '⭐', // Tổng review
  '💰', // Tổng doanh thu
];

const MOCK_EVENTS = Array.from({ length: 8 }, (_, i) => ({ _id: i+1, name: `Sự kiện ${i+1}` }));
const MOCK_POSTS = Array.from({ length: 12 }, (_, i) => ({ _id: i+1, title: `Bài viết ${i+1}` }));
const MOCK_USERS = [
  ...Array.from({ length: 3 }, (_, i) => ({ _id: i+1, name: `Admin ${i+1}`, role: 'admin', AccStatus: i === 2 ? 'vip' : 'premium' })),
  ...Array.from({ length: 22 }, (_, i) => ({ _id: i+4, name: `User ${i+1}`, role: 'user', AccStatus: i < 3 ? 'vip' : (i < 8 ? 'premium' : 'false') }))
];
const MOCK_REVIEWS = [
  { name: 'Hồ Thảo Vy', role: 'User', avatar: '👩', rating: 5, content: 'Không cần quảng cáo phức tạp, tôi chỉ cần đăng bài đúng lúc – app giúp tôi tiếp cận đúng người.' },
  { name: 'Trần Thị Bích', role: 'User', avatar: '👩‍🎓', rating: 3, content: 'App hoạt động mượt mà, tuy nhiên đôi lúc thời gian load hơi lâu. Hy vọng sẽ được tối ưu tốc độ hơn nữa' },
  { name: 'Lê Hoàng Long', role: 'User', avatar: '🧑', rating: 5, content: 'Rất thích cách bố trí các danh mục trong app. Có thể bổ sung thêm phần hướng dẫn chi tiết hơn cho người mới' },
  { name: 'Phạm Thu Hương', role: 'User', avatar: '👩', rating: 4, content: 'Chương trình khuyến mãi hấp dẫn, nhưng đôi khi thông báo khuyến mãi hiển thị chưa đầy đủ. Mong cải thiện phần này' },
  { name: 'Đỗ Minh Tuấn', role: 'User', avatar: '👨', rating: 4, content: 'App có nhiều lựa chọn đồ uống đa dạng, giao diện đẹp mắt. Nếu có thêm tính năng gợi ý theo sở thích người dùng thì càng tuyệt vời' },
  { name: 'Bùi Đức Thắng', role: 'User', avatar: '👨', rating: 5, content: 'Dịch vụ chăm sóc khách hàng qua app rất nhanh chóng, đội ngũ hỗ trợ nhiệt tình. Cảm ơn team!' },
  { name: 'Nguyễn Văn An', role: 'User', avatar: '👨‍💻', rating: 5, content: 'Giao diện app thân thiện, dễ sử dụng. Mong team phát triển thêm nhiều tính năng mới để trải nghiệm thú vị hơn!' },
  { name: 'Trần Thanh Tâm', role: 'Business', avatar: '👨‍💼', rating: 3, content: 'Ứng dụng giúp dễ dàng tìm quán cà phê phù hợp để làm việc, họp nhóm hoặc gặp gỡ khách hàng, Tìm nhanh quán có wifi mạnh, không gian yên tĩnh, phòng họp riêng, Hỗ trợ xuất hóa đơn VAT. App chưa có cập nhập một số quán nhỏ' },
  { name: 'Lý Hồng Nhung', role: 'Business', avatar: '👩‍💼', rating: 5, content: 'Tôi dễ dàng đăng menu quán để tiếp cận khách hàng văn phòng gần khu vực.' },
  { name: 'Vũ Anh Tuấn', role: 'Business', avatar: '👨‍💼', rating: 4, content: 'Việc đăng thông tin khuyến mãi lên app giúp tôi giữ chân khách văn phòng đều đặn.' },
  { name: 'Phạm Đăng Huy', role: 'Business', avatar: '👨', rating:4, content: 'Rất tiện lợi khi tôi có thể cập nhật hình ảnh menu quán mà không cần web riêng' },
  { name: 'Võ Thị Lan', role: 'Business', avatar: '👩‍💻', rating: 3, content: 'Tsaôi gặp lỗi khi thanh toán bằng ví điện tử, mong team sớm fix lỗi này. Còn lại mọi thứ rất ổn' },
];
const MOCK_PAYMENTS = [
  ...Array.from({ length: 21 }, (_, i) => ({
    _id: i+1,
    orderCode: `ORD${1000+i}`,
    amount: 2000, // mỗi giao dịch chỉ 2000 VND
    createdAt: new Date(Date.now() - i*86400000).toISOString(),
    status: 'PAID',
    targetModel: i%3 === 0 ? 'UpgradeVIP' : (i%3 === 1 ? 'UpgradePremium' : 'Booking')
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    _id: 100+i,
    orderCode: `ORD${2000+i}`,
    amount: 2000,
    createdAt: new Date(Date.now() - (i+22)*86400000).toISOString(),
    status: 'PENDING',
    targetModel: 'Booking'
  })),
  ...Array.from({ length: 2 }, (_, i) => ({
    _id: 200+i,
    orderCode: `ORD${3000+i}`,
    amount: 2000,
    createdAt: new Date(Date.now() - (i+26)*86400000).toISOString(),
    status: 'CANCELLED',
    targetModel: 'Booking'
  }))
];

const DashboardAll = () => {
  const navigate = useNavigate();
  
  // Sử dụng mock data thay vì gọi API
  const [events] = useState(MOCK_EVENTS);
  const [posts] = useState(MOCK_POSTS);
  const [users] = useState(MOCK_USERS);
  const [reviews] = useState(MOCK_REVIEWS);
  const [payments] = useState(MOCK_PAYMENTS);
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState('PAID');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Xử lý tổng số bài viết
  let totalPosts = posts.length;

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role !== 'admin').length;

  // Tính tổng doanh thu từ các giao dịch PAID
  const totalRevenue = payments
    .filter(payment => payment.status === 'PAID')
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Lọc giao dịch theo trạng thái
  const filteredPayments = payments.filter(payment => payment.status === activeTab);
  // Tính tổng số trang
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  // Lấy dữ liệu trang hiện tại
  const paginatedPayments = filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Khi đổi tab thì reset về trang 1
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, payments]);

  // Xử lý dữ liệu AccStatus
  const accStatusTypes = ['false', 'premium', 'vip'];
  const accStatusCount = {
    user: { false: 0, premium: 0, vip: 0 },
    admin: { false: 0, premium: 0, vip: 0 }
  };

  users.forEach(u => {
    let status = (u.AccStatus || u.accStatus || 'false').toString().toLowerCase();
    if (status !== 'vip' && status !== 'premium') status = 'false';
    if (u.role === 'admin') {
      accStatusCount.admin[status] = (accStatusCount.admin[status] || 0) + 1;
    } else {
      accStatusCount.user[status] = (accStatusCount.user[status] || 0) + 1;
    }
  });

  // Pie chart cho tỷ lệ user/admin
  const pieData = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: [palette.accent, palette.brown],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart cho tỷ lệ loại tài khoản (gộp user + admin)
  const accStatusPieData = {
    labels: ['Thường', 'Premium', 'VIP'],
    datasets: [
      {
        data: [
          users.filter(u => {
            let s = (u.AccStatus || u.accStatus || 'false').toString().toLowerCase();
            return s !== 'vip' && s !== 'premium';
          }).length,
          users.filter(u => {
            let s = (u.AccStatus || u.accStatus || 'false').toString().toLowerCase();
            return s === 'premium';
          }).length,
          users.filter(u => {
            let s = (u.AccStatus || u.accStatus || 'false').toString().toLowerCase();
            return s === 'vip';
          }).length,
        ],
        backgroundColor: [palette.brownLight, palette.accent, palette.brownDark],
        borderWidth: 1,
      },
    ],
  };

  // Bar chart: Số lượng sự kiện, bài viết, review
  const barData = {
    labels: ['Sự kiện', 'Bài viết', 'Review'],
    datasets: [
      {
        label: 'Số lượng',
        data: [events.length, totalPosts, reviews.length],
        backgroundColor: [palette.accent, palette.brown, palette.brownDark],
        borderRadius: 8,
      },
    ],
  };

  // Bar chart cho AccStatus
  const accStatusBarData = {
    labels: accStatusTypes.map(s => s === 'false' ? 'Thường' : s.charAt(0).toUpperCase() + s.slice(1)),
    datasets: [
      {
        label: 'User',
        data: accStatusTypes.map(s => accStatusCount.user[s]),
        backgroundColor: palette.brownLight,
        borderRadius: 8,
      },
      {
        label: 'Admin',
        data: accStatusTypes.map(s => accStatusCount.admin[s]),
        backgroundColor: palette.accent,
        borderRadius: 8,
      }
    ]
  };

  // Pie chart options: hiển thị %
  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const percent = total ? (value / total * 100).toFixed(1) : 0;
          return percent + '%';
        },
        color: '#6B3F25',
        font: { weight: 'bold', size: 16 }
      },
      legend: { display: true }
    }
  };

  // Bar chart options: hiển thị % trên đầu cột
  const barOptions = {
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value, context) => {
          const total = context.chart.data.datasets.reduce((sum, ds) => sum + (ds.data[context.dataIndex] || 0), 0);
          const percent = total ? (value / total * 100).toFixed(1) : 0;
          return percent + '%';
        },
        color: '#6B3F25',
        font: { weight: 'bold', size: 14 }
      },
      legend: { display: true }
    },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  // Card tổng quan
  const statCards = [
    { label: 'Sự kiện', value: events.length, icon: icons[0] },
    { label: 'Tổng user', value: users.length, icon: icons[2] },
    { label: 'Tổng review', value: reviews.length, icon: icons[5] },
    { label: 'Tổng doanh thu', value: `${totalRevenue.toLocaleString('vi-VN')}đ`, icon: icons[6] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <div className="dashboard-all-bg">
      <div className="dashboard-simple-header">
        <button 
          className="dashboard-home-btn"
          onClick={() => navigate('/')}
        >
          ← Quay về trang chủ
        </button>
        {isLoggedIn && (
          <button 
            className="dashboard-logout-btn"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        )}
      </div>
      <div className="dashboard-all-container">
        <h1>Dashboard tổng hợp Brewtopia</h1>
        {loading ? <p>Đang tải dữ liệu...</p> : (
          <>
            {/* Các card tổng quan */}
            <div className="dashboard-cards">
              {statCards.map(card => (
                <div className="dashboard-card" key={card.label}>
                  <span className="dashboard-card-icon">{card.icon}</span>
                  <div>
                    <div className="dashboard-card-title">{card.label}</div>
                    <div className="dashboard-card-value">{card.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Khu vực biểu đồ */}
            <div className="dashboard-charts-row">
              <div className="dashboard-chart-col dashboard-chart-pie">
                <div className="dashboard-chart">
                  <div className="dashboard-chart-title">Tỷ lệ Admin/User</div>
                  <Pie data={pieData} options={pieOptions} />
                </div>
                <div className="dashboard-chart" style={{ marginTop: '2rem' }}>
                  <div className="dashboard-chart-title">Tỷ lệ loại tài khoản</div>
                  <Pie data={accStatusPieData} options={pieOptions} />
                </div>
              </div>
              <div className="dashboard-chart-col dashboard-chart-bars">
                <div className="dashboard-chart">
                  <div className="dashboard-chart-title">Số lượng sự kiện, bài viết, review</div>
                  <Bar data={barData} options={barOptions} />
                </div>
                <div className="dashboard-chart" style={{ marginTop: '2rem' }}>
                  <div className="dashboard-chart-title">Phân loại tài khoản</div>
                  <Bar data={accStatusBarData} options={barOptions} />
                </div>
              </div>
            </div>

            {/* Phần hiển thị giao dịch và review cạnh nhau */}
            <div className="dashboard-bottom-row">
              <div className="dashboard-payments">
                <div className="dashboard-payments-header">
                  <h2>Danh sách giao dịch</h2>
                  <div className="payment-tabs">
                    <button 
                      className={`payment-tab ${activeTab === 'PAID' ? 'active' : ''}`}
                      onClick={() => setActiveTab('PAID')}
                    >
                      Đã thanh toán
                    </button>
                    <button 
                      className={`payment-tab ${activeTab === 'PENDING' ? 'active' : ''}`}
                      onClick={() => setActiveTab('PENDING')}
                    >
                      Đang chờ
                    </button>
                    <button 
                      className={`payment-tab ${activeTab === 'CANCELLED' ? 'active' : ''}`}
                      onClick={() => setActiveTab('CANCELLED')}
                    >
                      Đã hủy
                    </button>
                  </div>
                </div>

                <div className="payments-list">
                  {filteredPayments.length === 0 ? (
                    <div style={{ color: '#8B5E3C', textAlign: 'center', padding: '1rem' }}>
                      Không có giao dịch nào.
                    </div>
                  ) : (
                    paginatedPayments.map(payment => (
                      <div key={payment._id} className="payment-item">
                        <div className="payment-info">
                          <div className="payment-order">
                            <span className="payment-label">Mã đơn:</span>
                            <span className="payment-value">{payment.orderCode}</span>
                          </div>
                          <div className="payment-amount">
                            <span className="payment-label">Số tiền:</span>
                            <span className="payment-value">{payment.amount.toLocaleString('vi-VN')}đ</span>
                          </div>
                          <div className="payment-date">
                            <span className="payment-label">Ngày tạo:</span>
                            <span className="payment-value">
                              {new Date(payment.createdAt).toLocaleDateString('vi-VN')}
                            </span>
                          </div>
                          <div className="payment-type">
                            <span className="payment-label">Loại:</span>
                            <span className="payment-value">{
                              payment.targetModel === 'UpgradeVIP' ? 'Nâng Cấp VIP' :
                              payment.targetModel === 'UpgradePremium' ? 'Nâng Cấp Premium' :
                              'Thanh toán đặt bàn'
                            }</span>
                          </div>
                        </div>
                        <div className="payment-status" style={{
                          backgroundColor: 
                            payment.status === 'PAID' ? '#28a745' :
                            payment.status === 'PENDING' ? '#ffc107' :
                            '#dc3545'
                        }}>
                          {payment.status}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {/* Phân trang */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #C7A17A', background: currentPage === 1 ? '#eee' : '#fff', color: '#6B3F25', cursor: currentPage === 1 ? 'not-allowed' : 'pointer'}}>Trước</button>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button key={i+1} onClick={() => setCurrentPage(i+1)} style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #C7A17A', background: currentPage === (i+1) ? '#C7A17A' : '#fff', color: currentPage === (i+1) ? '#fff' : '#6B3F25', fontWeight: currentPage === (i+1) ? 'bold' : 'normal', cursor: 'pointer'}}>{i+1}</button>
                    ))}
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #C7A17A', background: currentPage === totalPages ? '#eee' : '#fff', color: '#6B3F25', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'}}>Sau</button>
                  </div>
                )}
                {/* Tổng doanh thu của tab hiện tại */}
                <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold', color: '#6B3F25', fontSize: '1.1rem' }}>
                  Tổng Doanh Thu: {filteredPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString('vi-VN')}đ
                </div>
              </div>

              <div className="dashboard-reviews">
                <div className="dashboard-reviews-title">Review mới nhất</div>
                <div className="dashboard-reviews-list">
                  {reviews.map((r, idx) => (
                    <div className="dashboard-review-item" key={idx}>
                      <span className="dashboard-review-avatar" style={{fontSize:'2.1rem'}}>{r.avatar}</span>
                      <div className="dashboard-review-content">
                        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:2}}>
                          <span style={{fontWeight:700, color:'#6B3F25', fontSize:'1.08rem'}}>{r.name}</span>
                          <span style={{color:'#A9745B', fontWeight:500, fontSize:'0.98rem'}}>{r.role}</span>
                        </div>
                        <div className="dashboard-review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{color: i < r.rating ? '#FFD700' : '#ccc', fontSize:'1.1rem'}}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <div className="dashboard-review-text" style={{marginTop:4}}>&quot;{r.content}&quot;</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{textAlign:'right', color:'#6B3F25', fontWeight:'bold', marginTop:'0.7rem', fontSize:'1.08rem'}}>
                  Tổng review: {reviews.length}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAll; 