import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight } from 'lucide-react';

export const TermsPage = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-8">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold">TERMS & CONDITIONS</span>
      </nav>

      <div className="bg-white p-8 sm:p-12 border border-[#E8E2D8] space-y-6">
        <div className="border-b border-[#E8E2D8] pb-6">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            Terms of Service
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#888888] font-mono mt-1">Effective Date: Fall Semester 2026</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">1. Acceptance of Terms</h2>
            <p>
              By accessing the STEPUP platform, purchasing footwear, or applying discount codes, you agree to comply with our Terms of Service.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">2. Student Discount Guidelines</h2>
            <p>
              Discount code CAMPUS15 entitles verified university students to 15% off regular footwear prices. Fraudulent use or commercial re-selling of student inventory is strictly prohibited.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-base font-bold text-[#111111]">3. 30-Day Campus Guarantee & Exchanges</h2>
            <p>
              We want you to love your rotation. Footwear may be exchanged for alternative sizing within 30 days of campus arrival, provided shoes remain in unworn or lightly tested condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
