import { useEffect, useRef } from 'react';
import './BarBrandsMotion.css';

const brandRows = [
  "BEER · WINE · WHISKY · RUM · GIN · COCKTAILS",
  "KINGFISHER · HEINEKEN · BUDWEISER · CARLSBERG",
  "FRESH JUICES · HOT BEVERAGES · COLD POURS · CLASSIC MIXERS",
  "LATE NIGHT POURS · GOOD COMPANY · BLUE MOON VIBES"
];

export default function BarBrandsMotion() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && containerRef.current) {
      containerRef.current.style.setProperty('--animation-play-state', 'paused');
    }
  }, []);

  return (
    <div ref={containerRef} className="bar-brands-motion">
      {brandRows.map((text, index) => (
        <div key={index} className={`brand-row ${index % 2 === 1 ? 'alt' : ''}`}>
          <span className="brand-text">
            {text} · {text} · {text} · 
          </span>
        </div>
      ))}
    </div>
  );
}