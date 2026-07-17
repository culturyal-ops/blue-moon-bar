import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import './NightTable.css';

export default function NightTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // Parallax and scale animations for images
  const img1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const img3Y = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const img4Y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const img5Y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const img1Scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const img2Scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const img3Scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const img4Scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const img5Scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section ref={containerRef} className="night-table">
      <div className="night-table-container">
        {/* Header */}
        <ScrollReveal index={0}>
          <div className="night-table-header">
            <h2 className="night-table-title">THE BLUE MOON EXPERIENCE</h2>
            <p className="night-table-caption">
              One table. A few cold glasses. The evening takes care of the rest.
            </p>
          </div>
        </ScrollReveal>

        {/* Photo Composition */}
        <div className="night-table-composition">
          {/* Main image - bar interior */}
          <motion.div
            className="night-table-image night-table-image-main"
            style={{
              y: img1Y,
              scale: img1Scale
            }}
          >
            <img
              src="/bar-counter1.jpg.png"
              alt="Blue Moon bar counter"
            />
          </motion.div>

          {/* Secondary image - dining room */}
          <motion.div
            className="night-table-image night-table-image-secondary"
            style={{
              y: img2Y,
              scale: img2Scale
            }}
          >
            <img
              src="/dining-room.jpg.png"
              alt="Blue Moon dining room"
            />
          </motion.div>

          {/* Tertiary image - dining room alternate */}
          <motion.div
            className="night-table-image night-table-image-tertiary"
            style={{
              y: img3Y,
              scale: img3Scale
            }}
          >
            <img
              src="/dining-room1.jpg.png"
              alt="Blue Moon dining"
            />
          </motion.div>

          {/* Portrait image - from dome gallery */}
          <motion.div
            className="night-table-image night-table-image-portrait"
            style={{
              y: img4Y,
              scale: img4Scale
            }}
          >
            <img
              src="/domegallery/WhatsApp Image 2026-07-13 at 2.58.13 PM.jpeg"
              alt="Blue Moon atmosphere"
            />
          </motion.div>

          {/* Detail image - another dome gallery photo */}
          <motion.div
            className="night-table-image night-table-image-detail"
            style={{
              y: img5Y,
              scale: img5Scale
            }}
          >
            <img
              src="/domegallery/WhatsApp Image 2026-07-13 at 2.58.14 PM.jpeg"
              alt="Evening details"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
