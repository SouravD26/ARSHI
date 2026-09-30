import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const GALLERY_DIR = path.join(__dirname, 'gallery');
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

app.use(cors());
app.use(express.json());
app.use('/gallery', express.static(GALLERY_DIR));

const business = {
  name: 'ARSHI FAMILY SALOON',
  address: '215, Netaji Subhas Chandra Bose Rd, Narendrapur, Kolkata, Rajpur Sonarpur, West Bengal 700149',
  phone: '', // add phone number here
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=ARSHI+FAMILY+SALOON+Narendrapur+Kolkata',
};

const services = [
  { id: 1, name: 'Haircut & Styling', price: 150, icon: '✂️', desc: 'Precision cuts for men, women & kids.' },
  { id: 2, name: 'Beard Sculpting', price: 80, icon: '🧔', desc: 'Trim, shape and hot-towel finish.' },
  { id: 3, name: 'Hair Colour', price: 500, icon: '🎨', desc: 'Global colour, highlights & root touch-ups.' },
  { id: 4, name: 'Facial & Cleanup', price: 400, icon: '✨', desc: 'Deep cleansing facials for glowing skin.' },
  { id: 5, name: 'Hair Spa', price: 600, icon: '💆', desc: 'Nourishing spa treatment for healthy hair.' },
  { id: 6, name: 'Bridal & Groom', price: 3000, icon: '💍', desc: 'Complete wedding-day makeover packages.' },
];

// Shown until real photos are placed in server/gallery
const fallbackImages = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=900',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=900',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900',
];

const readBookings = () =>
  fs.existsSync(BOOKINGS_FILE) ? JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf8')) : [];

app.get('/api/business', (_req, res) => res.json(business));
app.get('/api/services', (_req, res) => res.json(services));

app.get('/api/gallery', (_req, res) => {
  const files = fs.existsSync(GALLERY_DIR)
    ? fs.readdirSync(GALLERY_DIR).filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
    : [];
  res.json(files.length ? files.map((f) => `/gallery/${encodeURIComponent(f)}`) : fallbackImages);
});

app.post('/api/bookings', (req, res) => {
  const { name, phone, service, date, time } = req.body || {};
  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[0-9+\-\s]{8,15}$/.test(phone)) return res.status(400).json({ error: 'Invalid phone number.' });
  const bookings = readBookings();
  const booking = { id: Date.now(), name, phone, service, date, time, createdAt: new Date().toISOString() };
  bookings.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  res.status(201).json({ message: 'Booking confirmed!', booking });
});

app.get('/api/bookings', (_req, res) => res.json(readBookings()));

// Serve the built React app in production
const dist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
