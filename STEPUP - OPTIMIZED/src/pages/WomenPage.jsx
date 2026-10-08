import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { WOMEN_PRODUCTS } from '../data/products';

export const WomenPage = () => {
  const { navigate } = useApp();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceBucket, setSelectedPriceBucket] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColour, setSelectedColour] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Categories specified for Women
  const categories = [
    { label: 'All Styles', value: 'all' },
    { label: 'Everyday Sneakers', value: 'Everyday Sneakers' },
    { label: 'Platform Sneakers', value: 'Platform Sneakers' },
    { label: 'Casual', value: 'Casual' },
    { label: 'Campus Classics', value: 'Campus Classics' }
  ];

  // Price buckets
  const priceBuckets = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under ₹2,000', value: 'under-2000', filter: (p) => p.price < 2000 },
    { label: '₹2,000 – ₹2,400', value: '2000-2400', filter: (p) => p.price >= 2000 && p.price <= 2400 },
    { label: 'Above ₹2,400', value: 'above-2400', filter: (p) => p.price > 2400 }
  ];

  // Sizes for Women (UK/IND 4 to 8)
  const sizes = ['all', 4, 5, 6, 7, 8];

  // Colours
  const colours = [
    { label: 'All Colours', value: 'all', hex: null },
    { label: 'White', value: 'White', hex: '#FFFFFF' },
    { label: 'Beige', value: 'Beige', hex: '#D8CFC2' },
    { label: 'Black', value: 'Black', hex: '#111111' },
    { label: 'Grey', value: 'Grey', hex: '#888888' },
    { label: 'Burgundy', value: 'Burgundy', hex: '#A52A2A' }
  ];

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedPriceBucket !== 'all',
    selectedSize !== 'all',
    selectedColour !== 'all'
  ].filter(Boolean).length;

  // Filter and Sort Processing
  const filteredProducts = useMemo(() => {
    let list = [...WOMEN_PRODUCTS];

    // Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Price Filter
    if (selectedPriceBucket !== 'all') {
      const bucket = priceBuckets.find((b) => b.value === selectedPriceBucket);
      if (bucket && bucket.filter) {
        list = list.filter(bucket.filter);
      }
    }

    // Size Filter
    if (selectedSize !== 'all') {
      const targetSize = Number(selectedSize);
      list = list.filter((p) => p.sizes && p.sizes.includes(targetSize));
    }

    // Colour Filter
    if (selectedColour !== 'all') {
      list = list.filter(
        (p) =>
          p.primaryColor === selectedColour ||
          (p.colors && p.colors.some((c) => c.family === selectedColour || c.name.toLowerCase().includes(selectedColour.toLowerCase())))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    }

    return list;
  }, [selectedCategory, selectedPriceBucket, selectedSize, selectedColour, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceBucket('all');
    setSelectedSize('all');
    setSelectedColour('all');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A52A2A]">
              Women's Collection
            </span>
            <span className="text-[#888888]">•</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              All Prices in ₹ INR
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase leading-none">
            WOMEN'S SHOES FOR COLLEGE
          </h1>

          <p className="text-xs sm:text-sm text-[#666666] max-w-xl leading-relaxed">
            Explore women’s sneakers for college students, including comfortable everyday pairs, classic court shoes, and platform styles. Find versatile college footwear for long class days, campus outfits, and plans after class.
          </p>
        </div>

        {/* Counter & Mobile Filter Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0">
          <span className="text-xs font-mono text-[#666666]">
            Showing <strong className="text-[#111111]">{filteredProducts.length}</strong> of {WOMEN_PRODUCTS.length} styles
          </span>

          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-white border border-[#E8E2D8] text-xs font-semibold uppercase tracking-wider text-[#111111] cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#A52A2A]" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
        </div>
      </div>

      {/* FILTER & SORT TOOLBAR (DESKTOP) */}
      <div className="hidden md:block bg-white border border-[#E8E2D8] p-5 space-y-4 shadow-2xs">
        
        {/* Row 1: Categories & Sorting */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8]/80">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium transition-all cursor-pointer border ${
                  selectedCategory === cat.value
                    ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-semibold'
                    : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#666666] hover:text-[#111111] hover:border-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">Sort By:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FAF9F6] border border-[#E8E2D8] text-xs text-[#111111] pl-3 pr-8 py-1.5 focus:outline-hidden focus:border-[#111111] cursor-pointer font-medium"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price Low to High</option>
                <option value="price-high">Price High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#666666] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2: Price, Size, Colour Filters */}
        <div className="grid grid-cols-12 gap-6 items-center pt-1 text-xs">
          
          {/* Price Filters */}
          <div className="col-span-5 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Price (₹ INR):</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {priceBuckets.map((bucket) => (
                <button
                  key={bucket.value}
                  onClick={() => setSelectedPriceBucket(bucket.value)}
                  className={`px-2.5 py-1 text-xs transition-colors cursor-pointer border ${
                    selectedPriceBucket === bucket.value
                      ? 'border-[#A52A2A] bg-[#A52A2A] text-white font-semibold'
                      : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="col-span-3 space-y-1.5 border-l border-[#E8E2D8] pl-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Size (UK):</span>
            <div className="flex items-center gap-1">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-mono transition-all cursor-pointer border ${
                    selectedSize === s
                      ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-bold'
                      : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#666666] hover:border-[#111111]'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour Filter */}
          <div className="col-span-4 space-y-1.5 border-l border-[#E8E2D8] pl-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Colour:</span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {colours.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedColour(c.value)}
                  className={`px-2 py-1 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer border ${
                    selectedColour === c.value
                      ? 'border-[#111111] bg-[#111111] text-[#F7F5F0] font-semibold'
                      : 'border-[#E8E2D8] bg-[#FAF9F6] text-[#666666] hover:border-[#111111]'
                  }`}
                >
                  {c.hex && (
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* MOBILE COLLAPSIBLE FILTER PANEL */}
      {mobileFiltersOpen && (
        <div className="md:hidden bg-white border border-[#E8E2D8] p-4 space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
            <span className="font-heading text-sm font-bold uppercase text-[#111111]">Refine Women's Shoes</span>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="p-1 text-[#666666] hover:text-[#111111]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sort on Mobile */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E8E2D8] text-xs p-2.5 text-[#111111]"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price Low to High</option>
              <option value="price-high">Price High to Low</option>
            </select>
          </div>

          {/* Categories */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Category</label>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs uppercase border ${
                    selectedCategory === cat.value
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAF9F6] text-[#666666] border-[#E8E2D8]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Price (₹)</label>
            <div className="flex flex-wrap gap-1.5">
              {priceBuckets.map((bucket) => (
                <button
                  key={bucket.value}
                  onClick={() => setSelectedPriceBucket(bucket.value)}
                  className={`px-3 py-1.5 text-xs border ${
                    selectedPriceBucket === bucket.value
                      ? 'bg-[#A52A2A] text-white border-[#A52A2A]'
                      : 'bg-[#FAF9F6] text-[#666666] border-[#E8E2D8]'
                  }`}
                >
                  {bucket.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Size (UK)</label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-9 h-9 text-xs font-mono border ${
                    selectedSize === s
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAF9F6] text-[#666666] border-[#E8E2D8]'
                  }`}
                >
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Colour */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#888888] block">Colour</label>
            <div className="flex flex-wrap gap-1.5">
              {colours.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedColour(c.value)}
                  className={`px-3 py-1.5 text-xs flex items-center gap-1.5 border ${
                    selectedColour === c.value
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-[#FAF9F6] text-[#666666] border-[#E8E2D8]'
                  }`}
                >
                  {c.hex && (
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-black/20"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={handleResetFilters}
              className="flex-1 py-2.5 bg-[#FAF9F6] border border-[#E8E2D8] text-xs uppercase font-semibold text-[#666666]"
            >
              Reset All
            </button>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="flex-1 py-2.5 bg-[#111111] text-white text-xs uppercase font-semibold"
            >
              Apply ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}

      {/* ACTIVE FILTER PILLS */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-[#888888] text-[11px] font-mono uppercase">Active Filters:</span>
          
          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E8E2D8] text-[#111111]">
              Category: {selectedCategory}
              <X 
                className="w-3 h-3 cursor-pointer text-[#888888] hover:text-[#A52A2A]" 
                onClick={() => setSelectedCategory('all')} 
              />
            </span>
          )}

          {selectedPriceBucket !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E8E2D8] text-[#111111]">
              Price: {priceBuckets.find((b) => b.value === selectedPriceBucket)?.label}
              <X 
                className="w-3 h-3 cursor-pointer text-[#888888] hover:text-[#A52A2A]" 
                onClick={() => setSelectedPriceBucket('all')} 
              />
            </span>
          )}

          {selectedSize !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E8E2D8] text-[#111111]">
              Size: UK {selectedSize}
              <X 
                className="w-3 h-3 cursor-pointer text-[#888888] hover:text-[#A52A2A]" 
                onClick={() => setSelectedSize('all')} 
              />
            </span>
          )}

          {selectedColour !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E8E2D8] text-[#111111]">
              Colour: {selectedColour}
              <X 
                className="w-3 h-3 cursor-pointer text-[#888888] hover:text-[#A52A2A]" 
                onClick={() => setSelectedColour('all')} 
              />
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-[11px] font-mono uppercase text-[#A52A2A] hover:underline cursor-pointer ml-1"
          >
            Clear All
          </button>
        </div>
      )}

      {/* RESPONSIVE PRODUCT GRID: 4 columns desktop, 2 columns tablet, 2 columns mobile */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white border border-[#E8E2D8] space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF9F6] border border-[#E8E2D8] text-[#888888] flex items-center justify-center mx-auto">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-base font-semibold text-[#111111]">
              No Women's Shoes Match Your Filter Criteria
            </h3>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              Try adjusting your price range, colour, or size to see all available women's styles.
            </p>
          </div>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-[#111111] text-[#F7F5F0] text-xs uppercase tracking-wider font-semibold hover:bg-[#222222] transition-colors cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
