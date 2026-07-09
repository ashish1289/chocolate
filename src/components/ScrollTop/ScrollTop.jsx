import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-[60] w-12 h-12 rounded-full flex items-center justify-center shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #C9A227, #E8C547)',
            boxShadow: '0 4px 20px rgba(201,162,39,0.5)',
          }}
          aria-label="Back to top"
        >
          <ChevronUp size={22} color="#1a0f09" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
