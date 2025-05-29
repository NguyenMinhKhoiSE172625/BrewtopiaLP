import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Tìm Quán Cafe Hoàn Hảo Cho Bạn</h1>
          <p>
            Khám phá những quán cafe phù hợp với nhu cầu của bạn - từ không gian yên tĩnh để làm việc
            đến những góc chill cùng bạn bè. Tìm kiếm theo tiêu chí: máy lạnh, wifi, không gian,
            và nhiều hơn nữa.
          </p>
          <div className="hero-buttons">
            <a href="#features" className="primary-btn">Khám phá ngay</a>
            <a href="#download" className="secondary-btn">Tải ứng dụng</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/Logo2-T.png" alt="Brewtopia App Preview" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 