'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MonclerLogo } from './MonclerLogo';
import { 
  MessageSquare, 
  Search, 
  Heart, 
  Bookmark,
  User, 
  ShoppingBag, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { MobileMenuBottomDrawer } from './MobileMenuBottomDrawer';

import searchCreamJacketImg from '@/src/assets/images/search_featured_cream_jacket_1790599131630.jpg';
import searchBlackJacketImg from '@/src/assets/images/search_featured_black_jacket_1790599142811.jpg';
import searchBurgundyJacketImg from '@/src/assets/images/search_featured_burgundy_jacket_1790599159832.jpg';
import searchRedJacketImg from '@/src/assets/images/search_featured_red_jacket_1790599172403.jpg';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenAccount: () => void;
  isMobileMenuOpen?: boolean;
  onSetMobileMenuOpen?: (open: boolean) => void;
  cartCount?: number;
  wishlistCount?: number;
  isAnnouncementHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
  isHighContrast?: boolean;
  onToggleHighContrast?: () => void;
  onOpenCountry?: () => void;
  onOpenPeaks?: () => void;
  onOpenSignup?: () => void;
}

interface MegaMenuColumn {
  title: string;
  items: { label: string; href: string }[];
}

interface MegaMenuData {
  category: string;
  columns: MegaMenuColumn[];
  featured: {
    imageUrl: string;
    caption: string;
    href: string;
  };
}

const megaMenuCatalog: Record<string, MegaMenuData> = {
  'New In': {
    category: 'New In',
    columns: [
      {
        title: 'Highlights',
        items: [
          { label: 'Latest Arrivals', href: '#new-in' },
          { label: 'The Fall Wardrobe', href: '#new-in' },
          { label: 'Iconic Maya 70', href: '#new-in' },
          { label: 'Moncler Voices', href: '#new-in' },
          { label: 'Curated Selection', href: '#new-in' },
        ],
      },
      {
        title: "Women's New In",
        items: [
          { label: 'Short Down Jackets', href: '#women' },
          { label: 'Long Down Jackets', href: '#women' },
          { label: 'Knitwear & Cardigans', href: '#women' },
          { label: 'Vests & Gilets', href: '#women' },
          { label: 'Shoes & Boots', href: '#women' },
          { label: 'Bags & Accessories', href: '#women' },
        ],
      },
      {
        title: "Men's New In",
        items: [
          { label: 'Puffers & Parkas', href: '#men' },
          { label: 'Wool Flannel Jackets', href: '#men' },
          { label: 'Sweatshirts & Hoodies', href: '#men' },
          { label: 'Pants & Joggers', href: '#men' },
          { label: 'Sneakers & Trailgrip', href: '#men' },
          { label: 'Hats, Beanies & Scarves', href: '#men' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A00231599VV262_1/image/slide-3-cristallin-hooded-wool-blend-short-down-jacket.jpg?w=800&q=80',
      caption: 'New Season Collections 2026',
      href: '#new-in',
    },
  },
  'Women': {
    category: 'Women',
    columns: [
      {
        title: 'Clothing',
        items: [
          { label: 'Short Down Jackets', href: '#women' },
          { label: 'Long Down Jackets', href: '#women' },
          { label: 'Vests & Gilets', href: '#women' },
          { label: 'Cardigans & Knitwear', href: '#women' },
          { label: 'Sweatshirts & Tops', href: '#women' },
          { label: 'Dresses & Skirts', href: '#women' },
          { label: 'Pants & Leggings', href: '#women' },
        ],
      },
      {
        title: 'Shoes & Accessories',
        items: [
          { label: 'View All Shoes', href: '#women' },
          { label: 'Winter Boots', href: '#women' },
          { label: 'Sneakers', href: '#women' },
          { label: 'Bags & Backpacks', href: '#women' },
          { label: 'Beanies & Hats', href: '#women' },
          { label: 'Scarves & Gloves', href: '#women' },
          { label: 'Sunglasses', href: '#women' },
        ],
      },
      {
        title: 'Featured',
        items: [
          { label: 'Moncler Collection', href: '#women' },
          { label: 'Moncler Grenoble', href: '#grenoble' },
          { label: 'Moncler Genius', href: '#women' },
          { label: 'Diamond Quilted Essentials', href: '#women' },
          { label: 'Gift Selection', href: '#women' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00025M1131828_1/image/slide-4-diamond-quilted-padded-wool-cardigan.jpg?w=800&q=80',
      caption: "Women's Autumn/Winter 2026",
      href: '#women',
    },
  },
  'Men': {
    category: 'Men',
    columns: [
      {
        title: 'Clothing',
        items: [
          { label: 'Ready-to-Wear', href: '/ready-to-wear' },
          { label: 'Short Down Jackets', href: '/mens-clothing' },
          { label: 'Long Down Jackets & Parkas', href: '/mens-clothing' },
          { label: 'Gilets & Puffer Vests', href: '/mens-clothing' },
          { label: 'Knitwear & Sweaters', href: '/ready-to-wear' },
          { label: 'Sweatshirts & Hoodies', href: '/ready-to-wear' },
          { label: 'T-Shirts & Polos', href: '/ready-to-wear' },
          { label: 'Pants & Shorts', href: '/ready-to-wear' },
        ],
      },
      {
        title: 'Shoes & Accessories',
        items: [
          { label: 'View All Footwear', href: '/mens-clothing' },
          { label: 'Trailgrip Sneakers', href: '/mens-clothing' },
          { label: 'Winter Boots', href: '/mens-clothing' },
          { label: 'Backpacks & Crossbody Bags', href: '/mens-clothing' },
          { label: 'Beanies & Caps', href: '/mens-clothing' },
          { label: 'Scarves & Small Leather Goods', href: '/mens-clothing' },
          { label: 'Eyewear', href: '/mens-clothing' },
        ],
      },
      {
        title: 'Featured',
        items: [
          { label: 'Moncler Collection', href: '/mens-clothing' },
          { label: 'Moncler Grenoble', href: '#grenoble' },
          { label: 'Moncler Genius', href: '/mens-clothing' },
          { label: 'Maya 70 Editions', href: '/mens-clothing' },
          { label: 'Travel Essentials', href: '/mens-clothing' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
      caption: "Men's Autumn/Winter 2026",
      href: '#men',
    },
  },
  'Children': {
    category: 'Children',
    columns: [
      {
        title: 'Baby (0-36 Months)',
        items: [
          { label: 'Newborn Suits & Buntings', href: '#children' },
          { label: 'Down Jackets', href: '#children' },
          { label: 'Knitwear & Sets', href: '#children' },
          { label: 'Hats & Booties', href: '#children' },
        ],
      },
      {
        title: 'Boy (4-14 Years)',
        items: [
          { label: 'Down Jackets & Vests', href: '#children' },
          { label: 'Sweatshirts & Polos', href: '#children' },
          { label: 'Pants & Tracksuits', href: '#children' },
          { label: 'Sneakers & Hats', href: '#children' },
        ],
      },
      {
        title: 'Girl (4-14 Years)',
        items: [
          { label: 'Down Jackets & Parkas', href: '#children' },
          { label: 'Dresses & Knitwear', href: '#children' },
          { label: 'Leggings & Skirts', href: '#children' },
          { label: 'Boots & Accessories', href: '#children' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a/image/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a.jpg?q_auto=high&q=90&w=1900',
      caption: 'Enfant Autumn/Winter 2026',
      href: '#children',
    },
  },
  'Grenoble': {
    category: 'Grenoble',
    columns: [
      {
        title: 'Moncler Grenoble',
        items: [
          { label: 'Autumn/Winter 2026', href: '#grenoble' },
          { label: 'Layering Guide for Her', href: '#grenoble' },
          { label: 'Layering Guide for Him', href: '#grenoble' },
        ],
      },
      {
        title: 'Women',
        items: [
          { label: 'View All Ski & Outdoor', href: '#grenoble' },
          { label: 'Ski Jackets', href: '#grenoble' },
          { label: 'Mid & Base Layers', href: '#grenoble' },
          { label: 'Ski Pants', href: '#grenoble' },
          { label: 'Après Ski', href: '#grenoble' },
          { label: 'Trekking & Hiking', href: '#grenoble' },
          { label: 'Accessories & Ski Equipment', href: '#grenoble' },
        ],
      },
      {
        title: 'Men',
        items: [
          { label: 'View All Ski & Outdoor', href: '#grenoble' },
          { label: 'Ski Jackets', href: '#grenoble' },
          { label: 'Shell Jackets', href: '#grenoble' },
          { label: 'Mid & Base Layers', href: '#grenoble' },
          { label: 'Ski Pants', href: '#grenoble' },
          { label: 'Après Ski', href: '#grenoble' },
          { label: 'Trekking & Hiking', href: '#grenoble' },
          { label: 'Accessories & Ski Equipment', href: '#grenoble' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a/image/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a.jpg?q_auto=high&q=90&w=1900',
      caption: 'Moncler Grenoble Autumn/Winter 2026',
      href: '#grenoble',
    },
  },
  'In Moncler': {
    category: 'In Moncler',
    columns: [
      {
        title: 'Stories & Culture',
        items: [
          { label: 'Summer Collection 2026', href: '/summer-collection' },
          { label: 'Brand Heritage & Peaks', href: '#in-moncler' },
          { label: 'Moncler Genius Co-Creators', href: '#in-moncler' },
          { label: 'Through A Different Lens', href: '#in-moncler' },
          { label: 'Special Projects & Art', href: '#in-moncler' },
        ],
      },
      {
        title: 'Sustainability',
        items: [
          { label: 'Born to Protect Plan', href: '#in-moncler' },
          { label: 'DIST Down Certification', href: '#in-moncler' },
          { label: 'Circular Materials', href: '#in-moncler' },
          { label: 'Social Responsibility', href: '#in-moncler' },
        ],
      },
      {
        title: 'Services & Boutiques',
        items: [
          { label: 'Store Locator', href: '#in-moncler' },
          { label: 'Book a Boutique Appointment', href: '#in-moncler' },
          { label: 'Product Code Verification', href: '#in-moncler' },
          { label: 'Aftercare & Maintenance', href: '#in-moncler' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
      caption: 'Moncler Heritage & Future',
      href: '#in-moncler',
    },
  },
  Collections: {
    category: 'Collections',
    columns: [
      {
        title: 'Moncler Collections',
        items: [
          { label: 'View All Collections', href: '#collections' },
          { label: 'Moncler Collection', href: '#collections' },
          { label: 'Moncler Grenoble', href: '#grenoble' },
          { label: 'Moncler Genius', href: '#collections' },
          { label: 'Moncler x Fragment', href: '/mens-clothing' },
        ],
      },
      {
        title: 'Highlights',
        items: [
          { label: 'Autumn / Winter 2026', href: '#new-in' },
          { label: 'Renewed Rhythm', href: '/mens-clothing' },
          { label: 'A Change in the Air', href: '#change-in-the-air' },
          { label: 'Icons & Essentials', href: '#women' },
        ],
      },
      {
        title: 'Services & Stories',
        items: [
          { label: 'Editorial Looks', href: '#editorial' },
          { label: 'Store Locator', href: '/contact' },
          { label: 'Book an Appointment', href: '/contact' },
          { label: 'Client Service', href: '/client-service' },
        ],
      },
    ],
    featured: {
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/0e70bae0-674b-4adc-b6a4-ea112040c783/image/moncler-discover-genius-collection?q_auto=high&q=90&w=1900',
      caption: 'Moncler Genius Autumn/Winter 2026',
      href: '#collections',
    },
  },
};

const featuredSearchItems = [
  {
    id: 'feat-cream',
    name: 'Badyf Hooded Short Down Jacket',
    price: '£1,450.00',
    image: searchCreamJacketImg,
    href: '/product',
  },
  {
    id: 'feat-black',
    name: 'Maya High-Gloss Nylon Laqué Down Jacket',
    price: '£1,380.00',
    image: searchBlackJacketImg,
    href: '/product',
  },
  {
    id: 'feat-burgundy',
    name: 'Maya Shiny Lacquered Short Down Jacket',
    price: '£1,380.00',
    image: searchBurgundyJacketImg,
    href: '/product',
  },
  {
    id: 'feat-red',
    name: 'Maya 70 Anniversary Short Down Jacket',
    price: '£1,420.00',
    image: searchRedJacketImg,
    href: '/product',
  },
];

const featuredCategories = [
  { label: 'New In for Women', href: '#women' },
  { label: 'New In for Men', href: '/mens-clothing' },
  { label: 'Outerwear for Women', href: '#women' },
  { label: 'Outerwear for Men', href: '/mens-clothing' },
];

export function Navbar({
  onOpenSearch,
  onOpenCart,
  onOpenChat,
  onOpenAccount,
  isMobileMenuOpen,
  onSetMobileMenuOpen,
  cartCount = 0,
  wishlistCount = 0,
  isAnnouncementHovered = false,
  onHoverChange,
  isHighContrast = false,
  onToggleHighContrast,
  onOpenCountry,
  onOpenPeaks,
  onOpenSignup,
}: NavbarProps) {
  const pathname = usePathname();
  const isHeroOverlayPage = pathname === '/' || pathname === '/summer-collection';

  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [isMegaMenuMounted, setIsMegaMenuMounted] = useState(false);

  // Desktop Search Mega Nav state
  const [isSearchMegaOpen, setIsSearchMegaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isMenuOpen = isMobileMenuOpen !== undefined ? isMobileMenuOpen : internalMenuOpen;
  const setMenuOpen = onSetMobileMenuOpen || setInternalMenuOpen;

  // Close search mega nav on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchMegaOpen) {
        setIsSearchMegaOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchMegaOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Close mega menu and search mega nav on scroll
      if ((activeMegaCategory || isSearchMegaOpen) && currentScrollY > 20) {
        setActiveMegaCategory(null);
        setIsMegaMenuMounted(false);
        setIsSearchMegaOpen(false);
      }

      if (currentScrollY <= 15) {
        setIsAtTop(true);
        setScrollDirection(null);
      } else {
        setIsAtTop(false);
        if (currentScrollY > lastScrollY.current + 4) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY.current - 4) {
          setScrollDirection('up');
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMegaCategory, isSearchMegaOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsNavHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsNavHovered(false);
      setActiveMegaCategory(null);
      setIsMegaMenuMounted(false);
      setIsSearchMegaOpen(false);
      onHoverChange?.(false);
    }, 220);
  };

  const handleLinkMouseEnter = (category: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsSearchMegaOpen(false); // Close search when hovering category links
    setIsNavHovered(true);
    onHoverChange?.(true);
    setActiveMegaCategory(category);
    setIsMegaMenuMounted(true);
  };

  const handleSearchMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setActiveMegaCategory(null);
      setIsMegaMenuMounted(false);
      setIsSearchMegaOpen(true);
      setIsNavHovered(true);
      onHoverChange?.(true);
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  };

  const handleSearchClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
      setIsSearchMegaOpen((prev) => {
        const next = !prev;
        if (next) {
          setActiveMegaCategory(null);
          setIsMegaMenuMounted(false);
          setTimeout(() => searchInputRef.current?.focus(), 60);
        }
        return next;
      });
    } else {
      onOpenSearch();
    }
  };

  // Determine if navbar is in white/ivory mode
  const isWhiteMode = !isHeroOverlayPage
    ? true
    : Boolean(activeMegaCategory) ||
      isSearchMegaOpen ||
      (!isAtTop && scrollDirection === 'up') ||
      (isAtTop && (isNavHovered || isAnnouncementHovered));

  const navLinks = [
    { label: 'New In', href: '#new-in' },
    { label: 'Women', href: '#women' },
    { label: 'Men', href: '#men' },
    { label: 'Children', href: '#children' },
    { label: 'Grenoble', href: '#grenoble' },
    { label: 'In Moncler', href: '#in-moncler' },
    { label: 'Collections', href: '#collections' },
  ];

  const currentMegaData = activeMegaCategory ? megaMenuCatalog[activeMegaCategory] : null;

  return (
    <>
      {/* Dark blur backdrop overlay: appears smoothly under navbar when mega menu or search mega nav is open */}
      <div
        className={`fixed inset-0 top-[72px] z-30 bg-black/40 backdrop-blur-xs transition-opacity duration-300 ${
          activeMegaCategory || isSearchMegaOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setActiveMegaCategory(null);
          setIsMegaMenuMounted(false);
          setIsSearchMegaOpen(false);
        }}
        aria-hidden="true"
      />

      <header
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`z-40 w-full transition-all duration-300 shadow-none ${
          isHeroOverlayPage
            ? isAtTop
              ? `relative z-40 -mb-[72px] lg:-mb-[80px] border-none ${
                  isWhiteMode ? 'bg-[#f9f9f8] text-black' : 'bg-transparent text-white'
                }`
              : `fixed top-0 left-0 right-0 bg-[#f9f9f8] text-black border-none ${
                  scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
                }`
            : 'relative bg-[#f9f9f8] text-black border-b border-neutral-200/60'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 py-3.5 lg:py-4">
          <div className="relative flex items-center justify-center lg:justify-between">
            {/* Desktop: Primary Nav Links with Line Trace Animation on Hover */}
            <nav className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[14px] font-normal tracking-wide">
              {navLinks.map((link) => {
                const isActive = activeMegaCategory === link.label;
                return (
                  <div
                    key={link.label}
                    onMouseEnter={() => handleLinkMouseEnter(link.label)}
                    className="relative py-2"
                  >
                    <a
                      href={link.href}
                      style={{ fontSize: '14px' }}
                      className={`group relative inline-block transition-colors duration-150 py-0.5 text-[14px] leading-snug ${
                        isWhiteMode
                          ? 'text-neutral-900 hover:text-black'
                          : 'text-white/95 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {/* Line Trace Animation: thinner and closer to the text on hover */}
                      <span
                        className={`absolute bottom-0 left-0 h-[1px] transition-all duration-300 ease-out pointer-events-none ${
                          isWhiteMode ? 'bg-black' : 'bg-white'
                        } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                      />
                    </a>
                  </div>
                );
              })}
            </nav>

            {/* Brand Logo: Moncler (Centered on mobile and desktop) */}
            <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 pointer-events-auto">
              <Link href="/" className="block py-0.5">
                <MonclerLogo size="md" isNegative={isWhiteMode} />
              </Link>
            </div>

            {/* Utility Actions (Right Zone): Hidden on mobile, shown on desktop */}
            <div
              className={`hidden lg:flex items-center space-x-4 xl:space-x-5 ${
                isWhiteMode ? 'text-black' : 'text-white'
              }`}
            >
              {/* Client Advisor / Chat */}
              <button
                type="button"
                onClick={onOpenChat}
                className={`p-1 transition-colors ${
                  isWhiteMode ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
                }`}
                aria-label="Start chat with Client Advisor"
              >
                <MessageSquare className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>

              {/* Search */}
              <button
                type="button"
                onClick={handleSearchClick}
                onMouseEnter={handleSearchMouseEnter}
                className={`p-1 transition-colors cursor-pointer ${
                  isWhiteMode ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
                }`}
                aria-label="Search Moncler collection"
              >
                <Search className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={onOpenAccount}
                className={`p-1 transition-colors relative cursor-pointer ${
                  isWhiteMode ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
                }`}
                aria-label="Wishlist"
              >
                <Bookmark className="w-[18px] h-[18px] stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      isWhiteMode ? 'bg-black' : 'bg-white'
                    }`}
                  />
                )}
              </button>

              {/* Account */}
              <button
                type="button"
                onClick={onOpenAccount}
                className={`p-1 transition-colors ${
                  isWhiteMode ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
                }`}
                aria-label="My Moncler Account"
              >
                <User className="w-[18px] h-[18px] stroke-[1.5]" />
              </button>

              {/* Shopping Bag */}
              <button
                type="button"
                onClick={onOpenCart}
                className={`p-1 transition-colors relative ${
                  isWhiteMode ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
                }`}
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-[18px] h-[18px] stroke-[1.5]" />
                {cartCount > 0 && (
                  <span
                    className={`absolute -top-1 -right-1 min-w-[15px] h-[15px] px-1 text-[9px] font-bold rounded-full flex items-center justify-center ${
                      isWhiteMode ? 'bg-black text-white' : 'bg-white text-black'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Search Mega Nav Dropdown: Exact match to uploaded screenshot */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 ease-out origin-top border-t border-neutral-200/60 bg-[#f9f9f8] text-black shadow-none relative ${
            isSearchMegaOpen
              ? 'min-h-[65vh] opacity-100'
              : 'max-h-0 min-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {/* Main Top Area */}
          <div className="w-full px-4 sm:px-6 lg:px-12 pt-6 pb-20">
            {/* Top Row: "Search" label and Close "✕" button */}
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-neutral-800 font-normal">
                Search
              </span>
              <button
                type="button"
                onClick={() => setIsSearchMegaOpen(false)}
                className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5 stroke-[1.2]" />
              </button>
            </div>

            {/* Large "Type to search" input */}
            <div className="mt-8 lg:mt-10 mb-1">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search"
                className="w-full bg-transparent text-[34px] sm:text-[38px] lg:text-[42px] font-light text-neutral-900 placeholder:text-neutral-400 tracking-[-0.02em] leading-tight outline-none border-none py-1 selection:bg-neutral-900 selection:text-white"
              />
            </div>

            {/* Full Width Thin Divider Line */}
            <div className="w-full h-[1px] bg-neutral-200/80 mb-8 lg:mb-10" />

            {/* Two Column Content: Featured Items & Featured Categories */}
            {searchQuery.trim().length === 0 ? (
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Left Column: Featured Items */}
                <div className="col-span-6">
                  <h4 className="text-[13px] font-normal text-neutral-500 mb-3 tracking-[-0.01em]">
                    Featured Items
                  </h4>
                  <div className="flex items-center gap-[0.2em]">
                    {featuredSearchItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => setIsSearchMegaOpen(false)}
                        className="group relative flex flex-col items-center justify-center w-[98px] sm:w-[110px] h-[132px] sm:h-[148px] bg-[#f2f1ee] p-1.5 hover:bg-[#eae8e4] transition-colors cursor-pointer overflow-hidden shrink-0"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="110px"
                            className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Right Column: Featured Categories */}
                <div className="col-span-6 pl-4 lg:pl-16">
                  <h4 className="text-[13px] font-normal text-neutral-500 mb-3 tracking-[-0.01em]">
                    Featured Categories
                  </h4>
                  <ul className="space-y-2">
                    {featuredCategories.map((cat) => (
                      <li key={cat.label}>
                        <Link
                          href={cat.href}
                          onClick={() => setIsSearchMegaOpen(false)}
                          className="text-[13px] text-neutral-900 font-normal hover:opacity-70 transition-opacity block leading-relaxed"
                        >
                          {cat.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              /* Dynamic filtered search results when user types */
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] text-neutral-500">
                    Results for &ldquo;{searchQuery}&rdquo;
                  </span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[13px] text-neutral-600 hover:text-black underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {featuredSearchItems
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .concat(featuredSearchItems)
                    .slice(0, 4)
                    .map((prod) => (
                      <Link
                        key={prod.id}
                        href="/product"
                        onClick={() => setIsSearchMegaOpen(false)}
                        className="group flex flex-col cursor-pointer"
                      >
                        <div className="relative aspect-[3/4] bg-[#f2f1ee] mb-2 overflow-hidden flex items-center justify-center">
                          <Image
                            src={prod.image}
                            alt={prod.name}
                            fill
                            sizes="200px"
                            className="object-contain object-center p-3 transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <h5 className="text-[13px] text-neutral-900 font-normal line-clamp-1 group-hover:underline">
                          {prod.name}
                        </h5>
                        <p className="text-[13px] text-neutral-500 mt-0.5">
                          {prod.price}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Assistance Bar - fixed directly at the bottom of the search section */}
          <div className="absolute bottom-0 left-0 right-0 w-full bg-[#f2f1ee] border-t border-neutral-200/60 py-3.5 px-4 sm:px-6 lg:px-12 z-10">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px]">
              <span className="text-neutral-600 font-normal">Need assistance?</span>
              <div className="flex flex-wrap items-center gap-3 text-neutral-900 font-normal">
                <Link
                  href="/contact"
                  onClick={() => setIsSearchMegaOpen(false)}
                  className="hover:underline transition-all"
                >
                  Contact Us
                </Link>
                <span className="text-neutral-300">|</span>
                <Link
                  href="/contact"
                  onClick={() => setIsSearchMegaOpen(false)}
                  className="hover:underline transition-all"
                >
                  Store Locator
                </Link>
                <span className="text-neutral-300">|</span>
                <Link
                  href="/client-service"
                  onClick={() => setIsSearchMegaOpen(false)}
                  className="hover:underline transition-all"
                >
                  Shopping & Product Advice
                </Link>
                <span className="text-neutral-300">|</span>
                <Link
                  href="/contact"
                  onClick={() => setIsSearchMegaOpen(false)}
                  className="hover:underline transition-all"
                >
                  Book An Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Mega Nav Dropdown: Smooth roll out from top, seamless content swap without flash */}
        <div
          className={`hidden lg:block overflow-hidden transition-all duration-300 ease-out origin-top border-t border-neutral-200/60 bg-[#f9f9f8] text-black ${
            isMegaMenuMounted && activeMegaCategory
              ? 'max-h-[640px] opacity-100 shadow-xl'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {currentMegaData && (
            <div className="w-full max-w-[1520px] mx-auto px-8 lg:px-14 pt-8 pb-12 transition-opacity duration-200">
              <div className="grid grid-cols-12 gap-10 items-start">
                {/* Left 3 Columns of Categories & Links */}
                <div className="col-span-8 grid grid-cols-3 gap-8 xl:gap-12">
                  {currentMegaData.columns.map((col) => (
                    <div key={col.title}>
                      <h4 className="text-[14px] font-normal text-neutral-900 mb-4 tracking-[-0.01em]">
                        {col.title}
                      </h4>
                      <ul className="space-y-2.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <a
                              href={item.href}
                              className="text-[13px] text-neutral-700 font-light hover:text-black transition-colors block leading-relaxed"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Right Featured Campaign Visual: Exact match to image.png */}
                <div className="col-span-4 flex flex-col items-end">
                  <a
                    href={currentMegaData.featured.href}
                    className="group block relative w-[280px] xl:w-[320px] aspect-[4/5] bg-neutral-100 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={currentMegaData.featured.imageUrl}
                      alt={currentMegaData.featured.caption}
                      fill
                      priority
                      sizes="320px"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                  <a
                    href={currentMegaData.featured.href}
                    className="text-[13px] text-neutral-800 font-normal mt-3 text-right hover:text-black hover:underline cursor-pointer block"
                  >
                    {currentMegaData.featured.caption}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modern Mobile Bottom Slide Drawer Navigation with Sub-paths (Matching Moncler Mobile UI) */}
      <MobileMenuBottomDrawer
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        wishlistCount={wishlistCount}
        isHighContrast={isHighContrast}
        onToggleHighContrast={onToggleHighContrast}
        onOpenCountry={onOpenCountry}
        onOpenPeaks={onOpenPeaks}
        onOpenSignup={onOpenSignup}
      />
    </>
  );
}
