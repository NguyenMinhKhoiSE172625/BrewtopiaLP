import React from 'react';
import { motion } from 'framer-motion';
import AnimationWrapper from '../AnimationWrapper/AnimationWrapper';
import ParallaxWrapper from '../ParallaxWrapper/ParallaxWrapper';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <AnimationWrapper animation="fadeInLeft" delay={0.2}>
          <ParallaxWrapper speed={0.2} direction="vertical">
            <div className="hero-content">
              <motion.h1
                initial={{ opacity: 0, y: 50, z: 0 }}
                animate={{ opacity: 1, y: 0, z: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
              >
                <span style={{display: 'block'}}>Tìm Quán Cafe</span>
                <span style={{display: 'block'}}>Hoàn Hảo Cho Bạn</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30, z: 0 }}
                animate={{ opacity: 1, y: 0, z: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
              >
                Khám phá những quán cafe phù hợp với nhu cầu của bạn - từ không gian yên tĩnh để làm việc
                đến những góc chill cùng bạn bè. Tìm kiếm theo tiêu chí: máy lạnh, wifi, không gian,
                và nhiều hơn nữa.
              </motion.p>
              <motion.div
                className="hero-buttons"
                initial={{ opacity: 0, y: 20, z: 0 }}
                animate={{ opacity: 1, y: 0, z: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
              >
                <motion.a
                  href="#features"
                  className="primary-btn"
                  whileHover={{ scale: 1.05, y: -2, z: 0 }}
                  whileTap={{ scale: 0.95, z: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: 'transform' }}
                >
                  Khám phá ngay
                </motion.a>
                <motion.a
                  href="#download"
                  className="secondary-btn"
                  whileHover={{ scale: 1.05, y: -2, z: 0 }}
                  whileTap={{ scale: 0.95, z: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: 'transform' }}
                >
                  Tải ứng dụng
                </motion.a>
              </motion.div>
            </div>
          </ParallaxWrapper>
        </AnimationWrapper>

        <AnimationWrapper animation="fadeInRight" delay={0.4}>
          <ParallaxWrapper speed={0.3} direction="vertical">
            <div className="hero-image">
              <ParallaxWrapper speed={0.2}>
                <motion.img
                  src="/brew_topia.png"
                  alt="Brewtopia App Preview"
                  whileHover={{ scale: 1.03, rotate: 1, z: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                />
              </ParallaxWrapper>
            </div>
          </ParallaxWrapper>
        </AnimationWrapper>
      </div>
    </section>
  );
};

export default Hero; 