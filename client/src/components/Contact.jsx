import { Link } from 'react-router-dom';
import Reveal, { SectionTitle } from './Reveal.jsx';

const DEFAULT_ADDRESS = '215, Netaji Subhas Chandra Bose Rd, Narendrapur, Kolkata, Rajpur Sonarpur, West Bengal 700149';

export default function Contact({ business }) {
  const address = business?.address || DEFAULT_ADDRESS;
  return (
    <section id="contact" className="section">
      <SectionTitle eyebrow="Get in touch">Visit <em>Us</em></SectionTitle>
      <div className="contact">
        <Reveal dir="left" className="card contact-card">
          <div className="contact-row">
            <span className="contact-ic">📍</span>
            <div><h3>Address</h3><p>{address}</p></div>
          </div>
          {business?.phone && (
            <div className="contact-row">
              <span className="contact-ic">📞</span>
              <div><h3>Phone</h3><p><a href={`tel:${business.phone}`}>{business.phone}</a></p></div>
            </div>
          )}
          <div className="contact-row">
            <span className="contact-ic">🕒</span>
            <div><h3>Hours</h3><p>Open every day · Walk-ins welcome</p></div>
          </div>
          <div className="btn-row">
            <a className="btn btn-primary" href={business?.mapsUrl} target="_blank" rel="noreferrer">Get Directions</a>
            <Link className="btn btn-ghost" to="/booking">Book Online</Link>
          </div>
        </Reveal>
        <Reveal dir="right" className="map-wrap">
          <iframe
            title="ARSHI Family Saloon location"
            className="map"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent('ARSHI FAMILY SALOON ' + address)}&output=embed`}
          />
        </Reveal>
      </div>
    </section>
  );
}
