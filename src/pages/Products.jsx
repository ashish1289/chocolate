import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import ProductCard from '../components/Products/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/data';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=1600&q=85';

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

export default function Products({ onOrderClick }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = PRODUCTS.filter(p => {
    const matchCat  = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <PageWrapper>
      <PageHero
        title="Our Chocolate Collection"
        subtitle="Handcrafted masterpieces — each made with love, premium dry fruits, and the finest natural ingredients."
        tag="Premium Selection"
        breadcrumb="Products"
        image={HERO_IMAGE}
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">

          {/* Filters + Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12"
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
                        ? '0 4px 16px rgba(201,162,39,0.35)'
                        : 'none',
                  }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search chocolates…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2.5 rounded-full text-sm outline-none w-60 transition-all duration-300"
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

          {/* Result count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm mb-8"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Showing <span style={{ color: '#C9A227', fontWeight: 600 }}>{filtered.length}</span> chocolates
            {search && <> for "<span style={{ color: '#C9A227' }}>{search}</span>"</>}
          </motion.p>

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
                className="text-center py-24"
              >
                <div className="text-7xl mb-5">🔍</div>
                <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                  No chocolates found
                </h3>
                <p className="mb-6" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                  Try a different keyword or category
                </p>
                <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="btn-gold">
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Order CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 md:p-10 rounded-3xl text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(201,162,39,0.07), rgba(201,162,39,0.03))',
              border: '1px solid rgba(201,162,39,0.18)',
            }}
          >
            <div className="text-3xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Looking for something special?
            </h3>
            <p className="text-base mb-6 max-w-md mx-auto" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              We create fully custom chocolate collections — personalized flavors, custom packaging,
              and branded corporate gifts for any occasion.
            </p>
            <button onClick={() => onOrderClick(null)} className="btn-gold">
              Request Custom Order
            </button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
