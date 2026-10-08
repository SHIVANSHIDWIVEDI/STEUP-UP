import React from 'react';
import { BRANDS } from '../../data/products';
import { Filter, RotateCcw, Check, Star } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  setFilters,
  resetFilters,
  availableSubcategories = [],
  totalResultsCount = 0
}) => {
  const sizes = [6, 7, 8, 9, 10, 11];

  const handleBrandToggle = (brand) => {
    const exists = filters.brands.includes(brand);
    if (exists) {
      setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
    } else {
      setFilters(prev => ({ ...prev, brands: [...prev.brands, brand] }));
    }
  };

  const handleSizeToggle = (size) => {
    if (filters.size === size) {
      setFilters(prev => ({ ...prev, size: null }));
    } else {
      setFilters(prev => ({ ...prev, size }));
    }
  };

  return (
    <aside className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h3 className="font-heading font-black text-zinc-950 text-base uppercase tracking-tight">Filter Shoes</h3>
          <span className="text-[11px] bg-zinc-100 text-zinc-900 font-extrabold px-2 py-0.5 rounded-full">
            {totalResultsCount}
          </span>
        </div>

        <button
          onClick={resetFilters}
          className="text-xs text-red-600 hover:text-red-700 font-extrabold flex items-center gap-1 cursor-pointer uppercase tracking-wider"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Subcategory Filter */}
      {availableSubcategories.length > 0 && (
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest block">
            Sub Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilters(prev => ({ ...prev, subcategory: 'all' }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors uppercase tracking-wider ${
                filters.subcategory === 'all'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              All
            </button>
            {availableSubcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setFilters(prev => ({ ...prev, subcategory: sub.id }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors uppercase tracking-wider ${
                  filters.subcategory === sub.id
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs">
          <label className="font-black text-zinc-950 uppercase tracking-widest text-[10px]">
            Max Price: ₹{filters.maxPrice}
          </label>
          <span className="text-zinc-500 font-semibold">₹1,000 - ₹3,000</span>
        </div>
        <input
          type="range"
          min="1000"
          max="3000"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, maxPrice: 2000 }))}
            className={`flex-1 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider border transition-colors ${
              filters.maxPrice === 2000 
                ? 'bg-red-50 border-red-300 text-red-700' 
                : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            Under ₹2,000 Only
          </button>
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest block">
          Brand
        </label>
        <div className="space-y-1.5">
          {BRANDS.map(brand => {
            const isChecked = filters.brands.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center justify-between text-xs text-zinc-700 font-semibold hover:text-zinc-950 cursor-pointer p-1 rounded-md hover:bg-zinc-50"
              >
                <div className="flex items-center gap-2">
                  <div 
                    onClick={() => handleBrandToggle(brand)}
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-zinc-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{brand}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Size Buttons */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest block">
          UK Size
        </label>
        <div className="grid grid-cols-6 gap-1.5">
          {sizes.map(size => {
            const isSelected = filters.size === size;
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-2 text-xs font-black rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 border-red-600 text-white shadow-xs'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2 pt-2 border-t border-zinc-100">
        <label className="text-[10px] font-black text-zinc-950 uppercase tracking-widest block">
          Minimum Rating
        </label>
        <div className="flex gap-2">
          {[4.5, 4.7, 4.8].map(rate => (
            <button
              key={rate}
              onClick={() => setFilters(prev => ({ ...prev, minRating: prev.minRating === rate ? 0 : rate }))}
              className={`flex-1 py-1.5 rounded-lg text-xs font-black border flex items-center justify-center gap-1 cursor-pointer transition-colors ${
                filters.minRating === rate
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'border-zinc-200 text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              {rate}+
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};
