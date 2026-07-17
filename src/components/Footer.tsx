import { motion } from 'framer-motion';
import { blueMoonContent } from '../content';
import './Footer.css';

// Animation variants
const footerItem = {
  hidden: {
    opacity: 0,
    y: 18
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const
    }
  }
};

const footerList = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1
    }
  }
};

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <motion.div 
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="footer-content">
          <motion.div className="footer-brand" variants={footerItem}>
            <h2 className="footer-title">Blue Moon</h2>
            <p className="footer-descriptor">
              {blueMoonContent.descriptor} · {blueMoonContent.city}
            </p>
          </motion.div>

          <div className="footer-sections">
            <motion.div className="footer-section" variants={footerItem}>
              <h3 className="footer-heading">Navigate</h3>
              <motion.nav className="footer-nav" variants={footerList}>
                <motion.button 
                  className="footer-nav-link"
                  variants={footerItem}
                  onClick={() => scrollToSection('experience')}
                >
                  <span>Experience</span>
                  <span className="footer-nav-arrow">↗</span>
                </motion.button>
                <motion.button 
                  className="footer-nav-link"
                  variants={footerItem}
                  onClick={() => scrollToSection('food')}
                >
                  <span>Food</span>
                  <span className="footer-nav-arrow">↗</span>
                </motion.button>
                <motion.button 
                  className="footer-nav-link"
                  variants={footerItem}
                  onClick={() => scrollToSection('drinks')}
                >
                  <span>Drinks</span>
                  <span className="footer-nav-arrow">↗</span>
                </motion.button>
                <motion.button 
                  className="footer-nav-link"
                  variants={footerItem}
                  onClick={() => scrollToSection('evening')}
                >
                  <span>Evening</span>
                  <span className="footer-nav-arrow">↗</span>
                </motion.button>
                <motion.button 
                  className="footer-nav-link"
                  variants={footerItem}
                  onClick={() => scrollToSection('visit')}
                >
                  <span>Visit</span>
                  <span className="footer-nav-arrow">↗</span>
                </motion.button>
              </motion.nav>
            </motion.div>

            <motion.div className="footer-section" variants={footerItem}>
              <h3 className="footer-heading">Connect</h3>
              <motion.div className="footer-links" variants={footerList}>
                {blueMoonContent.instagram && (
                  <motion.a
                    className="footer-connect-link"
                    variants={footerItem}
                    href={`https://instagram.com/${blueMoonContent.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Instagram</span>
                    <span className="footer-nav-arrow">↗</span>
                  </motion.a>
                )}
                {blueMoonContent.phone && (
                  <motion.a
                    className="footer-connect-link"
                    variants={footerItem}
                    href={`tel:${blueMoonContent.phone}`}
                  >
                    <span>Phone</span>
                    <span className="footer-nav-arrow">↗</span>
                  </motion.a>
                )}
                {blueMoonContent.mapUrl && (
                  <motion.a
                    className="footer-connect-link"
                    variants={footerItem}
                    href={blueMoonContent.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Directions</span>
                    <span className="footer-nav-arrow">↗</span>
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className="footer-bottom" variants={footerItem}>
          <p className="footer-notice">
            Please drink responsibly. Alcohol is served only to guests of legal
            drinking age.
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Blue Moon · Pala, Kerala · FSSAI:{' '}
            {blueMoonContent.fssai}
          </p>
          <a
            className="footer-made-by"
            href="https://revol-q.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with <span className="footer-made-by-heart">♥</span> by{' '}
            <span className="footer-made-by-brand">Revolq</span>
          </a>
        </motion.div>
      </motion.div>
    </footer>
  );
}
