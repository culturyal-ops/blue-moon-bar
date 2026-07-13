import { useRef, useState, useCallback, useEffect } from 'react';
import { useGesture } from '@use-gesture/react';
import './InfiniteCarousel.css';

type ImageItem = string | { src: string; alt?: string };

type InfiniteCarouselProps = {
  images: ImageItem[];
  overlayBlurColor?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  openedImageWidth?: string;
  openedImageHeight?: string;
  enlargeTransitionMs?: number;
};

export default function InfiniteCarousel({
  images,
  overlayBlurColor = '#06172b',
  imageBorderRadius = '8px',
  openedImageBorderRadius = '8px',
  openedImageWidth = 'min(72vw, 720px)',
  openedImageHeight = 'min(72vh, 720px)',
  enlargeTransitionMs = 300
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dragStartX = useRef(0);
  const currentOffset = useRef(0);
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const normalizedImages = images.map(img =>
    typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' }
  );

  // Triple the images for seamless infinite loop
  const tripleImages = [...normalizedImages, ...normalizedImages, ...normalizedImages];

  const closeViewer = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setIsClosing(false);
      document.body.classList.remove('carousel-scroll-lock');
      document.documentElement.classList.remove('carousel-scroll-lock');
    }, enlargeTransitionMs);
  }, [enlargeTransitionMs]);

  const openImage = (index: number) => {
    setSelectedIndex(index % normalizedImages.length);
    document.body.classList.add('carousel-scroll-lock');
    document.documentElement.classList.add('carousel-scroll-lock');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedIndex !== null) {
        closeViewer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('carousel-scroll-lock');
      document.documentElement.classList.remove('carousel-scroll-lock');
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [selectedIndex, closeViewer]);

  const applyInertia = useCallback(() => {
    if (Math.abs(velocity.current) > 0.1) {
      velocity.current *= 0.95;
      currentOffset.current += velocity.current;
      setOffset(currentOffset.current);
      animationFrame.current = requestAnimationFrame(applyInertia);
    } else {
      velocity.current = 0;
      animationFrame.current = null;
    }
  }, []);

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (selectedIndex !== null) return;
        const evt = event as PointerEvent;
        isDragging.current = true;
        dragStartX.current = evt.clientX;
        velocity.current = 0;
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
          animationFrame.current = null;
        }
      },
      onDrag: ({ event, last, velocity: vel }) => {
        if (selectedIndex !== null || !isDragging.current) return;
        const evt = event as PointerEvent;
        const dx = evt.clientX - dragStartX.current;
        currentOffset.current += dx;
        setOffset(currentOffset.current);
        dragStartX.current = evt.clientX;

        if (last) {
          isDragging.current = false;
          velocity.current = (vel[0] || 0) * 20;
          if (Math.abs(velocity.current) > 0.1) {
            applyInertia();
          }
        }
      }
    },
    { target: containerRef, eventOptions: { passive: false } }
  );

  return (
    <div className="infinite-carousel">
      <div ref={containerRef} className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(${offset}px)`
          }}
        >
          {tripleImages.map((img, index) => (
            <div
              key={index}
              className="carousel-item"
              onClick={() => !isDragging.current && openImage(index)}
              style={{ borderRadius: imageBorderRadius }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className={`carousel-viewer ${isClosing ? 'closing' : ''}`}
          style={{ background: overlayBlurColor }}
        >
          <div className="carousel-scrim" onClick={closeViewer} />

          <div
            className="carousel-enlarged"
            style={{
              width: openedImageWidth,
              height: openedImageHeight,
              borderRadius: openedImageBorderRadius
            }}
          >
            <img
              src={normalizedImages[selectedIndex].src}
              alt={normalizedImages[selectedIndex].alt}
            />
            <button
              className="carousel-close"
              onClick={closeViewer}
              aria-label="Close image"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
