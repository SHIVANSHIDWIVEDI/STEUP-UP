import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { ArrowRight, ArrowLeft, Sparkles, Check, ChevronRight } from 'lucide-react';

export const HomePage = () => {
  const { navigate, allProducts, categories, blogs } = useApp();
  const trendingScrollRef = useRef(null);

  // Products for sections
  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 6);
  const trendingProducts = allProducts.filter((p) => p.isTrending);

  const scrollTrending = (direction) => {
    if (trendingScrollRef.current) {
      const amount = direction === 'left' ? -380 : 380;
      trendingScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 md:space-y-36 pb-24">
      
      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-16 md:pt-12 md:pb-24 border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 lg:space-y-8 animate-hero-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE5] border border-[#E8E2D8] text-[10px] font-mono tracking-widest uppercase text-[#111111]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A52A2A]"></span>
                <span>Fall / Winter Campus '26 Collection</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#111111] uppercase leading-[0.92]">
                  Step into <br />
                  <span className="text-[#A52A2A]">your next</span> era.
                </h1>

                <p className="text-sm sm:text-base text-[#666666] max-w-lg leading-relaxed font-normal">
                  Stylish footwear made for campus days, late-night plans and everything in between. High-end editorial aesthetics built for 10,000 daily steps.
                </p>
              </div>

              {/* CTAs with micro-interactions */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 animate-hero-cta">
                <button
                  onClick={() => navigate('/shop')}
                  className="px-8 py-4 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('/shop?category=everyday-sneakers')}
                  className="px-8 py-4 bg-transparent hover:bg-[#EFECE5] text-[#111111] border border-[#111111] text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center cursor-pointer"
                >
                  Explore Sneakers
                </button>
              </div>

              {/* Verified Campus Social Proof */}
              <div className="pt-6 border-t border-[#E8E2D8] flex items-center gap-8 text-xs text-[#666666]">
                <div>
                  <span className="font-heading font-bold text-base text-[#111111] block">4.9 / 5.0</span>
                  <span className="text-[11px] text-[#888888]">Rated by 1,200+ students</span>
                </div>
                <div className="h-8 w-[1px] bg-[#E8E2D8]" />
                <div>
                  <span className="font-heading font-bold text-base text-[#111111] block">10K Steps</span>
                  <span className="text-[11px] text-[#888888]">OrthoCloud™ all-day comfort</span>
                </div>
                <div className="h-8 w-[1px] bg-[#E8E2D8] hidden sm:block" />
                <div className="hidden sm:block">
                  <span className="font-heading font-bold text-base text-[#111111] block">Free Delivery</span>
                  <span className="text-[11px] text-[#888888]">To university dorms & hubs</span>
                </div>
              </div>

            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 animate-hero-scale">
              <div className="relative aspect-4/5 sm:aspect-1/1 lg:aspect-4/5 bg-[#EFECE5] border border-[#E8E2D8] overflow-hidden group">
                <img
                  src="/images/stepup_urban_classic.jpg"
                  alt="STEPUP Urban Classic 88 Sneaker"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle Floating Editorial Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#F7F5F0]/95 backdrop-blur-xs border border-[#E8E2D8] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A] block">
                      Featured Release
                    </span>
                    <h3 className="font-heading text-sm font-semibold text-[#111111]">
                      STEPUP Urban Classic 88
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="font-heading text-sm font-semibold text-[#111111] block">
                      ₹2,299
                    </span>
                    <button
                      onClick={() => navigate('/shop')}
                      className="text-[11px] text-[#666666] hover:text-[#111111] underline transition-colors cursor-pointer"
                    >
                      View Shoe →
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTION: BUILT FOR CAMPUS LIFE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-[#E8E2D8] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              Essential Campus Rotation
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase">
              BUILT FOR CAMPUS LIFE
            </h2>
          </div>
          <p className="text-xs text-[#666666] max-w-md">
            Footwear engineered to endure concrete lecture halls, library sprints, and evening socials without compromising on clean silhouette lines.
          </p>
        </div>

        {/* 6 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="px-8 py-3.5 bg-transparent hover:bg-[#111111] text-[#111111] hover:text-[#F7F5F0] border border-[#111111] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
          >
            View All Footwear ({allProducts.length})
          </button>
        </div>
      </section>

      {/* 4. CATEGORY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E8E2D8] pb-6 mb-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            Curated Categories
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
            Shop By Campus Occasion
          </h2>
        </div>

        {/* 3 Large Visual Editorial Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className="group relative aspect-3/4 sm:aspect-4/5 lg:aspect-3/4 bg-[#111111] overflow-hidden cursor-pointer border border-[#E8E2D8]"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-75 group-hover:scale-104 transition-all duration-700 ease-out"
                loading="lazy"
              />

              {/* Minimal Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/25 to-transparent pointer-events-none" />

              {/* Bottom Editorial Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-2">
                <span className="text-[10px] font-mono text-[#D8CFC2] uppercase tracking-widest block">
                  {cat.itemCount}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F7F5F0] uppercase tracking-tight group-hover:text-[#D8CFC2] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-[#E8E2D8]/80 line-clamp-2 leading-relaxed">
                  {cat.tagline}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#F7F5F0] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explore Styles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TRENDING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4 border-b border-[#E8E2D8] pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              Real-Time Campus Demand
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
              WHAT'S MOVING RIGHT NOW
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollTrending('left')}
              className="p-2.5 bg-white border border-[#E8E2D8] hover:border-[#111111] text-[#111111] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTrending('right')}
              className="p-2.5 bg-white border border-[#E8E2D8] hover:border-[#111111] text-[#111111] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Products Container */}
        <div
          ref={trendingScrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {trendingProducts.map((product) => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. STYLE GUIDE / CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4 border-b border-[#E8E2D8] pb-6">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              Editorial & Campus Outfits
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
              YOUR CAMPUS STYLE GUIDE
            </h2>
          </div>
          <button
            onClick={() => navigate('/journal')}
            className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#A52A2A] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3 Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((article) => (
            <article
              key={article.id}
              onClick={() => navigate(`/journal/${article.slug}`)}
              className="group flex flex-col bg-white border border-[#E8E2D8] hover:border-[#111111] transition-colors cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-16/10 bg-[#EFECE5] overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#111111] text-[#F7F5F0] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1">
                  {article.category}
                </span>
              </div>

              {/* Text */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-[#888888] uppercase tracking-wider">
                    {article.date} • {article.readTime}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-[#111111] group-hover:text-[#A52A2A] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#A52A2A]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. WHY STEPUP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] border border-[#E8E2D8] p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl mb-12">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              The STEPUP Standard
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-bold tracking-tight text-[#111111] uppercase mt-1">
              Why Students Choose STEPUP
            </h2>
            <p className="text-xs text-[#666666] mt-2 leading-relaxed">
              We stripped out bloated celebrity sponsorships and wholesale markups to engineer footwear specifically for university lives.
            </p>
          </div>

          {/* 4 Minimal Features Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-[#A52A2A] block">
                01 / COMFORT
              </span>
              <h3 className="font-heading text-base font-semibold text-[#111111]">
                Campus-Tested Comfort
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Fitted with high-density OrthoCloud™ dual-layer insoles engineered for 10,000 daily steps across concrete walkways and endless lab sessions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-[#A52A2A] block">
                02 / ACCESSIBLE
              </span>
              <h3 className="font-heading text-base font-semibold text-[#111111]">
                Student-Friendly Prices
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Direct-from-studio pricing strictly between ₹1,699 and ₹2,799. Plus verified 15% student discounts for university email holders.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-[#A52A2A] block">
                03 / RESILIENT
              </span>
              <h3 className="font-heading text-base font-semibold text-[#111111]">
                Everyday Durability
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Double-stitched stress points, water-resistant wipe-clean synthetic uppers, and non-marking vulcanized gum soles.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="space-y-3">
              <span className="font-mono text-xs font-semibold text-[#A52A2A] block">
                04 / AESTHETICS
              </span>
              <h3 className="font-heading text-base font-semibold text-[#111111]">
                Trend-Led Designs
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                Clean silhouettes designed to seamlessly pair with baggy denim, relaxed cargos, pleated trousers, and casual shorts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STUDENT FOOTWEAR EDITORIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 border-t border-[#E8E2D8] pt-10 sm:pt-14">
          <div className="lg:col-span-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">A practical campus guide</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-2">How to choose shoes for college</h2>
          </div>
          <div className="lg:col-span-8 space-y-5 text-sm text-[#666666] leading-relaxed">
            <p>College days can mean a walk to class, time on your feet between lectures, and plans after the last bell. The best sneakers for college students should feel comfortable through a full day, work with more than one outfit, and fit the budget you have set. Start with the routine you actually have: breathable mesh suits warm, active days, while a wipe-clean court sneaker is easy to style for everyday wear.</p>
            <p>When comparing affordable sneakers for college students, look at the upper, cushioning, outsole grip, and fit instead of choosing by appearance alone. A padded heel and a supportive insole can make long campus walks more comfortable; a durable sole and easy-care materials can help a daily pair handle regular use. Check the size guide and leave enough room at the toe, especially if you plan to wear thicker socks.</p>
            <p>For a versatile college footwear rotation, choose a neutral everyday sneaker for classes and keep a sportier pair for workouts or fast walks. STEPUP’s student-focused collection brings together casual shoes, court-inspired classics, and lightweight runners, with product details to help you compare fit, materials, comfort features, and price before choosing your pair.</p>
            <button onClick={() => navigate('/student-picks')} className="text-xs font-semibold uppercase tracking-wider text-[#111111] hover:text-[#A52A2A]">Explore student picks <ArrowRight className="w-3.5 h-3.5 inline ml-1" /></button>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#111111] text-[#F7F5F0] p-10 sm:p-16 lg:p-20 overflow-hidden border border-[#222222] text-center space-y-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D8CFC2] block">
            Autumn / Winter Campus Drop
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-[#F7F5F0] uppercase max-w-3xl mx-auto leading-[0.95]">
            YOUR NEXT PAIR IS WAITING.
          </h2>

          <p className="text-xs sm:text-sm text-[#888888] max-w-md mx-auto leading-relaxed">
            Elevate your daily campus rotation. Free campus delivery on orders over ₹1,499 and 30-day hassle-free student exchanges.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/shop')}
              className="px-10 py-4 bg-[#F7F5F0] hover:bg-[#FAF9F6] text-[#111111] text-xs font-semibold uppercase tracking-widest transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
