import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MenuOverlay.css';

interface MenuOverlayProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function MenuOverlay({ isVisible, onToggle }: MenuOverlayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    'KERALA BEEF',
    'SEAFOOD', 
    'TRAVANCORE CHICKEN',
    'KIZHI POROTTA',
    'AL FAHAM',
    'COLD BEER',
    'T.B. ROAD'
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    
    // If T.B. ROAD is clicked, scroll to visit section
    if (category === 'T.B. ROAD') {
      document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
      onToggle(); // Close overlay
    } else {
      // For other categories, scroll to food section
      document.getElementById('food')?.scrollIntoView({ behavior: 'smooth' });
      onToggle(); // Close overlay
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="menu-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="menu-overlay-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="menu-overlay-grid">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`menu-overlay-button ${category === 'T.B. ROAD' ? 'tb-road' : ''} ${selectedCategory === category ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <motion.button
            className="menu-overlay-close"
            onClick={onToggle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}