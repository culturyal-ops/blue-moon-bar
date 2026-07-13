import { useId } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import './Hero.css';

export default function Hero() {
  const circlePathId = useId();
  
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
        playbackRate={0.75}
      />

      <div className="hero-container">
        {/* Rotating circular text ring - desktop & mobile */}
        <motion.div
          className="hero-circular-brand"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <svg className="hero-circular-text" viewBox="0 0 200 200" width="200" height="200">
            <defs>
              <path
                id={circlePathId}
                fill="none"
                d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
              />
            </defs>
            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <text className="hero-circular-text-letters">
              <textPath href={`#${circlePathId}`} startOffset="0%">
                BAR & KITCHEN · PALA · BLUE MOON · 
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Compact CTA cards - mobile only */}
        <motion.div
          className="hero-ctas-mobile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <button
            type="button"
            className="hero-cta-card"
            onClick={scrollToFood}
          >
            <div className="cta-card-text">
              <span className="cta-card-title">EXPLORE MENU</span>
              <span className="cta-card-desc">View food and drinks</span>
            </div>
            <svg
              aria-hidden="true"
              focusable="false"
              className="cta-card-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button
            type="button"
            className="hero-cta-card"
            onClick={scrollToVisit}
          >
            <div className="cta-card-text">
              <span className="cta-card-title">VISIT US</span>
              <span className="cta-card-desc">Get directions</span>
            </div>
            <svg
              aria-hidden="true"
              focusable="false"
              className="cta-card-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
        </motion.div>

        {/* Desktop CTAs (keep existing glassmorphism style) */}
        <motion.div
          className="hero-ctas-desktop"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <button
            type="button"
            className="hero-cta hero-cta-primary"
            onClick={scrollToFood}
          >
            <span>View Menu</span>
          </button>

          <button
            type="button"
            className="hero-cta hero-cta-secondary"
            onClick={scrollToVisit}
          >
            <span>Get Directions</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
