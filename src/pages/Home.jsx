import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronDown, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import WhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Testimonials from '../components/Testimonials/Testimonials';
import { PRODUCTS } from '../data/data';
import ProductCard from '../components/Products/ProductCard';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1920&q=90';

const FLOATING_CARDS = [
  { emoji: '🍫', title: 'Almond Delight',  subtitle: 'Handcrafted', price: '₹499', delay: 0.4, float: 'animate-float' },
  { emoji: '🎁', title: 'Gift Box',         subtitle: 'Premium',     price: '₹1,499', delay: 0.7, float: 'animate-float-delay' },
  { emoji: '⭐', title: '5-Star Rated',     subtitle: '5,000+ happy orders', price: null, delay: 1.0, float: 'animate-float-reverse' },
];

/* Gradient CTA section between content blocks */
function CtaBand({ text, linkTo, linkLabel }) {
  return (
    <div
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #2C1810 0%, #3B1F16 50%, #5A3825 100%)' }}
    >
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(201,162,39,0.08) 0%, transparent 60%)' }}
      />
      <div className="container-luxury relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <p
          className="text-xl md:text-2xl font-bold text-white"
          style={{ fontFamily: 'Playfair Display, serif', maxWidth: 480 }}
        >
          {text}
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link to={linkTo} className="btn-gold whitespace-nowrap">
            <ArrowRight size={18} /> {linkLabel}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function Home({ onOrderClick }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY    = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const featured = PRODUCTS.filter(p => p.badge === 'bestseller').slice(0, 4);

  return (
    <PageWrapper>
      {/* ════════════════ HERO ════════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax BG */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          <img
            src={HERO_IMAGE}
            alt="Luxury handcrafted chocolates"
            className="w-full h-full object-cover scale-110"
            fetchpriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(15,9,6,0.92) 0%, rgba(44,24,16,0.82) 40%, rgba(59,31,22,0.78) 70%, rgba(15,9,6,0.88) 100%)',
            }}
          />
          {/* Grain */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>

        {/* Orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 200 + i * 80, height: 200 + i * 80,
              background: `radial-gradient(circle, rgba(201,162,39,${0.04 + i * 0.02}) 0%, transparent 70%)`,
              left: `${[10, 62, 22, 76][i]}%`,
              top:  `${[20, 58, 68, 14][i]}%`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}

        {/* Floating cards */}
        {FLOATING_CARDS.map(card => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: card.delay + 1, type: 'spring', stiffness: 140 }}
            className={`absolute hidden md:block z-20 ${
              card.title === 'Almond Delight' ? 'left-12 top-1/3'
              : card.title === 'Gift Box' ? 'right-12 top-1/4'
              : 'right-20 bottom-1/3'
            }`}
          >
            <div className={card.float}>
              <div
                className="px-4 py-3 rounded-2xl flex items-center gap-3"
                style={{
                  background: 'rgba(15,9,6,0.72)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(201,162,39,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: 'rgba(201,162,39,0.18)' }}
                >
                  {card.emoji}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-none">{card.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(201,162,39,0.8)' }}>{card.subtitle}</p>
                  {card.price && (
                    <p className="text-sm font-bold mt-0.5" style={{ color: '#C9A227' }}>{card.price}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div className="relative z-10 text-center container-luxury" style={{ opacity }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7"
            style={{ background: 'rgba(201,162,39,0.13)', border: '1px solid rgba(201,162,39,0.38)' }}
          >
            <Sparkles size={13} color="#C9A227" />
            <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              100% Natural · Handcrafted · Premium
            </span>
            <Sparkles size={13} color="#C9A227" />
          </motion.div>

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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'rgba(255,248,240,0.72)', fontFamily: 'Poppins, sans-serif', fontWeight: 300 }}
          >
            Handcrafted dry fruit chocolates made with premium almonds, dates, pistachios,
            cashews, hazelnuts and natural ingredients. Every piece is a work of art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={onOrderClick}
              className="btn-gold text-base py-4 px-10"
            >
              <ShoppingBag size={20} /> Buy Now
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/products"
                className="btn-outline text-base py-3.5 px-9"
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
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
                <p className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,248,240,0.55)', fontFamily: 'Poppins, sans-serif' }}>
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
          transition={{ delay: 1.7 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(201,162,39,0.55)', fontFamily: 'Poppins, sans-serif' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown size={20} color="rgba(201,162,39,0.55)" />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════ FEATURED PRODUCTS ════════════════ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              Bestsellers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Our Finest Creations
            </h2>
            <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              Discover the chocolates that our customers keep coming back for — crafted with
              uncompromising quality and natural ingredients.
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#C9A227] opacity-60" />
              <div className="flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A227] opacity-60" />
                <div className="w-2.5 h-2.5 rotate-45 bg-gradient-to-br from-[#C9A227] to-[#E8C547] shadow-[0_0_10px_rgba(201,162,39,0.5)]" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A227] opacity-60" />
              </div>
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#C9A227] opacity-60" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={p} onOrderClick={onOrderClick} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/products" className="btn-outline" style={{ color: 'var(--text-primary)' }}>
              <ArrowRight size={18} /> View Full Collection
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ════════════════ WHY CHOOSE US ════════════════ */}
      <WhyChooseUs />

      {/* ════════════════ GIFT CTA BAND ════════════════ */}
      <CtaBand
        text="Make every occasion unforgettable with our luxury gift collections."
        linkTo="/gift-boxes"
        linkLabel="Explore Gift Boxes"
      />

      {/* ════════════════ ABOUT TEASER ════════════════ */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 30px 80px rgba(59,31,22,0.2)' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=85"
                  alt="ChocoCraft artisan chocolate"
                  className="w-full object-cover"
                  style={{ height: '440px' }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="absolute -bottom-6 -right-6 p-5 rounded-2xl animate-float"
                style={{
                  background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                  boxShadow: '0 15px 40px rgba(201,162,39,0.45)',
                }}
              >
                <p className="text-2xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#1a0f09' }}>4 Yrs</p>
                <p className="text-xs font-semibold" style={{ color: 'rgba(26,15,9,0.65)' }}>Of Excellence</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="section-subtitle mb-4">Our Story</p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
              >
                Crafted with Passion,
                <span
                  className="italic block"
                  style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  Born from Nature
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
              >
                ChocoCraft was founded on a simple belief — that luxury chocolate should celebrate
                nature's finest gifts. We started in a small artisan kitchen, experimenting with
                premium dry fruits and Belgian couverture chocolate. Today, every piece we craft
                carries that same dedication and love.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '100+', label: 'Recipes' },
                  { value: '5,000+', label: 'Customers' },
                  { value: '25+', label: 'Varieties' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="glass-card p-4 text-center"
                  >
                    <p className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {s.value}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-gold">
                <ArrowRight size={18} /> Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════ TESTIMONIALS ════════════════ */}
      <Testimonials />

      {/* ════════════════ CONTACT CTA BAND ════════════════ */}
      <CtaBand
        text="Have a custom order or question? We'd love to hear from you."
        linkTo="/contact"
        linkLabel="Contact Us"
      />
    </PageWrapper>
  );
}
