import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, Share2, Tag, BookOpen, ShoppingBag } from 'lucide-react';

export const BlogArticlePage = ({ slug }) => {
  const { blogs, allProducts, navigate, setQuickAddProduct, showToast } = useApp();

  const article = blogs.find((b) => b.slug === slug) || blogs[0];
  const spotlightProduct = allProducts[0]; // Campus Runner
  const otherArticles = blogs.filter((b) => b.slug !== article.slug);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#666666]">
        <button onClick={() => navigate('/')} className="hover:text-[#111111] transition-colors cursor-pointer">
          HOME
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <button onClick={() => navigate('/journal')} className="hover:text-[#111111] transition-colors cursor-pointer">
          JOURNAL
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
        <span className="text-[#111111] font-semibold truncate">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-[#E8E2D8] pb-8">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
            {article.category}
          </span>
          <button
            onClick={handleShare}
            className="text-xs text-[#666666] hover:text-[#111111] flex items-center gap-1 cursor-pointer font-mono"
          >
            <Share2 className="w-3.5 h-3.5" /> SHARE
          </button>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
          {article.subtitle}
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs text-[#888888] font-mono">
          <span>By {article.author} ({article.authorRole})</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      {/* Featured Editorial Photography */}
      <div className="aspect-16/9 bg-[#EFECE5] border border-[#E8E2D8] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Table of Contents */}
      {article.tableOfContents && (
        <aside aria-label="Table of Contents" className="p-6 bg-[#FAF9F6] border border-[#E8E2D8] space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#111111] font-semibold block">
            Table of Contents
          </span>
          <ul className="space-y-1.5 text-xs text-[#666666]">
            {article.tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-[#A52A2A] hover:underline transition-colors"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}

      {/* Rich Article Body */}
      <article
        className="prose prose-neutral max-w-none space-y-6 text-[#111111] text-sm sm:text-base leading-relaxed [&>h2]:font-heading [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#111111] [&>h2]:pt-6 [&>h2]:border-t [&>h2]:border-[#E8E2D8] [&>h3]:font-heading [&>h3]:text-lg [&>h3]:font-semibold [&>p]:text-[#444444] [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-1.5 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-1.5 [&>blockquote]:border-l-2 [&>blockquote]:border-[#A52A2A] [&>blockquote]:pl-4 [&>blockquote]:italic [&>strong]:text-[#111111]"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Shoppable Product Spotlight */}
      <div className="p-6 sm:p-8 bg-white border border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-24 bg-[#EFECE5] overflow-hidden shrink-0 border border-[#E8E2D8]">
            <img
              src={spotlightProduct.image}
              alt={spotlightProduct.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
              Featured Campus Footwear
            </span>
            <h4 className="font-heading text-base font-bold text-[#111111]">
              {spotlightProduct.name}
            </h4>
            <p className="text-xs text-[#666666] line-clamp-1">
              {spotlightProduct.descriptor}
            </p>
            <span className="text-sm font-bold text-[#111111] block">
              ₹{spotlightProduct.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setQuickAddProduct(spotlightProduct)}
            className="flex-1 sm:flex-initial px-6 py-3 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            Quick Add To Bag
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="flex-1 sm:flex-initial px-6 py-3 border border-[#111111] hover:bg-[#EFECE5] text-[#111111] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
          >
            Explore All
          </button>
        </div>
      </div>

      {/* CTA To Shop Collection */}
      <section className="p-8 bg-[#FAF9F6] border border-[#E8E2D8] text-center space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A52A2A]">
          Step Up Your Quad Style
        </span>
        <h3 className="font-heading text-2xl font-bold uppercase text-[#111111]">
          Explore The Full College Footwear Collection
        </h3>
        <p className="text-xs text-[#666666] max-w-md mx-auto">
          Campus-tested comfort, student-friendly prices under ₹2,500, and free delivery on orders over ₹1,499.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-2 px-8 py-3.5 bg-[#111111] hover:bg-[#222222] text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Shop Collection</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Related Style Guides Section */}
      <section className="pt-8 border-t border-[#E8E2D8] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-[#111111] uppercase tracking-tight">
            Related Campus Style Guides
          </h3>
          <button
            onClick={() => navigate('/journal')}
            className="text-xs font-semibold uppercase tracking-wider text-[#A52A2A] hover:underline cursor-pointer"
          >
            View All Guides →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {otherArticles.slice(0, 4).map((other) => (
            <div
              key={other.id}
              onClick={() => navigate(`/journal/${other.slug}`)}
              className="p-5 bg-white border border-[#E8E2D8] hover:border-[#111111] transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#888888] uppercase">
                <span>{other.category}</span>
                <span>{other.readTime}</span>
              </div>
              <h4 className="font-heading text-base font-bold text-[#111111] group-hover:text-[#A52A2A] transition-colors leading-snug">
                {other.title}
              </h4>
              <p className="text-xs text-[#666666] line-clamp-2">
                {other.excerpt}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
