import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: Phone,
    title: 'Call Us',
    value: '+91-89173-42626',
    sub: 'Mon–Sat, 9AM–8PM',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@chocolafy.in',
    sub: 'Reply within 24 hours',
    href: 'mailto:hello@chocolafy.in',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: 'Mumbai, Maharashtra',
    sub: 'India – 400001',
    href: '#',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon–Sat: 9AM–8PM',
    sub: 'Sun: 10AM–6PM',
    href: null,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* BG decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(201,162,39,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="container-luxury relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Get In Touch</p>
          <h2 className="section-title mb-6">Contact Chocolafy</h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
          >
            Ready to place an order or have a custom request? We'd love to hear from you.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C9A227]" />
            <div className="w-2 h-2 rounded-full bg-[#C9A227]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C9A227]" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact cards */}
          <div className="space-y-5">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 6 }}
                  className="glass-card p-5 flex items-center gap-5 group"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201,162,39,0.15), rgba(201,162,39,0.05))',
                      border: '1px solid rgba(201,162,39,0.25)',
                    }}
                  >
                    <Icon size={24} color="#C9A227" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold tracking-wider uppercase mb-0.5"
                      style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-base font-semibold"
                      style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
                    >
                      {item.value}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.sub}
                    </p>
                  </div>
                </motion.div>
              );

              return item.href && item.href !== '#' ? (
                <a key={item.title} href={item.href}>
                  {content}
                </a>
              ) : (
                <div key={item.title}>{content}</div>
              );
            })}

            {/* Social + Quick action */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-card p-5"
            >
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'Poppins, sans-serif' }}
              >
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'Instagram', color: '#E4405F', emoji: '📸' },
                  { label: 'WhatsApp', color: '#25D366', emoji: '💬' },
                  { label: 'Facebook', color: '#1877F2', emoji: '👤' },
                  { label: 'YouTube', color: '#FF0000', emoji: '▶️' },
                ].map(s => (
                  <button
                    key={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base"
                    style={{
                      background: `${s.color}20`,
                      border: `1px solid ${s.color}40`,
                    }}
                    aria-label={s.label}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card overflow-hidden"
            style={{ minHeight: '400px' }}
          >
            {/* Google Map Embed Placeholder */}
            <div
              className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
              style={{ minHeight: '400px' }}
            >
              <iframe
                title="Chocolafy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.9038946697567!2d72.82717!3d18.964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce0e0a896a59%3A0xd98f1a01ae7c4c64!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 'none', minHeight: '400px', filter: 'saturate(0.7) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay label */}
              <div
                className="absolute bottom-4 left-4 px-4 py-2 rounded-xl"
                style={{
                  background: 'rgba(44,24,16,0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201,162,39,0.3)',
                }}
              >
                <p
                  className="text-xs font-bold"
                  style={{ color: '#C9A227', fontFamily: 'Poppins, sans-serif' }}
                >
                  📍 Chocolafy — Mumbai, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
