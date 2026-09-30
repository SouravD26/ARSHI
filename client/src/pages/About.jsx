import { motion } from 'framer-motion';

const values = [
  ['💈', 'Family First', 'One trusted place for the whole family — from a child’s first haircut to wedding-day styling.'],
  ['🧼', 'Clean & Safe', 'Every tool is sanitised and every towel is fresh, for every customer.'],
  ['💸', 'Honest Pricing', 'Premium service at prices that suit Narendrapur families.'],
];

export default function About() {
  return (
    <section className="section">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        About <span className="glow">Us</span>
      </motion.h2>
      <motion.p
        className="lead"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        ARSHI FAMILY SALOON is a family salon on Netaji Subhas Chandra Bose Road, Narendrapur.
        We bring modern styling, expert grooming and a friendly, welcoming space to the heart of Rajpur Sonarpur.
      </motion.p>
      <div className="grid">
        {values.map(([icon, title, text], i) => (
          <motion.div
            key={title}
            className="card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="card-icon">{icon}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
