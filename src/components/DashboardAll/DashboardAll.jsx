import React, { useEffect, useState } from 'react';
import './DashboardAll.css';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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

const DashboardAll = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('PAID');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [eventRes, postRes, userRes, reviewRes, paymentRes] = await Promise.all([
        fetch('http://localhost:4000/api/events/'),
        fetch('http://localhost:4000/api/posts/Allpost'),
        fetch('http://localhost:4000/api/users'),
        fetch('http://localhost:4000/api/reviews'),
        fetch('http://localhost:4000/api/payments/'),
      ]);
      const [eventData, postData, userData, reviewData, paymentData] = await Promise.all([
        eventRes.json(), postRes.json(), userRes.json(), reviewRes.json(), paymentRes.json()
      ]);
      setEvents(eventData);
      setPosts(postData);
      setUsers(userData);
      setReviews(Array.isArray(reviewData) ? reviewData : (reviewData.reviews || []));
      setPayments(paymentData.data || []);
      setLoading(false);
    };
    fetchAll();
  }, []);

  // Xử lý tổng số bài viết
  let totalPosts = 0;
  if (posts && typeof posts.total === 'number') {
    totalPosts = posts.total;
  } else if (posts && Array.isArray(posts.posts)) {
    totalPosts = posts.posts.length;
  } else if (Array.isArray(posts)) {
    totalPosts = posts.length;
  }

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
    // Lấy acc status, chuyển về chữ thường, chuẩn hóa về 'vip', 'premium', 'false'
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

  // Card tổng quan
  const statCards = [
    { label: 'Sự kiện', value: events.length, icon: icons[0] },
    { label: 'Bài viết', value: totalPosts, icon: icons[1] },
    { label: 'Tổng user', value: users.length, icon: icons[2] },
    { label: 'Admin', value: adminCount, icon: icons[3] },
    { label: 'User thường', value: userCount, icon: icons[4] },
    { label: 'Tổng review', value: reviews.length, icon: icons[5] },
    { label: 'Tổng doanh thu', value: `${totalRevenue.toLocaleString('vi-VN')}đ`, icon: icons[6] },
  ];

  return (
    <div className="dashboard-all-bg">
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
            <div className="dashboard-charts">
              <div className="dashboard-chart">
                <div className="dashboard-chart-title">Tỷ lệ Admin/User</div>
                <Pie data={pieData} />
              </div>
              <div className="dashboard-chart">
                <div className="dashboard-chart-title">Số lượng sự kiện, bài viết, review</div>
                <Bar data={barData} options={{
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
                }} />
              </div>
              <div className="dashboard-chart">
                <div className="dashboard-chart-title">Phân loại tài khoản theo AccStatus</div>
                <Bar data={accStatusBarData} options={{
                  plugins: { legend: { display: true } },
                  scales: { y: { beginAtZero: true, stepSize: 1 } }
                }} />
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
                  {reviews.slice(0, 5).map((r, idx) => (
                    <div className="dashboard-review-item" key={r._id || idx}>
                      <span className="dashboard-review-avatar">☕</span>
                      <div className="dashboard-review-content">
                        <div className="dashboard-review-text">"{r.content}"</div>
                        <div className="dashboard-review-rating">⭐ {r.rating}</div>
                      </div>
                    </div>
                  ))}
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