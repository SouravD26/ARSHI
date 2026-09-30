import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import PageHeader from './components/PageHeader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { ScrollProgress, Preloader, FloatingActions, Cursor } from './components/Chrome.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './components/Services.jsx';
import Gallery from './components/Gallery.jsx';
import Booking from './components/Booking.jsx';
import Contact from './components/Contact.jsx';

const img = (id) => `https://images.unsplash.com/${id}?w=1800&q=80`;

function Page({ children, header }) {
  return (
    <motion.main className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      {header && <PageHeader {...header} />}
      {children}
    </motion.main>
  );
}

function AnimatedRoutes({ services, business }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><Home services={services} /></Page>} />
        <Route path="/about" element={<Page header={{ title: 'About Us', img: img('photo-1521590832167-7bcbfaa6381f') }}><About /></Page>} />
        <Route path="/services" element={<Page header={{ title: 'Our Services', img: img('photo-1503951914875-452162b0f3f1') }}><Services services={services} /></Page>} />
        <Route path="/gallery" element={<Page header={{ title: 'Gallery', img: img('photo-1560066984-138dadb4c035') }}><Gallery /></Page>} />
        <Route path="/booking" element={<Page header={{ title: 'Book Appointment', img: img('photo-1599351431202-1e0f0137899a') }}><Booking services={services} /></Page>} />
        <Route path="/contact" element={<Page header={{ title: 'Contact Us', img: img('photo-1562322140-8baeececf3df') }}><Contact business={business} /></Page>} />
        <Route path="*" element={<Page header={{ title: 'Page Not Found', img: img('photo-1562322140-8baeececf3df') }}><section className="section center"><Link className="btn btn-primary" to="/">Back to Home</Link></section></Page>} />
      </Routes>
    </AnimatePresence>
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
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <AnimatedRoutes services={services} business={business} />
        <Footer business={business} />
        <FloatingActions />
        <Cursor />
      </BrowserRouter>
    </MotionConfig>
  );
}
