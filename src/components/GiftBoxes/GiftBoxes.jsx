import { motion } from 'framer-motion';
import { ShoppingBag, Tag } from 'lucide-react';
import { GIFT_BOXES } from '../../data/data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function GiftBoxes({ onOrderClick }) {
  return (
    <section
      id="gift-boxes"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* BG decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Premium Gifting</p>
          <h2 className="section-title mb-6">Special Gift Collections</h2>
          <p
            className="text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Make every occasion extraordinary with our curated luxury gift boxes.
            Each collection is a statement of elegance and thoughtfulness.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {GIFT_BOXES.map((box, index) => (
            <motion.div
              key={box.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="glass-card group overflow-hidden relative"
              style={{
                gridColumn: index === 2 ? 'span 1' : 'span 1',
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '60%' }}>
                <img
                  src={box.image}
                  alt={box.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(44,24,16,0.85) 0%, rgba(44,24,16,0.2) 50%, transparent 100%)',
                  }}
                />

                {/* Tag badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                    color: '#1a0f09',
                  }}
                >
                  {box.tag}
                </div>

                {/* Pieces count */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(15,9,6,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(201,162,39,0.3)',
                  }}
                >
                  <Tag size={12} color="#C9A227" />
                  <span className="text-xs font-medium" style={{ color: '#E8C547' }}>
                    {box.pieces}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
                >
                  {box.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
                >
                  {box.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Starting from</p>
                    <p
                      className="text-xl font-bold"
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {box.price}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      onOrderClick({
                        id: box.id + 100,
                        name: box.title,
                        price: box.price,
                        description: box.description,
                      })
                    }
                    className="btn-gold text-sm py-2.5 px-5"
                  >
                    <ShoppingBag size={15} />
                    Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bulk note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.04))',
            border: '1px solid rgba(201,162,39,0.2)',
          }}
        >
          <p
            className="text-base font-medium"
            style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}
          >
            🎁 Need <span style={{ color: '#C9A227' }}>bulk corporate orders</span> or{' '}
            <span style={{ color: '#C9A227' }}>custom branding</span>?
          </p>
          <p className="text-sm mt-1 mb-4" style={{ color: 'var(--text-muted)' }}>
            We handle orders from 20 to 5,000+ boxes with custom packaging and logos.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
            style={{ color: 'var(--text-primary)' }}
          >
            Contact for Custom Orders
          </button>
        </motion.div>
      </div>
    </section>
  );
}
