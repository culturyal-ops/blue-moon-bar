import { useEffect, useState } from 'react';
import DomeGallery from './DomeGallery';
import './DomeGallerySection.css';

const blueMoonGalleryImages = [
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.13 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.14 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.16 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.23 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.23 PM (2).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.23 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.24 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.24 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.25 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.25 PM (2).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.25 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.26 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.26 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.27 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.27 PM (2).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.27 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.28 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.28 PM.jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.29 PM (1).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.29 PM (2).jpeg',
  '/domegallery/WhatsApp Image 2026-07-13 at 2.58.29 PM.jpeg'
];

function getResponsiveProps(width: number) {
  if (width <= 430) {
    return { segments: 14, minRadius: 260, fit: 0.46 };
  }
  if (width <= 768) {
    return { segments: 18, minRadius: 320, fit: 0.48 };
  }
  if (width <= 1024) {
    return { segments: 24, minRadius: 440, fit: 0.5 };
  }
  return { segments: 35, minRadius: 600, fit: 0.5 };
}

export default function DomeGallerySection() {
  const [props, setProps] = useState(() => getResponsiveProps(window.innerWidth));

  useEffect(() => {
    const update = () => setProps(getResponsiveProps(window.innerWidth));
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <section id="dome-gallery" className="dome-gallery-section">
      <div className="dome-gallery-heading">
        <h2>Inside the evening.</h2>
      </div>
      <div className="dome-gallery-container">
        <DomeGallery
          images={blueMoonGalleryImages}
          segments={props.segments}
          minRadius={props.minRadius}
          fit={props.fit}
          imageBorderRadius="20px"
          openedImageBorderRadius="20px"
          overlayBlurColor="#06172b"
          grayscale={false}
          openedImageWidth="min(calc(100vw - 32px), 520px)"
          openedImageHeight="min(calc(100dvh - 96px), 520px)"
        />
      </div>
    </section>
  );
}
