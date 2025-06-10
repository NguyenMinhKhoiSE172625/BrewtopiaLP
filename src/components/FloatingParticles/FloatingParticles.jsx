import React from 'react';
import { motion } from 'framer-motion';
import './FloatingParticles.css';

const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    size: Math.random() * 8 + 4, // 4-12px
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15, // 15-25s
    x: Math.random() * 100, // 0-100%
    y: Math.random() * 100, // 0-100%
    opacity: Math.random() * 0.1 + 0.05 // 0.05-0.15
  }));

  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="floating-particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          animate={{
            y: [-50, 50, -50],
            x: [-30, 30, -30],
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity],
            z: 0
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
