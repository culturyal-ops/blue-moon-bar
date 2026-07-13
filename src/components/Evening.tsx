import { aboutText, foodMenu } from '../content';
import ScrollReveal from './ScrollReveal';
import './Evening.css';

export default function Evening() {
  const eveningItems = foodMenu.filter((item) => item?.availableAfter);

  return (
    <section id="evening" className="evening">
      <div className="evening-overlay"></div>
      <div className="evening-container">
        <div className="evening-content">
          <ScrollReveal index={0}>
            <h2 className="evening-title">After five</h2>
          </ScrollReveal>
          <ScrollReveal index={1}>
            <p className="evening-description">{aboutText?.evening}</p>
          </ScrollReveal>

          <div className="evening-items">
            {eveningItems.map((item, index) => (
              <ScrollReveal key={index} index={Math.min(index + 2, 12)}>
                <div className="evening-item">
                  {item?.name}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal index={0} className="evening-visual">
          <img
            src="/dining-room1.jpg.png"
            alt="Blue Moon terrace — open verandah with exposed timber ceiling, Edison bulbs and garden fairy lights"
            className="evening-image"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
