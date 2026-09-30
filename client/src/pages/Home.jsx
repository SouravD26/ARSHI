import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero.jsx';

const stats = [
  ['5★', 'Rated by locals'],
  ['All Ages', 'Men · Women · Kids'],
  ['Expert', 'Trained stylists'],
  ['Hygienic', 'Sanitised tools'],
];

export default function Home({ services }) {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="stats">
          {stats.map(([big, small], i) => (
            <motion.div
              key={big}
              className="stat"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <strong>{big}</strong>
              <span>{small}</span>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="section">
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Popular <span className="glow">Picks</span>
        </motion.h2>
        <div className="grid">
          {services.slice(0, 3).map((s, i) => (
            <motion.div
              key={s.id}
              className="card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="card-icon">{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <span className="price">from ₹{s.price}</span>
            </motion.div>
          ))}
        </div>
        <div className="center">
          <Link to="/services" className="btn btn-ghost">View All Services</Link>
        </div>
      </section>
      <section className="section cta-band">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <h2>Ready for a <span className="glow">new look?</span></h2>
          <Link to="/booking" className="btn btn-primary">Book Now</Link>
        </motion.div>
      </section>
    </>
  );
}
