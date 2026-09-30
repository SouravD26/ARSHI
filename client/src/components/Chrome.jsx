import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}>
          <motion.div className="preloader-logo" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            ARSHI<span className="logo-dot">.</span>
          </motion.div>
          <motion.div className="preloader-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function FloatingActions() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fab-wrap" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>
          {pathname !== '/booking' && <Link to="/booking" className="btn btn-primary btn-sm">Book Now</Link>}
          <button className="fab-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Cursor() {
  const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const [state, setState] = useState({ hover: false, down: false, hidden: true });
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add('has-cursor');
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const hover = !!e.target.closest('a, button, select, input, label, textarea, [role="button"]');
      setState((s) => (s.hover === hover && !s.hidden ? s : { ...s, hover, hidden: false }));
    };
    const down = () => setState((s) => ({ ...s, down: true }));
    const up = () => setState((s) => ({ ...s, down: false }));
    const leave = () => setState((s) => ({ ...s, hidden: true }));
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    document.addEventListener('mouseleave', leave);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      document.removeEventListener('mouseleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const ringScale = state.down ? 0.8 : state.hover ? 1.8 : 1;
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} animate={{ scale: ringScale, opacity: state.hidden ? 0 : 1 }} transition={{ duration: 0.25 }}>
        <span className={state.hover ? 'is-hover' : ''} />
      </motion.div>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: state.hover ? 0 : 1, opacity: state.hidden ? 0 : 1 }} transition={{ duration: 0.2 }} />
    </>
  );
}
