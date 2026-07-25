import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Mail } from 'lucide-react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaYoutube } from 'react-icons/fa';
import logoImg from '../../assets/logo.png';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Gift Boxes', to: '/gift-boxes' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const PRODUCT_LINKS = [
  { label: 'Almond Chocolate', to: '/products' },
  { label: 'Pistachio Chocolate', to: '/products' },
  { label: 'Khajoor Chocolate', to: '/products' },
  { label: 'Hazelnut Chocolate', to: '/products' },
  { label: 'Gift Boxes', to: '/gift-boxes' },
  { label: 'Custom Orders', to: '/contact' },
];

const SOCIAL = [
  { icon: FaInstagram, href: 'https://instagram.com/chocolafy', label: 'Instagram', color: '#E4405F' },
  { icon: FaWhatsapp, href: 'https://wa.me/919876543210', label: 'WhatsApp', color: '#25D366' },
  { icon: FaFacebook, href: 'https://facebook.com/chocolafy', label: 'Facebook', color: '#1877F2' },
  { icon: FaYoutube, href: 'https://youtube.com/@chocolafy', label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="relative z-20" style={{ background: '#0F0906' }}>
      {/* Chocolate Flowing River Wave Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ transform: 'translateY(-98%)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[20px] md:h-[30px]">
          {/* Main chocolate wave extending from the footer */}
          <path d="M0,60 C320,0 420,60 720,20 C1020,-10 1120,60 1440,10 L1440,60 L0,60 Z" fill="#0F0906" />
          {/* Gold highlight river flow along the edge */}
          <path d="M0,60 C320,0 420,60 720,20 C1020,-10 1120,60 1440,10" fill="none" stroke="url(#gold-river)" strokeWidth="3" />
          <defs>
            <linearGradient id="gold-river" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C9A227" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#E8C547" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C9A227" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container-luxury py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 w-fit">
              <img
                src={logoImg}
                alt="Chocolafy Logo"
                className="h-10 md:h-12 w-auto object-contain drop-shadow-md scale-[1.5] origin-left"
                style={{ filter: 'brightness(0) saturate(100%) invert(70%) sepia(68%) saturate(456%) hue-rotate(353deg) brightness(87%) contrast(85%) drop-shadow(0 2px 10px rgba(201,162,39,0.3))' }}
              />
            </Link>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'rgba(201,169,128,0.6)', fontFamily: 'Poppins, sans-serif' }}
            >
              Luxury Chocolates Crafted with Nature. Every piece a masterpiece, made
              with premium dry fruits and 100% natural ingredients.
            </p>
            <p
              className="text-xs italic mb-6"
              style={{ color: 'rgba(201,162,39,0.5)', fontFamily: 'Playfair Display, serif' }}
            >
              "Luxury Chocolates Crafted with Nature"
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(s => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
                    aria-label={s.label}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 group"
                    style={{ color: 'rgba(201,169,128,0.65)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-[#C9A227]" style={{ color: 'rgba(201,162,39,0.5)' }}>›</span>
                    <span className="group-hover:text-[rgba(255,248,240,0.85)]">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Products ── */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              Our Products
            </h4>
            <ul className="space-y-3">
              {PRODUCT_LINKS.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm flex items-center gap-1.5 transition-all duration-200 hover:translate-x-1 group"
                    style={{ color: 'rgba(201,169,128,0.65)', fontFamily: 'Poppins, sans-serif' }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-[#C9A227]" style={{ color: 'rgba(201,162,39,0.5)' }}>›</span>
                    <span className="group-hover:text-[rgba(255,248,240,0.85)]">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-5" style={{ color: 'rgba(201,169,128,0.6)', fontFamily: 'Poppins, sans-serif' }}>
              Subscribe for exclusive offers, new arrivals, and seasonal specials.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 rounded-xl text-center"
                style={{ background: 'rgba(201,162,39,0.09)', border: '1px solid rgba(201,162,39,0.28)' }}
              >
                <p className="text-sm font-semibold" style={{ color: '#C9A227' }}>🎉 You're subscribed!</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(201,169,128,0.5)' }}>Welcome to the Chocolafy family</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(201,162,39,0.45)' }} />
                  <input
                    type="email" required
                    value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: 'rgba(201,162,39,0.07)', border: '1px solid rgba(201,162,39,0.18)', color: '#FFF8F0', fontFamily: 'Poppins, sans-serif' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.18)')}
                  />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-gold text-sm py-2.5 justify-center">
                  <Send size={14} /> Subscribe
                </motion.button>
              </form>
            )}

            {/* Contact chip */}
            <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(201,162,39,0.1)' }}>
              <p className="text-xs mb-2" style={{ color: 'rgba(201,169,128,0.5)', fontFamily: 'Poppins, sans-serif' }}>Need help?</p>
              <a href="tel:+919876543210" className="text-sm font-semibold transition-colors hover:text-[#C9A227]"
                style={{ color: 'rgba(255,248,240,0.7)', fontFamily: 'Poppins, sans-serif' }}>
                +91-89173-42626
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(201,162,39,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(201,169,128,0.35)', fontFamily: 'Poppins, sans-serif' }}>
            © {new Date().getFullYear()} Chocolafy. All rights reserved. Made with ❤️ in India.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(label => (
              <button key={label} className="text-xs transition-colors hover:text-[rgba(201,162,39,0.7)]"
                style={{ color: 'rgba(201,169,128,0.35)', fontFamily: 'Poppins, sans-serif' }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
