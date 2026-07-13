import { useRef } from 'react';
import './BarEditorial.css';

const galleryImages = [
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 11.33.30 AM.jpeg', caption: 'The counter, after dark.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 11.33.31 AM.jpeg', caption: 'Every pour, deliberate.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.52 PM.jpeg', caption: 'Kerala plates, cold glass.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.53 PM.jpeg', caption: 'Settle in. Stay a while.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM (1).jpeg', caption: 'Evenings that run long.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM (2).jpeg', caption: 'The light, just right.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.54 PM.jpeg', caption: 'Good company, cold beer.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM (1).jpeg', caption: 'T.B. Road nights.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM (2).jpeg', caption: 'A place to linger.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.55 PM.jpeg', caption: 'Blue Moon, Pala.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.56 PM.jpeg', caption: 'Made for long evenings.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.57 PM (2).jpeg', caption: 'Where the night opens up.' },
  { src: '/herogallery/WhatsApp Image 2026-07-13 at 2.51.57 PM.jpeg', caption: 'Last round, first memory.' },
];

export default function BarEditorial() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = trackRef.current.offsetWidth * 0.6;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section className="bar-editorial" id="bar-editorial">
      {/* Editorial header */}
      <div className="bar-editorial__header">
        <p className="bar-editorial__kicker">Blue Moon · Pala</p>
        <h2 className="bar-editorial__title">
          A bar that knows<br />
          <em>how the night should feel.</em>
        </h2>
        <p className="bar-editorial__body">
          Cold beers lined up. Soft conversation drifting from table to table.
          The smell of something good coming out of the kitchen. At Blue Moon,
          the evening doesn't rush — it opens up slowly, the way a good night should.
          Pull up a chair on T.B. Road and let it find its pace.
        </p>
      </div>

      {/* Scrollable carousel */}
      <div className="bar-editorial__carousel-wrapper">
        <div className="bar-editorial__track" ref={trackRef}>
          {galleryImages.map((img, i) => (
            <figure key={i} className="bar-editorial__card">
              <div className="bar-editorial__img-wrap">
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <figcaption className="bar-editorial__caption">
                <em>{img.caption}</em>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Nav arrows */}
        <button
          className="bar-editorial__arrow bar-editorial__arrow--prev"
          onClick={() => scroll('left')}
          aria-label="Previous images"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="bar-editorial__arrow bar-editorial__arrow--next"
          onClick={() => scroll('right')}
          aria-label="Next images"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Pull quote */}
      <div className="bar-editorial__quote">
        <blockquote>
          "Unapologetically fun — and made for long evenings."
        </blockquote>
      </div>
    </section>
  );
}
