import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

export const Footer = () => {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeHelpModal, setActiveHelpModal] = useState(null); // 'shipping', 'returns', 'size-guide', 'faqs'

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      showToast('🎉 Welcome to STEPUP! Use code CAMPUS15 for 15% off.');
      setEmail('');
    }
  };

  const helpContents = {
    shipping: {
      title: 'Campus Shipping & Delivery',
      content: (
        <div className="space-y-3 text-xs text-[#666666] leading-relaxed">
          <p>
            We offer <strong>Free Campus Delivery</strong> across India on all footwear orders over ₹1,499.
          </p>
          <p>
            Standard shipping takes 2–4 business days to major university hubs and student residences. Orders placed before 1:00 PM IST ship out the same afternoon.
          </p>
          <p>
            Real-time tracking links are provided via email as soon as your parcel is dispatched.
          </p>
        </div>
      )
    },
    returns: {
      title: '30-Day Campus Returns & Exchanges',
      content: (
        <div className="space-y-3 text-xs text-[#666666] leading-relaxed">
          <p>
            Need a different size? We offer <strong>100% free size exchanges</strong> within 30 days of receiving your order.
          </p>
          <p>
            Shoes must be unworn outdoors with clean soles and original box tags intact. Doorstep reverse pickup is arranged directly from your dorm or home address.
          </p>
        </div>
      )
    },
    'size-guide': {
      title: 'Footwear Size Guide (UK / India)',
      content: (
        <div className="space-y-3 text-xs text-[#666666] leading-relaxed">
          <p>
            All STEPUP silhouettes follow true-to-size standard Indian / UK unisex shoe sizing.
          </p>
          <div className="border border-[#E8E2D8] text-[11px] font-mono">
            <div className="grid grid-cols-3 p-2 bg-[#FAF9F6] font-semibold border-b border-[#E8E2D8] text-[#111111]">
              <span>UK / IND</span>
              <span>US Men / Women</span>
              <span>Foot Length</span>
            </div>
            <div className="grid grid-cols-3 p-2 border-b border-[#E8E2D8]/60">
              <span>UK 5</span>
              <span>US 6M / 7W</span>
              <span>24.0 cm</span>
            </div>
            <div className="grid grid-cols-3 p-2 border-b border-[#E8E2D8]/60">
              <span>UK 6</span>
              <span>US 7M / 8W</span>
              <span>24.8 cm</span>
            </div>
            <div className="grid grid-cols-3 p-2 border-b border-[#E8E2D8]/60">
              <span>UK 7</span>
              <span>US 8M / 9W</span>
              <span>25.7 cm</span>
            </div>
            <div className="grid grid-cols-3 p-2 border-b border-[#E8E2D8]/60">
              <span>UK 8</span>
              <span>US 9M / 10W</span>
              <span>26.5 cm</span>
            </div>
            <div className="grid grid-cols-3 p-2 border-b border-[#E8E2D8]/60">
              <span>UK 9</span>
              <span>US 10M / 11W</span>
              <span>27.3 cm</span>
            </div>
            <div className="grid grid-cols-3 p-2">
              <span>UK 10</span>
              <span>US 11M / 12W</span>
              <span>28.2 cm</span>
            </div>
          </div>
          <p className="text-[11px] text-[#888888]">
            Pro tip: If you wear thick winter or athletic socks, consider taking your regular size rather than sizing down.
          </p>
        </div>
      )
    },
    faqs: {
      title: 'Frequently Asked Questions',
      content: (
        <div className="space-y-4 text-xs text-[#666666] leading-relaxed">
          <div>
            <strong className="text-[#111111] block mb-0.5">Are STEPUP shoes durable for walking 10,000 steps daily?</strong>
            <span>Yes, every pair is engineered with dual-density high-rebound insoles and reinforced abrasion-resistant rubber outsoles specifically built for long campus walking days.</span>
          </div>
          <div>
            <strong className="text-[#111111] block mb-0.5">How does the student discount work?</strong>
            <span>Use promo code <strong>CAMPUS15</strong> at checkout for an instant 15% discount on all non-discounted footwear.</span>
          </div>
          <div>
            <strong className="text-[#111111] block mb-0.5">How do I clean my sneakers?</strong>
            <span>Our action leather and synthetic micro-suede wipe clean effortlessly with a damp microfiber cloth and mild soap. Avoid soaking canvas slip-ons in washing machines.</span>
          </div>
        </div>
      )
    }
  };

  return (
    <>
      <footer className="bg-[#111111] text-[#F7F5F0] pt-16 pb-12 border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Top Newsletter & Brand Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[#222222]">
            <div className="lg:col-span-6 space-y-3">
              <div className="space-y-1">
                <span className="font-heading font-bold text-3xl tracking-tighter text-[#F7F5F0] uppercase">
                  STEPUP STUDIO
                </span>
                <p className="text-xs font-mono text-[#D8CFC2] uppercase tracking-widest">
                  Step Up Your Campus Style.
                </p>
              </div>
              <p className="text-xs text-[#888888] max-w-md leading-relaxed">
                Modern footwear designed for college students and young adults aged 18–25. Built with ergonomic dual-layer cushioning for 10,000 daily campus steps, priced with student budgets in mind.
              </p>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-6 space-y-3">
              <h3 className="font-heading text-base font-semibold tracking-tight text-[#F7F5F0] uppercase">
                Unlock 15% Student Discount
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed">
                Sign up with your personal or student email to receive exclusive campus drops, lookbooks, and student discount codes.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter student email..."
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#333333] text-xs text-[#F7F5F0] placeholder-[#666666] focus:outline-hidden focus:border-[#F7F5F0] transition-colors font-sans"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#F7F5F0] hover:bg-[#EFECE5] text-[#111111] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </div>
                {subscribed && (
                  <div className="flex items-center gap-2 text-xs text-[#D8CFC2] pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A52A2A]" />
                    <span>Success! Use code <strong>CAMPUS15</strong> for 15% off your order.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Links Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 py-4 border-b border-[#222222]">
            
            {/* 1. SHOP */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D8CFC2]">
                Shop
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                <li>
                  <button onClick={() => navigate('/shop')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    All Footwear
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/men')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Men
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/women')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Women
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/sneakers')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left font-medium text-[#D8CFC2]">
                    Sneakers
                  </button>
                </li>
              </ul>
            </div>

            {/* 2. COMPANY */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D8CFC2]">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                <li>
                  <button onClick={() => navigate('/about')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/journal')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Journal
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/contact')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. HELP */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D8CFC2]">
                Help
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                <li>
                  <button onClick={() => setActiveHelpModal('shipping')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Shipping
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveHelpModal('returns')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Returns
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveHelpModal('size-guide')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Size Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveHelpModal('faqs')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    FAQs
                  </button>
                </li>
              </ul>
            </div>

            {/* 4. LEGAL */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D8CFC2]">
                Legal
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                <li>
                  <button onClick={() => navigate('/privacy-policy')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/terms')} className="hover:text-[#F7F5F0] transition-colors cursor-pointer text-left">
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* 5. SOCIAL */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold tracking-widest uppercase text-[#D8CFC2]">
                Social
              </h4>
              <ul className="space-y-2 text-xs text-[#888888]">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F7F5F0] transition-colors flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F7F5F0] transition-colors flex items-center gap-1.5"
                  >
                    <span>YouTube</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://pinterest.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#F7F5F0] transition-colors flex items-center gap-1.5"
                  >
                    <span>Pinterest</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & SEO Metadata */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
            <p>© 2026 STEPUP STUDIO. All rights reserved. Step Up Your Campus Style.</p>
            <div className="flex items-center gap-6">
              <span>Primary Keyword: Stylish Shoes for College Students</span>
              <span>All Prices in INR (₹)</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Help Modal */}
      {activeHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveHelpModal(null)}
            className="fixed inset-0 bg-[#111111]/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-lg bg-[#F7F5F0] border border-[#E8E2D8] p-6 sm:p-8 text-[#111111] shadow-2xl z-10 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
              <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-[#111111]">
                {helpContents[activeHelpModal]?.title}
              </h3>
              <button
                onClick={() => setActiveHelpModal(null)}
                className="p-1 text-[#666666] hover:text-[#111111] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2">
              {helpContents[activeHelpModal]?.content}
            </div>

            <div className="pt-3 border-t border-[#E8E2D8] flex justify-end">
              <button
                onClick={() => setActiveHelpModal(null)}
                className="px-5 py-2 bg-[#111111] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
