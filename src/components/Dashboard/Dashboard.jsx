import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-bg">
      <div className="dashboard-container">
        <h1>Chào mừng, Khoi!</h1>
        <p>Đây là dashboard quản lý quán cafe của bạn.</p>
        <div className="dashboard-card">
          <h2>Quán Cafe Brewtopia</h2>
          <ul>
            <li><b>Địa chỉ:</b> 123 Đường ABC, Quận XYZ, TP.HCM</li>
            <li><b>Doanh thu tháng này:</b> 120.000.000đ</li>
            <li><b>Lượt khách:</b> 1.250</li>
            <li><b>Đánh giá trung bình:</b> 4.7/5 ⭐</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 