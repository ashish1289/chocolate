import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden"
      style={{
        background: isDark ? 'rgba(201,162,39,0.15)' : 'rgba(59,31,22,0.08)',
        border: '1px solid rgba(201,162,39,0.3)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Sun size={18} color="#C9A227" />
        ) : (
          <Moon size={18} color="#5A3825" />
        )}
      </motion.div>
    </motion.button>
  );
}
