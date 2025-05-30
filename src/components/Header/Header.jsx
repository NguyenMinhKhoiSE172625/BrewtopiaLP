import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const scrollToSection = (e, id) => {
  e.preventDefault();
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setShowDropdown(false);
    navigate('/');
    window.location.reload();
  };

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
        {!isLoggedIn ? (
          <a href="/dashboard-login" className="login-btn">Đăng nhập</a>
        ) : (
          <div className="profile-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setShowDropdown(v => !v)}
              style={{background: '#fff', color: '#8B5E3C', border: '2px solid #A9745B', borderRadius: '50%', width: 44, height: 44, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(139,94,60,0.08)'}}
              title="Tài khoản doanh nghiệp"
            >
              <span style={{fontSize: 22}}>👤</span>
            </button>
            {showDropdown && (
              <div className="profile-dropdown">
                <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 