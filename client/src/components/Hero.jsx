import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HERO_IMG = 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=2000&q=80';
const words = ['Where', 'Style', 'Meets', 'Family.'];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="home" className="hero">
      <motion.div
        className="hero-bg"
        style={{ y: bgY, backgroundImage: `url(${HERO_IMG})` }}
        initial={{ scale: 1.25 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="hero-overlay" />

      <motion.div className="hero-content" style={{ opacity: fade }}>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          ARSHI Family Saloon · Narendrapur
        </motion.p>
        <h1 className="hero-title">
          {words.map((w, i) => (
            <span className="word-mask" key={w}>
              <motion.span
                className={i === 3 ? 'accent' : ''}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 1 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          Precision cuts, expert grooming, colour and bridal styling for men, women and kids —
          delivered with care in the heart of Kolkata.
        </motion.p>
        <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
          <Link to="/booking" className="btn btn-primary">Book Appointment</Link>
          <Link to="/services" className="btn btn-ghost">Explore Services</Link>
        </motion.div>
      </motion.div>

      <motion.div className="scroll-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
        <span>Scroll</span>
        <i />
      </motion.div>
    </section>
  );
}
