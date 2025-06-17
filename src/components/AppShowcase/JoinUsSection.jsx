import React from 'react';
import { motion } from 'framer-motion';
import './JoinUsSection.css';

const plans = [
  {
    name: 'Gói Thành Viên',
    price: 'Miễn phí',
    features: [
      'Tìm kiếm quán cafe không giới hạn',
      'Tham gia cộng đồng, bình luận',
      'Xem bản đồ quán cafe'
    ],
    highlight: false
  },
  {
    name: 'VIP',
    price: '99.000đ/tháng',
    features: [
      'Đặt bàn trước ưu tiên',
      'Nhận ưu đãi giảm giá tại các quán đối tác',
      'Tham gia sự kiện offline đặc biệt'
    ],
    highlight: true
  },
  {
    name: 'Premium',
    price: '199.000đ/tháng',
    features: [
      'Livestream sự kiện độc quyền',
      'Tích điểm đổi quà cao cấp',
      'Hỗ trợ khách hàng 24/7'
    ],
    highlight: false
  }
];

const JoinUsSection = () => {
  return (
    <section className="join-us-section" id="join-us">
      <div className="join-us-container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Tham Gia Với Chúng Tôi
        </motion.h2>
        <motion.p
          className="join-us-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Nâng cấp tài khoản để trải nghiệm nhiều tiện ích và ưu đãi đặc biệt từ Brewtopia!
        </motion.p>
        <div className="plans-grid">
          {plans.map((plan, idx) => (
            <motion.div
              className={`plan-card${plan.highlight ? ' highlight' : ''}`}
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <h3>{plan.name}</h3>
              <div className="plan-price">{plan.price}</div>
              <ul className="plan-features">
                {plan.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <motion.button
                className="join-btn"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.96 }}
              >
                {plan.name === 'Gói Thành Viên' ? 'Đã tham gia' : 'Nâng cấp ngay'}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection; 