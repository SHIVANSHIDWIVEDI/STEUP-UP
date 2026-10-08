import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag, Plus } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigate, toggleWishlist, isInWishlist, setQuickAddProduct, addToCart } = useApp();
  const inWishlist = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // Default to middle standard size (e.g., UK 8 or first available)
    const defaultSize = product.sizes && product.sizes.includes(8) ? 8 : product.sizes[0];
    const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <article 
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-[#E8E2D8] hover:border-[#111111] transition-all duration-300 cursor-pointer relative"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-4/5 bg-[#F4EFEA] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} ${product.category.toLowerCase()} shoe for college students`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Category / Badge Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none flex flex-col gap-1 items-start">
          {product.badge && (
            <span className={`text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 ${
              product.badge === 'Trending' || product.badge === 'Student Fave'
                ? 'bg-[#A52A2A] text-[#F7F5F0]'
                : 'bg-[#111111] text-[#F7F5F0]'
            }`}>
              {product.badge}
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xs text-[#666666] text-[8px] sm:text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-[#E8E2D8]/80">
            {product.category}
          </span>
        </div>

        {/* Wishlist Button: Always Accessible */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-20 p-2 rounded-full transition-all duration-200 cursor-pointer ${
            inWishlist
              ? 'bg-white text-[#A52A2A] shadow-xs'
              : 'bg-white/85 backdrop-blur-xs text-[#111111] hover:bg-white hover:text-[#A52A2A] shadow-2xs'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 stroke-[1.8] ${inWishlist ? 'fill-[#A52A2A]' : ''}`} />
        </button>

        {/* Add to Cart Overlay on Hover (Desktop) / Persistent on Mobile */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#111111] hover:bg-[#A52A2A] text-[#F7F5F0] text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2 bg-white">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-heading text-xs sm:text-sm md:text-base font-semibold text-[#111111] group-hover:text-[#A52A2A] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </div>

          <p className="text-[11px] sm:text-xs text-[#666666] line-clamp-2 mt-1 font-normal leading-relaxed">
            {product.descriptor}
          </p>
          <p className="text-[11px] text-[#777777] line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#F2EDE4] flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-heading text-sm sm:text-base font-bold text-[#111111]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-[#888888] line-through font-mono">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Quick Select / Size info indicator */}
          <span className="text-[10px] font-mono text-[#888888] hidden sm:inline">
            UK {product.sizes[0]}-{product.sizes[product.sizes.length - 1]}
          </span>
        </div>

        {/* Mobile Quick Add Button (Visible on mobile where hover is not primary) */}
        <div className="pt-1 sm:hidden">
          <button
            onClick={handleQuickAdd}
            className="w-full py-1.5 bg-[#111111] text-[#F7F5F0] text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
