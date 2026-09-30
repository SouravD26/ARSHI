import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/services', 'Services'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.nav
        className={`nav ${scrolled || open ? 'nav-scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" className="logo" aria-label="ARSHI Family Saloon home">
          ARSHI<span className="logo-dot">.</span>
          <small>Family Saloon</small>
        </Link>
        <ul className="nav-links">
          {links.map(([to, label]) => (
            <li key={to}><NavLink to={to} end>{label}</NavLink></li>
          ))}
        </ul>
        <Link to="/booking" className="btn btn-primary btn-sm nav-cta">Book Now</Link>
        <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul>
              {[...links, ['/booking', 'Book Appointment']].map(([to, label], i) => (
                <motion.li key={to} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}>
                  <NavLink to={to} end>{label}</NavLink>
                </motion.li>
              ))}
            </ul>
            <p className="mobile-menu-foot">Narendrapur · Kolkata</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
