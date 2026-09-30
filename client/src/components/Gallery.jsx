import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from './Reveal.jsx';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then(setImages).catch(() => {});
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((n) => (n + 1) % images.length);
      if (e.key === 'ArrowLeft') setActive((n) => (n - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, images.length]);

  const step = (d) => (e) => {
    e.stopPropagation();
    setActive((n) => (n + d + images.length) % images.length);
  };

  return (
    <section id="gallery" className="section">
      <SectionTitle eyebrow="Our work">The <em>Gallery</em></SectionTitle>
      <div className="gallery">
        {images.map((src, i) => (
          <motion.button
            key={src}
            className="gallery-item"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            onClick={() => setActive(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <img src={src} alt={`ARSHI FAMILY SALOON ${i + 1}`} loading="lazy" />
            <span className="gallery-zoom">+</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div className="lightbox" onClick={() => setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="lb-btn lb-close" aria-label="Close">×</button>
            <button className="lb-btn lb-prev" onClick={step(-1)} aria-label="Previous">‹</button>
            <motion.img
              key={active}
              src={images[active]}
              alt=""
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="lb-btn lb-next" onClick={step(1)} aria-label="Next">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
