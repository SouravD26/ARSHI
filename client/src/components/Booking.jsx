import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { SectionTitle } from './Reveal.jsx';

const empty = { name: '', phone: '', service: '', date: '', time: '' };

export default function Booking({ services }) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus({ ok: true, msg: `Thanks ${form.name}! Your booking is confirmed.` });
      setForm(empty);
    } catch (err) {
      setStatus({ ok: false, msg: err.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, props = {}) => (
    <label className="field">
      <input name={name} value={form[name]} onChange={update} placeholder=" " required {...props} />
      <span>{label}</span>
    </label>
  );

  return (
    <section id="booking" className="section">
      <SectionTitle eyebrow="Reserve your seat" sub="Pick a service and a time that suits you — we’ll take care of the rest.">
        Book an <em>Appointment</em>
      </SectionTitle>
      <Reveal as="form" className="booking" onSubmit={submit}>
        {field('name', 'Your Name', { autoComplete: 'name' })}
        {field('phone', 'Phone Number', { type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
        <label className="field">
          <select name="service" value={form.service} onChange={update} required>
            <option value="" disabled>Select a service</option>
            {services.map((s) => <option key={s.id} value={s.name}>{s.name} — from ₹{s.price}</option>)}
          </select>
          <span className="static">Service</span>
        </label>
        <div className="row">
          <label className="field">
            <input type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().split('T')[0]} required />
            <span className="static">Date</span>
          </label>
          <label className="field">
            <input type="time" name="time" value={form.time} onChange={update} required />
            <span className="static">Time</span>
          </label>
        </div>
        <motion.button className="btn btn-primary btn-block" whileTap={{ scale: 0.97 }} disabled={loading}>
          {loading ? <span className="spinner" aria-label="Booking" /> : 'Confirm Booking'}
        </motion.button>
        <AnimatePresence>
          {status && (
            <motion.p className={`status ${status.ok ? 'ok' : 'err'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {status.msg}
            </motion.p>
          )}
        </AnimatePresence>
      </Reveal>
    </section>
  );
}
