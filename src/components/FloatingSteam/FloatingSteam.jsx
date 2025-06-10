import React from 'react';
import { motion } from 'framer-motion';
import './FloatingSteam.css';

const FloatingSteam = () => {
  const steamLines = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    delay: index * 2,
    x: Math.random() * 100,
    y: Math.random() * 100
  }));

  return (
    <div className="floating-steam">
      {steamLines.map((steam) => (
        <motion.div
          key={steam.id}
          className="steam-line"
          style={{
            left: `${steam.x}%`,
            top: `${steam.y}%`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          animate={{
            y: [-100, -200],
            opacity: [0, 0.3, 0],
            scale: [1, 1.5, 2],
            z: 0
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeOut",
            delay: steam.delay,
            repeatType: "loop"
          }}
        >
          <div className="steam-particle steam-particle-1"></div>
          <div className="steam-particle steam-particle-2"></div>
          <div className="steam-particle steam-particle-3"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingSteam;
