import { motion, useReducedMotion } from 'framer-motion';
import './Statement.css';

export default function Statement() {
  const shouldReduceMotion = useReducedMotion();

  const M = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section className="statement">
      <M
        className="statement-text"
        {...(!shouldReduceMotion && {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, ease: [0.2, 0.6, 0.3, 1] }
        })}
      >
        WELCOME TO<br />BLUE MOON
      </M>
    </section>
  );
}
