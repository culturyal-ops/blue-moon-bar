import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import './CircularText.css';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  className = '',
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: spinDuration,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [spinDuration, controls]);

  return (
    <motion.div
      className={`circular-text ${className}`}
      animate={controls}
      style={{ rotate: rotation }}
    >
      {letters.map((letter, i) => {
        const angle = (360 / letters.length) * i;
        return (
          <span
            key={i}
            className="circular-text-letter"
            style={{
              transform: `rotate(${angle}deg)`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
