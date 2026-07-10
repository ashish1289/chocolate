import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { PROCESS_STEPS } from '../../data/data';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&q=85';

const COUNTERS = [
  { value: 100, suffix: '+', label: 'Premium Recipes' },
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 25, suffix: '+', label: 'Chocolate Varieties' },
  { value: 4, suffix: ' Yrs', label: 'Of Excellence' },
];

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
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

export default function About() {
  return (
    <section id="about" className="section-padding overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-luxury">
        {/* Main split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: '0 30px 80px rgba(59,31,22,0.25)' }}>
              <img
                src={ABOUT_IMAGE}
                alt="Chocolafy artisan chocolate making"
                className="w-full object-cover"
                style={{ height: '500px' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(44,24,16,0.3) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -right-6 rounded-2xl animate-float"
              style={{
                padding: '24px',
                background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                boxShadow: '0 15px 40px rgba(201,162,39,0.5)',
              }}
            >
              <p className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#1a0f09' }}>
                4★★★★
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: 'rgba(26,15,9,0.7)' }}>
                Years of Craftsmanship
              </p>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, type: 'spring' }}
              className="absolute -top-4 -left-4 w-20 h-20 rounded-full flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #2C1810, #5A3825)',
                border: '2px solid rgba(201,162,39,0.4)',
                boxShadow: '0 10px 30px rgba(44,24,16,0.5)',
              }}
            >
              <span className="text-2xl">🍫</span>
              <span className="text-[9px] font-bold text-center leading-tight" style={{ color: '#C9A227' }}>
                ARTISAN
              </span>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="section-subtitle mb-4">Our Story</p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
            >
              Crafted with Passion,
              <span
                className="italic block"
                style={{
                  background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Born from Nature
              </span>
            </h2>

            <div className="space-y-4" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              <p className="text-base leading-relaxed">
                Chocolafy was founded on a simple belief — that luxury chocolate should celebrate
                nature's finest gifts. We started in a small artisan kitchen, experimenting with
                premium dry fruits and Belgian couverture chocolate.
              </p>
              <p className="text-base leading-relaxed">
                Today, every piece we craft carries that same dedication. From hand-selecting the
                finest Medjool dates and Iranian pistachios to slow-tempering our chocolate at
                precise temperatures, we refuse to compromise on quality.
              </p>
              <p className="text-base leading-relaxed">
                Our chocolates are more than confections — they're expressions of love, crafted
                to make every celebration unforgettable.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {['No Preservatives', '100% Natural', 'Handcrafted', 'Premium Packaging'].map(tag => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: 'rgba(201,162,39,0.1)',
                    color: '#C9A227',
                    border: '1px solid rgba(201,162,39,0.25)',
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {COUNTERS.map(counter => (
            <div
              key={counter.label}
              className="glass-card text-center"
              style={{ padding: '24px' }}
            >
              <AnimatedCounter target={counter.value} suffix={counter.suffix} />
              <p
                className="text-sm mt-2"
                style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
              >
                {counter.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Our Process Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-3">How We Make It</p>
          <h3
            className="text-3xl font-bold"
            style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
          >
            Our Crafting Process
          </h3>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)', zIndex: 0 }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                    boxShadow: '0 8px 24px rgba(201,162,39,0.4)',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="text-xs font-bold tracking-widest block mb-1"
                  style={{ color: '#C9A227' }}
                >
                  STEP {step.step}
                </span>
                <h4
                  className="text-sm font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
                >
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
