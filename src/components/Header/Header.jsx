import React from 'react';
import './Header.css';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/Logo1-T.png" alt="Brewtopia Logo" />
        </div>
        <nav className="nav-menu">
          <ul>
            <li><a href="#home" onClick={e => scrollToSection(e, 'home')}>Trang chủ</a></li>
            <li><a href="#features" onClick={e => scrollToSection(e, 'features')}>Tính năng</a></li>
            <li><a href="#testimonials" onClick={e => scrollToSection(e, 'testimonials')}>Đánh giá</a></li>
            <li><a href="#contact" onClick={e => scrollToSection(e, 'contact')}>Liên hệ</a></li>
          </ul>
        </nav>
        <a href="/login" className="login-btn">Đăng nhập</a>
      </div>
    </header>
  );
};

export default Header; 