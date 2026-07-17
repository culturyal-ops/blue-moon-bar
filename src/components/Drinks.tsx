import { drinksMenu } from '../content';
import ScrollReveal from './ScrollReveal';
import BarBrandsMotion from './BarBrandsMotion';
import './Drinks.css';

export default function Drinks() {
  return (
    <section id="drinks" className="drinks">
      <div className="drinks-container">
        {/* Section Label */}
        <ScrollReveal index={0}>
          <div className="drinks-label">THE BAR</div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal index={1}>
          <h2 className="drinks-title">The Bar</h2>
        </ScrollReveal>

        {/* Intro Copy */}
        <ScrollReveal index={2}>
          <p className="drinks-intro">
            Cold beers, crafted cocktails and bold spirits. Our bar brings the energy with drinks 
            that bite back and late-night pours made for long evenings.
          </p>
        </ScrollReveal>

        {/* Featured Bar Image */}
        <ScrollReveal index={3}>
          <div className="drinks-image-wrapper">
            <img
              src="/bar-counter1.jpg.png"
              alt="Blue Moon bar counter"
              className="drinks-image"
            />
          </div>
        </ScrollReveal>

        {/* Animated Brand Atmosphere */}
        <ScrollReveal index={4}>
          <BarBrandsMotion />
        </ScrollReveal>

        {/* Unified Bar Menu */}
        <div className="bar-menu">
          {drinksMenu.map((category, index) => (
            <ScrollReveal key={category.category} index={Math.min(index + 5, 10)}>
              <div className="bar-menu-row">
                <h3>{category.category}</h3>
                {category.items.length === 1 ? (
                  <p>{category.items[0]}</p>
                ) : (
                  <p>{category.items.join(' · ')}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Optional CTA */}
        <ScrollReveal index={10}>
          <div className="drinks-cta">
            <a href="#food" className="drinks-cta-link">
              Explore Menu
              <span className="drinks-cta-subtitle">See full drinks and food offering</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
