import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PRODUCTS, CATEGORIES_DATA } from '../data/products';
import { BLOG_ARTICLES } from '../data/blogs';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation State with window.location sync
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname + window.location.search || '/';
  });

  // Cart State with localStorage persistence
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('stepup_cart_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with localStorage persistence
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('stepup_wishlist_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Overlays
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Discount & Promo
  const [appliedPromo, setAppliedPromo] = useState(() => {
    try {
      const saved = localStorage.getItem('stepup_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepup_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to sync cart', e);
    }
  }, [cart]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stepup_wishlist_v2', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to sync wishlist', e);
    }
  }, [wishlist]);

  // Sync Promo to localStorage
  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('stepup_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('stepup_promo');
      }
    } catch (e) {
      console.error('Failed to sync promo', e);
    }
  }, [appliedPromo]);

  // Browser navigation popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname + window.location.search || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom navigate function
  const navigate = (path) => {
    if (window.location.pathname + window.location.search !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toast Notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart Operations
  const addToCart = (product, size = 9, color = null, quantity = 1) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const chosenSize = size || (product.sizes && product.sizes[0]) || 9;
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            size: chosenSize,
            color: chosenColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} (UK ${chosenSize}) to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const freeShippingThreshold = 1499; // Free campus delivery threshold in ₹
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return Math.round((cartSubtotal * appliedPromo.value) / 100);
    }
    return 0;
  }, [appliedPromo, cartSubtotal]);

  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  // Promo Code Handler
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CAMPUS15' || clean === 'STUDENT15') {
      setAppliedPromo({ code: clean, value: 15, type: 'percent', label: '15% Student Discount' });
      showToast('🎉 Code CAMPUS15 applied! 15% student discount activated.');
      return { success: true };
    }
    if (clean === 'STEPUP10' || clean === 'COLLEGE10') {
      setAppliedPromo({ code: clean, value: 10, type: 'percent', label: '10% Welcome Discount' });
      showToast('🎉 Code STEPUP10 applied! 10% off.');
      return { success: true };
    }
    showToast('Invalid promo code. Try "CAMPUS15" for student discount.');
    return { success: false, error: 'Invalid promo code' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed');
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from saved items`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        allProducts: PRODUCTS,
        categories: CATEGORIES_DATA,
        blogs: BLOG_ARTICLES,
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartTotal,
        discountAmount,
        freeShippingThreshold,
        freeShippingProgress,
        freeShippingRemaining,
        isCartOpen,
        setIsCartOpen,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        // Overlays & Modals
        isSearchOpen,
        setIsSearchOpen,
        quickAddProduct,
        setQuickAddProduct,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
