import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Star, ArrowRight, ShieldCheck } from 'lucide-react';

export const QuickViewModal = () => {
  const { quickAddProduct, setQuickAddProduct, addToCart, navigate } = useApp();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!quickAddProduct) return null;

  const product = quickAddProduct;
  const currentSize = selectedSize || product.sizes[0];
  const currentColor = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';

  const handleAdd = () => {
    addToCart(product, currentSize, currentColor, 1);
    setQuickAddProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickAddProduct(null)}
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#F7F5F0] border border-[#E8E2D8] text-[#111111] shadow-2xl z-10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#666666] hover:text-[#111111] transition-colors cursor-pointer bg-white/80"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-4/5 md:aspect-auto bg-[#EFECE5] relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#111111] text-[#F7F5F0] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details & Size Picker */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A52A2A]">
                  {product.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-semibold text-[#111111]">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 pt-1">
                  <span className="font-heading text-lg font-bold text-[#111111]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#888888] line-through font-mono">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[11px] text-[#A52A2A] font-semibold">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#666666] leading-relaxed">
                {product.descriptor}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#111111] block">
                    Color: <span className="text-[#666666] font-normal">{currentColor}</span>
                  </label>
                  <div className="flex gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 text-xs border transition-all cursor-pointer ${
                          currentColor === c.name
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

              {/* Size Selection */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#111111]">
                    Select UK / IND Size
                  </label>
                  <span className="text-[10px] text-[#666666] underline cursor-pointer">
                    True to size
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 text-xs font-mono transition-all border cursor-pointer ${
                        currentSize === s
                          ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-semibold'
                          : 'border-[#E8E2D8] bg-white text-[#111111] hover:border-[#111111]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add to Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setQuickAddProduct(null);
                  navigate(`/product/${product.slug}`);
                }}
                className="w-full text-center text-[11px] text-[#666666] hover:text-[#111111] underline transition-colors cursor-pointer py-1"
              >
                View Full Details & Sizing Guide →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
