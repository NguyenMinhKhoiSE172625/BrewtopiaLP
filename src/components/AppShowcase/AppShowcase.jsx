import React from 'react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '../ParallaxWrapper/ParallaxWrapper';
import './AppShowcase.css';

const AppShowcase = () => {
  const features = [
    {
      title: "Tìm Kiếm Thông Minh",
      description: "Tìm quán cafe phù hợp với nhu cầu của bạn thông qua bộ lọc thông minh: máy lạnh, wifi, không gian, giá cả và nhiều tiêu chí khác.",
      icon: "🔍",
      image: "/search-feature.png"
    },
    {
      title: "Cộng Đồng Sôi Nổi",
      description: "Tham gia vào cộng đồng người yêu cafe, chia sẻ trải nghiệm, đánh giá và khám phá những góc cafe mới lạ.",
      icon: "👥",
      image: "/community-feature.png"
    },
    {
      title: "Bản Đồ Tương Tác",
      description: "Xem vị trí các quán cafe trên bản đồ, tìm đường đi nhanh nhất và khám phá những quán mới gần bạn.",
      icon: "🗺️",
      image: "/map-feature.png"
    },
    {
      title: "Đặt Món & Đặt Bàn",
      description: "Đặt món trực tuyến và đặt bàn trước để đảm bảo có chỗ ngồi ưng ý tại quán cafe yêu thích.",
      icon: "📱",
      image: "/booking-feature.png"
    },
    {
      title: "Sự Kiện & Livestream",
      description: "Tham gia các sự kiện cafe đặc biệt và xem livestream từ các quán cafe nổi tiếng.",
      icon: "🎥",
      image: "/event-feature.png"
    }
  ];

  return (
    <section className="app-showcase" id="showcase">
      <div className="showcase-container">
        <ParallaxWrapper speed={0.1} direction="vertical">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Khám Phá Brewtopia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="showcase-subtitle"
          >
            Trải nghiệm ứng dụng tìm kiếm và đặt chỗ quán cafe thông minh
          </motion.p>
        </ParallaxWrapper>

        <div className="features-showcase">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-item zigzag ${index % 2 === 1 ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, boxShadow: "0 16px 48px rgba(139, 94, 60, 0.18)" }}
            >
              <div className="feature-zigzag-img">
                <ParallaxWrapper speed={0.18} direction="vertical">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="feature-zigzag-image"
                    whileHover={{ scale: 1.07, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                </ParallaxWrapper>
              </div>
              <div className="feature-zigzag-text">
                <motion.div
                  className="feature-icon"
                  whileHover={{ rotate: -10, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <ParallaxWrapper speed={0.1} direction="vertical">
          <motion.div
            className="cta-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Tải Ngay Brewtopia</h3>
            <p>Khám phá thế giới cafe tuyệt vời ngay hôm nay</p>
            <div className="cta-buttons">
              <motion.a
                href="#"
                className="app-store-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/app-store.png" alt="App Store" />
              </motion.a>
              <motion.a
                href="#"
                className="play-store-btn"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src="/play-store.png" alt="Play Store" />
              </motion.a>
            </div>
          </motion.div>
        </ParallaxWrapper>
      </div>
    </section>
  );
};

export default AppShowcase; 