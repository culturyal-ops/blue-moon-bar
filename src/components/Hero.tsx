import { useId } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import './Hero.css';

export default function Hero() {
  const circlePathId = useId();
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

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

      <div className="hero-content">
        {/* Circular rotating brand */}
        <motion.div
          className="hero-circular-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <svg className="hero-circular-svg" viewBox="0 0 200 200" width="200" height="200">
            <defs>
              <path
                id={circlePathId}
                fill="none"
                d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
              />
            </defs>
            <text className="hero-circular-text">
              <textPath href={`#${circlePathId}`} startOffset="0%">
                BAR · KITCHEN · BAR · KITCHEN · PALA · 
              </textPath>
            </text>
          </svg>
          <div className="hero-circular-center">
            <span className="hero-circular-title">BLUE MOON</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          BAR & KITCHEN • PALA
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Sophisticated flavors, moonlit memories.
        </motion.p>

        {/* Action Cards */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {/* Explore Menu Card */}
          <button
            type="button"
            className="hero-action-card hero-action-dark"
            onClick={() => scrollToSection('food')}
          >
            <div className="hero-action-content">
              <span className="hero-action-title">EXPLORE MENU</span>
              <span className="hero-action-subtitle">View food and drinks</span>
            </div>
            <svg
              className="hero-action-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Reserve Table Card */}
          <button
            type="button"
            className="hero-action-card hero-action-light"
            onClick={() => scrollToSection('visit')}
          >
            <svg
              className="hero-action-icon-left"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
            </svg>
            <span className="hero-action-title-center">RESERVE A TABLE</span>
          </button>
        </motion.div>

        {/* Visit Us Section */}
        <motion.button
          type="button"
          className="hero-visit"
          onClick={() => scrollToSection('visit')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="hero-visit-content">
            <span className="hero-visit-title">VISIT US</span>
            <span className="hero-visit-subtitle">Pala, Kerala • Get directions</span>
          </div>
          <svg
            className="hero-visit-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
