import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './Reveal.jsx';

// Placeholder reviews — replace with real customer quotes
const reviews = [
  ['The best haircut I have had in Narendrapur. Friendly staff and a very clean salon.', 'Regular customer'],
  ['My son loves coming here — they are so patient with kids. Highly recommended for families.', 'Parent, Sonarpur'],
  ['Got my wedding-day grooming done here. Professional work at an honest price.', 'Groom, Kolkata'],
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % reviews.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="section testimonials">
      <SectionTitle eyebrow="Testimonials">Loved by <em>Families</em></SectionTitle>
      <div className="quote-wrap">
        <span className="quote-mark">“</span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p>{reviews[i][0]}</p>
            <div className="stars">★★★★★</div>
            <cite>— {reviews[i][1]}</cite>
          </motion.blockquote>
        </AnimatePresence>
        <div className="dots">
          {reviews.map((_, n) => (
            <button key={n} className={n === i ? 'active' : ''} onClick={() => setI(n)} aria-label={`Review ${n + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
