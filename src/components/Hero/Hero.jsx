import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingBag, ChevronDown, Sparkles } from 'lucide-react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1920&q=90';

const FLOATING_CARDS = [
  {
    emoji: '🍫',
    title: 'Almond Delight',
    subtitle: 'Handcrafted',
    price: '₹499',
    x: 'left-6 md:left-16',
    y: 'top-1/3',
    delay: 0.3,
    floatClass: 'animate-float',
  },
  {
    emoji: '🎁',
    title: 'Gift Box',
    subtitle: 'Premium',
    price: '₹1,499',
    x: 'right-6 md:right-16',
    y: 'top-1/4',
    delay: 0.6,
    floatClass: 'animate-float-delay',
  },
  {
    emoji: '⭐',
    title: '5-Star Rated',
    subtitle: '5,000+ orders',
    price: null,
    x: 'right-4 md:right-24',
    y: 'bottom-1/3',
    delay: 0.9,
    floatClass: 'animate-float-reverse',
  },
];

export default function Hero({ onOrderClick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax BG */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src={HERO_IMAGE}
          alt="Luxury handcrafted chocolates"
          className="w-full h-full object-cover scale-110"
        />
        {/* Multi-layer overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(15,9,6,0.90) 0%, rgba(44,24,16,0.80) 40%, rgba(59,31,22,0.75) 70%, rgba(15,9,6,0.85) 100%)',
          }}
        />
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      {/* Floating orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200 + i * 80,
            height: 200 + i * 80,
            background: `radial-gradient(circle, rgba(201,162,39,${0.04 + i * 0.02}) 0%, transparent 70%)`,
            left: `${[10, 60, 20, 75][i]}%`,
            top: `${[20, 60, 70, 15][i]}%`,
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
        />
      ))}

      {/* Floating Product Cards */}
      {FLOATING_CARDS.map((card) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: card.delay + 1, duration: 0.6, type: 'spring' }}
          className={`absolute ${card.x} ${card.y} hidden md:block z-20`}
        >
          <div className={card.floatClass}>
            <div
              className="rounded-2xl flex items-center gap-3"
              style={{
                padding: '12px 16px',
                background: 'rgba(15,9,6,0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(201,162,39,0.3)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(201,162,39,0.2)' }}
              >
                {card.emoji}
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none">{card.title}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(201,162,39,0.8)' }}>
                  {card.subtitle}
                </p>
                {card.price && (
                  <p className="text-sm font-bold mt-0.5" style={{ color: '#C9A227' }}>
                    {card.price}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center container-luxury"
        style={{ opacity }}
      >
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
          style={{
            background: 'rgba(201,162,39,0.15)',
            border: '1px solid rgba(201,162,39,0.4)',
          }}
        >
          <Sparkles size={14} color="#C9A227" />
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
          >
            100% Natural · Handcrafted · Premium
          </span>
          <Sparkles size={14} color="#C9A227" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          <span className="block text-white">Experience the</span>
          <span
            className="block italic"
            style={{
              background: 'linear-gradient(135deg, #C9A227 0%, #E8C547 40%, #D97706 80%, #C9A227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite',
            }}
          >
            Taste of Pure Luxury
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'rgba(255,248,240,0.75)', fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
        >
          Handcrafted dry fruit chocolates made with premium almonds, dates, pistachios,
          cashews, hazelnuts and natural ingredients. Every piece is a work of art.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderClick}
            className="btn-gold text-base py-4 px-10"
          >
            <ShoppingBag size={20} />
            Buy Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline text-base py-3.5 px-9 text-white border-white/30 hover:border-white/60"
          >
            Explore Collection
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-16 inline-flex flex-wrap gap-8 justify-center"
        >
          {[
            { value: '5,000+', label: 'Happy Customers' },
            { value: '25+', label: 'Chocolate Varieties' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '100%', label: 'Natural Ingredients' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,248,240,0.6)', fontFamily: 'Poppins, sans-serif' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(201,162,39,0.6)', fontFamily: 'Poppins, sans-serif' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={20} color="rgba(201,162,39,0.6)" />
        </motion.div>
      </motion.div>
    </section>
  );
}
