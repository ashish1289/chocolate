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

const FLOATING_CHOCOLATES = [
  { emoji: '🍫', size: 'text-6xl', top: '25%', left: '10%', delay: 0, duration: 6, rotate: 15 },
  { emoji: '🌰', size: 'text-5xl', top: '65%', left: '15%', delay: 2, duration: 7, rotate: -20 },
  { emoji: '🍫', size: 'text-7xl', top: '30%', left: '80%', delay: 1, duration: 8, rotate: 25 },
  { emoji: '🥜', size: 'text-4xl', top: '75%', left: '75%', delay: 3, duration: 5, rotate: -15 },
  { emoji: '🍫', size: 'text-5xl', top: '15%', left: '50%', delay: 1.5, duration: 6.5, rotate: 45 },
];

const SVG_PATTERN = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='600' viewBox='0 0 1200 600'%3E%3Cstyle%3E .l %7B fill: none; stroke: rgba(201,162,39,0.15); stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; %7D .t %7B fill: rgba(201,162,39,0.15); font-family: sans-serif; font-weight: 900; font-size: 48px; letter-spacing: 6px; %7D %3C/style%3E %3C!-- Cocoa Bean 1 --%3E %3Cg transform='translate(100, 150) rotate(-20)'%3E %3Cpath d='M0,50 C50,0 120,0 150,50 C120,100 50,100 0,50 Z' class='l' /%3E %3Cpath d='M30,50 C60,30 90,30 120,50' class='l' /%3E %3Cpath d='M30,50 C60,70 90,70 120,50' class='l' /%3E %3C/g%3E %3C!-- Chocolate Bar --%3E %3Cg transform='translate(400, 80) rotate(15)'%3E %3Crect x='0' y='0' width='160' height='240' rx='15' class='l' /%3E %3Crect x='20' y='20' width='50' height='50' rx='8' class='l' /%3E %3Crect x='90' y='20' width='50' height='50' rx='8' class='l' /%3E %3Crect x='20' y='90' width='50' height='50' rx='8' class='l' /%3E %3Crect x='90' y='90' width='50' height='50' rx='8' class='l' /%3E %3Crect x='20' y='160' width='50' height='50' rx='8' class='l' /%3E %3Crect x='90' y='160' width='50' height='50' rx='8' class='l' /%3E %3C/g%3E %3C!-- Banner --%3E %3Cg transform='translate(750, 180) rotate(-10)'%3E %3Cpath d='M0,30 L250,30 L220,70 L250,110 L0,110 Z' class='l' /%3E %3Cpath d='M0,30 C-30,50 -30,90 0,110' class='l' /%3E %3Ctext x='40' y='85' class='t'%3EESTD%3C/text%3E %3C/g%3E %3C!-- Pitcher Pouring --%3E %3Cg transform='translate(200, 380) rotate(-5)'%3E %3Cpath d='M50,0 L120,0 L150,150 L20,150 Z' class='l' /%3E %3Cpath d='M20,40 C-30,40 -30,110 30,110' class='l' /%3E %3Cpath d='M120,0 C170,-20 200,60 200,150' class='l' /%3E %3Cpath d='M200,150 C200,180 250,180 250,150' class='l' /%3E %3C/g%3E %3C!-- Gift Box --%3E %3Cg transform='translate(600, 400) rotate(20)'%3E %3Crect x='0' y='30' width='140' height='100' class='l' /%3E %3Crect x='-10' y='0' width='160' height='30' class='l' /%3E %3Cpath d='M70,30 L70,130' class='l' /%3E %3Cpath d='M70,0 C40,-30 10,0 70,0' class='l' /%3E %3Cpath d='M70,0 C100,-30 130,0 70,0' class='l' /%3E %3C/g%3E %3C!-- Cocoa Bean 2 --%3E %3Cg transform='translate(950, 420) rotate(45)'%3E %3Cpath d='M0,50 C50,0 120,0 150,50 C120,100 50,100 0,50 Z' class='l' /%3E %3Cpath d='M30,50 C60,30 90,30 120,50' class='l' /%3E %3Cpath d='M30,50 C60,70 90,70 120,50' class='l' /%3E %3C/g%3E %3C!-- Sparkles / Stars --%3E %3Cpath d='M50,300 L60,330 L90,340 L60,350 L50,380 L40,350 L10,340 L40,330 Z' class='l' /%3E %3Cpath d='M850,50 L855,65 L870,70 L855,75 L850,90 L845,75 L830,70 L845,65 Z' class='l' /%3E %3C/svg%3E`;

/* Gradient CTA section between content blocks (Scrolling Background) */
function CtaBandScroll({ text, linkTo, linkLabel }) {
  return (
    <div
      className="relative overflow-hidden flex items-center justify-center"
      style={{ 
        background: 'linear-gradient(135deg, #1A0F09 0%, #2C1810 50%, #1A0F09 100%)',
        paddingTop: '100px',
        paddingBottom: '100px',
        borderTop: '1px solid rgba(201,162,39,0.2)',
        borderBottom: '1px solid rgba(201,162,39,0.2)'
      }}
    >
      {/* Hardware-accelerated flawless sliding background */}
      <motion.div
        animate={{ x: [0, -1200] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ width: 'calc(100vw + 1200px)' }}
      >
        <div 
          className="w-full h-full" 
          style={{ 
            background: `url("${SVG_PATTERN}") repeat-x`,
            backgroundSize: '1200px 600px',
          }} 
        />
      </motion.div>

      {/* Shadow overlay to blend edges */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 100px rgba(15,9,6,0.9)' }} />

      {/* Particle dust overlay for extra luxury feel */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'400\' height=\'400\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      <div className="container-luxury relative z-10 text-center flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-card px-8 py-8 md:px-14 md:py-10 inline-block"
          style={{ background: 'rgba(26,15,9,0.75)', border: '1px solid rgba(201,162,39,0.25)' }}
        >
          <Sparkles size={24} color="#C9A227" className="mx-auto mb-4 opacity-90" />
          <p
            className="text-2xl md:text-4xl font-bold leading-snug"
            style={{ 
              fontFamily: 'Playfair Display, serif', 
              maxWidth: 750,
              background: 'linear-gradient(135deg, #FFF8F0 0%, #C9A227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {text}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* Gradient CTA section with text on left and circular image on right */
function CtaBandImage({ text, linkTo, linkLabel }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #1A0F09 0%, #1A0F09 15%, #3B1F16 50%, #1A0F09 85%, #1A0F09 100%)',
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid rgba(201,162,39,0.15)'
      }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 70% 50%, rgba(201,162,39,0.08) 0%, transparent 40%)' }} />

      <div className="container-luxury relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Side */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
          className="flex-1 text-center md:text-left"
        >
          <Sparkles size={24} color="#C9A227" className="mx-auto md:mx-0 mb-6 opacity-80" />
          <p
            className="text-3xl md:text-5xl font-bold leading-tight"
            style={{ 
              fontFamily: 'Playfair Display, serif', 
              maxWidth: 600,
              background: 'linear-gradient(135deg, #FFF8F0 0%, #C9A227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {text}
          </p>
        </motion.div>

        {/* Animated Image Side */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8, rotate: 10 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease: 'easeOut' } }
          }}
          className="relative w-full md:w-5/12 lg:w-1/3 flex justify-center"
        >
          <motion.div
            animate={{ y: [-15, 15, -15], rotate: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-full overflow-hidden"
            style={{ 
              width: '280px',
              height: '280px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.6), inset 0 0 0 2px rgba(201,162,39,0.3)',
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=85" 
              alt="Luxury Chocolate" 
              className="w-full h-full object-cover scale-110"
            />
            {/* Soft inner shadow overlay */}
            <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 40px rgba(15,9,6,0.8)' }} />
          </motion.div>

          {/* Floating decorative ring */}
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-[#C9A227]/30 pointer-events-none"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home({ onOrderClick }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
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
              top: `${[20, 58, 68, 14][i]}%`,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          />
        ))}

        {/* Floating chocolates */}
        {FLOATING_CHOCOLATES.map((choc, i) => (
          <motion.div
            key={i}
            className={`absolute z-10 ${choc.size} pointer-events-none drop-shadow-2xl`}
            style={{ top: choc.top, left: choc.left, filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.6, 0.9, 0.6],
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [choc.rotate, choc.rotate + 15, choc.rotate],
              scale: [0, 1, 1] // Handle entry and stay
            }}
            transition={{
              opacity: { duration: choc.duration, repeat: Infinity, ease: 'easeInOut', delay: choc.delay },
              y: { duration: choc.duration, repeat: Infinity, ease: 'easeInOut', delay: choc.delay },
              x: { duration: choc.duration * 1.2, repeat: Infinity, ease: 'easeInOut', delay: choc.delay },
              rotate: { duration: choc.duration * 1.5, repeat: Infinity, ease: 'easeInOut', delay: choc.delay },
              scale: { duration: 1, delay: choc.delay, times: [0, 1, 1] }
            }}
          >
            {choc.emoji}
          </motion.div>
        ))}

        {/* Hero content */}
        <motion.div className="relative z-10 text-center container-luxury" style={{ opacity }}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7 mt-24 md:mt-28"
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
            className="text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
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
            className="mt-20 inline-flex flex-wrap gap-10 justify-center"
          >
            {[
              { value: '5,000+', label: 'Happy Customers' },
              { value: '25+', label: 'Chocolate Varieties' },
              { value: '4.9★', label: 'Average Rating' },
              { value: '100%', label: 'Natural Ingredients' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
            className="text-center mb-16 flex flex-col items-center"
          >
            <p className="text-sm font-bold tracking-[0.2em] uppercase mb-3" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              Bestsellers
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Our Finest Creations
            </h2>
            <p className="text-base max-w-2xl mx-auto text-center leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
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
            style={{ marginTop: '80px' }}
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
      <CtaBandScroll
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
                  alt="Chocolafy artisan chocolate"
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
                Chocolafy was founded on a simple belief — that luxury chocolate should celebrate
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
                    <p className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
      <div className="relative w-full overflow-hidden pointer-events-none z-10" style={{ lineHeight: 0, marginBottom: '-1px' }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[25px] md:h-[40px]">
          <path d="M0,60 C320,0 420,60 720,20 C1020,-10 1120,60 1440,10 L1440,60 L0,60 Z" fill="#1A0F09" />
          <path d="M0,60 C320,0 420,60 720,20 C1020,-10 1120,60 1440,10" fill="none" stroke="rgba(201,162,39,0.3)" strokeWidth="2" />
        </svg>
      </div>
      <CtaBandImage
        text="Have a custom order or question? We'd love to hear from you."
        linkTo="/contact"
        linkLabel="Contact Us"
      />
    </PageWrapper>
  );
}
