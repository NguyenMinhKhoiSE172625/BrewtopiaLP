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
];

const DashboardAll = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      const [eventRes, postRes, userRes, reviewRes] = await Promise.all([
        fetch('http://localhost:4000/api/events/'),
        fetch('http://localhost:4000/api/posts/Allpost'),
        fetch('http://localhost:4000/api/users'),
        fetch('http://localhost:4000/api/reviews'),
      ]);
      const [eventData, postData, userData, reviewData] = await Promise.all([
        eventRes.json(), postRes.json(), userRes.json(), reviewRes.json()
      ]);
      setEvents(eventData);
      setPosts(postData);
      setUsers(userData);
      setReviews(Array.isArray(reviewData) ? reviewData : (reviewData.reviews || []));
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

  // Xử lý dữ liệu AccStatus
  const accStatusTypes = ['false', 'premium', 'vip'];
  const accStatusCount = {
    user: { false: 0, premium: 0, vip: 0 },
    admin: { false: 0, premium: 0, vip: 0 }
  };

  users.forEach(u => {
    const status = (u.AccStatus || 'false').toString();
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
            {/* Danh sách review */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAll; 