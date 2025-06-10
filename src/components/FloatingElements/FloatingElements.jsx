import React from 'react';
import { motion } from 'framer-motion';
import './FloatingElements.css';

const FloatingElements = () => {
  const coffeeElements = [
    { icon: '☕', size: '2rem', delay: 0 },
    { icon: '🫘', size: '1.5rem', delay: 2 },
    { icon: '🥐', size: '1.8rem', delay: 4 },
    { icon: '🧁', size: '1.6rem', delay: 6 },
    { icon: '🍰', size: '1.4rem', delay: 8 },
    { icon: '🥯', size: '1.7rem', delay: 10 },
    { icon: '🍪', size: '1.3rem', delay: 12 },
    { icon: '🥨', size: '1.9rem', delay: 14 },
    { icon: '🧈', size: '1.2rem', delay: 16 },
    { icon: '🍯', size: '1.5rem', delay: 18 }
  ];

  return (
    <div className="floating-elements">
      {coffeeElements.map((element, index) => (
        <motion.div
          key={index}
          className={`floating-element floating-element-${index + 1}`}
          style={{
            fontSize: element.size,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-15, 15, -15],
            rotate: [-10, 10, -10],
            scale: [1, 1.1, 1],
            z: 0
          }}
          transition={{
            duration: 6 + index * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
            repeatType: "reverse"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
