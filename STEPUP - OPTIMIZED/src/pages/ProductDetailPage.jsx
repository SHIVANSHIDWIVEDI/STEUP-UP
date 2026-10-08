import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { 
  ArrowLeft, Heart, ShieldCheck, Truck, RefreshCw, Star, 
  Check, ChevronRight, Share2 
} from 'lucide-react';

export const ProductDetailPage = ({ slug }) => {
  const { allProducts, addToCart, toggleWishlist, isInWishlist, navigate, showToast } = useApp();

  const product = allProducts.find((p) => p.slug === slug) || allProducts[0];
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors[0] ? product.colors[0].name : 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('comfort');

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-16">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <button onClick={() => navigate('/shop')} className="hover:text-[#111111] transition-colors cursor-pointer">
          SHOP
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        
        {/* Left: Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-4/5 bg-[#F4EFEA] border border-[#E8E2D8] overflow-hidden relative">
            <img
              src={selectedImage}
              alt={`${product.name} ${product.category.toLowerCase()} sneaker for college students`}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#111111] text-[#F7F5F0] text-[10px] font-mono uppercase tracking-widest px-3 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-24 bg-[#EFECE5] border overflow-hidden cursor-pointer transition-all ${
                    selectedImage === img
                      ? 'border-[#111111] ring-1 ring-[#111111]'
                      : 'border-[#E8E2D8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Actions & Specs */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header Info */}
          <div className="space-y-3 pb-6 border-b border-[#E8E2D8]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
                {product.category.replace('-', ' ')}
              </span>
              <button
                onClick={handleShare}
                className="text-xs text-[#666666] hover:text-[#111111] flex items-center gap-1 cursor-pointer font-mono"
              >
                <Share2 className="w-3.5 h-3.5" /> SHARE
              </button>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-[#666666] leading-relaxed">
              {product.descriptor}
            </p>
            <p className="text-sm text-[#555555] leading-relaxed pt-1">
              {product.description}
            </p>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-heading text-2xl font-bold text-[#111111]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#888888] line-through font-mono">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-xs text-[#A52A2A] font-semibold">
                Student Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#666666]">
              <div className="flex text-amber-500">
                ★★★★★
              </div>
              <span className="font-semibold text-[#111111]">{product.rating}</span>
              <span>({product.reviewsCount} verified campus reviews)</span>
            </div>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#111111] block">
                Color: <span className="text-[#666666] font-normal">{selectedColor}</span>
              </label>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-3.5 py-2 text-xs border transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#111111] bg-[#111111] text-[#F7F5F0]'
                        : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizing Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold uppercase tracking-wider text-[#111111]">
                Select UK / IND Size
              </label>
              <span className="text-[11px] text-[#666666]">
                Fits true to size • Men & Women
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 text-xs font-mono transition-all border cursor-pointer ${
                    selectedSize === s
                      ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-bold'
                      : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Bag CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                Add To Bag — ₹{product.price.toLocaleString('en-IN')}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 border transition-colors cursor-pointer flex items-center justify-center ${
                  inWishlist
                    ? 'border-[#A52A2A] text-[#A52A2A] bg-white'
                    : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'
                }`}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-[#A52A2A]' : ''}`} />
              </button>
            </div>

            <p className="text-[11px] text-center text-[#666666] font-mono">
              Use code <strong className="text-[#A52A2A]">CAMPUS15</strong> for an extra 15% student discount at checkout.
            </p>
          </div>

          {/* Campus Perks */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#E8E2D8] text-center text-xs text-[#666666]">
            <div className="p-2.5 bg-white border border-[#E8E2D8] space-y-1">
              <Truck className="w-4 h-4 mx-auto text-[#111111]" />
              <span className="font-semibold text-[#111111] block text-[11px]">Free Delivery</span>
              <span className="text-[10px] text-[#888888]">Orders over ₹1,499</span>
            </div>
            <div className="p-2.5 bg-white border border-[#E8E2D8] space-y-1">
              <RefreshCw className="w-4 h-4 mx-auto text-[#111111]" />
              <span className="font-semibold text-[#111111] block text-[11px]">30-Day Trial</span>
              <span className="text-[10px] text-[#888888]">Free dorm exchanges</span>
            </div>
            <div className="p-2.5 bg-white border border-[#E8E2D8] space-y-1">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#111111]" />
              <span className="font-semibold text-[#111111] block text-[11px]">10K Steps</span>
              <span className="text-[10px] text-[#888888]">Tested comfort</span>
            </div>
          </div>

          {/* Editorial Specs Accordion / Tabs */}
          <div className="pt-4 border-t border-[#E8E2D8] space-y-3">
            <div className="flex border-b border-[#E8E2D8]">
              <button
                onClick={() => setActiveTab('comfort')}
                className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer mr-6 ${
                  activeTab === 'comfort'
                    ? 'text-[#111111] border-b-2 border-[#A52A2A]'
                    : 'text-[#888888] hover:text-[#111111]'
                }`}
              >
                Comfort Tech
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer mr-6 ${
                  activeTab === 'materials'
                    ? 'text-[#111111] border-b-2 border-[#A52A2A]'
                    : 'text-[#888888] hover:text-[#111111]'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab('styling')}
                className={`pb-2 text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer ${
                  activeTab === 'styling'
                    ? 'text-[#111111] border-b-2 border-[#A52A2A]'
                    : 'text-[#888888] hover:text-[#111111]'
                }`}
              >
                Campus Styling
              </button>
            </div>

            <div className="text-xs text-[#666666] leading-relaxed pt-2">
              {activeTab === 'comfort' && <p>{product.comfortInfo}</p>}
              {activeTab === 'materials' && <p>{product.materials}</p>}
              {activeTab === 'styling' && <p>{product.stylingTip}</p>}
            </div>
          </div>

        </div>
      </div>

      {/* Related Campus Styles */}
      <section className="pt-12 border-t border-[#E8E2D8] space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#111111] uppercase">
            Complete Your Campus Rotation
          </h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#A52A2A] cursor-pointer"
          >
            View All Styles →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};
