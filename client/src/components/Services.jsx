import { SectionTitle } from './Reveal.jsx';
import ServiceCard from './ServiceCard.jsx';

export default function Services({ services }) {
  return (
    <section id="services" className="section">
      <SectionTitle eyebrow="What we offer" sub="Transparent pricing, expert hands and a relaxing experience — for every member of the family.">
        Our <em>Services</em>
      </SectionTitle>
      <div className="grid">
        {services.map((s, i) => <ServiceCard key={s.id} s={s} i={i} />)}
      </div>
    </section>
  );
}
