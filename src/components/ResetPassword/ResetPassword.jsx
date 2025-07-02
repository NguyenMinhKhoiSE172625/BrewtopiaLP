import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    // Kiểm tra xem có token và email không
    if (!token || !email) {
      setError('Link đặt lại mật khẩu không hợp lệ. Vui lòng kiểm tra lại email của bạn.');
    }
  }, [token, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!password) {
      setError('Vui lòng nhập mật khẩu mới');
      return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (!token || !email) {
      setError('Thông tin đặt lại mật khẩu không hợp lệ');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          token,
          email,
          newPassword: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại.');
      }

      setSuccess('Đặt lại mật khẩu thành công! Đang chuyển hướng...');
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate('/dashboard-login');
      }, 2000);
      
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-bg">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="back-home-btn"
          onClick={() => navigate('/')}
          title="Về trang chủ"
        >&lt;</button>
        
        <h2>Đặt lại mật khẩu</h2>
        
        {email && (
          <div className="reset-info">
            <span className="reset-email">📧 {email}</span>
          </div>
        )}

        <input
          type="password"
          placeholder="Mật khẩu mới (tối thiểu 6 ký tự)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading || !token || !email}
          autoFocus
        />
        
        <input
          type="password"
          placeholder="Xác nhận mật khẩu mới"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          disabled={loading || !token || !email}
        />

        {error && <div className="reset-error">{error}</div>}
        {success && <div className="reset-success">{success}</div>}

        <button 
          type="submit" 
          disabled={loading || !token || !email}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
        </button>

        <div className="reset-footer">
          <a href="/dashboard-login" onClick={(e) => { e.preventDefault(); navigate('/dashboard-login'); }}>
            ← Quay lại đăng nhập
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword; 