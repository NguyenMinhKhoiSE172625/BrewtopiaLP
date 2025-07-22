import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import './Hero.css';
import { downloadAPK } from '../../services/downloadService';

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 60,
  particles: {
    number: { value: 18, density: { enable: true, value_area: 800 } },
    color: { value: ['#A9745B', '#6B3F25', '#e9ded6'] },
    shape: { type: 'circle' },
    opacity: { value: 0.18, random: true },
    size: { value: 32, random: { enable: true, minimumValue: 8 } },
    move: { enable: true, speed: 0.7, direction: 'none', random: true, straight: false, outModes: 'out' },
  },
  detectRetina: true,
};

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-particles-bg">
        <Particles id="tsparticles" options={particlesOptions} />
      </div>
      <div className="hero-container modern centerized hero-maxwidth">
        <div className="hero-content modern centerized">
          <motion.div
            className="hero-appname-block"
            initial={{ opacity: 0, scale: 0.85, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'drop-shadow(0 8px 32px #A9745B44)' }}
            transition={{ duration: 0.9, delay: 0.1, type: 'spring', stiffness: 60 }}
          >
            <motion.span
              className="hero-appname super gradient-text"
              initial={{ textShadow: 'none' }}
              animate={{
                textShadow: [
                  '0 4px 32px #A9745B77',
                  '0 8px 64px #6B3F2577',
                  '0 4px 32px #A9745B77'
                ],
                scale: [1, 1.04, 1],
              }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse' }}
              style={{ fontFamily: 'Abril Fatface, serif' }}
            >
              Brewtopia
            </motion.span>
            <motion.div
              className="hero-appname-underline"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5, type: 'spring', stiffness: 80 }}
            />
            <motion.div
              className="hero-appname-slogan strong"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, type: 'spring', stiffness: 60 }}
            >
              Cùng bạn chill, quán được deal
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-buttons modern centerized"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, type: 'spring', stiffness: 60 }}
          >
            <motion.a
              href="#features"
              className="primary-btn modern"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <span role="img" aria-label="search" style={{marginRight: 8}}>🔎</span>
              Khám phá ngay
            </motion.a>
            <motion.button
              onClick={downloadAPK}
              className="secondary-btn modern"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <span role="img" aria-label="download" style={{marginRight: 8}}>⬇️</span>
              Tải ứng dụng
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 