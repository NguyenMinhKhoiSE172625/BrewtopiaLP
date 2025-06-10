import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Nguyễn Văn A',
      role: 'Freelancer',
      avatar: '👨‍💻',
      rating: 5,
      content: 'Nhờ Brewtopia, tôi đã tìm được những quán cafe hoàn hảo để làm việc. Không gian yên tĩnh, wifi ổn định và đồ uống ngon.'
    },
    {
      name: 'Trần Thị B',
      role: 'Sinh viên',
      avatar: '👩‍🎓',
      rating: 5,
      content: 'Ứng dụng rất hữu ích cho việc tìm quán cafe học nhóm. Có thể xem trước không gian và đặt chỗ trước rất tiện lợi.'
    },
    {
      name: 'Lê Văn C',
      role: 'Doanh nhân',
      avatar: '👨‍💼',
      rating: 5,
      content: 'Tôi thường xuyên họp với đối tác tại các quán cafe. Brewtopia giúp tôi tìm được những địa điểm chuyên nghiệp và phù hợp.'
    },
    {
      name: 'Phạm Thị D',
      role: 'Blogger',
      avatar: '👩‍💻',
      rating: 5,
      content: 'Tôi yêu thích tính năng đánh giá chi tiết. Giúp tôi tìm được những quán cafe có góc sống ảo đẹp để chụp hình.'
    },
    {
      name: 'Hoàng Minh E',
      role: 'Designer',
      avatar: '🎨',
      rating: 4,
      content: 'Interface rất đẹp và dễ sử dụng. Tính năng lọc theo tiêu chí giúp tôi tìm được quán phù hợp với nhu cầu sáng tạo.'
    },
    {
      name: 'Võ Thị F',
      role: 'Giáo viên',
      avatar: '👩‍🏫',
      rating: 5,
      content: 'Rất tiện lợi khi cần tìm quán cafe để chấm bài và chuẩn bị giáo án. Thông tin về độ ồn rất chính xác.'
    }
  ];

  // Triple testimonials for seamless infinite loop
  const infiniteTestimonials = [...testimonials, ...testimonials, ...testimonials];

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
            animate={{
              x: [0, -(370 * testimonials.length)]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className="testimonial-card"
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
      </div>
    </section>
  );
};

export default Testimonials; 