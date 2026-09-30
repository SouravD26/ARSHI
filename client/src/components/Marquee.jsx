const items = ['Haircuts', 'Beard Sculpting', 'Hair Colour', 'Facials', 'Hair Spa', 'Bridal Makeovers', 'Kids Cuts', 'Grooming'];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}>{t}<b>✦</b></span>)}
      </div>
    </div>
  );
}
