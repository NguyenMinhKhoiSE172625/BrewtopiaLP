import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '🌡️',
      title: 'Tìm kiếm theo tiêu chí',
      description: 'Lọc quán cafe theo máy lạnh, wifi, không gian, và nhiều tiêu chí khác'
    },
    {
      icon: '📊',
      title: 'Đánh giá thực tế',
      description: 'Xem đánh giá và nhận xét từ người dùng thực tế'
    },
    {
      icon: '🎯',
      title: 'Đặt chỗ trước',
      description: 'Đặt bàn trước để đảm bảo có chỗ ngồi ưng ý'
    },
    {
      icon: '💳',
      title: 'Thanh toán tiện lợi',
      description: 'Thanh toán trực tuyến và tích điểm thưởng'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <h2>Tính Năng Nổi Bật</h2>
        <p className="features-subtitle">
          Khám phá những tính năng giúp bạn tìm được quán cafe hoàn hảo
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 