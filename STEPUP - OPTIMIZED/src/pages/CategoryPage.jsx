import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { FilterSidebar } from '../components/ui/FilterSidebar';
import { SortDropdown } from '../components/ui/SortDropdown';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { SlidersHorizontal, PackageX, Sparkles } from 'lucide-react';

export const CategoryPage = ({ categoryKey, pageTitle, subtitle, subcategories = [] }) => {
  const { allProducts } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter State
  const [filters, setFilters] = useState({
    subcategory: 'all',
    maxPrice: 3000,
    brands: [],
    size: null,
    minRating: 0
  });

  // Sort State
  const [sortOption, setSortOption] = useState('popularity');

  const resetFilters = () => {
    setFilters({
      subcategory: 'all',
      maxPrice: 3000,
      brands: [],
      size: null,
      minRating: 0
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = allProducts.filter(p => p.category === categoryKey);

    if (filters.subcategory !== 'all') {
      list = list.filter(p => p.subcategory === filters.subcategory);
    }

    list = list.filter(p => p.price <= filters.maxPrice);

    if (filters.brands.length > 0) {
      list = list.filter(p => filters.brands.includes(p.brand));
    }

    if (filters.size) {
      list = list.filter(p => p.sizes.includes(filters.size));
    }

    if (filters.minRating > 0) {
      list = list.filter(p => p.rating >= filters.minRating);
    }

    return list.sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [allProducts, categoryKey, filters, sortOption]);

  const breadcrumbItems = [
    { label: pageTitle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero Banner Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-zinc-950 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="bg-zinc-950 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md inline-flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3 text-red-400" /> Campus Style Collection
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
            {pageTitle}
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed pt-1 font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Desktop Filter Sidebar (3 cols) */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            availableSubcategories={subcategories}
            totalResultsCount={filteredProducts.length}
          />
        </div>

        {/* Product Grid Area (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar */}
          <div className="bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-xs font-black uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filter Shoes ({filteredProducts.length})
            </button>

            <div className="text-xs text-zinc-500 font-medium hidden sm:block">
              Showing <strong className="text-zinc-950 font-black">{filteredProducts.length}</strong> available pairs
            </div>

            {/* Sort Dropdown */}
            <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-zinc-200 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-black text-zinc-950 text-xl uppercase">No shoes match your filters</h3>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto font-medium">
                Try expanding your price slider or resetting brand selections to discover more footwear options.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filter Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/60 backdrop-blur-xs flex justify-start lg:hidden">
          <div className="bg-white w-full max-w-xs h-full p-5 shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100">
              <h3 className="font-heading font-black text-zinc-950 text-lg uppercase">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-lg"
              >
                Done
              </button>
            </div>

            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              availableSubcategories={subcategories}
              totalResultsCount={filteredProducts.length}
            />
          </div>
        </div>
      )}

    </div>
  );
};
