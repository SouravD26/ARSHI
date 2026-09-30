import { motion } from 'framer-motion';

const DEFAULT_ADDRESS = '215, Netaji Subhas Chandra Bose Rd, Narendrapur, Kolkata, Rajpur Sonarpur, West Bengal 700149';

export default function Contact({ business }) {
  const address = business?.address || DEFAULT_ADDRESS;
  return (
    <section id="contact" className="section">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Visit <span className="glow">Us</span>
      </motion.h2>
      <div className="contact">
        <motion.div className="card" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3>📍 Address</h3>
          <p>{address}</p>
          {business?.phone && (
            <>
              <h3>📞 Phone</h3>
              <p><a href={`tel:${business.phone}`}>{business.phone}</a></p>
            </>
          )}
          <a className="btn btn-primary" href={business?.mapsUrl} target="_blank" rel="noreferrer">Get Directions</a>
        </motion.div>
        <motion.iframe
          title="map"
          className="map"
          loading="lazy"
          src={`https://maps.google.com/maps?q=${encodeURIComponent('ARSHI FAMILY SALOON ' + address)}&output=embed`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        />
      </div>
    </section>
  );
}
