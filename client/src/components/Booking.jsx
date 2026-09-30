import { useState } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section id="booking" className="section">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        Book an <span className="glow">Appointment</span>
      </motion.h2>
      <motion.form className="booking" onSubmit={submit} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <input name="name" placeholder="Your Name" value={form.name} onChange={update} required />
        <input name="phone" placeholder="Phone Number" value={form.phone} onChange={update} required />
        <select name="service" value={form.service} onChange={update} required>
          <option value="">Select a Service</option>
          {services.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
        <div className="row">
          <input type="date" name="date" value={form.date} onChange={update} min={new Date().toISOString().split('T')[0]} required />
          <input type="time" name="time" value={form.time} onChange={update} required />
        </div>
        <motion.button className="btn btn-primary" whileTap={{ scale: 0.95 }} disabled={loading}>
          {loading ? 'Booking…' : 'Confirm Booking'}
        </motion.button>
        {status && <p className={status.ok ? 'ok' : 'err'}>{status.msg}</p>}
      </motion.form>
    </section>
  );
}
