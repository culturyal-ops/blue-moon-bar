import { useEffect, useRef, useState } from 'react';
import './BackgroundVideo.css';

interface BackgroundVideoProps {
  videoSrc: string;
  videoSrcMobile?: string;
  posterSrc: string;
  objectPositionDesktop?: string;
  objectPositionMobile?: string;
  overlay?: boolean;
  playbackRate?: number;
}

export default function BackgroundVideo({
  videoSrc,
  videoSrcMobile,
  posterSrc,
  objectPositionDesktop = 'center center',
  objectPositionMobile = 'center center',
  overlay = true,
  playbackRate = 0.75,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedMotion) return;

    // Set playback rate for smoother timelapse
    video.playbackRate = playbackRate;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Video playback failed, fallback to poster
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [prefersReducedMotion, playbackRate]);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
  };

  const handleError = () => {
    setIsVideoLoaded(false);
  };

  if (prefersReducedMotion) {
    return (
      <div className="background-video-container">
        <img
          src={posterSrc}
          alt=""
          className="background-video-poster"
          style={{
            '--object-position-desktop': objectPositionDesktop,
            '--object-position-mobile': objectPositionMobile,
          } as React.CSSProperties}
        />
        {overlay && <div className="background-video-overlay" />}
      </div>
    );
  }

  return (
    <div className="background-video-container">
      <video
        ref={videoRef}
        className={`background-video ${isVideoLoaded ? 'loaded' : ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        onLoadedData={handleLoadedData}
        onError={handleError}
        style={{
          '--object-position-desktop': objectPositionDesktop,
          '--object-position-mobile': objectPositionMobile,
        } as React.CSSProperties}
      >
        {/* Desktop video (landscape) */}
        <source src={videoSrc} type="video/mp4" media="(min-width: 768px)" />
        {/* Mobile video (portrait) - fallback to desktop if not provided */}
        <source src={videoSrcMobile || videoSrc} type="video/mp4" media="(max-width: 767px)" />
        {/* Fallback for older browsers */}
        <source src={videoSrc} type="video/mp4" />
        {/* Fallback image if video fails */}
        <img src={posterSrc} alt="" />
      </video>
      {overlay && <div className="background-video-overlay" />}
    </div>
  );
}
