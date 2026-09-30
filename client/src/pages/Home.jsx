import { Link } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Counter from '../components/Counter.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Reveal, { SectionTitle } from '../components/Reveal.jsx';

const stats = [
  [5, '★', 'Rated by locals'],
  [6, '+', 'Signature services'],
  [100, '%', 'Sanitised tools'],
  [3, '', 'Generations served'],
];

const features = [
  ['Expert Stylists', 'Trained professionals who keep up with the latest cuts and trends.'],
  ['Hygiene First', 'Sterilised tools and fresh towels for every single customer.'],
  ['For All Ages', 'Men, women and kids — one trusted salon for the whole family.'],
];

export default function Home({ services }) {
  return (
    <>
      <Hero />
      <Marquee />

      <section className="section">
        <div className="stats">
          {stats.map(([n, suf, label], i) => (
            <Reveal key={label} className="stat" delay={i * 0.1}>
              <strong><Counter to={n} suffix={suf} /></strong>
              <span>{label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section split">
        <Reveal dir="left" className="split-media">
          <img src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=1200&q=80" alt="Stylist at work" loading="lazy" />
          <div className="split-badge"><strong>Family owned</strong><span>Narendrapur’s trusted salon</span></div>
        </Reveal>
        <div className="split-text">
          <Reveal as="span" className="eyebrow">Why choose us</Reveal>
          <Reveal as="h2" delay={0.1}>Crafted looks, <em>genuine care</em></Reveal>
          <Reveal as="p" className="muted" delay={0.2}>
            We combine skilled craftsmanship with a warm, welcoming space — so every visit feels
            as good as the result looks.
          </Reveal>
          <ul className="features">
            {features.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={0.25 + i * 0.1}>
                <span className="feature-num">0{i + 1}</span>
                <div><h3>{t}</h3><p>{d}</p></div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <SectionTitle eyebrow="Most requested">Popular <em>Services</em></SectionTitle>
        <div className="grid">
          {services.slice(0, 3).map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
        </div>
        <Reveal className="center">
          <Link to="/services" className="btn btn-ghost">View All Services</Link>
        </Reveal>
      </section>

      <Testimonials />

      <section className="cta-band">
        <Reveal className="cta-inner">
          <span className="eyebrow">Your chair is waiting</span>
          <h2>Ready for a <em>new look?</em></h2>
          <p>Book online in under a minute — we’ll have everything ready when you arrive.</p>
          <Link to="/booking" className="btn btn-primary">Book Your Appointment</Link>
        </Reveal>
      </section>
    </>
  );
}
