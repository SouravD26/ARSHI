import { Link } from 'react-router-dom';

export default function Footer({ business }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="logo">ARSHI<span className="logo-dot">.</span><small>Family Saloon</small></Link>
          <p className="muted">Premium grooming and styling for the whole family in Narendrapur, Kolkata.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/booking">Book Appointment</Link></li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <p className="muted">{business?.address || '215, Netaji Subhas Chandra Bose Rd, Narendrapur, Kolkata 700149'}</p>
          {business?.phone && <p><a href={`tel:${business.phone}`}>{business.phone}</a></p>}
        </div>
        <div>
          <h4>Hours</h4>
          <p className="muted">Open every day<br />Walk-ins &amp; appointments welcome</p>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} ARSHI FAMILY SALOON · All rights reserved</div>
    </footer>
  );
}
