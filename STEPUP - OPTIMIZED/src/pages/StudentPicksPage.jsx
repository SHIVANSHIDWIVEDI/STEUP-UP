import React from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ui/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { GraduationCap } from 'lucide-react';

export const StudentPicksPage = () => {
  const { allProducts } = useApp();

  const studentProducts = allProducts.filter(p => p.isStudentPick);

  const bestForCollege = studentProducts.filter(p => p.studentTag === "Best Shoes for College");
  const longDays = studentProducts.filter(p => p.studentTag === "Comfortable Shoes for Long College Days");
  const stylishPicks = studentProducts.filter(p => p.studentTag === "Stylish Shoes for Students");
  const casualOutings = studentProducts.filter(p => p.studentTag === "Shoes for College + Casual Outings");

  const breadcrumbs = [
    { label: "Student Picks" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-zinc-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-zinc-950 text-white font-black text-xs uppercase px-3 py-1 rounded-md inline-flex items-center gap-1 shadow-md">
            <GraduationCap className="w-4 h-4 text-red-500" /> Curated For College Students
          </span>
          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            Student Picks & Campus Favorites
          </h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed font-medium">
            Handpicked footwear collections tested by 250+ students across engineering, medical, design, and commerce colleges in India. Guaranteed all-day comfort and high campus aesthetic score.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        
        {/* Best Shoes for College */}
        <section className="space-y-4">
          <div className="border-l-4 border-red-600 pl-4">
            <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight flex items-center gap-2">
              🎓 Best Shoes for College
            </h2>
            <p className="text-xs text-zinc-500 font-medium">The most versatile everyday sneakers that match literally every college outfit.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestForCollege.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Comfortable Shoes for Long College Days */}
        <section className="space-y-4">
          <div className="border-l-4 border-emerald-600 pl-4">
            <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight flex items-center gap-2">
              ☁️ Comfortable Shoes for Long College Days
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Engineered with CloudFoam insoles for 8 AM to 6 PM continuous walking and standing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {longDays.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Stylish Shoes for Students */}
        <section className="space-y-4">
          <div className="border-l-4 border-zinc-950 pl-4">
            <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight flex items-center gap-2">
              ✨ Stylish Shoes for Students
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Chunky sneakers and high-top retro silhouettes for college fests and club nights.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stylishPicks.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Shoes for College + Casual Outings */}
        <section className="space-y-4">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="font-heading font-black text-2xl text-zinc-950 uppercase tracking-tight flex items-center gap-2">
              ☕ Shoes for College + Casual Outings
            </h2>
            <p className="text-xs text-zinc-500 font-medium">Smooth transition shoes that take you from morning lectures to cafe study sessions and dinner dates.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {casualOutings.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

      </div>

    </div>
  );
};
