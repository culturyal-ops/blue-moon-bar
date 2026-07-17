import { motion } from 'framer-motion';
import { blueMoonContent } from '../content';
import './Visit.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Visit() {
  return (
    <section id="visit" className="visit">
      {/* Top rule */}
      <div className="visit-rule" aria-hidden="true" />

      <div className="visit-inner">
        {/* ── Left column: info ── */}
        <div className="visit-col visit-col--info">

          <motion.p className="visit-eyebrow" {...fadeUp(0)}>
            Find Us
          </motion.p>

          <motion.h2 className="visit-heading" {...fadeUp(0.08)}>
            Come find<br />
            <em>your table.</em>
          </motion.h2>

          <motion.p className="visit-tagline" {...fadeUp(0.14)}>
            Right on T.B. Road, Pala. Hard to miss,<br className="visit-br" />
            easy to stay.
          </motion.p>

          {/* Address block */}
          <motion.div className="visit-address-block" {...fadeUp(0.2)}>
            <span className="visit-block-label">Address</span>
            <a
              className="visit-address"
              href={blueMoonContent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="visit-address-line visit-address-line--main">
                {blueMoonContent.address.line1}
              </span>
              <span className="visit-address-line">
                {blueMoonContent.address.city}, {blueMoonContent.address.district}
              </span>
              <span className="visit-address-line">
                {blueMoonContent.address.state} – {blueMoonContent.address.postalCode}
              </span>
              <span className="visit-address-arrow">Get directions ↗</span>
            </a>
          </motion.div>

          {/* Contact + Social row */}
          <motion.div className="visit-meta-row" {...fadeUp(0.26)}>
            {blueMoonContent.phone && (
              <div className="visit-meta-item">
                <span className="visit-block-label">Phone</span>
                <a href={`tel:${blueMoonContent.phone}`} className="visit-meta-link">
                  {blueMoonContent.phone}
                </a>
              </div>
            )}
            {blueMoonContent.instagram && (
              <div className="visit-meta-item">
                <span className="visit-block-label">Instagram</span>
                <a
                  href={`https://instagram.com/${blueMoonContent.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="visit-meta-link"
                >
                  {blueMoonContent.instagram}
                </a>
              </div>
            )}
          </motion.div>

          {/* CTA buttons */}
          <motion.div className="visit-ctas" {...fadeUp(0.32)}>
            <a
              className="visit-cta visit-cta--primary"
              href={blueMoonContent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Directions
            </a>
            {blueMoonContent.phone && (
              <a
                className="visit-cta visit-cta--ghost"
                href={`tel:${blueMoonContent.phone}`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                </svg>
                Call us
              </a>
            )}
          </motion.div>

          {/* Responsible drinking */}
          <motion.p className="visit-notice" {...fadeUp(0.38)}>
            Please drink responsibly. Alcohol is served only to guests of legal drinking age.
          </motion.p>
        </div>

        {/* ── Right column: map ── */}
        <motion.div
          className="visit-col visit-col--map"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="visit-map-frame">
            <iframe
              title="Blue Moon Pala location map"
              src={`https://maps.google.com/maps?q=${blueMoonContent.coordinates.lat},${blueMoonContent.coordinates.lng}&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            {/* Map overlay label */}
            <div className="visit-map-label">
              <span className="visit-map-dot" aria-hidden="true" />
              <span>Blue Moon · T.B. Road, Pala</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
