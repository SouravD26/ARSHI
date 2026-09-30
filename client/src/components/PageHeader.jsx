import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, img }) {
  return (
    <header className="page-header">
      <motion.div
        className="page-header-bg"
        style={{ backgroundImage: `url(${img})` }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="page-header-overlay" />
      <div className="page-header-content">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          {title}
        </motion.h1>
        <motion.nav className="crumbs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Link to="/">Home</Link> <span>/</span> {title}
        </motion.nav>
      </div>
    </header>
  );
}
