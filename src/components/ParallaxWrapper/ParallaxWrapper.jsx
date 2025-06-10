import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxWrapper = ({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'up' 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
      default:
        return useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
    }
  };

  const transform = getTransform();

  const motionStyle = direction === 'left' || direction === 'right' 
    ? { x: transform }
    : { y: transform };

  return (
    <motion.div
      ref={ref}
      style={motionStyle}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper;
