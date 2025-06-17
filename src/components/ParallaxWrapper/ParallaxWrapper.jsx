import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxWrapper = ({ children, speed = 0.5, direction = 'vertical', className = '' }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{
        y: direction === 'vertical' ? y : 0,
        x: direction === 'horizontal' ? x : 0,
        willChange: 'transform'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxWrapper;
