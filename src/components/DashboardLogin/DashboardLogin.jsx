import React, { useState } from 'react';
import './DashboardLogin.css';
import { useNavigate } from 'react-router-dom';

const DashboardLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'khoi' && password === 'khoi123') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
    } else {
      setError('Tài khoản hoặc mật khẩu không đúng!');
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
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={e => setUsername(e.target.value)}
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