import { blueMoonContent } from '../content';
import './Footer.css';

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-title">Blue Moon</h2>
            <p className="footer-descriptor">
              {blueMoonContent.descriptor} · {blueMoonContent.city}
            </p>
          </div>

          <div className="footer-sections">
            <div className="footer-section">
              <h3 className="footer-heading">Visit</h3>
              <address className="footer-address">
                {blueMoonContent.address.line1}
                <br />
                {blueMoonContent.address.city},{' '}
                {blueMoonContent.address.district}
                <br />
                {blueMoonContent.address.state}{' '}
                {blueMoonContent.address.postalCode}
              </address>
            </div>

            <div className="footer-section">
              <h3 className="footer-heading">Navigate</h3>
              <nav className="footer-nav">
                <button onClick={() => scrollToSection('experience')}>
                  Experience
                </button>
                <button onClick={() => scrollToSection('food')}>Food</button>
                <button onClick={() => scrollToSection('drinks')}>
                  Drinks
                </button>
                <button onClick={() => scrollToSection('evening')}>
                  Evening
                </button>
                <button onClick={() => scrollToSection('visit')}>Visit</button>
              </nav>
            </div>

            {(blueMoonContent.mapUrl || blueMoonContent.instagram) && (
              <div className="footer-section">
                <h3 className="footer-heading">Connect</h3>
                <div className="footer-links">
                  {blueMoonContent.mapUrl && (
                    <a
                      href={blueMoonContent.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Map
                    </a>
                  )}
                  {blueMoonContent.instagram && (
                    <a
                      href={`https://instagram.com/${blueMoonContent.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-notice">
            Please drink responsibly. Alcohol is served only to guests of legal
            drinking age.
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} Blue Moon, Pala. FSSAI:{' '}
            {blueMoonContent.fssai}
          </p>
        </div>
      </div>
    </footer>
  );
}
