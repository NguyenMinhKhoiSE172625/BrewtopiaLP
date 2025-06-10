import React from 'react';
import { motion } from 'framer-motion';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', size: 60, delay: 0, color: '#A9745B' },
    { type: 'square', size: 40, delay: 3, color: '#8B5E3C' },
    { type: 'triangle', size: 50, delay: 6, color: '#D4B896' },
    { type: 'circle', size: 35, delay: 9, color: '#6B3F25' },
    { type: 'hexagon', size: 45, delay: 12, color: '#C4A484' },
    { type: 'circle', size: 25, delay: 15, color: '#A9745B' },
    { type: 'square', size: 30, delay: 18, color: '#8B5E3C' }
  ];

  return (
    <div className="floating-shapes">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`floating-shape floating-shape-${index + 1} ${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          animate={{
            y: [-40, 40, -40],
            x: [-20, 20, -20],
            rotate: [0, 360, 0],
            scale: [1, 1.2, 1],
            z: 0
          }}
          transition={{
            duration: 15 + index * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
