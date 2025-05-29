import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form ở đây
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <h2>Liên Hệ Với Chúng Tôi</h2>
        <p className="contact-subtitle">
          Bạn có câu hỏi hoặc góp ý? Hãy để lại tin nhắn cho chúng tôi
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Địa chỉ</h3>
              <p>123 Đường ABC, Quận XYZ, TP.HCM</p>
            </div>
            <div className="info-item">
              <h3>Email</h3>
              <p>info@brewtopia.com</p>
            </div>
            <div className="info-item">
              <h3>Điện thoại</h3>
              <p>1900 1234</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Tiêu đề"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Nội dung tin nhắn"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Gửi tin nhắn</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 