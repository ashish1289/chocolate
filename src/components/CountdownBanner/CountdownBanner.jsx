import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';

const FESTIVAL_END = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days from now

function pad(n) {
  return String(n).padStart(2, '0');
}

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = Math.max(0, FESTIVAL_END - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.2, duration: 0.6 }}
      className="w-full py-2.5 px-4 flex flex-wrap items-center justify-center gap-3 text-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #2C1810 0%, #3B1F16 30%, #5A3825 60%, #3B1F16 80%, #2C1810 100%)',
        borderBottom: '1px solid rgba(201,162,39,0.3)',
      }}
    >
      {/* shimmer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(201,162,39,0.08) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s linear infinite',
        }}
      />

      <div className="flex items-center gap-2">
        <Timer size={14} color="#C9A227" />
        <span className="text-xs font-semibold tracking-wider" style={{ color: '#E8C547', fontFamily: 'Poppins, sans-serif' }}>
          🎉 DIWALI SPECIAL — 25% OFF
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {[
          { val: timeLeft.days, label: 'Days' },
          { val: timeLeft.hours, label: 'Hrs' },
          { val: timeLeft.minutes, label: 'Min' },
          { val: timeLeft.seconds, label: 'Sec' },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center gap-1">
            <div
              className="w-9 h-8 rounded-md flex flex-col items-center justify-center"
              style={{ background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)' }}
            >
              <span className="text-sm font-bold leading-none" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
                {pad(item.val)}
              </span>
              <span className="text-[8px] leading-none" style={{ color: 'rgba(201,162,39,0.6)' }}>
                {item.label}
              </span>
            </div>
            {i < 3 && <span className="text-xs font-bold" style={{ color: 'rgba(201,162,39,0.5)' }}>:</span>}
          </div>
        ))}
      </div>

      <button
        onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
        className="text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, #C9A227, #E8C547)',
          color: '#1a0f09',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        Shop Now
      </button>
    </motion.div>
  );
}
