import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { ChevronRight, Filter, X, SlidersHorizontal, ArrowUpDown, Sparkles, Flame, Check } from 'lucide-react';

export const SneakersPage = () => {
  const { allProducts, navigate } = useApp();

  // The 10 designated fictional STEPUP sneakers
  const sneakerIds = [
    'stepup-men-campus-runner',
    'stepup-men-street-low',
    'stepup-men-urban-classic',
    'stepup-men-daily-slip',
    'stepup-men-campus-90',
    'stepup-men-court-one',
    'stepup-men-street-flex',
    'stepup-men-weekend-low',
    'stepup-women-campus-glide',
    'stepup-women-elevate-platform'
  ];

  const baseSneakers = useMemo(() => {
    return allProducts.filter((p) => sneakerIds.includes(p.id));
  }, [allProducts]);

  // Section / View Filter Tabs
  const [activeSection, setActiveSection] = useState('ALL'); // 'ALL', 'TRENDING', 'EVERYDAY', 'STREETWEAR', 'BUDGET'
  
  // Filtering states
  const [selectedPriceRange, setSelectedPriceRange] = useState('ALL'); // 'ALL', 'UNDER_2000', '2000_2500', 'ABOVE_2500'
  const [selectedColor, setSelectedColor] = useState('ALL'); // 'ALL', 'White', 'Black', 'Beige', 'Burgundy', 'Grey'
  const [selectedSize, setSelectedSize] = useState('ALL'); // 'ALL', or number
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'newest', 'price-asc', 'price-desc'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter options definitions
  const priceOptions = [
    { id: 'ALL', label: 'All Prices' },
    { id: 'UNDER_2000', label: 'Under ₹2,000' },
    { id: '2000_2500', label: '₹2,000–₹2,500' },
    { id: 'ABOVE_2500', label: 'Above ₹2,500' }
  ];

  const colorOptions = [
    { name: 'ALL', label: 'All Colours', hex: null },
    { name: 'White', label: 'White', hex: '#FFFFFF' },
    { name: 'Black', label: 'Black', hex: '#111111' },
    { name: 'Beige', label: 'Beige', hex: '#D8CFC2' },
    { name: 'Burgundy', label: 'Burgundy', hex: '#A52A2A' },
    { name: 'Grey', label: 'Grey', hex: '#888888' }
  ];

  const sizeOptions = ['ALL', 4, 5, 6, 7, 8, 9, 10, 11];

  // Specific curated subset definitions for the 4 required sections
  const trendingSneakers = useMemo(() => {
    return baseSneakers.filter((p) => p.isTrending);
  }, [baseSneakers]);

  const everydaySneakers = useMemo(() => {
    return baseSneakers.filter((p) => p.category === 'Everyday Sneakers' || p.name.includes('Campus') || p.name.includes('Daily'));
  }, [baseSneakers]);

  const streetwearSneakers = useMemo(() => {
    return baseSneakers.filter((p) => p.category === 'Streetwear' || p.category === 'Platform Sneakers' || p.name.includes('Street'));
  }, [baseSneakers]);

  const budgetSneakers = useMemo(() => {
    return baseSneakers.filter((p) => p.price <= 2000);
  }, [baseSneakers]);

  // Apply filters and sorting
  const filteredSneakers = useMemo(() => {
    let result = [...baseSneakers];

    // Section filtering
    if (activeSection === 'TRENDING') {
      result = result.filter((p) => p.isTrending);
    } else if (activeSection === 'EVERYDAY') {
      result = result.filter((p) => p.category === 'Everyday Sneakers' || p.name.includes('Campus') || p.name.includes('Daily'));
    } else if (activeSection === 'STREETWEAR') {
      result = result.filter((p) => p.category === 'Streetwear' || p.category === 'Platform Sneakers' || p.name.includes('Street'));
    } else if (activeSection === 'BUDGET') {
      result = result.filter((p) => p.price <= 2000);
    }

    // Price filtering
    if (selectedPriceRange === 'UNDER_2000') {
      result = result.filter((p) => p.price < 2000);
    } else if (selectedPriceRange === '2000_2500') {
      result = result.filter((p) => p.price >= 2000 && p.price <= 2500);
    } else if (selectedPriceRange === 'ABOVE_2500') {
      result = result.filter((p) => p.price > 2500);
    }

    // Colour filtering
    if (selectedColor !== 'ALL') {
      result = result.filter((p) =>
        p.primaryColor.toLowerCase() === selectedColor.toLowerCase() ||
        p.colors.some((c) => c.family.toLowerCase() === selectedColor.toLowerCase() || c.name.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    // Size filtering
    if (selectedSize !== 'ALL') {
      result = result.filter((p) => p.sizes.includes(Number(selectedSize)));
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [baseSneakers, activeSection, selectedPriceRange, selectedColor, selectedSize, sortBy]);

  const activeFilterCount =
    (activeSection !== 'ALL' ? 1 : 0) +
    (selectedPriceRange !== 'ALL' ? 1 : 0) +
    (selectedColor !== 'ALL' ? 1 : 0) +
    (selectedSize !== 'ALL' ? 1 : 0);

  const resetAllFilters = () => {
    setActiveSection('ALL');
    setSelectedPriceRange('ALL');
    setSelectedColor('ALL');
    setSelectedSize('ALL');
    setSortBy('featured');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="bg-[#FAF9F6] border-b border-[#E8E2D8] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
            <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
              HOME
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
            <span className="text-[#111111] font-semibold">SNEAKERS</span>
          </nav>

          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFECE5] border border-[#E8E2D8] text-[10px] font-mono tracking-widest uppercase text-[#111111]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A52A2A]"></span>
              <span>University Footwear Drop</span>
            </div>
            
            <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[#111111] uppercase leading-tight">
              BEST SNEAKERS FOR COLLEGE STUDENTS
            </h1>

            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              Compare stylish, comfortable sneakers for college students, from lightweight everyday pairs to court-inspired classics. Find affordable college sneakers for lectures, long campus walks, and casual plans.
            </p>
          </div>

          {/* Quick Jump / Section Switcher Tabs */}
          <div className="pt-4 flex flex-wrap gap-2 sm:gap-3">
            {[
              { id: 'ALL', label: 'All Sneakers' },
              { id: 'TRENDING', label: 'Trending Now' },
              { id: 'EVERYDAY', label: 'Everyday Campus Sneakers' },
              { id: 'STREETWEAR', label: 'Streetwear Picks' },
              { id: 'BUDGET', label: 'Budget-Friendly Picks' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all cursor-pointer border ${
                  activeSection === tab.id
                    ? 'bg-[#111111] text-[#F7F5F0] border-[#111111]'
                    : 'bg-white text-[#111111] border-[#E8E2D8] hover:border-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. CURATED HIGHLIGHTS SHOWCASE (When viewing ALL) */}
      {activeSection === 'ALL' && activeFilterCount === 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* SECTION: TRENDING NOW */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A] block">
                  Campus Demand
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                  TRENDING NOW
                </h2>
              </div>
              <button
                onClick={() => setActiveSection('TRENDING')}
                className="text-xs font-mono uppercase text-[#111111] hover:text-[#A52A2A] underline cursor-pointer"
              >
                View Trending ({trendingSneakers.length}) →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {trendingSneakers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* SECTION: EVERYDAY CAMPUS SNEAKERS */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A] block">
                  10,000 Step Comfort
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                  EVERYDAY CAMPUS SNEAKERS
                </h2>
              </div>
              <button
                onClick={() => setActiveSection('EVERYDAY')}
                className="text-xs font-mono uppercase text-[#111111] hover:text-[#A52A2A] underline cursor-pointer"
              >
                View Everyday ({everydaySneakers.length}) →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {everydaySneakers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* SECTION: STREETWEAR PICKS */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A] block">
                  Baggy Denim & Proportions
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                  STREETWEAR PICKS
                </h2>
              </div>
              <button
                onClick={() => setActiveSection('STREETWEAR')}
                className="text-xs font-mono uppercase text-[#111111] hover:text-[#A52A2A] underline cursor-pointer"
              >
                View Streetwear ({streetwearSneakers.length}) →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {streetwearSneakers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* SECTION: BUDGET-FRIENDLY PICKS */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#E8E2D8] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A] block">
                  Priced Under ₹2,000
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase text-[#111111]">
                  BUDGET-FRIENDLY PICKS
                </h2>
              </div>
              <button
                onClick={() => setActiveSection('BUDGET')}
                className="text-xs font-mono uppercase text-[#111111] hover:text-[#A52A2A] underline cursor-pointer"
              >
                View Budget ({budgetSneakers.length}) →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {budgetSneakers.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

        </section>
      )}

      {/* 3. MAIN CATALOG WITH FILTERS & SORTING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filter & Sorting Controls Header */}
        <div className="border-b border-[#E8E2D8] pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-bold uppercase text-[#111111]">
              Sneakers Catalog
            </span>
            <span className="text-xs font-mono text-[#666666]">
              ({filteredSneakers.length} Styles)
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-mono text-[#A52A2A] hover:underline cursor-pointer flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Clear All ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-white border border-[#E8E2D8] text-xs font-medium uppercase tracking-wider text-[#111111]"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#666666] font-mono hidden sm:inline uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-medium text-[#111111] focus:outline-hidden focus:border-[#111111] cursor-pointer"
              >
                <option value="featured">Featured Rotation</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content Layout: Desktop Filters Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 bg-white p-6 border border-[#E8E2D8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
              <span className="font-heading text-sm font-bold uppercase tracking-wider text-[#111111]">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] font-mono text-[#A52A2A] hover:underline cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* 1. Price Range Filter */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666] block">
                Price (INR)
              </span>
              <div className="space-y-1.5">
                {priceOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2.5 text-xs text-[#111111] cursor-pointer hover:text-[#A52A2A]"
                  >
                    <input
                      type="radio"
                      name="sneaker-price"
                      checked={selectedPriceRange === opt.id}
                      onChange={() => setSelectedPriceRange(opt.id)}
                      className="accent-[#A52A2A] cursor-pointer"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Colour Filter */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666] block">
                Colour
              </span>
              <div className="grid grid-cols-2 gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-2.5 py-1.5 text-xs border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-semibold'
                        : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {c.hex && (
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span className="truncate">{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Size Filter */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D8]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#666666]">
                  Size (UK)
                </span>
                <span className="text-[10px] font-mono text-[#888888]">Unisex</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono border text-center transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-bold'
                        : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#111111] hover:border-[#111111]'
                    }`}
                  >
                    {sz === 'ALL' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Campus Guarantee Note */}
            <div className="p-3 bg-[#FAF9F6] border border-[#E8E2D8] text-[11px] text-[#666666] space-y-1">
              <span className="font-semibold text-[#111111] block">Campus Size Exchange</span>
              Free size swaps within 30 days if your fit isn't 100% dialled in.
            </div>

          </aside>

          {/* Product Grid: Desktop 3 cols (with sidebar = 4 grid) or 4 cols / 2 cols mobile */}
          <div className="lg:col-span-3">
            {filteredSneakers.length === 0 ? (
              <div className="p-12 text-center bg-white border border-[#E8E2D8] space-y-4">
                <span className="text-sm font-heading font-semibold uppercase text-[#111111] block">
                  No Sneakers Match These Filters
                </span>
                <p className="text-xs text-[#666666] max-w-sm mx-auto">
                  Try clearing your price, colour, or size filter to see all 10 campus sneaker silhouettes.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {filteredSneakers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </section>

      {/* 4. MOBILE FILTERS DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xs bg-[#F7F5F0] h-full p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
                <h3 className="font-heading text-lg font-bold uppercase text-[#111111]">
                  Sneaker Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#666666] hover:text-[#111111]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#666666] block">
                  Price (INR)
                </span>
                <div className="space-y-2">
                  {priceOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="mobile-price"
                        checked={selectedPriceRange === opt.id}
                        onChange={() => setSelectedPriceRange(opt.id)}
                        className="accent-[#A52A2A]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Colour Filter */}
              <div className="space-y-2 pt-4 border-t border-[#E8E2D8]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#666666] block">
                  Colour
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-2 text-xs border text-left flex items-center gap-2 ${
                        selectedColor === c.name
                          ? 'border-[#111111] bg-[#111111] text-[#F7F5F0]'
                          : 'border-[#E8E2D8] bg-white text-[#111111]'
                      }`}
                    >
                      <span className="truncate">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-2 pt-4 border-t border-[#E8E2D8]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#666666] block">
                  Size (UK)
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {sizeOptions.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-mono border text-center ${
                        selectedSize === sz
                          ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-bold'
                          : 'border-[#E8E2D8] bg-white text-[#111111]'
                      }`}
                    >
                      {sz === 'ALL' ? 'All' : sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D8] space-y-2">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#111111] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider"
              >
                Apply Filters ({filteredSneakers.length})
              </button>
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-full py-2 bg-transparent text-[#666666] text-xs font-semibold uppercase"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
