import { motion, useReducedMotion } from 'framer-motion';
import './Statement.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Statement() {
  const shouldReduceMotion = useReducedMotion();
  const wrap = (props: object) => (shouldReduceMotion ? {} : props);

  return (
    <section className="hospitality-film">
      <video
        className="hospitality-film__video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
      
      <div className="hospitality-film__shade" />
      
      <motion.div className="hospitality-film__content" {...wrap(fadeUp(0.14))}>
        <h2>
          COME HUNGRY.
          <br />
          LEAVE LATE.
        </h2>
        
        <p>
          Full tables. Cold glasses. Evenings that rarely end on time.
        </p>
      </motion.div>
    </section>
  );
}
