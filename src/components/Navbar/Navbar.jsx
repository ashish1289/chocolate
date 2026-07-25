import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logoImg from '../../assets/logo.png';
const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Gift Boxes', to: '/gift-boxes' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  /* Close mobile menu on route change */
  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* On inner pages, always show solid bg */
  const solidBg = !isHome || scrolled;

  const navBg = solidBg
    ? isDark
      ? 'rgba(15,9,6,0.97)'
      : 'rgba(253,249,245,0.97)'
    : 'transparent';

  const linkColor = (isActive) => {
    if (isActive) return '#C9A227';
    return solidBg ? 'var(--text-primary)' : 'rgba(255,248,240,0.9)';
  };

  const isNavbarWhite = solidBg && !isDark;
  const goldenFilter = 'brightness(0) saturate(100%) invert(70%) sepia(68%) saturate(456%) hue-rotate(353deg) brightness(87%) contrast(85%) drop-shadow(0 2px 10px rgba(201,162,39,0.3))';
  
  const desktopLogoFilter = !isNavbarWhite ? goldenFilter : 'none';
  const mobileLogoFilter = isDark ? goldenFilter : 'none';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={{
          background: navBg,
          backdropFilter: solidBg ? 'blur(24px)' : 'none',
          borderBottom: solidBg
            ? `1px solid ${isDark ? 'rgba(201,162,39,0.15)' : 'rgba(201,162,39,0.12)'}`
            : 'none',
          boxShadow: solidBg ? '0 4px 40px rgba(59,31,22,0.08)' : 'none',
        }}
      >
        <div className="container-luxury flex items-center justify-between py-3.5">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src={logoImg}
              alt="Chocolafy Logo"
              className={`h-10 md:h-12 w-auto object-contain drop-shadow-md origin-left transition-transform duration-500 ease-out ${
                !isNavbarWhite
                  ? 'scale-[2.2] md:scale-[2.6] hover:scale-[2.3] md:hover:scale-[2.7]'
                  : 'scale-[1.6] md:scale-[1.9] hover:scale-[1.7] md:hover:scale-[2]'
              }`}
              style={{ filter: desktopLogoFilter }}
            />
          </Link>

          {/* ── Desktop links ── */}
          <ul className="hidden lg:flex items-center gap-2 xl:gap-6">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? 'active' : ''
                    }`
                  }
                  style={({ isActive }) => ({
                    color: linkColor(isActive),
                    fontFamily: 'Poppins, sans-serif',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link to="/products" className="btn-gold hidden md:inline-flex text-sm py-2.5 px-6">
                <ShoppingBag size={16} />
                Order Now
              </Link>
            </motion.div>

            {/* Hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'rgba(201,162,39,0.12)',
                border: '1px solid rgba(201,162,39,0.3)',
                color: '#C9A227',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[98]"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 right-0 z-[99] w-72 flex flex-col py-8 px-6"
              style={{
                background: isDark
                  ? 'linear-gradient(160deg, #0F0906 0%, #2C1810 100%)'
                  : 'linear-gradient(160deg, #FDF9F5 0%, #FFF8F0 100%)',
                borderLeft: '1px solid rgba(201,162,39,0.2)',
                boxShadow: '-20px 0 60px rgba(59,31,22,0.3)',
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <img src={logoImg} alt="Chocolafy Logo" className="h-8 w-auto object-contain drop-shadow-md scale-[1.5] origin-left transition-all duration-300" style={{ filter: mobileLogoFilter }} />
                <button onClick={() => setMenuOpen(false)} style={{ color: '#C9A227' }}>
                  <X size={22} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-3 flex-1 mt-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `block text-left w-full px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive ? 'active' : ''
                        }`
                      }
                      style={({ isActive }) => ({
                        color: isActive ? '#C9A227' : 'var(--text-primary)',
                        background: isActive ? 'rgba(201,162,39,0.1)' : 'transparent',
                        borderLeft: isActive ? '3px solid #C9A227' : '3px solid transparent',
                        fontFamily: 'Poppins, sans-serif',
                      })}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  to="/products"
                  className="btn-gold w-full justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingBag size={17} />
                  Order Now
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
