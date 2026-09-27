'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

interface MobileFloatingBarProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onOpenCart: () => void;
  onOpenMenu: () => void;
  onCloseMenu?: () => void;
  isMenuOpen?: boolean;
  cartCount?: number;
  hideWhen?: boolean;
}

export function MobileFloatingBar({
  onOpenSearch,
  onOpenAccount,
  onOpenCart,
  onOpenMenu,
  onCloseMenu,
  isMenuOpen = false,
  cartCount = 0,
  hideWhen = false,
}: MobileFloatingBarProps) {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    // Check if footer exists in DOM and observe it site-wide
    const footerElem = document.querySelector('[data-site-footer]') || document.getElementById('site-footer') || document.querySelector('footer');
    if (!footerElem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '0px 0px 40px 0px',
      }
    );

    observer.observe(footerElem);

    return () => {
      observer.disconnect();
    };
  }, []);

  const shouldHide = hideWhen || isFooterVisible;

  const handleMenuClick = () => {
    if (isMenuOpen) {
      if (onCloseMenu) onCloseMenu();
      else onOpenMenu();
    } else {
      onOpenMenu();
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className={`fixed bottom-3 left-3 right-3 max-w-md mx-auto z-50 lg:hidden bg-[#ededeb]/90 backdrop-blur-md border border-neutral-300/40 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out ${
        shouldHide ? 'opacity-0 pointer-events-none translate-y-12' : 'opacity-100 pointer-events-auto translate-y-0'
      }`}
    >
      <div className="flex items-center justify-around h-14 px-2">
        {/* Search */}
        <button
          type="button"
          onClick={() => {
            if (isMenuOpen && onCloseMenu) onCloseMenu();
            onOpenSearch();
          }}
          aria-label="Search"
          className="p-3 text-neutral-900 hover:text-black transition-colors cursor-pointer"
        >
          <Search className="w-5 h-5 stroke-[1.3]" />
        </button>

        {/* User / Account */}
        <button
          type="button"
          onClick={() => {
            if (isMenuOpen && onCloseMenu) onCloseMenu();
            onOpenAccount();
          }}
          aria-label="Account"
          className="p-3 text-neutral-900 hover:text-black transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[1.3]" />
        </button>

        {/* Shopping Bag */}
        <button
          type="button"
          onClick={() => {
            if (isMenuOpen && onCloseMenu) onCloseMenu();
            onOpenCart();
          }}
          aria-label="Shopping Bag"
          className="p-3 text-neutral-900 hover:text-black transition-colors cursor-pointer relative"
        >
          <ShoppingBag className="w-5 h-5 stroke-[1.3]" />
          {cartCount > 0 && (
            <span className="absolute top-2 right-2 min-w-[14px] h-[14px] bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5">
              {cartCount}
            </span>
          )}
        </button>

        {/* Menu / Close (toggle icon matching screenshot) */}
        <button
          type="button"
          onClick={handleMenuClick}
          aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
          className="p-3 text-neutral-900 hover:text-black transition-colors cursor-pointer"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5 stroke-[1.3]" />
          ) : (
            <Menu className="w-5 h-5 stroke-[1.3]" />
          )}
        </button>
      </div>
    </nav>
  );
}
