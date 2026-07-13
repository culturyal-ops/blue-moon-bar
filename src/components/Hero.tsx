import { motion, useReducedMotion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import CircularText from './CircularText';
import './Hero.css';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToVisit = () =>
    document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFood = () =>
    document.getElementById('food')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <BackgroundVideo
        videoSrc="/herogallery/hero-video.mp4"
        posterSrc="/hero-poster.svg"
        objectPositionDesktop="center center"
        objectPositionMobile="center center"
        overlay={true}
      />

      <div className="hero-container">
        {/* Rotating text */}
        {!shouldReduceMotion && (
          <motion.div
            className="hero-rotating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <CircularText
              text="BLUE MOON · BAR & KITCHEN · PALA · "
              spinDuration={40}
            />
          </motion.div>
        )}

        {/* Two equal CTA boxes */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <button className="hero-cta" onClick={scrollToFood}>
            <div className="cta-content">
              <span className="cta-title">EXPLORE MENU</span>
              <span className="cta-subtitle">View food and drinks</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button className="hero-cta" onClick={scrollToVisit}>
            <div className="cta-content">
              <span className="cta-title">VISIT US</span>
              <span className="cta-subtitle">Get directions</span>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
