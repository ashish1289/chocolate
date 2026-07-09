import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';
import { GALLERY_IMAGES } from '../data/data';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=1600&q=85';

const ALL_GALLERY = [
  ...GALLERY_IMAGES,
  { id: 13, src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80', alt: 'Cashew chocolate collection', height: 'medium' },
  { id: 14, src: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=600&q=80', alt: 'Pistachio chocolate bars', height: 'tall' },
  { id: 15, src: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80', alt: 'Artisan dark chocolate', height: 'short' },
  { id: 16, src: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600&q=80', alt: 'Almond luxury collection', height: 'medium' },
];

export default function Gallery() {
  const [selected, setSelected]   = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (img, i) => { setSelected(img); setLightboxIdx(i); };

  const goPrev = () => {
    const i = (lightboxIdx - 1 + ALL_GALLERY.length) % ALL_GALLERY.length;
    setSelected(ALL_GALLERY[i]);
    setLightboxIdx(i);
  };

  const goNext = () => {
    const i = (lightboxIdx + 1) % ALL_GALLERY.length;
    setSelected(ALL_GALLERY[i]);
    setLightboxIdx(i);
  };

  return (
    <PageWrapper>
      <PageHero
        title="Gallery"
        subtitle="A visual feast of our luxury chocolate creations — indulge your eyes before your taste buds."
        tag="Visual Journey"
        breadcrumb="Gallery"
        image={HERO_IMAGE}
      />

      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
              Click any image to view full size
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="masonry-grid"
          >
            {ALL_GALLERY.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="masonry-item relative group cursor-pointer rounded-2xl overflow-hidden"
                onClick={() => openLightbox(img, i)}
                style={{ boxShadow: '0 4px 24px rgba(59,31,22,0.12)' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-600 group-hover:scale-110"
                  style={{ height: img.height === 'tall' ? '290px' : img.height === 'medium' ? '210px' : '155px' }}
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(44,24,16,0.72)' }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(201,162,39,0.9)', boxShadow: '0 4px 16px rgba(201,162,39,0.5)' }}>
                    <ZoomIn size={22} color="#1a0f09" />
                  </div>
                </div>
                {/* Caption */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.95), transparent)' }}
                >
                  <p className="text-xs font-medium text-white capitalize">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(15,9,6,0.96)', backdropFilter: 'blur(20px)' }}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-bold z-10"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center z-10"
              style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#C9A227' }}
            >
              <ChevronLeft size={22} />
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={e => e.stopPropagation()}
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden"
                style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}
              >
                <img
                  src={selected.src.replace('w=600', 'w=1200')}
                  alt={selected.alt}
                  className="w-full object-cover"
                  style={{ maxHeight: '80vh' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.95), transparent)' }}
                >
                  <p className="text-white text-lg font-medium capitalize" style={{ fontFamily: 'Playfair Display, serif' }}>{selected.alt}</p>
                  <p className="text-xs mt-1" style={{ color: 'rgba(201,162,39,0.7)', fontFamily: 'Poppins, sans-serif' }}>
                    {lightboxIdx + 1} / {ALL_GALLERY.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              onClick={goNext}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center z-10"
              style={{ background: 'rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.4)', color: '#C9A227' }}
            >
              <ChevronRight size={22} />
            </motion.button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
              {ALL_GALLERY.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setSelected(ALL_GALLERY[i]); setLightboxIdx(i); }}
                  className="rounded-full transition-all duration-200"
                  style={{ width: i === lightboxIdx ? '20px' : '6px', height: '6px', background: i === lightboxIdx ? '#C9A227' : 'rgba(201,162,39,0.35)' }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
