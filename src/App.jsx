import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/Cursor/CustomCursor';
import ScrollProgress from './components/ScrollProgress/ScrollProgress';
import ScrollTop from './components/ScrollTop/ScrollTop';
import FloatingButtons from './components/FloatingButtons/FloatingButtons';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import OrderModal from './components/OrderModal/OrderModal';

import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import GiftBoxes from './pages/GiftBoxes';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

import './styles/globals.css';

function AnimatedRoutes({ onOrderClick }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home onOrderClick={onOrderClick} />} />
        <Route path="/products"   element={<Products onOrderClick={onOrderClick} />} />
        <Route path="/about"      element={<About />} />
        <Route path="/gift-boxes" element={<GiftBoxes onOrderClick={onOrderClick} />} />
        <Route path="/gallery"    element={<Gallery />} />
        <Route path="/faq"        element={<FAQ />} />
        <Route path="/contact"    element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppShell() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openOrder = (product = null) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <ScrollToTop />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes onOrderClick={openOrder} />
      <Footer />
      <ScrollTop />
      <FloatingButtons />
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
