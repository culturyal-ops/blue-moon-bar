import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import MenuOverlay from './MenuOverlay';
import { blueMoonContent } from '../content';
import './Hero.css';

export default function Hero() {
  const circlePathId = useId();
  const ringId = useId();
  const [isMenuOverlayOpen, setIsMenuOverlayOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // The circumference of r=82 circle ≈ 515px
  // Each repetition of the text token must fill exactly 1 full loop
  // We compute enough repetitions so textPath wraps perfectly
  const token = blueMoonContent.establishedYear
    ? `SINCE ${blueMoonContent.establishedYear} ✦ BAR ✦ KITCHEN ✦ PALA ✦ `
    : `BLUE MOON ✦ BAR ✦ KITCHEN ✦ PALA ✦ `;
  // Repeat 3× — enough to fill the ~515px circumference at font-size 11.5
  const circleText = token.repeat(3);

  return (
    <section className="hero">
      <BackgroundVideo
        videoSrc="/herogallery/hero video.mp4"
        posterSrc="/hero-poster.svg"
        objectPositionDesktop="center center"
        objectPositionMobile="center center"
        overlay={false}
        playbackRate={0.75}
      />

      <div className="hero-content">
        {/* Circular rotating brand badge */}
        <motion.div
          className="hero-circular-wrapper"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <svg
            className="hero-circular-svg"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <defs>
              {/* Full circle path — clockwise from 9 o'clock */}
              <path
                id={circlePathId}
                fill="none"
                d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
              />
              {/* Outer decorative ring clip */}
              <clipPath id={ringId}>
                <circle cx="100" cy="100" r="98" />
              </clipPath>
            </defs>

            {/* Outer thin ring */}
            <circle
              cx="100" cy="100" r="95"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.5"
            />
            {/* Inner thin ring */}
            <circle
              cx="100" cy="100" r="72"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.5"
            />

            {/* Rotating text group */}
            <g className="hero-circular-rotate">
              <text className="hero-circular-text">
                <textPath href={`#${circlePathId}`} startOffset="0%">
                  {circleText}
                </textPath>
              </text>
            </g>

            {/* Static dot ornaments at 12/3/6/9 o'clock */}
            <circle cx="100" cy="5"   r="1.5" fill="rgba(255,255,255,0.35)" />
            <circle cx="195" cy="100" r="1.5" fill="rgba(255,255,255,0.35)" />
            <circle cx="100" cy="195" r="1.5" fill="rgba(255,255,255,0.35)" />
            <circle cx="5"   cy="100" r="1.5" fill="rgba(255,255,255,0.35)" />
          </svg>

          {/* Center badge content */}
          <div className="hero-circular-center">
            <span className="hero-circular-eyebrow">EST. {blueMoonContent.establishedYear}</span>
            <span className="hero-circular-title">BLUE<br />MOON</span>
            <span className="hero-circular-sub">PALA</span>
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

        {/* Menu Toggle Button */}
        <motion.button
          type="button"
          className="hero-menu-toggle"
          onClick={() => setIsMenuOverlayOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <span className="hero-menu-toggle-text">MENU CATEGORIES</span>
          <svg
            className="hero-menu-toggle-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </motion.button>
      </div>

      {/* Menu Overlay */}
      <MenuOverlay 
        isVisible={isMenuOverlayOpen}
        onToggle={() => setIsMenuOverlayOpen(!isMenuOverlayOpen)}
      />
    </section>
  );
}
