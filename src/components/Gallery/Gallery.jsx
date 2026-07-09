import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '../../data/data';

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Visual Journey</p>
          <h2 className="section-title mb-6">Gallery</h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Indulge your eyes before your taste buds — a visual feast of our
            luxury chocolate creations.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="masonry-grid"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="masonry-item relative group cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => setSelected(img)}
              style={{ boxShadow: '0 4px 20px rgba(59,31,22,0.15)' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  height: img.height === 'tall' ? '280px' : img.height === 'medium' ? '200px' : '150px',
                }}
                loading="lazy"
              />

              {/* Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'rgba(44,24,16,0.7)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(201,162,39,0.9)',
                    boxShadow: '0 4px 15px rgba(201,162,39,0.5)',
                  }}
                >
                  <ZoomIn size={22} color="#1a0f09" />
                </div>
              </div>

              {/* Caption */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.9), transparent)' }}
              >
                <p className="text-xs font-medium text-white capitalize">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(15,9,6,0.95)', backdropFilter: 'blur(20px)' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={e => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
            >
              <img
                src={selected.src.replace('w=600', 'w=1200')}
                alt={selected.alt}
                className="w-full object-cover"
                style={{ maxHeight: '80vh' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.9), transparent)' }}
              >
                <p
                  className="text-white text-lg font-medium capitalize"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {selected.alt}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
