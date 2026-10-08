import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

export const PrivacyPolicyPage = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold">PRIVACY POLICY</span>
      </nav>

      <div className="bg-white p-8 sm:p-12 border border-[#E8E2D8] space-y-6">
        <div className="border-b border-[#E8E2D8] pb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            Legal Transparency
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#888888] font-mono mt-1">Effective Date: Fall Semester 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <p>
            STEPUP Footwear Inc. ("STEPUP", "we", "our") values your trust. This Privacy Policy details how we handle information collected through our website and university campus pop-ups.
          </p>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">1. Student Information We Collect</h2>
            <p>
              When you browse our footwear catalog, save items to your bag, or claim your 15% student discount via university email, we collect necessary identifiers (name, college email, shipping dorm address, and shoe sizing preferences).
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">2. Use of Information</h2>
            <p>
              Your data is utilized strictly to fulfill footwear orders, coordinate campus delivery drops, process size exchanges, and alert you to seasonal footwear releases. We do not sell or monetize student data.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">3. Local Storage & Preferences</h2>
            <p>
              We utilize browser localStorage to persist your active shopping bag, saved wishlist items, and applied student coupons without requiring friction-heavy account logins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
