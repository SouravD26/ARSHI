import { motion } from 'framer-motion';

const dirs = { up: { y: 40 }, down: { y: -40 }, left: { x: -50 }, right: { x: 50 }, none: {} };

export default function Reveal({ children, as = 'div', dir = 'up', delay = 0, className, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...dirs[dir] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({ eyebrow, children, sub }) {
  return (
    <div className="section-title">
      {eyebrow && <Reveal as="span" className="eyebrow">{eyebrow}</Reveal>}
      <Reveal as="h2" delay={0.1}>{children}</Reveal>
      <Reveal className="divider" delay={0.2}><span /></Reveal>
      {sub && <Reveal as="p" className="section-sub" delay={0.25}>{sub}</Reveal>}
    </div>
  );
}
