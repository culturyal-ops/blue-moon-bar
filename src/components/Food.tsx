import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { foodMenu } from '../content';
import './Food.css';

export default function Food() {
  const categories = [
    { id: 'Featured', label: 'Featured' },
    { id: 'Kerala Beef', label: 'Kerala Beef' },
    { id: 'Pork', label: 'Pork' },
    { id: 'Chicken', label: 'Chicken' },
    { id: 'Seafood', label: 'Seafood' },
    { id: 'Rice', label: 'Rice' },
    { id: 'Porotta', label: 'Porotta' },
    { id: 'Starters', label: 'Starters' },
    { id: 'Indo-Chinese', label: 'Indo-Chinese' },
    { id: 'Vegetarian', label: 'Vegetarian' },
  ];

  const [activeCategory, setActiveCategory] = useState('Featured');

  const filteredItems = () => {
    if (activeCategory === 'Featured') {
      return foodMenu.filter((item) => item?.featured);
    }
    return foodMenu.filter((item) => item?.category === activeCategory);
  };

  const items = filteredItems();

  return (
    <section id="food" className="food-section">
      <div className="food-container">
        {/* Header */}
        <div className="food-header">
          <motion.div
            className="food-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Our Kitchen
          </motion.div>
          
          <motion.h2
            className="food-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Menu
          </motion.h2>
          
          <motion.p
            className="food-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            At Blue Moon, our kitchen is a celebration of Kerala's bold flavors and late-night cravings. 
            Think rooftop snacking energy with unapologetically fun plates made for nights that never play it safe. 
            From Kerala beef specialties to Indo-Chinese heat and porotta perfection, 
            this is where your appetite meets adventure on T.B. Road.
          </motion.p>
        </div>

        {/* Categories */}
        <motion.div
          className="food-categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Menu Items Grid */}
        <div className="food-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="food-items"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {items.map((item, index) => (
                <motion.article
                  key={`${item?.name}-${index}`}
                  className="food-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="food-item-content">
                    <h3 className="food-item-name">{item?.name}</h3>
                    {item?.availableAfter && (
                      <p className="food-item-time">After {item.availableAfter}</p>
                    )}
                    {item?.featured && (
                      <span className="food-item-badge">Popular</span>
                    )}
                  </div>
                  <div className="food-item-indicator">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                </motion.article>
              ))}
              
              {items.length === 0 && (
                <motion.p
                  className="food-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  No items in this category yet.
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative Image */}
        <motion.div
          className="food-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="food-visual-wrapper">
            <img
              src="/dining-room.jpg.png"
              alt="Blue Moon dining experience"
              className="food-visual-image"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
