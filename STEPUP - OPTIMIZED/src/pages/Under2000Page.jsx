import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Zap, CheckCircle } from 'lucide-react';

export const Under2000Page = () => {
  const { allProducts } = useApp();

  const under2000Products = allProducts.filter(p => p.price <= 2000);

  const bestOverall = under2000Products.filter(p => p.under2000Tag === "Best Overall");
  const bestCollege = under2000Products.filter(p => p.under2000Tag === "Best for College");
  const bestEveryday = under2000Products.filter(p => p.under2000Tag === "Best for Everyday Wear");
  const bestBudget = under2000Products.filter(p => p.under2000Tag === "Best Budget Pick");

  const [activeTab, setActiveTab] = useState('all');

  const breadcrumbs = [
    { label: "Under ₹2,000 Store" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* SEO Hero Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-zinc-950 text-white font-black text-xs uppercase px-3 py-1 rounded-md inline-flex items-center gap-1 shadow-md">
            <Zap className="w-3.5 h-3.5 fill-red-500 text-red-500" /> SEO Highlight Store
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            Best Stylish Shoes Under ₹2,000
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed font-medium">
            Looking for high-style footwear that fits a student pocket? Every shoe in this curated collection combines durable materials, anti-fatigue memory foam insoles, and sleek aesthetics—strictly under ₹2,000.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-white">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Free Shipping Across India
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Extra 10% Off for Students
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-emerald-400" /> 7-Day Size Guarantee
            </span>
          </div>
        </div>
      </div>

      {/* Section Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
        {[
          { id: 'all', label: `All Under ₹2k (${under2000Products.length})` },
          { id: 'best-overall', label: '🏆 Best Overall' },
          { id: 'best-college', label: '🎓 Best for College' },
          { id: 'best-everyday', label: '👟 Best Everyday Wear' },
          { id: 'best-budget', label: '💰 Best Budget Steal' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === tab.id
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Structured Sections */}
      {activeTab === 'all' && (
        <div className="space-y-12">
          
          {/* Best Overall */}
          <section className="space-y-4">
            <div className="border-l-4 border-red-600 pl-4">
              <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight">🏆 Best Overall Shoes Under ₹2,000</h2>
              <p className="text-xs text-zinc-500 font-medium">Top-rated by college students for all-around style, durability, and cushion.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestOverall.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          {/* Best for College */}
          <section className="space-y-4">
            <div className="border-l-4 border-zinc-950 pl-4">
              <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight">🎓 Best for College Campus Life</h2>
              <p className="text-xs text-zinc-500 font-medium">Head-turning streetwear silhouettes for lectures, canteen flex, and campus events.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestCollege.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          {/* Best Everyday Wear */}
          <section className="space-y-4">
            <div className="border-l-4 border-emerald-600 pl-4">
              <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight">👟 Best for Everyday 10,000 Steps</h2>
              <p className="text-xs text-zinc-500 font-medium">Ultralight cushioning built for long walking distances and standing in labs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestEveryday.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          {/* Best Budget Pick */}
          <section className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4">
              <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight">💰 Best Super-Budget Steals (Under ₹1,300)</h2>
              <p className="text-xs text-zinc-500 font-medium">Maximum value at entry-level student budget pricing.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestBudget.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

        </div>
      )}

      {/* Filtered View */}
      {activeTab !== 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(
            activeTab === 'best-overall' ? bestOverall :
            activeTab === 'best-college' ? bestCollege :
            activeTab === 'best-everyday' ? bestEveryday : bestBudget
          ).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

    </div>
  );
};
