import { motion } from 'framer-motion';
import { Star, Heart, Share2, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product, onOrderClick }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.description, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="glass-card product-card group relative flex flex-col overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ paddingBottom: '65%' }}>
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Image overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(44,24,16,0.8) 0%, transparent 50%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge === 'bestseller' && (
            <span className="badge-bestseller">🏆 Best Seller</span>
          )}
          {product.badge === 'new' && (
            <span className="badge-new">✨ New Arrival</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setWishlisted(!wishlisted)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: 'rgba(15,9,6,0.7)',
              backdropFilter: 'blur(10px)',
              border: wishlisted ? '1px solid #C9A227' : '1px solid rgba(255,255,255,0.2)',
            }}
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              fill={wishlisted ? '#C9A227' : 'none'}
              color={wishlisted ? '#C9A227' : '#fff'}
              strokeWidth={2}
            />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(15,9,6,0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            aria-label="Share"
          >
            <Share2 size={14} color={shared ? '#C9A227' : '#fff'} />
          </motion.button>
        </div>

        {/* Weight badge */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium z-10"
          style={{
            background: 'rgba(15,9,6,0.7)',
            backdropFilter: 'blur(10px)',
            color: 'rgba(255,248,240,0.9)',
            border: '1px solid rgba(201,162,39,0.3)',
          }}
        >
          {product.weight}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 relative z-10 w-full" style={{ padding: '24px' }}>
        {/* Tags */}
        <div className="flex flex-wrap mb-3" style={{ gap: '6px' }}>
          {product.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="text-[10px] font-medium rounded-full"
              style={{
                background: 'rgba(201,162,39,0.1)',
                color: '#C9A227',
                border: '1px solid rgba(201,162,39,0.2)',
                padding: '4px 8px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className="text-lg font-bold mb-2"
          style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}
        >
          {product.name}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: 'var(--text-muted)', fontFamily: 'Poppins, sans-serif' }}
        >
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-5" style={{ gap: '8px' }}>
          <div className="flex" style={{ gap: '2px' }}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating) ? '#C9A227' : 'none'}
                color="#C9A227"
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="text-xs font-semibold" style={{ color: '#C9A227' }}>
            {product.rating}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price & Buy */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: 'Playfair Display, serif',
                background: 'linear-gradient(135deg, #C9A227, #E8C547)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px'
              }}
            >
              {product.price}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Free delivery
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOrderClick(product)}
            className="btn-gold text-sm"
            style={{ padding: '10px 20px' }}
          >
            <ShoppingBag size={15} />
            Buy Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
