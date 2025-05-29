import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Nguyễn Văn A',
      role: 'Freelancer',
      image: '/src/assets/images/avatar1.jpg',
      content: 'Nhờ Brewtopia, tôi đã tìm được những quán cafe hoàn hảo để làm việc. Không gian yên tĩnh, wifi ổn định và đồ uống ngon.'
    },
    {
      name: 'Trần Thị B',
      role: 'Sinh viên',
      image: '/src/assets/images/avatar2.jpg',
      content: 'Ứng dụng rất hữu ích cho việc tìm quán cafe học nhóm. Có thể xem trước không gian và đặt chỗ trước rất tiện lợi.'
    },
    {
      name: 'Lê Văn C',
      role: 'Doanh nhân',
      image: '/src/assets/images/avatar3.jpg',
      content: 'Tôi thường xuyên họp với đối tác tại các quán cafe. Brewtopia giúp tôi tìm được những địa điểm chuyên nghiệp và phù hợp.'
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <h2>Đánh Giá Từ Người Dùng</h2>
        <p className="testimonials-subtitle">
          Khám phá trải nghiệm của những người đã sử dụng Brewtopia
        </p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-content">
                <p>{testimonial.content}</p>
              </div>
              <div className="testimonial-author">
                <img src={testimonial.image} alt={testimonial.name} />
                <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 