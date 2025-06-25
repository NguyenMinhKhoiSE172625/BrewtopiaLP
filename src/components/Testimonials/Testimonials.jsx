import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    // 7 User
    {
      name: 'Hồ Thảo Vy',
      role: 'User',
      avatar: '👩',
      rating: 5,
      content: 'Không cần quảng cáo phức tạp, tôi chỉ cần đăng bài đúng lúc – app giúp tôi tiếp cận đúng người.'
    },
    {
      name: 'Trần Thị Bích',
      role: 'User',
      avatar: '👩‍🎓',
      rating: 5,
      content: 'App hoạt động mượt mà, tuy nhiên đôi lúc thời gian load hơi lâu. Hy vọng sẽ được tối ưu tốc độ hơn nữa'
    },
    {
      name: 'Lê Hoàng Long',
      role: 'User',
      avatar: '🧑',
      rating: 5,
      content: 'Rất thích cách bố trí các danh mục trong app. Có thể bổ sung thêm phần hướng dẫn chi tiết hơn cho người mới'
    },
    {
      name: 'Phạm Thu Hương',
      role: 'User',
      avatar: '👩',
      rating: 5,
      content: 'Chương trình khuyến mãi hấp dẫn, nhưng đôi khi thông báo khuyến mãi hiển thị chưa đầy đủ. Mong cải thiện phần này'
    },
    {
      name: 'Đỗ Minh Tuấn',
      role: 'User',
      avatar: '👨',
      rating: 5,
      content: 'App có nhiều lựa chọn đồ uống đa dạng, giao diện đẹp mắt. Nếu có thêm tính năng gợi ý theo sở thích người dùng thì càng tuyệt vời'
    },
    {
      name: 'Bùi Đức Thắng',
      role: 'User',
      avatar: '👨',
      rating: 5,
      content: 'Dịch vụ chăm sóc khách hàng qua app rất nhanh chóng, đội ngũ hỗ trợ nhiệt tình. Cảm ơn team!'
    },
    {
      name: 'Nguyễn Văn An',
      role: 'User',
      avatar: '👨‍💻',
      rating: 5,
      content: 'Giao diện app thân thiện, dễ sử dụng. Mong team phát triển thêm nhiều tính năng mới để trải nghiệm thú vị hơn!'
    },
    // 5 Business
    {
      name: 'Trần Thanh Tâm',
      role: 'Business',
      avatar: '👨‍💼',
      rating: 5,
      content: 'Ứng dụng giúp dễ dàng tìm quán cà phê phù hợp để làm việc, họp nhóm hoặc gặp gỡ khách hàng, Tìm nhanh quán có wifi mạnh, không gian yên tĩnh, phòng họp riêng, Hỗ trợ xuất hóa đơn VAT. App chưa có cập nhập một số quán nhỏ'
    },
    {
      name: 'Lý Hồng Nhung',
      role: 'Business',
      avatar: '👩‍💼',
      rating: 5,
      content: 'Tôi dễ dàng đăng menu quán để tiếp cận khách hàng văn phòng gần khu vực.'
    },
    {
      name: 'Vũ Anh Tuấn',
      role: 'Business',
      avatar: '👨‍💼',
      rating: 5,
      content: 'Việc đăng thông tin khuyến mãi lên app giúp tôi giữ chân khách văn phòng đều đặn.'
    },
    {
      name: 'Phạm Đăng Huy',
      role: 'Business',
      avatar: '👨',
      rating: 5,
      content: 'Rất tiện lợi khi tôi có thể cập nhật hình ảnh menu quán mà không cần web riêng'
    },
    {
      name: 'Võ Thị Lan',
      role: 'Business',
      avatar: '👩‍💻',
      rating: 5,
      content: 'Tôi gặp lỗi khi thanh toán bằng ví điện tử, mong team sớm fix lỗi này. Còn lại mọi thứ rất ổn'
    }
  ];

  // Triple testimonials for seamless infinite loop
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

  const [isPaused, setIsPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <AnimationWrapper animation="fadeInUp" delay={0.2}>
          <h2>Đánh Giá Từ Người Dùng</h2>
          <p className="testimonials-subtitle">
            Khám phá trải nghiệm của những người đã sử dụng Brewtopia
          </p>
        </AnimationWrapper>

        <div className="testimonials-carousel-container">
          <motion.div
            className="testimonials-carousel"
            drag="x"
            dragConstraints={{ left: -(370 * testimonials.length * 2), right: 0 }}
            style={{ cursor: isPaused ? 'grab' : 'pointer' }}
            animate={isPaused ? false : { x: [0, -(370 * testimonials.length)] }}
            transition={isPaused ? undefined : {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => setIsPaused(false)}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className="testimonial-card"
                onClick={() => setSelectedTestimonial(testimonial)}
                tabIndex={0}
                style={{ outline: 'none' }}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Modal hiển thị đánh giá đầy đủ */}
        {selectedTestimonial && (
          <div className="testimonial-modal-overlay" onClick={() => setSelectedTestimonial(null)}>
            <div className="testimonial-modal" onClick={e => e.stopPropagation()}>
              <button className="testimonial-modal-close" onClick={() => setSelectedTestimonial(null)}>&times;</button>
              <div className="testimonial-modal-header">
                <div className="testimonial-avatar" style={{fontSize: '3.5rem', marginBottom: 12}}>{selectedTestimonial.avatar}</div>
                <div>
                  <h3 style={{margin: 0}}>{selectedTestimonial.name}</h3>
                  <div style={{color: '#A9745B', fontWeight: 500, marginBottom: 8}}>{selectedTestimonial.role}</div>
                  <div style={{display: 'flex', gap: 2, marginBottom: 8}}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{color: i < selectedTestimonial.rating ? '#FFD700' : '#ccc', fontSize: '1.2rem'}}>⭐</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="testimonial-modal-content">
                <p style={{fontSize: '1.1rem', color: '#6B3F25', lineHeight: 1.7}}>{selectedTestimonial.content}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials; 