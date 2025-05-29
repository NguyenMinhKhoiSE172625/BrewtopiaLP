import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/Logo2-T.png" alt="Brewtopia Logo" />
            <p>Khám phá không gian cafe hoàn hảo cho bạn</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Liên kết</h4>
              <ul>
                <li><a href="#home">Trang chủ</a></li>
                <li><a href="#features">Tính năng</a></li>
                <li><a href="#testimonials">Đánh giá</a></li>
                <li><a href="#contact">Liên hệ</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Liên hệ</h4>
              <ul>
                <li>Email: info@brewtopia.com</li>
                <li>Hotline: 1900 1234</li>
                <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Theo dõi chúng tôi</h4>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">Twitter</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Brewtopia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 