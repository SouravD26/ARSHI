import Reveal, { SectionTitle } from '../components/Reveal.jsx';

const values = [
  ['💈', 'Family First', 'One trusted place for the whole family — from a child’s first haircut to wedding-day styling.'],
  ['🧼', 'Clean & Safe', 'Every tool is sanitised and every towel is fresh, for every customer.'],
  ['💸', 'Honest Pricing', 'Premium service at prices that suit Narendrapur families.'],
];

export default function About() {
  return (
    <>
      <section className="section split">
        <div className="split-text">
          <Reveal as="span" className="eyebrow">Our story</Reveal>
          <Reveal as="h2" delay={0.1}>A salon built for <em>families</em></Reveal>
          <Reveal as="p" className="muted" delay={0.2}>
            ARSHI FAMILY SALOON is a family salon on Netaji Subhas Chandra Bose Road, Narendrapur.
            We bring modern styling, expert grooming and a friendly, welcoming space to the heart of Rajpur Sonarpur.
          </Reveal>
          <Reveal as="p" className="muted" delay={0.3}>
            Whether it’s a quick trim, a fresh colour or a complete bridal makeover, our team treats
            every guest like family — with patience, precision and care.
          </Reveal>
        </div>
        <Reveal dir="right" className="split-media">
          <img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1200&q=80" alt="Salon interior" loading="lazy" />
        </Reveal>
      </section>
      <section className="section">
        <SectionTitle eyebrow="What we stand for">Our <em>Values</em></SectionTitle>
        <div className="grid">
          {values.map(([icon, title, text], i) => (
            <Reveal key={title} className="card" delay={i * 0.12}>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
