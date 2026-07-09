import { motion } from 'framer-motion';
import { Leaf, Palette, Gem, HandMetal, Package, Gift, Heart, Zap } from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/data';

const ICON_MAP = {
  leaf: Leaf,
  palette: Palette,
  gem: Gem,
  hands: HandMetal,
  package: Package,
  gift: Gift,
  heart: Heart,
  zap: Zap,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
            Our Promise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            Why Choose ChocoCraft?
          </h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
            We believe luxury chocolate should be as good for you as it tastes.
            That's why every ChocoCraft creation is built on uncompromising principles.
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

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = ICON_MAP[item.icon] || Leaf;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card glow-border p-6 text-center group"
                style={{ transition: 'all 0.3s ease' }}
              >
                {/* Icon circle */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))',
                    border: '1px solid rgba(201,162,39,0.2)',
                  }}
                >
                  <Icon size={28} color="#C9A227" strokeWidth={1.5} />
                </motion.div>

                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
                >
                  {item.description}
                </p>

                {/* Bottom accent */}
                <div
                  className="w-8 h-0.5 rounded-full mx-auto mt-4 transition-all duration-300 group-hover:w-16"
                  style={{ background: 'linear-gradient(90deg, #C9A227, #E8C547)' }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
