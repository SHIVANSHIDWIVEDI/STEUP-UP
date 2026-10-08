import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
        Sort By:
      </label>
      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="appearance-none bg-white border border-slate-200 text-slate-800 text-xs font-semibold py-2 pl-3 pr-8 rounded-xl focus:outline-hidden focus:border-indigo-500 cursor-pointer shadow-xs"
        >
          <option value="popularity">Popularity (Default)</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};
