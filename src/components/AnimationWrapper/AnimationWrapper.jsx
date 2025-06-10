import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimationWrapper = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.1,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    once
  });

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, y: 60, z: 0 },
      animate: { opacity: 1, y: 0, z: 0 }
    },
    fadeInDown: {
      initial: { opacity: 0, y: -60, z: 0 },
      animate: { opacity: 1, y: 0, z: 0 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -60, z: 0 },
      animate: { opacity: 1, x: 0, z: 0 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 60, z: 0 },
      animate: { opacity: 1, x: 0, z: 0 }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8, z: 0 },
      animate: { opacity: 1, scale: 1, z: 0 }
    },
    slideInUp: {
      initial: { opacity: 0, y: 100, z: 0 },
      animate: { opacity: 1, y: 0, z: 0 }
    },
    rotateIn: {
      initial: { opacity: 0, rotate: -10, scale: 0.9, z: 0 },
      animate: { opacity: 1, rotate: 0, scale: 1, z: 0 }
    }
  };

  const selectedAnimation = animations[animation] || animations.fadeInUp;

  return (
    <motion.div
      ref={ref}
      initial={selectedAnimation.initial}
      animate={isInView ? selectedAnimation.animate : selectedAnimation.initial}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
