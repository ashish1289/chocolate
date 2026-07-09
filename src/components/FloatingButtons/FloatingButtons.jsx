import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Phone } from 'lucide-react';

// ✏️  CHANGE THESE PLACEHOLDERS:
const WHATSAPP_NUMBER = '919876543210'; // e.g. 919876543210
const PHONE_NUMBER = '+91-98765-43210';
const INSTAGRAM_URL = 'https://instagram.com/chococraft';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Instagram */}
      <motion.a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl text-white"
        style={{
          background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          boxShadow: '0 4px 20px rgba(220,39,67,0.5)',
        }}
        aria-label="Instagram"
      >
        <FaInstagram size={20} />
      </motion.a>

      {/* Call */}
      <motion.a
        href={`tel:${PHONE_NUMBER}`}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl text-white"
        style={{
          background: 'linear-gradient(135deg, #3B1F16, #5A3825)',
          boxShadow: '0 4px 20px rgba(59,31,22,0.5)',
          border: '1px solid rgba(201,162,39,0.4)',
        }}
        aria-label="Call us"
      >
        <Phone size={20} />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20ChocoCraft!%20I%20would%20like%20to%20place%20an%20order.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl text-white"
        style={{
          background: 'linear-gradient(135deg, #25d366, #128c7e)',
          boxShadow: '0 4px 24px rgba(37,211,102,0.5)',
        }}
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={26} />
      </motion.a>
    </div>
  );
}
