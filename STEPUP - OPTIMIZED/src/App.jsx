import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/ui/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { WishlistDrawer } from './components/ui/WishlistDrawer';
import { QuickViewModal } from './components/ui/QuickViewModal';
import { Toast } from './components/ui/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { MenPage } from './pages/MenPage';
import { WomenPage } from './pages/WomenPage';
import { SneakersPage } from './pages/SneakersPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogArticlePage } from './pages/BlogArticlePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const AppContent = () => {
  const { currentPath, allProducts, blogs } = useApp();

  // Dynamic SEO Page Title & Meta synchronization
  useEffect(() => {
    const basePath = currentPath.split('?')[0];

    const descriptions = {
      '/': 'Shop STEPUP shoes for college students: comfortable, stylish and affordable sneakers for long campus days, everyday outfits and weekend plans.',
      '/shop': 'Shop shoes for college students at STEPUP. Compare comfortable everyday sneakers, campus classics, and affordable casual shoes by style, size, and price.',
      '/men': 'Explore men’s sneakers for college students at STEPUP, including comfortable everyday runners, streetwear styles, and versatile campus classics.',
      '/women': 'Shop women’s shoes for college at STEPUP, with comfortable everyday sneakers, classic court styles, and platform shoes for campus and weekends.',
      '/sneakers': 'Find the best sneakers for college students at STEPUP. Compare stylish, comfortable, and affordable sneakers for classes, campus walks, and everyday wear.',
      '/journal': 'Read STEPUP campus footwear guides on choosing comfortable, affordable sneakers and styling shoes for college.',
      '/blog': 'Read STEPUP campus footwear guides on choosing comfortable, affordable sneakers and styling shoes for college.',
      '/about': 'Meet STEPUP, a footwear label creating comfortable, affordable shoes and sneakers for college students and everyday campus life.',
      '/contact': 'Contact STEPUP customer support for help with college footwear, sizing, orders, delivery and exchanges.',
      '/privacy-policy': 'Read the STEPUP privacy policy to learn how we handle personal information when you browse or shop for footwear.',
      '/terms': 'Review STEPUP terms of service for using our online footwear store, placing orders and managing returns or exchanges.',
      '/casual-shoes': 'Shop casual shoes for college students, with versatile everyday styles for classes, campus walks and weekends.',
      '/sports-running': 'Explore lightweight sports and running shoes for college students, workouts and active campus days.',
      '/shoes-under-2000': 'Shop affordable sneakers for college students under ₹2,000 at STEPUP. Compare everyday styles, sizes, colours, and comfort details.',
      '/student-picks': 'Discover the best sneakers for college students in STEPUP’s student picks: comfortable, versatile shoes for classes, campus walks, and casual outings.'
    };
    const product = currentPath.startsWith('/product/')
      ? allProducts.find((item) => item.slug === currentPath.replace('/product/', '').split('?')[0])
      : null;
    const articleSlug = currentPath.startsWith('/journal/') || currentPath.startsWith('/blog/')
      ? currentPath.split('/')[2]?.split('?')[0]
      : null;
    const article = articleSlug ? blogs.find((item) => item.slug === articleSlug) : null;
    if (product) {
      document.title = `${product.name} | College Sneakers & Shoes | STEPUP`;
    } else if (currentPath.startsWith('/journal/') || currentPath.startsWith('/blog/')) {
      document.title = article ? `${article.title} | STEPUP Campus Footwear Journal` : 'Campus Footwear Guide | STEPUP Journal';
    } else {
      switch (basePath) {
        case '/shop':
          document.title = 'Shop All Footwear | STEPUP — Best Shoes for College Students';
          break;
        case '/men':
          document.title = "Men's Sneakers for College Students | STEPUP";
          break;
        case '/women':
          document.title = "Women's Shoes for College | STEPUP Sneakers";
          break;
        case '/sneakers':
          document.title = 'Best Sneakers for College Students | STEPUP';
          break;
        case '/journal':
        case '/blog':
          document.title = 'The STEPUP Journal | Campus Footwear Tips & Style Guides';
          break;
        case '/about':
          document.title = 'About STEPUP — Built For Campus Life | Student Footwear Brand';
          break;
        case '/contact':
          document.title = "Let's Talk | STEPUP Studio Student Support";
          break;
        case '/privacy-policy':
          document.title = 'Privacy Policy | STEPUP Footwear';
          break;
        case '/terms':
          document.title = 'Terms of Service | STEPUP Footwear';
          break;
        case '/casual-shoes':
          document.title = 'Casual Shoes for College Students | STEPUP';
          break;
        case '/sports-running':
          document.title = 'Sports & Running Shoes for Students | STEPUP';
          break;
        case '/shoes-under-2000':
          document.title = 'Affordable Shoes Under ₹2,000 | STEPUP';
          break;
        case '/student-picks':
          document.title = 'Student Picks: College Sneakers & Shoes | STEPUP';
          break;
        case '/':
        default:
          document.title = 'STEPUP — Step Up Your Campus Style | Stylish Shoes for College Students';
          break;
      }
    }
    const description = product
      ? `${product.name}: ${product.descriptor} Shop comfortable, stylish shoes for college students at STEPUP for ₹${product.price.toLocaleString('en-IN')}.`
      : article
        ? `Read STEPUP’s guide to ${article.targetKeyword}, with practical advice for comfort, style, and student budgets.`
        : descriptions[basePath] || descriptions['/'];
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.name = 'description';
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.content = description;

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${window.location.origin}${basePath === '/' ? '/' : basePath}`;

    const setMeta = (selector, attribute, value) => {
      let tag = document.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, selector.includes('property=') ? selector.match(/property="([^"]+)/)[1] : selector.match(/name="([^"]+)/)[1]);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };
    setMeta('meta[property="og:title"]', 'property', document.title);
    setMeta('meta[property="og:description"]', 'property', description);
    setMeta('meta[property="og:url"]', 'property', window.location.href);
    setMeta('meta[property="og:image"]', 'property', product ? `${window.location.origin}${product.image}` : `${window.location.origin}/images/stepup_urban_classic.jpg`);
    setMeta('meta[name="twitter:title"]', 'name', document.title);
    setMeta('meta[name="twitter:description"]', 'name', description);
    setMeta('meta[name="twitter:image"]', 'name', product ? `${window.location.origin}${product.image}` : `${window.location.origin}/images/stepup_urban_classic.jpg`);

    let productSchema = document.querySelector('script[data-seo-product]');
    if (product) {
      if (!productSchema) {
        productSchema = document.createElement('script');
        productSchema.type = 'application/ld+json';
        productSchema.dataset.seoProduct = 'true';
        document.head.appendChild(productSchema);
      }
      productSchema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: `${product.descriptor} ${product.description}`,
        image: product.gallery?.map((image) => `${window.location.origin}${image}`) || [`${window.location.origin}${product.image}`],
        brand: { '@type': 'Brand', name: 'STEPUP' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          url: window.location.href
        }
      });
    } else if (productSchema) {
      productSchema.remove();
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  const renderCurrentView = () => {
    // Dynamic Product Detail Route: /product/slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0];
      return <ProductDetailPage slug={slug} />;
    }

    // Dynamic Journal Article Route: /journal/slug or /blog/slug
    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').split('?')[0];
      return <BlogArticlePage slug={slug} />;
    }

    // Dedicated Pages
    const basePath = currentPath.split('?')[0];

    // Gender Category Routes
    if (basePath === '/men' || currentPath.includes('gender=men')) {
      return <MenPage />;
    }
    if (basePath === '/women' || currentPath.includes('gender=women')) {
      return <WomenPage />;
    }

    // Dedicated Sneakers Page
    if (basePath === '/sneakers') {
      return <SneakersPage />;
    }

    // Standard static routes
    switch (basePath) {
      case '/shop':
      case '/casual-shoes':
      case '/sports-running':
      case '/shoes-under-2000':
      case '/student-picks':
        return <ShopPage />;
      case '/journal':
      case '/blog':
        return <BlogPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms':
        return <TermsPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#111111] font-sans selection:bg-[#A52A2A] selection:text-[#F7F5F0]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <SearchModal />
      <WishlistDrawer />
      <QuickViewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
