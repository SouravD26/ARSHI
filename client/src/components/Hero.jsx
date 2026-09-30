import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const title = 'ARSHI FAMILY SALOON';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.p className="tag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        ✦ Narendrapur · Kolkata ✦
      </motion.p>
      <h1 className="hero-title">
        {title.split('').map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            {c === ' ' ? ' ' : c}
          </motion.span>
        ))}
      </h1>
      <motion.p className="subtitle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
        The future of style for the whole family — cuts, colour, grooming &amp; glow.
      </motion.p>
      <motion.div className="hero-cta" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7 }}>
        <Link to="/booking" className="btn btn-primary">Book Appointment</Link>
        <Link to="/services" className="btn btn-ghost">Explore Services</Link>
      </motion.div>
      <motion.div className="scroll-hint" animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>↓</motion.div>
    </section>
  );
}
