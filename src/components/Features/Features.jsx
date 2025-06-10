import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: '☕',
      title: 'Tìm kiếm theo tiêu chí',
      description: 'Lọc quán cafe theo máy lạnh, wifi, không gian, và nhiều tiêu chí khác'
    },
    {
      icon: '⭐',
      title: 'Đánh giá thực tế',
      description: 'Xem đánh giá và nhận xét từ người dùng thực tế'
    },
    {
      icon: '📅',
      title: 'Đặt chỗ trước',
      description: 'Đặt bàn trước để đảm bảo có chỗ ngồi ưng ý'
    },
    {
      icon: '💰',
      title: 'Thanh toán tiện lợi',
      description: 'Thanh toán trực tuyến và tích điểm thưởng'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="features-container">
        <AnimationWrapper animation="fadeInUp" delay={0.2}>
          <h2>Tính Năng Nổi Bật</h2>
          <p className="features-subtitle">
            Khám phá những tính năng giúp bạn tìm được quán cafe hoàn hảo
          </p>
        </AnimationWrapper>

        <div className="features-grid">
          {features.map((feature, index) => (
            <AnimationWrapper
              key={index}
              animation="scaleIn"
              delay={0.4 + index * 0.1}
            >
              <motion.div
                className="feature-card"
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  boxShadow: "0 20px 40px rgba(139, 94, 60, 0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="feature-icon"
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 