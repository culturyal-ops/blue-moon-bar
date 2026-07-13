import { blueMoonContent } from '../content';
import ScrollReveal from './ScrollReveal';
import './Visit.css';

export default function Visit() {
  const handleCall = () => {
    if (blueMoonContent.phone) {
      window.location.href = `tel:${blueMoonContent.phone}`;
    }
  };

  const handleDirections = () => {
    if (blueMoonContent.mapUrl) {
      window.open(blueMoonContent.mapUrl, '_blank');
    }
  };

  return (
    <section id="visit" className="visit">
      <div className="visit-container">
        <div className="visit-content">
          <ScrollReveal index={0}>
            <h2 className="visit-title">Visit</h2>
          </ScrollReveal>

          <ScrollReveal index={1}>
            <div className="visit-info">
              <div className="info-group">
                <h3 className="info-label">Location</h3>
                <p className="info-text">
                  {blueMoonContent.address.line1}
                  <br />
                  {blueMoonContent.address.city},{' '}
                  {blueMoonContent.address.district}
                  <br />
                  {blueMoonContent.address.state}{' '}
                  {blueMoonContent.address.postalCode}
                </p>
              </div>

              {blueMoonContent.phone && (
                <div className="info-group">
                  <h3 className="info-label">Contact</h3>
                  <p className="info-text">
                    <a href={`tel:${blueMoonContent.phone}`}>
                      {blueMoonContent.phone}
                    </a>
                  </p>
                </div>
              )}

              {blueMoonContent.instagram && (
                <div className="info-group">
                  <h3 className="info-label">Follow</h3>
                  <p className="info-text">
                    <a
                      href={`https://instagram.com/${blueMoonContent.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {blueMoonContent.instagram}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal index={2}>
            <div className="visit-actions">
              {blueMoonContent.phone && (
                <button className="btn btn-primary" onClick={handleCall}>
                  Call
                </button>
              )}
              {blueMoonContent.mapUrl && (
                <button className="btn btn-secondary" onClick={handleDirections}>
                  Directions
                </button>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal index={3}>
            <div className="visit-notice">
            <p>
              Please drink responsibly. Alcohol is served only to guests of
              legal drinking age.
            </p>
          </div>
          </ScrollReveal>
        </div>

        <ScrollReveal index={4} className="visit-map">
          <div className="map-placeholder">
            <div className="placeholder-text">
              T.B. Road, Pala
              <br />
              <small>9.71368, 76.68428</small>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
