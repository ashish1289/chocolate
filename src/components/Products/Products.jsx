import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/data';
import ProductCard from './ProductCard';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function Products({ onOrderClick }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="products" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Our Collection</p>
          <h2 className="section-title mb-6">
            Featured Chocolate Collection
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
            Discover our handcrafted masterpieces — each chocolate is a journey through premium
            flavors, crafted with love and the finest natural ingredients.
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10"
        >
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={{
                  background:
                    activeCategory === cat.id
                      ? 'linear-gradient(135deg, #C9A227, #E8C547)'
                      : 'var(--glass-bg)',
                  color: activeCategory === cat.id ? '#1a0f09' : 'var(--text-secondary)',
                  border:
                    activeCategory === cat.id
                      ? '1px solid transparent'
                      : '1px solid var(--border-color)',
                  backdropFilter: 'blur(10px)',
                  fontFamily: 'Poppins, sans-serif',
                  boxShadow:
                    activeCategory === cat.id
                      ? '0 4px 15px rgba(201,162,39,0.4)'
                      : 'none',
                }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search chocolates..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-full text-sm outline-none w-56 transition-all duration-300"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'Poppins, sans-serif',
              }}
            />
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filtered.map(product => (
                <motion.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} onOrderClick={onOrderClick} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
              >
                No chocolates found
              </h3>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                Try a different search or category
              </p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('all'); }}
                className="btn-gold mt-4"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Can't find what you're looking for?
          </p>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline"
            style={{ color: 'var(--text-primary)' }}
          >
            Request Custom Order
          </a>
        </motion.div>
      </div>
    </section>
  );
}
