import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch('/api/gallery').then((r) => r.json()).then(setImages).catch(() => {});
  }, []);

  return (
    <section id="gallery" className="section">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Our <span className="glow">Gallery</span>
      </motion.h2>
      <div className="gallery">
        {images.map((src, i) => (
          <motion.div
            key={src}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setActive(src)}
          >
            <img src={src} alt={`ARSHI FAMILY SALOON ${i + 1}`} loading="lazy" />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div className="lightbox" onClick={() => setActive(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.img src={active} alt="" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
