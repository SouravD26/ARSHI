import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/booking', 'Booking'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`nav ${scrolled ? 'nav-scrolled' : ''}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="logo">ARSHI<span>.</span></Link>
      <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      <ul className={open ? 'open' : ''}>
        {links.map(([to, label]) => (
          <li key={to}>
            <NavLink to={to} end onClick={() => setOpen(false)}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
