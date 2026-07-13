import { useState } from 'react';
import { foodMenu } from '../content';
import ScrollReveal from './ScrollReveal';
import './Food.css';

export default function Food() {
  const categories = [
    'Featured',
    'Kerala Beef',
    'Pork',
    'Chicken',
    'Seafood',
    'Rice',
    'Porotta',
    'Starters',
    'Indo-Chinese',
    'Vegetarian',
  ];

  const [activeCategory, setActiveCategory] = useState('Featured');

  const filteredItems = () => {
    if (activeCategory === 'Featured') {
      return foodMenu.filter((item) => item?.featured);
    }
    return foodMenu.filter((item) => item?.category === activeCategory);
  };

  return (
    <section id="food" className="food">
      <div className="food-container">
        <div className="food-layout">
          <div className="food-content">
            <ScrollReveal index={0}>
              <h2 className="food-title">THE MENU</h2>
            </ScrollReveal>
            <ScrollReveal index={1}>
              <p className="food-description">
                At Blue Moon, our kitchen is a celebration of Kerala's bold flavors and late-night cravings. 
                Think rooftop snacking energy with unapologetically fun plates made for nights that never play it safe. 
                From Kerala beef specialties to Indo-Chinese heat and porotta perfection, 
                this is where your appetite meets adventure on T.B. Road.
              </p>
            </ScrollReveal>

            {/* Image appears here on mobile, before categories */}
            <div className="food-visual food-visual-mobile">
              <ScrollReveal index={2} className="food-image-wrapper">
                <img
                  src="/dining-room.jpg.png"
                  alt="Blue Moon dining experience showing the restaurant interior with warm lighting and dining tables"
                  className="food-image"
                />
              </ScrollReveal>
            </div>

            <ScrollReveal index={3}>
              <div className="food-categories">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`category-pill ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            <div className="food-items-list">
              {filteredItems().map((item, index) => (
                <ScrollReveal key={`${item?.name}-${index}`} index={Math.min(index + 4, 16)}>
                  <div className="food-list-item">
                    <div className="item-info">
                      <h3 className="item-name">{item?.name}</h3>
                      {item?.availableAfter && (
                        <p className="item-timing">After {item.availableAfter}</p>
                      )}
                    </div>
                    <div className="item-accent"></div>
                  </div>
                </ScrollReveal>
              ))}
              {filteredItems().length === 0 && (
                <p className="no-items">No items in this category.</p>
              )}
            </div>
          </div>

          {/* Desktop-only visual column */}
          <div className="food-visual food-visual-desktop">
            <ScrollReveal index={0} className="food-image-wrapper">
              <img
                src="/dining-room.jpg.png"
                alt="Blue Moon dining experience showing the restaurant interior with warm lighting and dining tables"
                className="food-image"
              />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
