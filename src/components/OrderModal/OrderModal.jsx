import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, ShoppingBag, User, Phone, Mail, MapPin, Package, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PRODUCTS } from '../../data/data';

// ✏️ REPLACE THESE WITH YOUR EMAILJS CREDENTIALS:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

const INITIAL_FORM = {
  fullName: '',
  mobile: '',
  email: '',
  address: '',
  product: '',
  quantity: '1',
  message: '',
};

function InputField({ icon: Icon, label, id, ...props }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold mb-1.5 tracking-wider uppercase"
        style={{ color: 'rgba(201,169,128,0.8)', fontFamily: 'Poppins, sans-serif' }}
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: 'rgba(201,162,39,0.6)' }}
          />
        )}
        {props.as === 'textarea' ? (
          <textarea
            id={id}
            rows={3}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
            style={{
              background: 'rgba(201,162,39,0.05)',
              border: '1px solid rgba(201,162,39,0.2)',
              color: '#FFF8F0',
              fontFamily: 'Poppins, sans-serif',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
            {...props}
          />
        ) : props.as === 'select' ? (
          <select
            id={id}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 appearance-none"
            style={{
              background: 'rgba(201,162,39,0.05)',
              border: '1px solid rgba(201,162,39,0.2)',
              color: '#FFF8F0',
              fontFamily: 'Poppins, sans-serif',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
            {...props}
          >
            {props.children}
          </select>
        ) : (
          <input
            id={id}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: 'rgba(201,162,39,0.05)',
              border: '1px solid rgba(201,162,39,0.2)',
              color: '#FFF8F0',
              fontFamily: 'Poppins, sans-serif',
            }}
            onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.6)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(201,162,39,0.2)')}
            {...props}
          />
        )}
      </div>
    </div>
  );
}

export default function OrderModal({ isOpen, onClose, selectedProduct }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  useEffect(() => {
    if (selectedProduct) {
      setForm(f => ({ ...f, product: selectedProduct.name }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStatus('idle');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      from_name: form.fullName,
      mobile: form.mobile,
      reply_to: form.email,
      address: form.address,
      product: form.product,
      quantity: form.quantity,
      message: form.message || 'No additional message.',
      order_date: new Date().toLocaleString('en-IN'),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(15,9,6,0.85)', backdropFilter: 'blur(10px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[151] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl"
              style={{
                background: 'linear-gradient(135deg, #1A0F09 0%, #2C1810 100%)',
                border: '1px solid rgba(201,162,39,0.25)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                pointerEvents: 'auto',
              }}
            >
              {/* Gold top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
                style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }}
              />

              {/* Header */}
              <div
                className="sticky top-0 flex items-center justify-between p-6 pb-5"
                style={{
                  background: 'linear-gradient(135deg, #1A0F09 0%, #2C1810 100%)',
                  zIndex: 10,
                  borderBottom: '1px solid rgba(201,162,39,0.1)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)' }}
                  >
                    <ShoppingBag size={20} color="#1a0f09" />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#FFF8F0' }}
                    >
                      Place Your Order
                    </h2>
                    <p className="text-xs" style={{ color: 'rgba(201,169,128,0.6)', fontFamily: 'Poppins, sans-serif' }}>
                      We'll confirm within 2 hours
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  aria-label="Close modal"
                >
                  <X size={18} color="rgba(201,169,128,0.8)" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Success */}
                {status === 'success' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, times: [0, 0.5, 1] }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', boxShadow: '0 10px 30px rgba(201,162,39,0.5)' }}
                    >
                      <CheckCircle size={40} color="#1a0f09" />
                    </motion.div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#FFF8F0' }}
                    >
                      Order Sent! 🎉
                    </h3>
                    <p
                      className="text-base mb-2"
                      style={{ color: 'rgba(201,169,128,0.8)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Thank you! Your order has been sent successfully.
                    </p>
                    <p
                      className="text-sm mb-8"
                      style={{ color: 'rgba(201,169,128,0.6)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      Our team will contact you within 2 hours to confirm your order.
                    </p>
                    <button onClick={onClose} className="btn-gold">
                      Continue Shopping
                    </button>
                  </motion.div>
                )}

                {/* Error */}
                {status === 'error' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }}
                    >
                      <AlertCircle size={32} color="#EF4444" />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#FFF8F0' }}
                    >
                      Oops! Something went wrong
                    </h3>
                    <p
                      className="text-sm mb-6"
                      style={{ color: 'rgba(201,169,128,0.7)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      We couldn't send your order. Please WhatsApp us directly or try again.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <a
                        href="https://wa.me/919876543210?text=Hi+Chocolafy!+I+want+to+place+an+order."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold text-sm py-2.5 px-5"
                      >
                        WhatsApp Us
                      </a>
                      <button
                        onClick={() => setStatus('idle')}
                        className="btn-outline text-sm py-2.5 px-5"
                        style={{ color: '#FFF8F0' }}
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Form */}
                {(status === 'idle' || status === 'loading') && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        icon={User}
                        label="Full Name *"
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                      <InputField
                        icon={Phone}
                        label="Mobile Number *"
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+91-89173-42626"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <InputField
                      icon={Mail}
                      label="Email Address *"
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />

                    <InputField
                      icon={MapPin}
                      label="Delivery Address *"
                      id="address"
                      name="address"
                      as="textarea"
                      placeholder="Full delivery address with pincode"
                      value={form.address}
                      onChange={handleChange}
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Product select */}
                      <div>
                        <label
                          htmlFor="product"
                          className="block text-xs font-semibold mb-1.5 tracking-wider uppercase"
                          style={{ color: 'rgba(201,169,128,0.8)', fontFamily: 'Poppins, sans-serif' }}
                        >
                          Selected Product *
                        </label>
                        <div className="relative">
                          <Package
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2"
                            style={{ color: 'rgba(201,162,39,0.6)', zIndex: 1 }}
                          />
                          <select
                            id="product"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none appearance-none"
                            style={{
                              background: 'rgba(201,162,39,0.05)',
                              border: '1px solid rgba(201,162,39,0.2)',
                              color: form.product ? '#FFF8F0' : 'rgba(255,248,240,0.4)',
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            <option value="" style={{ background: '#1a0f09' }}>Select a product</option>
                            {PRODUCTS.map(p => (
                              <option key={p.id} value={p.name} style={{ background: '#1a0f09' }}>
                                {p.name} — {p.price}
                              </option>
                            ))}
                            <option value="Custom Order" style={{ background: '#1a0f09' }}>
                              Custom Order
                            </option>
                          </select>
                        </div>
                      </div>

                      {/* Quantity */}
                      <InputField
                        icon={Package}
                        label="Quantity *"
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="1"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <InputField
                      icon={MessageSquare}
                      label="Message (Optional)"
                      id="message"
                      name="message"
                      as="textarea"
                      placeholder="Special requests, flavor preferences, gift message..."
                      value={form.message}
                      onChange={handleChange}
                    />

                    {/* Privacy note */}
                    <p
                      className="text-xs"
                      style={{ color: 'rgba(201,169,128,0.4)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      🔒 Your information is 100% secure and will only be used to process your order.
                    </p>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      className="btn-gold w-full justify-center text-base py-4 mt-2"
                      style={{ opacity: status === 'loading' ? 0.7 : 1 }}
                    >
                      {status === 'loading' ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 rounded-full border-2 border-[#1a0f09] border-t-transparent"
                          />
                          Sending Order...
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={20} />
                          Confirm Order
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
