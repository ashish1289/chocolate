import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/data';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(c => (c + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: { opacity: 0, x: direction * 60, scale: 0.95 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -direction * 60, scale: 0.95 },
  };

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(201,162,39,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,31,22,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-luxury relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm font-bold tracking-[0.2em] uppercase mb-4" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
            Real Stories
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
            What Our Customers Say
          </h2>
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

        {/* Main Carousel */}
        <div className="max-w-3xl mx-auto relative flex flex-col items-center w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="glass-card p-8 md:p-12 text-center relative w-full"
            >
              {/* Quote icon */}
              <div
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                  boxShadow: '0 4px 20px rgba(201,162,39,0.5)',
                }}
              >
                <Quote size={18} color="#1a0f09" fill="#1a0f09" />
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < t.rating ? '#C9A227' : 'none'}
                    color="#C9A227"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Review */}
              <p
                className="text-lg md:text-xl leading-relaxed mb-8 italic"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  color: 'var(--text-primary)',
                }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{ border: '3px solid #C9A227', boxShadow: '0 4px 15px rgba(201,162,39,0.3)' }}
                />
                <div>
                  <p
                    className="text-base font-bold"
                    style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(10px)',
                color: '#C9A227',
              }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '8px',
                    height: '8px',
                    background: i === current ? '#C9A227' : 'rgba(201,162,39,0.3)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-color)',
                backdropFilter: 'blur(10px)',
                color: '#C9A227',
              }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Thumbnail row */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {TESTIMONIALS.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="transition-all duration-300"
              style={{
                opacity: i === current ? 1 : 0.45,
              }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
                style={{
                  border: i === current ? '2px solid #C9A227' : '2px solid transparent',
                  boxShadow: i === current ? '0 4px 15px rgba(201,162,39,0.4)' : 'none',
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
