import { motion } from 'framer-motion';

export default function Services({ services }) {
  return (
    <section id="services" className="section">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Our <span className="glow">Services</span>
      </motion.h2>
      <div className="grid">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            className="card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
          >
            <div className="card-icon">{s.icon}</div>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            <span className="price">from ₹{s.price}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
