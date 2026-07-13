import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  index?: number;
  as?: ElementType;
  className?: string;
}

export default function ScrollReveal({
  children,
  index = 0,
  as: Component = 'div',
  className = ''
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[Component as keyof typeof motion] as any;

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.12, 1.44),
        ease: [0.2, 0.6, 0.3, 1]
      }}
    >
      {children}
    </MotionComponent>
  );
}
