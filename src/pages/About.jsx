import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import { PROCESS_STEPS } from '../data/data';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=1600&q=85';
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=900&q=85';
const TEAM_IMAGE  = 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=900&q=85';

const COUNTERS = [
  { value: 100,  suffix: '+',    label: 'Premium Recipes'   },
  { value: 5000, suffix: '+',    label: 'Happy Customers'   },
  { value: 25,   suffix: '+',    label: 'Chocolate Varieties'},
  { value: 4,    suffix: ' Yrs', label: 'Of Excellence'     },
];

const VALUES = [
  { icon: '🌿', title: 'Natural First',   desc: 'Every ingredient is 100% natural — no artificial flavors, colors, or preservatives.' },
  { icon: '🤲', title: 'Handcrafted',     desc: 'Each piece is lovingly made by hand by expert chocolatiers with decades of experience.' },
  { icon: '🏆', title: 'Uncompromising',  desc: 'We refuse to cut corners. Premium ingredients, precise technique, every single time.' },
  { icon: '❤️', title: 'Made with Love',  desc: 'Chocolafy was born from passion. That passion flows into every chocolate we create.' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="counter-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };
const fadeRight = { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } };

export default function About() {
  return (
    <PageWrapper>
      <PageHero
        title="Our Story"
        subtitle="How a passion for handcrafted perfection became India's most loved luxury chocolate brand."
        tag="About Chocolafy"
        breadcrumb="About"
        image={HERO_IMAGE}
      />

      {/* ── Brand Story ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(59,31,22,0.2)' }}>
                <img src={ABOUT_IMAGE} alt="Chocolafy artisan" className="w-full object-cover" style={{ height: '520px' }} />
                <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(44,24,16,0.25) 0%, transparent 60%)' }} />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="absolute -bottom-6 -right-6 p-5 rounded-2xl animate-float"
                style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', boxShadow: '0 15px 40px rgba(201,162,39,0.45)' }}
              >
                <p className="text-3xl font-black" style={{ fontFamily: 'Playfair Display, serif', color: '#1a0f09' }}>4★</p>
                <p className="text-xs font-semibold" style={{ color: 'rgba(26,15,9,0.65)' }}>Years of Excellence</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ delay: 0.7, type: 'spring' }}
                className="absolute -top-5 -left-5 w-20 h-20 rounded-full flex flex-col items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2C1810, #5A3825)', border: '2px solid rgba(201,162,39,0.35)', boxShadow: '0 10px 30px rgba(44,24,16,0.4)' }}
              >
                <span className="text-2xl">🍫</span>
                <span className="text-[9px] font-bold text-center leading-tight" style={{ color: '#C9A227' }}>ARTISAN</span>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="section-subtitle mb-4">Our Beginning</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-7 leading-tight" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                Crafted with Passion,{' '}
                <span className="italic block" style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Born from Nature
                </span>
              </h2>
              <div className="space-y-4 mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                <p className="text-base leading-relaxed">
                  Chocolafy was founded on a beautifully simple belief — that luxury chocolate
                  should celebrate nature's finest gifts. We started in a small artisan kitchen in
                  Mumbai, experimenting with premium dry fruits and single-origin Belgian couverture.
                </p>
                <p className="text-base leading-relaxed">
                  Four years and 5,000+ happy customers later, every piece we craft still carries
                  that same dedication. From hand-selecting the finest Medjool dates and Iranian
                  pistachios to slow-tempering our chocolate at exact temperatures — we never compromise.
                </p>
                <p className="text-base leading-relaxed">
                  Our chocolates are more than confections. They are expressions of love, crafted
                  to make every celebration — no matter how large or intimate — truly unforgettable.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {['No Preservatives', '100% Natural', 'Handcrafted', 'Premium Packaging', 'Pan-India Delivery'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{ background: 'rgba(201,162,39,0.1)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.22)' }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
              <Link to="/products" className="btn-gold">
                <ArrowRight size={18} /> Shop Our Collection
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Animated Counters ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #2C1810 0%, #3B1F16 50%, #5A3825 100%)' }}>
        <div className="container-luxury">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {COUNTERS.map((c, i) => (
              <motion.div
                key={c.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center p-6 rounded-2xl"
                style={{ background: 'rgba(201,162,39,0.06)', border: '1px solid rgba(201,162,39,0.18)' }}
              >
                <AnimatedCounter target={c.value} suffix={c.suffix} />
                <p className="text-sm mt-2" style={{ color: 'rgba(255,248,240,0.55)', fontFamily: 'Poppins, sans-serif' }}>{c.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-luxury">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="section-subtitle mb-4">What We Stand For</p>
            <h2 className="section-title mb-4">Our Core Values</h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card p-7 text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Timeline ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="section-subtitle mb-4">How We Make It</p>
            <h2 className="section-title mb-4">The Crafting Process</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              From premium cocoa selection to luxury packaging — every step is executed with obsessive attention to detail.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
            </div>
          </motion.div>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A227 20%, #C9A227 80%, transparent)', zIndex: 0 }} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-2xl"
                    style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', boxShadow: '0 8px 28px rgba(201,162,39,0.4)' }}
                  >
                    {step.icon}
                  </motion.div>
                  <span className="text-xs font-bold tracking-widest block mb-1" style={{ color: '#C9A227' }}>STEP {step.step}</span>
                  <h4 className="text-sm font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>{step.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Second image + CTA ── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="section-subtitle mb-4">Our Promise</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                Every Piece, a{' '}
                <span style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Masterpiece
                </span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                We back every purchase with a 100% satisfaction guarantee. If you're not absolutely
                delighted with your Chocolafy experience, we'll make it right — no questions asked.
                That's our promise to you.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '✦', text: 'Freshly made and dispatched within 24 hours' },
                  { icon: '✦', text: 'Temperature-controlled packaging for every order' },
                  { icon: '✦', text: '100% satisfaction guarantee on all purchases' },
                  { icon: '✦', text: 'Pan-India delivery in 2–4 business days' },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-sm font-bold mt-0.5" style={{ color: '#C9A227' }}>{item.icon}</span>
                    <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/products" className="btn-gold"><ArrowRight size={18} /> Shop Now</Link>
                <Link to="/contact" className="btn-outline" style={{ color: 'var(--text-primary)' }}>Contact Us</Link>
              </div>
            </motion.div>

            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(59,31,22,0.2)' }}>
                <img src={TEAM_IMAGE} alt="Chocolafy hazelnut chocolates" className="w-full object-cover" style={{ height: '480px' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
