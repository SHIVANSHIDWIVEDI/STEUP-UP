import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const {
    currentPath,
    navigate,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Sneakers', path: '/sneakers' },
    { label: 'Journal', path: '/journal' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Subtle Announcement Bar */}
      <aside aria-label="Campus Notice" className="bg-[#111111] text-[#F7F5F0] text-[11px] font-mono tracking-wider py-2 px-4 text-center border-b border-[#222222]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-[#D8CFC2] uppercase font-semibold">Campus Perk:</span>
          <span>Free Campus Delivery on Orders ₹1,499+</span>
          <span className="hidden sm:inline text-[#666666]">•</span>
          <span className="hidden sm:inline">Use code <strong className="text-[#FAF9F6] font-semibold underline decoration-[#A52A2A] underline-offset-2">CAMPUS15</strong> for 15% Student Discount</span>
        </div>
      </aside>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-xs'
            : 'bg-[#F7F5F0] border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Mobile Menu Toggle + Brand Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 -ml-2 text-[#111111] hover:text-[#A52A2A] transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div
                onClick={() => handleNavClick('/')}
                className="cursor-pointer group flex items-baseline gap-2 select-none"
              >
                <span className="font-heading font-bold text-2xl tracking-tighter text-[#111111] uppercase group-hover:text-[#A52A2A] transition-colors">
                  STEPUP
                </span>
                <span className="hidden md:inline text-[9px] font-mono tracking-[0.25em] text-[#666666] uppercase">
                  STUDIO
                </span>
              </div>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? currentPath === '/'
                    : currentPath.startsWith(link.path.split('?')[0]);

                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.path)}
                    className={`text-xs uppercase tracking-wider font-medium transition-colors relative py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#111111] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#A52A2A]'
                        : 'text-[#666666] hover:text-[#111111]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right: Actions (Search, Wishlist, Bag) */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 text-[#111111] hover:text-[#A52A2A] transition-colors cursor-pointer"
                aria-label="Search footwear"
              >
                <Search className="w-4 h-4 stroke-[1.8]" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="p-2.5 text-[#111111] hover:text-[#A52A2A] transition-colors cursor-pointer relative"
                aria-label="View saved items"
              >
                <Heart className="w-4 h-4 stroke-[1.8]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#A52A2A] text-[#F7F5F0] text-[9px] font-mono rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-[#111111] hover:text-[#A52A2A] transition-colors cursor-pointer relative flex items-center gap-1.5"
                aria-label="Open shopping bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  ({cartCount})
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F7F5F0] border-b border-[#E8E2D8] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left text-sm font-heading font-medium text-[#111111] hover:text-[#A52A2A] transition-colors py-1 flex items-center justify-between border-b border-[#E8E2D8]/60 pb-2.5"
                >
                  <span className="uppercase tracking-wider">{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#888888]" />
                </button>
              ))}
            </nav>

            <div className="pt-2">
              <div className="p-3 bg-[#EFECE5] text-xs text-[#666666] border border-[#E8E2D8]">
                <span className="font-semibold text-[#111111] block mb-0.5">Student Verification</span>
                15% off with university email at checkout using code <strong>CAMPUS15</strong>.
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
