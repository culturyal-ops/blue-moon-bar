import { useEffect, useState } from 'react';
import DomeGallery from './DomeGallery';
import './BlueMoonTunnel.css';

const IMAGES = [
  '/bar-counter1.jpg.png',
  '/dining-room.jpg.png',
  '/dining-room1.jpg.png',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.13 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.14 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.16 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.23 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.24 PM.jpeg',
];

function getResponsiveProps(width: number) {
  if (width <= 430) {
    return { segments: 14, minRadius: 280, fit: 0.48, maxRadius: 400 };
  }
  if (width <= 768) {
    return { segments: 18, minRadius: 340, fit: 0.5, maxRadius: 500 };
  }
  if (width <= 1024) {
    return { segments: 24, minRadius: 460, fit: 0.52, maxRadius: 650 };
  }
  return { segments: 35, minRadius: 620, fit: 0.52, maxRadius: 900 };
}

export default function BlueMoonTunnel() {
  const [props, setProps] = useState(() => getResponsiveProps(window.innerWidth));

  useEffect(() => {
    const update = () => setProps(getResponsiveProps(window.innerWidth));
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="experience-section" aria-label="Blue Moon image gallery">
      <header className="experience-heading">
        <h2 className="experience-title" aria-label="The Experience">
          The Experience
        </h2>
        <p className="experience-subtitle">A room full of long evenings.</p>
      </header>

      <div className="dome-gallery-wrapper">
        <DomeGallery
          images={IMAGES}
          segments={props.segments}
          minRadius={props.minRadius}
          maxRadius={props.maxRadius}
          fit={props.fit}
          fitBasis="auto"
          padFactor={0.25}
          imageBorderRadius="16px"
          openedImageBorderRadius="16px"
          overlayBlurColor="#06172b"
          grayscale={false}
          maxVerticalRotationDeg={5}
          dragSensitivity={20}
          enlargeTransitionMs={300}
          dragDampening={2}
          openedImageWidth="min(calc(100vw - 48px), 600px)"
          openedImageHeight="min(calc(100dvh - 120px), 600px)"
        />
      </div>
    </section>
  );
}
