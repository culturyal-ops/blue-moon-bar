import { useEffect, useState } from 'react';
import './HeroSlideshow.css';

const IMAGES = [
  '/herogallery/WhatsApp Image 2026-07-13 at 11.33.30 AM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 11.33.31 AM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.52 PM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.53 PM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM (1).jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM (2).jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM (1).jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM (2).jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.56 PM.jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.57 PM (2).jpeg',
  '/herogallery/WhatsApp Image 2026-07-13 at 2.51.57 PM.jpeg',
];

const INTERVAL = 5000; // ms each image is shown
const FADE_MS  = 1400; // crossfade duration — must match CSS

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next,    setNext]    = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  // Preload all images once on mount
  useEffect(() => {
    IMAGES.forEach((src) => { const i = new Image(); i.src = src; });
  }, []);

  useEffect(() => {
    const hold = setTimeout(() => {
      // Prepare next index
      const nextIdx = (current + 1) % IMAGES.length;
      setNext(nextIdx);
      setTransitioning(true);

      // After crossfade completes, snap current forward and reset
      const done = setTimeout(() => {
        setCurrent(nextIdx);
        setTransitioning(false);
      }, FADE_MS);

      return () => clearTimeout(done);
    }, INTERVAL);

    return () => clearTimeout(hold);
  }, [current]);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {/* Bottom layer — outgoing image, always visible */}
      <img
        src={IMAGES[current]}
        alt=""
        className="hero-slide-img hero-slide-img--bottom"
      />

      {/* Top layer — incoming image, fades in over the bottom */}
      <img
        src={IMAGES[next]}
        alt=""
        className={`hero-slide-img hero-slide-img--top ${transitioning ? 'hero-slide-img--visible' : ''}`}
      />

      <div className="hero-slideshow-overlay" />
    </div>
  );
}
