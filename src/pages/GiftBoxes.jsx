import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import { GIFT_BOXES } from '../data/data';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&q=85';

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.11 } } };
const cardVariants = { hidden: { opacity: 0, y: 36, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } } };

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const OCCASIONS = [
  { emoji: '💍', label: 'Weddings' },
  { emoji: '🕌', label: 'Eid' },
  { emoji: '🪔', label: 'Diwali' },
  { emoji: '🎄', label: 'Christmas' },
  { emoji: '🎂', label: 'Birthdays' },
  { emoji: '💼', label: 'Corporate' },
  { emoji: '💝', label: 'Anniversaries' },
  { emoji: '🎓', label: 'Graduations' },
];

export default function GiftBoxes({ onOrderClick }) {
  return (
    <PageWrapper>
      <PageHero
        title="Luxury Gift Collections"
        subtitle="Make every celebration extraordinary with our curated, handcrafted gift boxes — each one a statement of elegance."
        tag="Premium Gifting"
        breadcrumb="Gift Boxes"
        image={HERO_IMAGE}
      />

      {/* ── Occasions strip ── */}
      <div
        className="py-6 border-b"
        style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <div className="container-luxury">
          <div className="flex flex-wrap gap-3 justify-center">
            {OCCASIONS.map(o => (
              <span
                key={o.label}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-secondary)',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {o.emoji} {o.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Gift Box Cards ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="section-subtitle mb-4">Our Collections</p>
            <h2 className="section-title mb-4">Choose Your Perfect Gift</h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              Each collection is thoughtfully curated and packaged in our signature luxury boxes,
              ready to delight whoever receives them.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
              <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
          >
            {GIFT_BOXES.map(box => (
              <motion.div
                key={box.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 16 }}
                className="glass-card group overflow-hidden"
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ paddingBottom: '62%' }}>
                  <img
                    src={box.image} alt={box.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.88) 0%, rgba(44,24,16,0.2) 50%, transparent 100%)' }} />

                  {/* Tag badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', color: '#1a0f09' }}>
                    {box.tag}
                  </div>

                  {/* Pieces */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full"
                    style={{ background: 'rgba(15,9,6,0.72)', backdropFilter: 'blur(10px)', border: '1px solid rgba(201,162,39,0.3)' }}>
                    <Tag size={12} color="#C9A227" />
                    <span className="text-xs font-medium" style={{ color: '#E8C547' }}>{box.pieces}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                    {box.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                    {box.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Starting from</p>
                      <p className="text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {box.price}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => onOrderClick({ id: box.id + 100, name: box.title, price: box.price, description: box.description })}
                      className="btn-gold text-sm py-2.5 px-5"
                    >
                      <ShoppingBag size={15} /> Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Corporate / Bulk ── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #2C1810 0%, #3B1F16 50%, #5A3825 100%)' }}
      >
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(201,162,39,0.08) 0%, transparent 60%)' }} />
        <div className="container-luxury relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="badge-new mb-4 inline-block">Corporate Gifting</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Impress Your Clients &amp;{' '}
                <span style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Partners
                </span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,248,240,0.68)', fontFamily: 'Poppins, sans-serif' }}>
                From 20 to 5,000+ boxes — we handle corporate gifting at scale with custom branding,
                personalized messages, and premium packaging. We've served TCS, Wipro, and hundreds
                of growing startups.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '20+', label: 'Min. Order' },
                  { value: '15%', label: 'Bulk Discount' },
                  { value: '48h', label: 'Turnaround' },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl p-4 text-center"
                    style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)' }}>
                    <p className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', background: 'linear-gradient(135deg, #C9A227, #E8C547)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,248,240,0.5)', fontFamily: 'Poppins, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-gold">
                <ArrowRight size={18} /> Get a Custom Quote
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="hidden lg:block rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
            >
              <img
                src="https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=85"
                alt="Corporate chocolate gifting"
                className="w-full object-cover"
                style={{ height: '420px' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Packaging Promise ── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-luxury text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <p className="section-subtitle mb-4">Our Packaging</p>
            <h2 className="section-title mb-6">Luxury Inside &amp; Out</h2>
            <p className="text-base max-w-xl mx-auto mb-10" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              Every Chocolafy gift box is as beautiful on the outside as the chocolates inside —
              silk-lined interiors, magnetic closures, and gold-embossed finishes.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '✨', title: 'Gold Embossed', desc: 'Premium foil detailing on every lid' },
              { icon: '🎀', title: 'Silk Ribbon', desc: 'Hand-tied luxury ribbon finish' },
              { icon: '♻️', title: 'Eco-Friendly', desc: 'Sustainable materials, beautiful impact' },
              { icon: '📝', title: 'Custom Message', desc: 'Personalised card with every gift' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-6 text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold mb-1.5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>{item.title}</h4>
                <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
