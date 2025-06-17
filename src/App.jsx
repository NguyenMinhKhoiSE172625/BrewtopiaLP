import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Features from './components/Features/Features'
import AppShowcase from './components/AppShowcase/AppShowcase'
import JoinUsSection from './components/AppShowcase/JoinUsSection'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import DashboardLogin from './components/DashboardLogin/DashboardLogin'
import DashboardAccount from './components/Dashboard/Dashboard'
import DashboardAll from './components/DashboardAll/DashboardAll'
import FloatingElements from './components/FloatingElements/FloatingElements'
import FloatingShapes from './components/FloatingShapes/FloatingShapes'
import FloatingParticles from './components/FloatingParticles/FloatingParticles'
import FloatingSteam from './components/FloatingSteam/FloatingSteam'

import SmoothScroll from './components/SmoothScroll/SmoothScroll'
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { MdArrowBack, MdHistory } from 'react-icons/md'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === '/dashboard';
  const isDashboardLogin = location.pathname === '/dashboard-login';
  const isDashboardAll = location.pathname === '/dashboard-all';
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập trạng thái đăng nhập (có thể dùng localStorage hoặc context thực tế)
  const isLoggedIn = isDashboard;

  useEffect(() => {
    // Simulate loading time - reduced for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <SmoothScroll>
      <div className={`app${!isDashboard && !isDashboardLogin ? ' has-header' : ''}`}>
        {(!isDashboard && !isDashboardLogin) && (
          <>
            <FloatingSteam />
            <FloatingParticles />
            <FloatingShapes />
            <FloatingElements />
          </>
        )}
        {(!isDashboard && !isDashboardLogin) || isDashboardAll ? <Header /> : null}
        {isDashboard && (
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 2rem 0.5rem 2rem'}}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: '#8B5E3C',
                color: '#fff',
                border: '2px solid #A9745B',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.3rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(139,94,60,0.10)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#A9745B'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,94,60,0.18)'; }}
              onMouseOut={e => { e.currentTarget.style.background = '#8B5E3C'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(139,94,60,0.10)'; }}
              title="Về trang chủ"
            >
              <MdArrowBack size={28} color="#fff" />
            </button>
            <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <button onClick={() => alert('Xem lịch sử giao dịch!')} style={{background: '#fff', color: '#A9745B', border: '2px solid #A9745B', borderRadius: 20, padding: '0.5rem 1.2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 8px rgba(139,94,60,0.08)'}}>
                <MdHistory size={22} />
                Lịch sử giao dịch
              </button>
              <button onClick={() => navigate('/dashboard')} style={{background: '#fff', color: '#8B5E3C', border: '2px solid #A9745B', borderRadius: '50%', width: 44, height: 44, fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(139,94,60,0.08)'}} title="Xem dashboard">
                <span style={{fontSize: 22}}>👤</span>
              </button>
            </div>
          </div>
        )}
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <AppShowcase />
                <JoinUsSection />
                <Testimonials />
                <Contact />
              </>
            } />
            <Route path="/dashboard-login" element={<DashboardLogin />} />
            <Route path="/dashboard" element={<DashboardAccount />} />
            <Route path="/dashboard-all" element={<DashboardAll />} />
          </Routes>
        </main>
        {(!isDashboard && !isDashboardLogin) || isDashboardAll ? <Footer /> : null}
      </div>
    </SmoothScroll>
  )
}

export default App
