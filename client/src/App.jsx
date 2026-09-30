import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PageHeader from './components/PageHeader.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import Booking from './components/Booking.jsx';
import Contact from './components/Contact.jsx';

function Page({ children, header }) {
  return (
    <main className="page">
      {header && <PageHeader {...header} />}
      {children}
    </main>
  );
}

function AnimatedRoutes({ services, business }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
      <Routes location={location}>
        <Route path="/" element={<Page key="home"><Home services={services} /></Page>} />
        <Route path="/about" element={<Page key="about" header={{ title: 'About Us', img: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600' }}><About /></Page>} />
        <Route path="/services" element={<Page key="services" header={{ title: 'Our Services', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600' }}><Services services={services} /></Page>} />
        <Route path="/gallery" element={<Page key="gallery" header={{ title: 'Gallery', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600' }}><Gallery /></Page>} />
        <Route path="/booking" element={<Page key="booking" header={{ title: 'Book Appointment', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1600' }}><Booking services={services} /></Page>} />
        <Route path="/contact" element={<Page key="contact" header={{ title: 'Contact Us', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600' }}><Contact business={business} /></Page>} />
        <Route path="*" element={<Page><section className="section"><h2>Page not found</h2></section></Page>} />
      </Routes>
  );
}

export default function App() {
  const [services, setServices] = useState([]);
  const [business, setBusiness] = useState(null);

  useEffect(() => {
    fetch('/api/services').then((r) => r.json()).then(setServices).catch(() => {});
    fetch('/api/business').then((r) => r.json()).then(setBusiness).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-grid" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <Navbar />
      <AnimatedRoutes services={services} business={business} />
      <footer>© {new Date().getFullYear()} ARSHI FAMILY SALOON · Narendrapur, Kolkata</footer>
    </BrowserRouter>
  );
}
