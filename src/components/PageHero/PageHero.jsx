import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * PageHero — Reusable hero for inner pages
 * Props: title, subtitle, breadcrumb, image, tag
 */
export default function PageHero({ title, subtitle, tag, breadcrumb, image }) {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ minHeight: '42vh', paddingTop: '5rem' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background: image
              ? 'linear-gradient(135deg, rgba(15,9,6,0.88) 0%, rgba(44,24,16,0.78) 50%, rgba(59,31,22,0.72) 100%)'
              : 'linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
          }}
        />
        {/* Gold shimmer line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.5) 50%, transparent 100%)' }}
        />
        {/* Noise texture */}
        {image && (
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />
        )}
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-16 right-16 w-64 h-64 rounded-full pointer-events-none hidden md:block"
        style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Content */}
      <div className="container-luxury relative z-10 pb-14 pt-8">
        {/* Breadcrumb */}
        {breadcrumb && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 mb-5"
          >
            <Link
              to="/"
              className="text-xs font-medium tracking-wider transition-colors duration-200 hover:text-[#C9A227]"
              style={{ color: 'rgba(255,248,240,0.55)', fontFamily: 'Poppins, sans-serif' }}
            >
              Home
            </Link>
            <ChevronRight size={12} style={{ color: 'rgba(201,162,39,0.5)' }} />
            <span
              className="text-xs font-medium tracking-wider"
              style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
            >
              {breadcrumb}
            </span>
          </motion.nav>
        )}

        {/* Tag */}
        {tag && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{
              background: 'rgba(201,162,39,0.12)',
              border: '1px solid rgba(201,162,39,0.35)',
            }}
          >
            <span
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
            >
              {tag}
            </span>
          </motion.div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
          className="mb-4 leading-tight"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            fontWeight: 800,
            color: image ? '#FFF8F0' : 'var(--text-primary)',
          }}
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="text-base md:text-lg max-w-xl leading-relaxed"
            style={{
              color: image ? 'rgba(255,248,240,0.72)' : 'var(--text-muted)',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 300,
            }}
          >
            {subtitle}
          </motion.p>
        )}

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-7 h-0.5 w-20 rounded-full origin-left"
          style={{ background: 'linear-gradient(90deg, #C9A227, #E8C547, transparent)' }}
        />
      </div>
    </section>
  );
}
