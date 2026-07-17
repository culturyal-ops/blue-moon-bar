import { useRef, useEffect, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import ScrollReveal from './ScrollReveal';
import './PhotoWall.css';

interface PhotoItem {
  src: string;
  alt: string;
}

const PHOTOS: PhotoItem[] = [
  { src: '/bar-counter1.jpg.png', alt: 'Blue Moon bar counter' },
  { src: '/dining-room.jpg.png', alt: 'Blue Moon dining room' },
  { src: '/dining-room1.jpg.png', alt: 'Blue Moon dining' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.13 PM.jpeg', alt: 'Blue Moon atmosphere' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.14 PM.jpeg', alt: 'Evening details' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM.jpeg', alt: 'Blue Moon moment' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.15 PM (1).jpeg', alt: 'Blue Moon vibes' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.16 PM.jpeg', alt: 'Evening scene' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM.jpeg', alt: 'Bar interior' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.21 PM (1).jpeg', alt: 'Dining moment' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM.jpeg', alt: 'Evening gathering' },
  { src: '/domegallery/WhatsApp Image 2026-07-13 at 2.58.22 PM (1).jpeg', alt: 'Bar details' },
];

export default function PhotoWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<number, HTMLElement>>(new Map());
  const [rotation, setRotation] = useState(0);
  const [focusIndex, setFocusIndex] = useState(Math.floor(PHOTOS.length / 2));
  const rotationRef = useRef(rotation);
  const focusIndexRef = useRef(focusIndex);

  // Calculate image position properties based on focus and rotation
  const getImageProps = (index: number) => {
    const totalImages = PHOTOS.length;
    const centerIndex = focusIndexRef.current;
    const distanceFromCenter = Math.min(
      Math.abs(index - centerIndex),
      totalImages - Math.abs(index - centerIndex)
    );

    // Calculate angle in arc (-180 to 180 degrees, but we'll use a shallow arc)
    const anglePerImage = 360 / totalImages;
    const baseAngle = (index - centerIndex) * anglePerImage + rotationRef.current;
    const normalizedAngle = ((baseAngle + 180) % 360) - 180;

    // Only show images within view (±90 degrees)
    const isVisible = Math.abs(normalizedAngle) <= 110;

    // Calculate properties based on distance
    const isCentre = distanceFromCenter === 0;

    let scale = 1;
    let opacity = 1;
    let brightness = 1;
    let translateZ = 100;
    let rotateY = normalizedAngle * 0.8; // Reduced rotation for shallower arc

    if (isCentre) {
      scale = 1;
      opacity = 1;
      brightness = 1;
      translateZ = 120;
    } else if (distanceFromCenter <= 2) {
      const t = distanceFromCenter / 2;
      scale = 0.92 - t * 0.1;
      opacity = 0.9 - t * 0.15;
      brightness = 0.95 - t * 0.1;
      translateZ = 120 - t * 40;
      rotateY = normalizedAngle * 0.85;
    } else {
      const t = Math.min((distanceFromCenter - 2) / 3, 1);
      scale = 0.82 - t * 0.2;
      opacity = 0.75 - t * 0.4;
      brightness = 0.85 - t * 0.3;
      translateZ = 80 - t * 40;
      rotateY = normalizedAngle * 0.9;
    }

    return {
      isVisible,
      scale,
      opacity,
      brightness,
      translateZ,
      rotateY,
      angle: normalizedAngle
    };
  };

  // Update all image styles
  useEffect(() => {
    itemsRef.current.forEach((el, index) => {
      const props = getImageProps(index);
      el.style.setProperty('--scale', props.scale.toString());
      el.style.setProperty('--opacity', props.opacity.toString());
      el.style.setProperty('--brightness', Math.max(0.4, props.brightness).toString());
      el.style.setProperty('--translate-z', `${props.translateZ}px`);
      el.style.setProperty('--rotate-y', `${props.rotateY}deg`);
      el.style.display = props.isVisible ? 'block' : 'none';
    });
  }, [rotation, focusIndex]);

  // Handle dragging
  useGesture(
    {
      onDrag: ({ offset: [ox] }) => {
        // Convert drag distance to rotation (normalize by container width)
        const containerWidth = galleryRef.current?.clientWidth || 800;
        const dragRotation = (ox / containerWidth) * 180;

        // Calculate which image should be centered based on drag
        const anglesPerImage = 360 / PHOTOS.length;
        const estimatedFocusShift = Math.round(dragRotation / anglesPerImage);
        const newFocusIndex =
          (focusIndexRef.current + estimatedFocusShift + PHOTOS.length) % PHOTOS.length;

        setRotation(dragRotation);
        setFocusIndex(newFocusIndex);
        rotationRef.current = dragRotation;
        focusIndexRef.current = newFocusIndex;
      }
    },
    { target: galleryRef, eventOptions: { passive: true } }
  );

  const handleImageClick = (index: number) => {
    setFocusIndex(index);
    setRotation(0);
    rotationRef.current = 0;
    focusIndexRef.current = index;
  };

  return (
    <section ref={containerRef} className="photo-wall">
      <div className="photo-wall-container">
        <ScrollReveal index={0}>
          <div className="photo-wall-header">
            <h2 className="photo-wall-title">THE BLUE MOON EXPERIENCE</h2>
            <p className="photo-wall-caption">A room full of long evenings.</p>
          </div>
        </ScrollReveal>

        <div
          ref={galleryRef}
          className="photo-wall-gallery"
          style={{ cursor: 'grab' }}
        >
          {PHOTOS.map((photo, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current.set(index, el);
              }}
              className="photo-wall-item"
              onClick={() => handleImageClick(index)}
              role="button"
              tabIndex={0}
              aria-label={`${photo.alt} - ${index + 1} of ${PHOTOS.length}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleImageClick(index);
                }
              }}
            >
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
