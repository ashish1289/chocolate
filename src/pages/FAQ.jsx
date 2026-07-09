import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import { FAQ_DATA } from '../data/data';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=1600&q=85';

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const FAQ_CATEGORIES = [
  { id: 'all',      label: 'All Questions' },
  { id: 'product',  label: 'Products & Ingredients' },
  { id: 'order',    label: 'Orders & Delivery' },
  { id: 'gifting',  label: 'Gifting' },
];

/* Map FAQ items to categories */
const categorized = FAQ_DATA.map((item, i) => ({
  ...item,
  category: i < 3 ? 'product' : i < 7 ? 'order' : 'gifting',
}));

function AccordionItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: open ? '0 12px 40px rgba(59,31,22,0.08)' : '0 4px 12px rgba(0,0,0,0.02)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold pr-4 leading-snug"
          style={{ fontFamily: 'Poppins, sans-serif', color: open ? '#C9A227' : 'var(--text-primary)', transition: 'color 0.2s' }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: open ? 'linear-gradient(135deg, #C9A227, #E8C547)' : 'rgba(201,162,39,0.1)',
            border: '1px solid rgba(201,162,39,0.3)',
          }}
        >
          <Plus size={16} color={open ? '#1a0f09' : '#C9A227'} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-sm leading-relaxed pt-4"
              style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', borderTop: '1px solid var(--border-color)' }}>
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? categorized : categorized.filter(i => i.category === activeCategory);

  return (
    <PageWrapper>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about ChocoCraft — from ingredients to delivery to custom gifting."
        tag="Got Questions?"
        breadcrumb="FAQ"
        image={HERO_IMAGE}
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {FAQ_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background: activeCategory === cat.id ? 'linear-gradient(135deg, #C9A227, #E8C547)' : 'var(--glass-bg)',
                  color: activeCategory === cat.id ? '#1a0f09' : 'var(--text-secondary)',
                  border: activeCategory === cat.id ? '1px solid transparent' : '1px solid var(--border-color)',
                  backdropFilter: 'blur(10px)',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow: activeCategory === cat.id ? '0 4px 16px rgba(201,162,39,0.35)' : 'none',
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Accordion */}
          <div className="max-w-3xl mx-auto space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                {filtered.map((item, i) => (
                  <AccordionItem key={item.question} item={item} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-16 p-8 rounded-3xl text-center"
            style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.07), rgba(201,162,39,0.03))', border: '1px solid rgba(201,162,39,0.15)' }}
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Still have questions?
            </h3>
            <p className="text-base mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              Our team is happy to help. Reach out and we'll get back to you within 2 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-gold">Contact Us</Link>
              <a
                href="https://wa.me/919876543210?text=Hi+ChocoCraft!+I+have+a+question."
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
                style={{ color: 'var(--text-primary)' }}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
