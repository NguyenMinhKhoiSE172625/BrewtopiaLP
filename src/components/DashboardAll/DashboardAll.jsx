import React, { useEffect, useState, useRef } from 'react';
import './DashboardAll.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const DashboardAll = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewContainerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const reviewListRef = useRef(null);

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

  // Lặp lại mảng review nhiều lần để đủ dài cho hiệu ứng mượt
  const repeatCount = 50;
  const reviewsLoop = Array.from({length: repeatCount}).flatMap(() => reviews);

  useEffect(() => {
    if (!reviews.length) return;
    const list = reviewListRef.current;
    if (!list) return;
    let frame;
    let speed = 0.5;
    function step() {
      setOffset(prev => {
        const listHeight = list.scrollHeight;
        const halfHeight = listHeight / 2;
        let next = prev + speed;
        if (next >= halfHeight) next = 0;
        return next;
      });
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [reviewsLoop]);

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

  const pieData = {
    labels: ['Admin', 'User'],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ['#A9745B', '#8B5E3C'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-all-bg">
      <div className="dashboard-all-container">
        <h1>Dashboard tổng hợp Brewtopia</h1>
        {loading ? <p>Đang tải dữ liệu...</p> : (
          <>
            <div className="dashboard-all-stats">
              <div className="stat-card"><b>Sự kiện:</b> {events.length}</div>
              <div className="stat-card"><b>Bài viết:</b> {totalPosts}</div>
              <div className="stat-card"><b>Tổng user:</b> {users.length}</div>
              <div className="stat-card"><b>Admin:</b> {adminCount}</div>
              <div className="stat-card"><b>User thường:</b> {userCount}</div>
              <div className="stat-card"><b>Tổng review:</b> {reviews.length}</div>
            </div>
            <div className="dashboard-all-flex">
              <div style={{width: 320}}>
                <Pie data={pieData} />
              </div>
              <div className="review-list-container" ref={reviewContainerRef}>
                <div style={{fontWeight:600, marginBottom:8}}>Tổng review: {reviews.length}</div>
                <div className="review-list" ref={reviewListRef} style={{ transform: `translateY(-${offset}px)` }}>
                  {reviewsLoop.map((r, idx) => (
                    <div className="review-item" key={r._id + '-' + idx}>
                      <span className="review-content">"{r.content}"</span>
                      <span className="review-rating">⭐{r.rating}</span>
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