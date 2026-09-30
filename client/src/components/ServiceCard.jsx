import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ServiceCard({ s, i }) {
  return (
    <motion.article
      className="card service-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
    >
      <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
      <div className="card-icon">{s.icon}</div>
      <h3>{s.name}</h3>
      <p>{s.desc}</p>
      <div className="card-foot">
        <span className="price"><small>from</small> ₹{s.price}</span>
        <Link to="/booking" className="card-link" aria-label={`Book ${s.name}`}>Book <span>→</span></Link>
      </div>
    </motion.article>
  );
}
