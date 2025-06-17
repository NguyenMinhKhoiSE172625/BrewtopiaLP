import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import ParallaxWrapper from '../ParallaxWrapper/ParallaxWrapper';
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
          <ParallaxWrapper speed={0.1} direction="vertical">
            <h2>Tính Năng Nổi Bật</h2>
            <p className="features-subtitle">
              Khám phá những tính năng giúp bạn tìm được quán cafe hoàn hảo
            </p>
          </ParallaxWrapper>
        </AnimationWrapper>

        <div className="features-grid">
          {features.map((feature, index) => (
            <AnimationWrapper key={index} animation="fadeInUp" delay={0.2 + index * 0.1}>
              <ParallaxWrapper speed={0.15} direction="vertical">
                <motion.div
                  className="feature-card"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="feature-icon"
                    whileHover={{ rotate: -10, scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              </ParallaxWrapper>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 