import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #0F0906 0%, #2C1810 50%, #3B1F16 100%)' }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 200 + 50,
            height: Math.random() * 200 + 50,
            background: `radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🍫
            </motion.div>
            <div>
              <h1
                className="text-5xl font-bold"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #C9A227, #E8C547, #D97706)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ChocoCraft
              </h1>
            </div>
          </div>
          <motion.p
            className="text-sm tracking-widest uppercase mb-12"
            style={{ color: 'rgba(201,162,39,0.7)', fontFamily: 'Poppins, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Luxury Chocolates Crafted with Nature
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-72 mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div
            className="h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(201,162,39,0.2)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #C9A227, #E8C547, #D97706)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <p
            className="text-xs mt-3"
            style={{ color: 'rgba(201,162,39,0.5)', fontFamily: 'Poppins, sans-serif' }}
          >
            {progress}%
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
