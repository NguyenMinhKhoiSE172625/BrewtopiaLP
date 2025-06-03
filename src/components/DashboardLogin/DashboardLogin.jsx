import React, { useState } from 'react';
import './DashboardLogin.css';
import { useNavigate } from 'react-router-dom';

const DashboardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          role: 'admin'
        })
      });

      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng hoặc liên hệ admin.');
        }
        const data = await response.json();
        throw new Error(data.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }

      const data = await response.json();
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
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