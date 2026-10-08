import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    cartTotal,
    discountAmount,
    freeShippingThreshold,
    freeShippingProgress,
    freeShippingRemaining,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigate
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.error || 'Invalid code');
    } else {
      setPromoInput('');
      setPromoError('');
    }
  };

  const handleCheckout = () => {
    alert('Thank you for choosing STEPUP! Student checkout preview complete. (Orders over ₹1,499 qualify for free campus delivery across India).');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Shopping Bag"
          className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#E8E2D8] text-[#111111] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E2D8] flex items-center justify-between bg-[#F7F5F0]">
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-lg font-semibold tracking-tight text-[#111111]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#666666] font-mono">({cartCount})</span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 -mr-2 text-[#666666] hover:text-[#111111] transition-colors rounded-sm cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#FAF9F6] px-6 py-3.5 border-b border-[#E8E2D8]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              {freeShippingRemaining > 0 ? (
                <span className="text-[#666666]">
                  Add <strong className="text-[#111111] font-semibold">₹{freeShippingRemaining.toLocaleString('en-IN')}</strong> more for Free Campus Delivery
                </span>
              ) : (
                <span className="text-[#A52A2A] font-semibold flex items-center gap-1.5">
                  ✓ Free Campus Delivery Unlocked
                </span>
              )}
              <span className="font-mono text-[11px] text-[#666666]">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-1 bg-[#E8E2D8] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#A52A2A] transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EFECE5] flex items-center justify-center text-[#666666]">
                  <Tag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading text-base font-semibold text-[#111111]">
                    Your bag is empty
                  </h3>
                  <p className="text-xs text-[#666666] max-w-xs leading-relaxed">
                    Explore our campus-tested footwear rotation built for 10,000 daily steps.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 px-6 py-3 bg-[#111111] text-[#F7F5F0] hover:bg-[#222222] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white border border-[#E8E2D8] transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#F7F5F0] overflow-hidden shrink-0 border border-[#E8E2D8]/60">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/product/${item.product.slug}`);
                          }}
                          className="font-heading text-sm font-semibold text-[#111111] truncate cursor-pointer hover:text-[#A52A2A] transition-colors"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#888888] hover:text-[#A52A2A] transition-colors p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#666666] mt-0.5">
                        UK {item.size} • {item.color}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#E8E2D8] bg-[#F7F5F0]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#666666] hover:text-[#111111] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price in ₹ */}
                      <div className="text-right">
                        <span className="text-sm font-semibold text-[#111111]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D8] bg-[#FAF9F6] space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Enter CAMPUS15 for 15% off"
                    className="flex-1 px-3 py-2 bg-white border border-[#E8E2D8] text-xs text-[#111111] placeholder-[#888888] focus:outline-hidden focus:border-[#111111] transition-colors uppercase tracking-wider font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E8E2D8] hover:bg-[#D8CFC2] text-[#111111] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-[#A52A2A]">{promoError}</p>}
                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs text-[#A52A2A] pt-1">
                    <span>Active code: <strong>{appliedPromo.code}</strong> ({appliedPromo.label})</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-[11px] underline hover:text-[#111111] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown in ₹ */}
              <div className="space-y-1.5 text-xs text-[#666666] pt-2 border-t border-[#E8E2D8]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A52A2A]">
                    <span>Student Discount (15%)</span>
                    <span className="font-medium">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Campus Delivery</span>
                  <span className="text-[#111111] font-medium">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#111111] pt-2 border-t border-[#E8E2D8]">
                  <span>Total</span>
                  <span>₹{(cartSubtotal >= freeShippingThreshold ? cartTotal : cartTotal + 99).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#111111] text-[#F7F5F0] hover:bg-[#222222] transition-colors text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#888888]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A52A2A]" />
                <span>30-Day Campus Guarantee • Free Size Exchange</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
