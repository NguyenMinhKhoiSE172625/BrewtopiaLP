import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import DashboardLogin from './components/DashboardLogin/DashboardLogin'
import Dashboard from './components/Dashboard/Dashboard'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const isDashboardLogin = location.pathname === '/dashboard-login';

  // Giả lập trạng thái đăng nhập (có thể dùng localStorage hoặc context thực tế)
  const isLoggedIn = isDashboard;

  return (
    <div className={`app${!isDashboard && !isDashboardLogin ? ' has-header' : ''}`}>
      {!isDashboard && !isDashboardLogin && <Header />}
      {isDashboard && (
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1.2rem 2rem 0.5rem 2rem'}}>
          <button onClick={() => navigate('/')} style={{background: '#8B5E3C', color: '#fff', border: 'none', borderRadius: 20, padding: '0.5rem 1.3rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(139,94,60,0.08)'}}>Về trang chủ</button>
          {isLoggedIn && (
            <button onClick={() => navigate('/dashboard')} style={{background: '#fff', color: '#8B5E3C', border: '2px solid #A9745B', borderRadius: '50%', width: 44, height: 44, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(139,94,60,0.08)', marginLeft: 12}} title="Xem dashboard">
              <span style={{fontSize: 22}}>👤</span>
            </button>
          )}
        </div>
      )}
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <Testimonials />
              <Contact />
            </>
          } />
          <Route path="/dashboard-login" element={<DashboardLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!isDashboard && !isDashboardLogin && <Footer />}
    </div>
  )
}

export default App
