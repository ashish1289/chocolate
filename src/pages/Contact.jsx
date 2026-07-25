import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import PageWrapper from '../components/PageWrapper/PageWrapper';
import PageHero from '../components/PageHero/PageHero';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=1600&q=85';

const CONTACT_INFO = [
  { icon: Phone, title: 'Call Us', value: '+91-89173-42626', sub: 'Mon–Sat, 9AM–8PM', href: 'tel:+919876543210' },
  { icon: Mail, title: 'Email Us', value: 'hello@chocolafy.in', sub: 'Reply within 24h', href: 'mailto:hello@chocolafy.in' },
  { icon: MapPin, title: 'Visit Us', value: 'Mumbai, Maharashtra', sub: 'India – 400001', href: null },
  { icon: Clock, title: 'Business Hours', value: 'Mon–Sat: 9AM–8PM', sub: 'Sun: 10AM–6PM', href: null },
];

const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } };
const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const INITIAL_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  /* Simulated send — replace with EmailJS / any service */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSent(true);
  };

  return (
    <PageWrapper>
      <PageHero
        title="Get In Touch"
        subtitle="Ready to place an order, discuss a custom gift, or simply say hello? We'd love to hear from you."
        tag="Contact Us"
        breadcrumb="Contact"
        image={HERO_IMAGE}
      />

      {/* ── Contact Cards ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-luxury">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              const card = (
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="glass-card p-6 flex flex-col items-center text-center gap-4 group"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))', border: '1px solid rgba(201,162,39,0.22)' }}
                  >
                    <Icon size={24} color="#C9A227" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}>{item.title}</p>
                    <p className="text-base font-semibold mb-0.5" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>{item.value}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>{item.sub}</p>
                  </div>
                </motion.div>
              );
              return item.href
                ? <a key={item.title} href={item.href}>{card}</a>
                : <div key={item.title}>{card}</div>;
            })}
          </div>

          {/* ── Grid: Form + Map ── */}
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
                  Send Us a Message
                </h3>
                <p className="text-sm mb-8" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 0.5 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: 'linear-gradient(135deg, #C9A227, #E8C547)', boxShadow: '0 10px 30px rgba(201,162,39,0.4)' }}
                    >
                      <CheckCircle size={38} color="#1a0f09" />
                    </motion.div>
                    <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>Message Sent!</h4>
                    <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                      Thank you for reaching out. We'll reply within 24 hours.
                    </p>
                    <button onClick={() => { setSent(false); setForm(INITIAL_FORM); }} className="btn-gold mt-6">
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', required: true },
                        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
                        { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91-89173-42626', required: false },
                        { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Custom order / Query', required: true },
                      ].map(field => (
                        <div key={field.name} className={field.name === 'subject' ? 'sm:col-span-2' : ''}>
                          <label
                            htmlFor={field.name}
                            className="block text-xs font-semibold mb-1.5 tracking-wider uppercase"
                            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
                          >
                            {field.label}{field.required && ' *'}
                          </label>
                          <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={form[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                            style={{
                              background: 'var(--glass-bg)',
                              border: '1px solid var(--border-color)',
                              color: 'var(--text-primary)',
                              fontFamily: 'Poppins, sans-serif',
                            }}
                            onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.6)')}
                            onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold mb-1.5 tracking-wider uppercase"
                        style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                        Message *
                      </label>
                      <textarea
                        id="message" name="message" rows={4} required
                        placeholder="Tell us about your order or question…"
                        value={form.message} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-200"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'Poppins, sans-serif' }}
                        onFocus={e => (e.target.style.borderColor = 'rgba(201,162,39,0.6)')}
                        onBlur={e => (e.target.style.borderColor = 'var(--border-color)')}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="btn-gold w-full justify-center py-4 text-base mt-2"
                      style={{ opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 rounded-full border-2 border-[#1a0f09] border-t-transparent" />
                          Sending…
                        </>
                      ) : (
                        <><Send size={18} /> Send Message</>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>

              {/* Social row */}
              <motion.div
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="glass-card p-5 mt-5 flex items-center justify-between flex-wrap gap-4"
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'Poppins, sans-serif' }}>
                  Follow Chocolafy
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: FaInstagram, href: 'https://instagram.com/chocolafy', color: '#E4405F', label: 'Instagram' },
                    { icon: FaWhatsapp, href: 'https://wa.me/919876543210', color: '#25D366', label: 'WhatsApp' },
                    { icon: FaFacebook, href: 'https://facebook.com/chocolafy', color: '#1877F2', label: 'Facebook' },
                  ].map(s => {
                    const Icon = s.icon;
                    return (
                      <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}
                        aria-label={s.label}
                      >
                        <Icon size={18} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Map */}
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-5"
            >
              <div
                className="glass-card overflow-hidden flex-1"
                style={{ minHeight: '380px', boxShadow: '0 20px 60px rgba(59,31,22,0.1)' }}
              >
                <iframe
                  title="Chocolafy Mumbai Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60367.15588939988!2d72.77288!3d18.9647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce0e0a896a59%3A0xd98f1a01ae7c4c64!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%" height="100%"
                  style={{ border: 'none', minHeight: '380px', filter: 'saturate(0.65) contrast(1.1)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* WhatsApp quick contact */}
              <motion.a
                href="https://wa.me/919876543210?text=Hi+Chocolafy!+I'd+like+to+place+an+order."
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="glass-card p-5 flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(37,211,102,0.15)', border: '1px solid rgba(37,211,102,0.3)' }}>
                  <FaWhatsapp size={22} color="#25D366" />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ fontFamily: 'Poppins, sans-serif', color: 'var(--text-primary)' }}>
                    Quick Order via WhatsApp
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}>
                    Chat with us directly for fastest response
                  </p>
                </div>
                <span className="ml-auto text-lg" style={{ color: '#25D366' }}>→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
