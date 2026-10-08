import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Tag, HeartHandshake, Compass, Layers, ChevronRight } from 'lucide-react';

export const AboutPage = () => {
  const { navigate } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-20 space-y-20">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold">ABOUT</span>
      </nav>

      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto border-b border-[#E8E2D8] pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE5] border border-[#E8E2D8] text-[10px] font-mono tracking-widest uppercase text-[#111111]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A52A2A]"></span>
          <span>Brand Mission & Campus Focus</span>
        </div>
        
        <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
          BUILT FOR CAMPUS LIFE.
        </h1>

        <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mx-auto">
          STEPUP is a fictional footwear brand created around the idea that college students should not have to choose between style, comfort and affordability.
        </p>
      </section>

      {/* Editorial Image & OUR IDEA Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="aspect-4/5 bg-[#EFECE5] border border-[#E8E2D8] overflow-hidden">
          <img
            src="/images/stepup_urban_classic.jpg"
            alt="STEPUP minimalist campus footwear editorial"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              01 / The Origin
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-tight">
              OUR IDEA
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            University life moves fast. A typical student day starts with an 8 AM lecture on one side of campus, moves through three-hour lab rotations, long library research grinds, and ends at evening social plans or cafe discussions.
          </p>

          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Yet the footwear market consistently forced young adults into a frustrating compromise: buy expensive athletic sneakers with inflated corporate markups, settle for stiff formal shoes, or wear flimsy canvas sneakers that offer zero support and blow out within weeks.
          </p>

          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Our idea was simple: design high-aesthetic, minimal editorial footwear tailored specifically for student lifestyles—combining durable materials, cloud-like foam cushioning, and honest prices in Indian Rupees.
          </p>
        </div>
      </section>

      {/* WHY STEPUP Section */}
      <section className="space-y-8 pt-6 border-t border-[#E8E2D8]">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            02 / Core Pillars
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#111111] uppercase tracking-tight">
            WHY STEPUP
          </h2>
          <p className="text-xs text-[#666666]">
            Every pair is conceptualized around four uncompromising design standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A]">
              <Tag className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-heading text-base font-bold text-[#111111] uppercase">
              Student-Friendly Pricing
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              We design direct-to-student footwear priced between ₹1,699 and ₹2,799. No celebrity endorsement surcharges, no artificial hype markups—just honest, accessible style.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A]">
              <Layers className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-heading text-base font-bold text-[#111111] uppercase">
              Everyday Comfort
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Engineered with 12mm high-rebound ergonomic insoles, padded ankle collars, and responsive shock-absorbing midsoles that support 10,000 continuous campus steps without heel fatigue.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A]">
              <Compass className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-heading text-base font-bold text-[#111111] uppercase">
              Trend-Led Designs
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Inspired by clean European terrace aesthetics, retro 90s court profiles, and modern streetwear proportions. Designed to drape effortlessly under wide-leg denim and relaxed chinos.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] space-y-3">
            <div className="w-10 h-10 rounded-xs bg-[#FAF9F6] border border-[#E8E2D8] flex items-center justify-center text-[#A52A2A]">
              <HeartHandshake className="w-5 h-5 stroke-[1.8]" />
            </div>
            <h3 className="font-heading text-base font-bold text-[#111111] uppercase">
              Campus-Focused Footwear
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Constructed with wipe-clean vegan leather, reinforced toe caps, and abrasion-resistant gum rubber outsoles built to survive rain, cafeteria spills, and concrete campus stairs.
            </p>
          </div>
        </div>
      </section>

      {/* OUR AUDIENCE Section */}
      <section className="bg-white border border-[#E8E2D8] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            03 / Who We Build For
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] uppercase tracking-tight">
            OUR AUDIENCE
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            STEPUP is designed for students and young adults aged 18–25. Whether you are navigating your first semester, grinding through final exam weeks, presenting at campus festivals, or heading out for weekend city adventures, our footwear is crafted to match your ambition and energy.
          </p>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            We celebrate personal style that feels authentic, confident, and effortless.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap gap-2 text-xs font-mono text-[#111111]">
          {['College Students', 'Young Adults (18–25)', 'Campus Daily Wear', 'Streetwear & Denim Fits'].map((chip) => (
            <span key={chip} className="px-3 py-1.5 bg-[#FAF9F6] border border-[#E8E2D8]">
              • {chip}
            </span>
          ))}
        </div>
      </section>

      {/* Final Collection CTA */}
      <section className="p-10 bg-[#FAF9F6] border border-[#E8E2D8] text-center space-y-4">
        <h3 className="font-heading text-2xl font-bold text-[#111111] uppercase">
          Step Into Your Next Era
        </h3>
        <p className="text-xs text-[#666666] max-w-md mx-auto">
          Explore our complete campus footwear lineup and enjoy free university delivery on orders over ₹1,499.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3.5 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Explore All Footwear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
