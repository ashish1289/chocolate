import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQ_DATA } from '../../data/data';

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={open}
      >
        <span
          className="text-base font-semibold pr-4 leading-snug"
          style={{
            fontFamily: 'Poppins, sans-serif',
            color: open ? '#C9A227' : 'var(--text-primary)',
            transition: 'color 0.2s',
          }}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: open
              ? 'linear-gradient(135deg, #C9A227, #E8C547)'
              : 'rgba(201,162,39,0.1)',
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
            className="accordion-content"
          >
            <div
              className="px-6 pb-6 text-sm leading-relaxed"
              style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif', borderTop: '1px solid var(--border-color)' }}
            >
              <div className="pt-4">{item.answer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Got Questions?</p>
          <h2 className="section-title mb-6">Frequently Asked Questions</h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Everything you need to know about ChocoCraft. Can't find your answer?
            Feel free to contact us directly.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
        </motion.div>

        {/* FAQ items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_DATA.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p
            className="text-base mb-4"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Still have questions?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}
