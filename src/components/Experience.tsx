import { aboutText } from '../content';
import ScrollReveal from './ScrollReveal';
import CircularText from './CircularText';
import { useReducedMotion } from 'framer-motion';
import './Experience.css';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="experience">
      <div className="experience-container">
        <div className="experience-content">
          <ScrollReveal index={0}>
            <h2 className="experience-main-title">{aboutText.intro}</h2>
          </ScrollReveal>
          <ScrollReveal index={1}>
            <p className="experience-description">
              Blue Moon brings together Kerala favourites, Indo‑Chinese plates and an easy-going evening atmosphere in the centre of Pala.
            </p>
          </ScrollReveal>
        </div>
        
        <div className="experience-grid">
          <ScrollReveal index={2} className="grid-item grid-item-large">
            <img
              src="/dining-room.jpg.png"
              alt="Blue Moon dining room"
              className="grid-image"
            />
            {/* Circular rotating text badge */}
            {!shouldReduceMotion && (
              <div className="experience-circular-badge">
                <CircularText
                  text="PALA · KERALA · T.B. ROAD · "
                  spinDuration={35}
                />
              </div>
            )}
          </ScrollReveal>
          <ScrollReveal index={3} className="grid-item">
            <img
              src="/dining-room1.jpg.png"
              alt="Blue Moon interior"
              className="grid-image"
            />
          </ScrollReveal>
          <ScrollReveal index={4} className="grid-item">
            <img
              src="/bar-counter1.jpg.png"
              alt="Blue Moon bar counter"
              className="grid-image"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
