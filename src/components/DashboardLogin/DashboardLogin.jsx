import React, { useState } from 'react';
import './DashboardLogin.css';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';

const DashboardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const data = await apiService.login({
        email,
        password,
        role: 'admin'
      });

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('fetch')) {
        setError('Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ admin.');
      } else {
        setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <div className="dashboard-login-bg">
      <form className="dashboard-login-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate('/')}
          title="Về trang chủ"
        >&lt;</button>
        <h2>Doanh nghiệp</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default DashboardLogin; 