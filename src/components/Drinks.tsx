import { drinksMenu } from '../content';
import ScrollReveal from './ScrollReveal';
import './Drinks.css';

export default function Drinks() {
  return (
    <section id="drinks" className="drinks">
      <div className="drinks-container">
        <div className="drinks-visual">
          <ScrollReveal index={0} className="drinks-image-wrapper">
            <img
              src="/bar-counter1.jpg.png"
              alt="Blue Moon bar counter"
              className="drinks-image"
            />
          </ScrollReveal>
        </div>

        <div className="drinks-content">
          <ScrollReveal index={0}>
            <h2 className="drinks-title">THE BAR</h2>
          </ScrollReveal>
          <ScrollReveal index={1}>
            <p className="drinks-description">
              Cold beers, crafted cocktails and bold spirits. Our bar brings the energy with drinks that bite back 
              and late-night pours that keep the atmosphere roaring. From crisp lagers to smooth wines and fresh juices, 
              every glass is poured with Blue Moon vibes — unapologetically fun and made for long evenings.
            </p>
          </ScrollReveal>

          <div className="drinks-categories">
            {drinksMenu.map((category, catIndex) => (
              <ScrollReveal key={category?.category} index={Math.min(catIndex + 2, 8)}>
                <div className="drinks-category">
                  <h3 className="drinks-category-name">{category?.category}</h3>
                  <div className="drinks-items">
                    {category?.items?.map((item, index) => (
                      <div key={index} className="drinks-item">
                        <span className="drinks-bullet">●</span>
                        <span className="drinks-item-name">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
