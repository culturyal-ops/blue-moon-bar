import { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './BlueMoonOrbit.css';

interface OrbitImage {
  src: string;
  alt: string;
  angle: number;
  radiusX: number;
  radiusY: number;
  scale: number;
  depth: 'front' | 'mid' | 'back';
  rotate: number;
  aspect: 'landscape' | 'portrait' | 'square';
}

// Art-directed orbital composition
const ORBIT_IMAGES: OrbitImage[] = [
  // Foreground - large, prominent
  { src: '/bar-counter1.jpg.png', alt: 'Blue Moon bar counter', angle: 45, radiusX: 42, radiusY: 32, scale: 1.3, depth: 'front', rotate: -8, aspect: 'landscape' },
  { src: '/dining-room.jpg.png', alt: 'Blue Moon dining room', angle: 220, radiusX: 40, radiusY: 30, scale: 1.25, depth: 'front', rotate: 6, aspect: 'landscape' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM (1).jpeg', alt: 'Evening atmosphere', angle: 320, radiusX: 38, radiusY: 28, scale: 1.2, depth: 'front', rotate: -5, aspect: 'portrait' },
  
  // Midground - medium scale
  { src: '/dining-room1.jpg.png', alt: 'Blue Moon dining', angle: 10, radiusX: 45, radiusY: 35, scale: 0.95, depth: 'mid', rotate: 4, aspect: 'landscape' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.13 PM.jpeg', alt: 'Blue Moon interior', angle: 80, radiusX: 46, radiusY: 34, scale: 0.9, depth: 'mid', rotate: -3, aspect: 'square' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.14 PM.jpeg', alt: 'Evening details', angle: 135, radiusX: 44, radiusY: 33, scale: 0.92, depth: 'mid', rotate: 5, aspect: 'landscape' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM.jpeg', alt: 'Bar interior', angle: 180, radiusX: 43, radiusY: 32, scale: 0.88, depth: 'mid', rotate: -4, aspect: 'portrait' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.16 PM.jpeg', alt: 'Blue Moon moment', angle: 270, radiusX: 45, radiusY: 34, scale: 0.93, depth: 'mid', rotate: 3, aspect: 'square' },
  
  // Background - smaller, subtle
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM.jpeg', alt: 'Blue Moon vibes', angle: 25, radiusX: 48, radiusY: 38, scale: 0.7, depth: 'back', rotate: -2, aspect: 'portrait' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM (1).jpeg', alt: 'Evening scene', angle: 110, radiusX: 47, radiusY: 36, scale: 0.68, depth: 'back', rotate: 3, aspect: 'square' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM (1).jpeg', alt: 'Dining moment', angle: 155, radiusX: 49, radiusY: 37, scale: 0.72, depth: 'back', rotate: -3, aspect: 'landscape' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM.jpeg', alt: 'Bar details', angle: 200, radiusX: 48, radiusY: 38, scale: 0.65, depth: 'back', rotate: 2, aspect: 'portrait' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.23 PM.jpeg', alt: 'Night gathering', angle: 245, radiusX: 47, radiusY: 36, scale: 0.7, depth: 'back', rotate: -4, aspect: 'square' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.24 PM.jpeg', alt: 'Evening lights', angle: 295, radiusX: 49, radiusY: 37, scale: 0.68, depth: 'back', rotate: 3, aspect: 'landscape' },
];

const DEPTH_PROPS = {
  front: {
    zIndex: 30,
    opacity: 1,
    brightness: 1,
    translateZ: 80,
    blur: 0,
  },
  mid: {
    zIndex: 20,
    opacity: 0.85,
    brightness: 0.9,
    translateZ: 40,
    blur: 0,
  },
  back: {
    zIndex: 10,
    opacity: 0.55,
    brightness: 0.75,
    translateZ: 0,
    blur: 0.3,
  },
};

const ORBIT_SPEEDS = {
  front: 100000, // milliseconds for one rotation
  mid: 120000,
  back: 150000,
};

export default function BlueMoonOrbit() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());
  const isVisibleRef = useRef(false);

  // Track section visibility for performance
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animate orbit rotation
  useEffect(() => {
    if (shouldReduceMotion) return;

    const animate = () => {
      if (!isVisibleRef.current || document.hidden) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = Date.now() - startTimeRef.current;

      ORBIT_IMAGES.forEach((img, index) => {
        const el = document.getElementById(`orbit-img-${index}`);
        if (!el) return;

        const speed = ORBIT_SPEEDS[img.depth];
        const rotationProgress = (elapsed % speed) / speed;
        const currentAngle = img.angle + rotationProgress * 360;

        // Calculate position
        const centerX = 50; // percentage
        const centerY = 50;
        const x = centerX + Math.cos((currentAngle * Math.PI) / 180) * img.radiusX;
        const y = centerY + Math.sin((currentAngle * Math.PI) / 180) * img.radiusY;

        el.style.setProperty('--orbit-x', `${x}%`);
        el.style.setProperty('--orbit-y', `${y}%`);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldReduceMotion]);

  // Subtle mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!orbitRef.current) return;

    const rect = orbitRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16; // max 8px each direction
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;

    setMousePos({ x, y });
  };

  const getImageSize = (aspect: string, scale: number) => {
    const baseWidth = aspect === 'portrait' ? 180 : aspect === 'square' ? 200 : 280;
    const baseHeight = aspect === 'portrait' ? 240 : aspect === 'square' ? 200 : 180;

    return {
      width: baseWidth * scale,
      height: baseHeight * scale,
    };
  };

  return (
    <section ref={sectionRef} className="blue-moon-orbit">
      <div className="orbit-header">
        <motion.h2
          className="orbit-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          THE BLUE MOON EXPERIENCE
        </motion.h2>
        <motion.p
          className="orbit-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A room full of long evenings.
        </motion.p>
      </div>

      <div
        ref={orbitRef}
        className="orbit-container"
        onMouseMove={handleMouseMove}
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      >
        {/* Central branding */}
        <motion.div
          className="orbit-centre"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="orbit-centre-title">BLUE MOON</div>
          <div className="orbit-centre-subtitle">PALA · AFTER FIVE</div>
        </motion.div>

        {/* Orbital images */}
        {ORBIT_IMAGES.map((img, index) => {
          const depthProps = DEPTH_PROPS[img.depth];
          const size = getImageSize(img.aspect, img.scale);
          const isFocused = focusedIndex === index;

          // Stagger entrance based on depth
          const depthDelay = img.depth === 'back' ? 0.1 : img.depth === 'mid' ? 0.3 : 0.5;
          const itemDelay = depthDelay + index * 0.05;

          // Initial position (outside viewport)
          const centerX = 50;
          const centerY = 50;
          const x = centerX + Math.cos((img.angle * Math.PI) / 180) * img.radiusX;
          const y = centerY + Math.sin((img.angle * Math.PI) / 180) * img.radiusY;

          return (
            <motion.div
              key={index}
              id={`orbit-img-${index}`}
              className={`orbit-image orbit-image--${img.depth} ${isFocused ? 'orbit-image--focused' : ''}`}
              style={
                {
                  '--orbit-x': `${x}%`,
                  '--orbit-y': `${y}%`,
                  '--orbit-scale': img.scale,
                  '--orbit-rotate': `${img.rotate}deg`,
                  '--orbit-z-index': depthProps.zIndex,
                  '--orbit-opacity': depthProps.opacity,
                  '--orbit-brightness': depthProps.brightness,
                  '--orbit-translate-z': `${depthProps.translateZ}px`,
                  '--orbit-blur': `${depthProps.blur}px`,
                  width: `${size.width}px`,
                  height: `${size.height}px`,
                } as React.CSSProperties
              }
              initial={{
                opacity: 0,
                x: x > 50 ? 200 : -200,
                y: y > 50 ? 100 : -100,
                rotate: img.rotate + (x > 50 ? 20 : -20),
              }}
              whileInView={{
                opacity: depthProps.opacity,
                x: 0,
                y: 0,
                rotate: img.rotate,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.4,
                delay: itemDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setFocusedIndex(isFocused ? null : index)}
              onMouseEnter={() => setFocusedIndex(index)}
              onMouseLeave={() => setFocusedIndex(null)}
              role="button"
              tabIndex={0}
              aria-label={img.alt}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
              {isFocused && (
                <motion.div
                  className="orbit-image-caption"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {img.alt}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
