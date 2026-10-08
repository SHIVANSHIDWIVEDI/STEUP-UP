import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

export const BlogPage = () => {
  const { blogs, navigate } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-[#E8E2D8] pb-8 space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
          Campus Editorial & Style Guides
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] uppercase">
          COLLEGE FOOTWEAR GUIDES & STYLE TIPS
        </h1>
        <p className="text-xs sm:text-base text-[#666666] max-w-2xl leading-relaxed">
          Practical guides to shoes for college students, including how to compare comfort, find affordable sneakers, choose an everyday pair, and style college footwear.
        </p>
      </div>

      {/* Articles Grid (Responsive 3 col desktop / 2 col tablet / 1 col mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((article, idx) => (
          <article
            key={article.id}
            onClick={() => navigate(`/journal/${article.slug}`)}
            className={`group flex flex-col bg-white border border-[#E8E2D8] hover:border-[#111111] transition-all cursor-pointer ${
              idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            {/* Image */}
            <div className={`${idx === 0 ? 'aspect-16/9' : 'aspect-16/10'} bg-[#EFECE5] overflow-hidden relative`}>
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
              />
              <span className="absolute top-3 left-3 bg-[#111111] text-[#F7F5F0] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1">
                {article.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#888888] uppercase tracking-wider">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                  {article.targetKeyword && (
                    <>
                      <span>•</span>
                      <span className="text-[#A52A2A] font-semibold">#{article.tags[0]}</span>
                    </>
                  )}
                </div>

                <h2 className={`font-heading ${idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'} font-bold text-[#111111] group-hover:text-[#A52A2A] transition-colors leading-snug`}>
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2EDE4] flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#111111] group-hover:text-[#A52A2A]">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Campus Fashion Philosophy Box */}
      <section className="bg-[#FAF9F6] border border-[#E8E2D8] p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            Campus Fashion Philosophy
          </span>
          <h2 className="font-heading text-2xl font-bold text-[#111111] uppercase tracking-tight">
            Style From The Ground Up
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
            Footwear dictates the silhouette, comfort, and attitude of your fit. When your shoes look sharp and feel effortless, even basic tees and relaxed vintage pants look elevated.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {['Best Sneakers for College', 'Stylish Shoes for College Students', 'Affordable College Sneakers', 'Baggy Jeans Styling', 'All Day Campus Comfort'].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-white border border-[#E8E2D8] text-xs text-[#111111]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

    </div>
  );
};
