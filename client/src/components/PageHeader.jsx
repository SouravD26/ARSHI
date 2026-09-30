export default function PageHeader({ title, img }) {
  return (
    <header className="page-header" style={{ backgroundImage: `url(${img})` }}>
      <div className="page-header-overlay" />
      <h1>{title}</h1>
    </header>
  );
}
