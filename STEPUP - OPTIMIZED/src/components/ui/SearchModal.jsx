import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ArrowRight, Tag } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, allProducts, blogs, navigate } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.descriptor.toLowerCase().includes(query.toLowerCase()) ||
        p.materials.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredBlogs = query.trim()
    ? blogs.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = [
    'Everyday Sneakers',
    'Campus Low',
    'Baggy Jeans',
    'Retro Runner',
    'Gumsole',
    'Weekend Fits'
  ];

  const handleSelectProduct = (slug) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleSelectBlog = (slug) => {
    setIsSearchOpen(false);
    navigate(`/journal/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-[#111111]/50 backdrop-blur-xs transition-opacity"
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-[#F7F5F0] border border-[#E8E2D8] text-[#111111] shadow-2xl z-10 overflow-hidden">
        {/* Search Input Bar */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#666666] shrink-0 stroke-[1.8]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sneakers, campus classics, style guides..."
            className="flex-1 bg-transparent text-sm md:text-base text-[#111111] placeholder-[#888888] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#666666] hover:text-[#111111] font-mono cursor-pointer"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#666666] hover:text-[#111111] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888] block">
                Popular Campus Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white hover:bg-[#EFECE5] border border-[#E8E2D8] text-xs text-[#111111] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Product Matches */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888] block mb-3">
                  Footwear Matches ({filteredProducts.length})
                </span>
                {filteredProducts.length === 0 ? (
                  <p className="text-xs text-[#666666]">No sneakers matched your query.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center gap-3 p-2 bg-white border border-[#E8E2D8] hover:border-[#111111] transition-all cursor-pointer group"
                      >
                        <div className="w-14 h-14 bg-[#F7F5F0] overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading text-xs font-semibold text-[#111111] truncate group-hover:text-[#A52A2A] transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-[#666666] truncate">{product.descriptor}</p>
                          <span className="text-xs font-semibold text-[#111111] block mt-0.5">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Journal / Style Guide Matches */}
              {filteredBlogs.length > 0 && (
                <div className="pt-4 border-t border-[#E8E2D8]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888] block mb-3">
                    Campus Style Guides ({filteredBlogs.length})
                  </span>
                  <div className="space-y-2">
                    {filteredBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        onClick={() => handleSelectBlog(blog.slug)}
                        className="p-3 bg-white border border-[#E8E2D8] hover:border-[#111111] transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-heading text-xs font-semibold text-[#111111]">
                            {blog.title}
                          </h4>
                          <p className="text-[11px] text-[#666666] line-clamp-1">{blog.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#888888] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
