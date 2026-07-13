import { useState, useRef, useEffect, useCallback } from 'react';
import './BentoGallery.css';

type ImageItem = string | { src: string; alt?: string };

type BentoGalleryProps = {
  images: ImageItem[];
  overlayBlurColor?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  openedImageWidth?: string;
  openedImageHeight?: string;
  enlargeTransitionMs?: number;
};

export default function BentoGallery({
  images,
  overlayBlurColor = '#06172b',
  imageBorderRadius = '8px',
  openedImageBorderRadius = '8px',
  openedImageWidth = 'min(72vw, 720px)',
  openedImageHeight = 'min(72vh, 720px)',
  enlargeTransitionMs = 300
}: BentoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const normalizedImages = images.map(img =>
    typeof img === 'string' ? { src: img, alt: '' } : { src: img.src || '', alt: img.alt || '' }
  );

  const closeViewer = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedIndex(null);
      setIsClosing(false);
      document.body.classList.remove('bento-scroll-lock');
      document.documentElement.classList.remove('bento-scroll-lock');
    }, enlargeTransitionMs);
  }, [enlargeTransitionMs]);

  const openImage = (index: number) => {
    setSelectedIndex(index);
    document.body.classList.add('bento-scroll-lock');
    document.documentElement.classList.add('bento-scroll-lock');
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
      document.body.classList.remove('bento-scroll-lock');
      document.documentElement.classList.remove('bento-scroll-lock');
    };
  }, [selectedIndex, closeViewer]);

  return (
    <div className="bento-gallery">
      <div className="bento-grid">
        {normalizedImages.map((img, index) => (
          <div
            key={index}
            className="bento-item"
            onClick={() => openImage(index)}
            style={{ borderRadius: imageBorderRadius }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          ref={viewerRef}
          className={`bento-viewer ${isClosing ? 'closing' : ''}`}
          style={{ background: overlayBlurColor }}
        >
          <div
            ref={scrimRef}
            className="bento-scrim"
            onClick={closeViewer}
          />

          <div
            className="bento-enlarged"
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
              className="bento-close"
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
