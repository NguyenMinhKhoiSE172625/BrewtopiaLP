import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <motion.header
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="header-container">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img src="/brew_topia_symbol.png" alt="Brewtopia Logo" />
        </motion.div>

        <nav className="nav-menu">
          <ul>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#home" onClick={e => scrollToSection(e, 'home')}>Trang chủ</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#features" onClick={e => scrollToSection(e, 'features')}>Tính năng</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#testimonials" onClick={e => scrollToSection(e, 'testimonials')}>Đánh giá</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="#contact" onClick={e => scrollToSection(e, 'contact')}>Liên hệ</a>
            </motion.li>
            <motion.li whileHover={{ y: -2 }}>
              <a href="/dashboard-all" onClick={e => { e.preventDefault(); navigate('/dashboard-all'); }}>Tổng Quan</a>
            </motion.li>
          </ul>
        </nav>

        {!isLoggedIn ? (
          <motion.a
            href="/dashboard-login"
            className="login-btn"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng nhập
          </motion.a>
        ) : (
          <div className="profile-dropdown-wrapper" ref={dropdownRef}>
            <motion.button
              className="profile-btn"
              onClick={() => setShowDropdown(v => !v)}
              style={{background: '#fff', color: '#8B5E3C', border: '2px solid #A9745B', borderRadius: '50%', width: 44, height: 44, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(139,94,60,0.08)'}}
              title="Tài khoản doanh nghiệp"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span style={{fontSize: 22}}>👤</span>
            </motion.button>
            {showDropdown && (
              <motion.div
                className="profile-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.header>
  );
};

export default Header; 