'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { MonclerLogo } from './MonclerLogo';

interface SubCategoryItem {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
}

interface CategoryNavData {
  title: string;
  items: SubCategoryItem[];
  featured?: {
    title: string;
    imageUrl: string;
    href: string;
    discoverHref?: string;
    joinHref?: string;
    badge?: string;
  };
}

const MOBILE_MENU_STRUCTURE: Record<string, CategoryNavData> = {
  'New In': {
    title: 'New In',
    items: [
      {
        label: "Women's New In",
        items: [
          { label: 'View All New In', href: '#women' },
          { label: 'New In Outerwear', href: '#women' },
          { label: 'New In Knitwear', href: '#women' },
          { label: 'New In Shoes & Boots', href: '#women' },
        ],
      },
      {
        label: "Men's New In",
        items: [
          { label: 'View All New In', href: '#men' },
          { label: 'New In Outerwear', href: '#men' },
          { label: 'New In Knitwear', href: '#men' },
          { label: 'New In Footwear', href: '#men' },
        ],
      },
      {
        label: "Children's New In",
        items: [
          { label: 'View All Enfant', href: '#children' },
          { label: 'Baby (0-36 Months)', href: '#children' },
          { label: 'Boy & Girl (4-14 Years)', href: '#children' },
        ],
      },
      {
        label: 'Moncler Grenoble New In',
        href: '#grenoble',
      },
      {
        label: 'Latest Collaborations',
        href: '#collections',
      },
    ],
    featured: {
      title: 'Moncler Peaks',
      badge: 'MONCLER',
      imageUrl:
        'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
      href: '#peaks',
      discoverHref: '#peaks',
      joinHref: '#signup',
    },
  },
  'Women': {
    title: 'Women',
    items: [
      {
        label: 'Outerwear',
        items: [
          { label: 'View All Outerwear', href: '#women' },
          { label: 'Short Down Jackets', href: '#women' },
          { label: 'Long Down Jackets & Parkas', href: '#women' },
          { label: 'Gilets & Puffer Vests', href: '#women' },
          { label: 'Windbreakers & Raincoats', href: '#women' },
          { label: 'Leather & Suede Jackets', href: '#women' },
        ],
      },
      {
        label: 'Clothing',
        items: [
          { label: 'View All Clothing', href: '#women' },
          { label: 'Knitwear & Sweaters', href: '#women' },
          { label: 'Cardigans', href: '#women' },
          { label: 'Sweatshirts & Hoodies', href: '#women' },
          { label: 'T-Shirts & Tops', href: '#women' },
          { label: 'Pants & Skirts', href: '#women' },
          { label: 'Dresses', href: '#women' },
        ],
      },
      {
        label: 'Ski & Outdoor',
        items: [
          { label: 'Moncler Grenoble Skiwear', href: '#grenoble' },
          { label: 'Ski Jackets', href: '#grenoble' },
          { label: 'Ski Pants & Bibs', href: '#grenoble' },
          { label: 'Mid & Base Layers', href: '#grenoble' },
          { label: 'Après-Ski', href: '#grenoble' },
        ],
      },
      {
        label: 'Shoes',
        items: [
          { label: 'View All Footwear', href: '#women' },
          { label: 'Trailgrip Sneakers', href: '#women' },
          { label: 'Winter & Snow Boots', href: '#women' },
          { label: 'Ankle Boots & Loafers', href: '#women' },
        ],
      },
      {
        label: 'Accessories',
        items: [
          { label: 'View All Accessories', href: '#women' },
          { label: 'Beanies & Wool Hats', href: '#women' },
          { label: 'Scarves & Gloves', href: '#women' },
          { label: 'Handbags & Crossbody Bags', href: '#women' },
          { label: 'Belts & Small Leather Goods', href: '#women' },
          { label: 'Eyewear & Sunglasses', href: '#women' },
        ],
      },
      {
        label: 'Moncler Grenoble',
        href: '#grenoble',
      },
      {
        label: 'Special Projects',
        href: '#collections',
      },
      {
        label: 'Highlights',
        href: '#women',
      },
      {
        label: 'Gifts',
        href: '#women',
      },
    ],
    featured: {
      title: "Women's Autumn/Winter 2026",
      imageUrl:
        'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt9e16a2ff21a8ebbf/6aa7fc5b2cbb139178bbcf06/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_23.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
      href: '#women',
    },
  },
  'Men': {
    title: 'Men',
    items: [
      {
        label: 'Outerwear',
        items: [
          { label: 'View All Outerwear', href: '/mens-clothing' },
          { label: 'Short Down Jackets', href: '/mens-clothing' },
          { label: 'Long Down Jackets & Parkas', href: '/mens-clothing' },
          { label: 'Gilets & Puffer Vests', href: '/mens-clothing' },
          { label: 'Windbreakers & Shells', href: '/mens-clothing' },
          { label: 'Leather Jackets', href: '/mens-clothing' },
        ],
      },
      {
        label: 'Clothing',
        items: [
          { label: 'View All Ready-to-Wear', href: '/ready-to-wear' },
          { label: 'Knitwear & Sweaters', href: '/ready-to-wear' },
          { label: 'Sweatshirts & Hoodies', href: '/ready-to-wear' },
          { label: 'T-Shirts & Polos', href: '/ready-to-wear' },
          { label: 'Pants & Cargo Trousers', href: '/ready-to-wear' },
        ],
      },
      {
        label: 'Ski & Outdoor',
        items: [
          { label: 'Moncler Grenoble Skiwear', href: '#grenoble' },
          { label: 'High Performance Ski Jackets', href: '#grenoble' },
          { label: 'Ski Pants & Salopettes', href: '#grenoble' },
          { label: 'Technical Base Layers', href: '#grenoble' },
          { label: 'Après Ski & Trekking', href: '#grenoble' },
        ],
      },
      {
        label: 'Shoes',
        items: [
          { label: 'View All Shoes', href: '/mens-clothing' },
          { label: 'Trailgrip Sneakers', href: '/mens-clothing' },
          { label: 'Mountain & Winter Boots', href: '/mens-clothing' },
          { label: 'Casual Sneakers', href: '/mens-clothing' },
        ],
      },
      {
        label: 'Accessories',
        items: [
          { label: 'View All Accessories', href: '/mens-clothing' },
          { label: 'Beanies & Caps', href: '/mens-clothing' },
          { label: 'Scarves & Gloves', href: '/mens-clothing' },
          { label: 'Backpacks & Duffle Bags', href: '/mens-clothing' },
          { label: 'Small Leather Goods', href: '/mens-clothing' },
          { label: 'Eyewear & Ski Goggles', href: '/mens-clothing' },
        ],
      },
      {
        label: 'Moncler Grenoble',
        href: '#grenoble',
      },
      {
        label: 'Special Projects',
        href: '/mens-clothing',
      },
      {
        label: 'Highlights',
        href: '/mens-clothing',
      },
      {
        label: 'Gifts',
        href: '/mens-clothing',
      },
    ],
    featured: {
      title: "Men's Autumn/Winter 2026",
      imageUrl:
        'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
      href: '/mens-clothing',
    },
  },
  'Children': {
    title: 'Children',
    items: [
      {
        label: 'Baby (0-36 Months)',
        items: [
          { label: 'Newborn Snowsuits & Buntings', href: '#children' },
          { label: 'Baby Down Jackets', href: '#children' },
          { label: 'Knitwear & Outfits', href: '#children' },
          { label: 'Hats & Booties', href: '#children' },
        ],
      },
      {
        label: 'Boy (4-14 Years)',
        items: [
          { label: 'Down Jackets & Parkas', href: '#children' },
          { label: 'Sweatshirts & Hoodies', href: '#children' },
          { label: 'Tracksuits & Pants', href: '#children' },
          { label: 'Sneakers & Beanies', href: '#children' },
        ],
      },
      {
        label: 'Girl (4-14 Years)',
        items: [
          { label: 'Down Jackets & Long Coats', href: '#children' },
          { label: 'Dresses & Knitwear', href: '#children' },
          { label: 'Leggings & Bottoms', href: '#children' },
          { label: 'Boots & Accessories', href: '#children' },
        ],
      },
      {
        label: 'Shoes & Accessories',
        href: '#children',
      },
      {
        label: 'Gifts for Kids',
        href: '#children',
      },
    ],
    featured: {
      title: 'Enfant Collection',
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a/image/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a.jpg?q_auto=high&q=90&w=1900',
      href: '#children',
    },
  },
  'Grenoble': {
    title: 'Grenoble',
    items: [
      {
        label: 'Women Ski & Outdoor',
        items: [
          { label: 'High Performance Ski Jackets', href: '#grenoble' },
          { label: 'Ski Pants & Overalls', href: '#grenoble' },
          { label: 'Thermal Mid & Base Layers', href: '#grenoble' },
          { label: 'Après-Ski Knitwear', href: '#grenoble' },
        ],
      },
      {
        label: 'Men Ski & Outdoor',
        items: [
          { label: 'GORE-TEX Pro Jackets', href: '#grenoble' },
          { label: 'High Altitude Ski Shells', href: '#grenoble' },
          { label: 'Technical Snow Pants', href: '#grenoble' },
          { label: 'Thermal Layers', href: '#grenoble' },
        ],
      },
      {
        label: 'High Performance Shells',
        href: '#grenoble',
      },
      {
        label: 'Après Ski & Knitwear',
        href: '#grenoble',
      },
      {
        label: 'Ski Accessories & Helmets',
        href: '#grenoble',
      },
    ],
    featured: {
      title: 'Moncler Grenoble High Performance',
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a/image/48bd86c7-1f5d-4547-88f2-d2f7878b1f8a.jpg?q_auto=high&q=90&w=1900',
      href: '#grenoble',
    },
  },
  'In Moncler': {
    title: 'In Moncler',
    items: [
      {
        label: 'Stories & Culture',
        items: [
          { label: 'Summer Collection 2026', href: '/summer-collection' },
          { label: 'Brand Heritage Since 1952', href: '#in-moncler' },
          { label: 'Moncler Genius Community', href: '#in-moncler' },
          { label: 'Through A Different Lens', href: '#in-moncler' },
        ],
      },
      {
        label: 'Sustainability',
        items: [
          { label: 'Born to Protect Plan', href: '#in-moncler' },
          { label: 'DIST Down Certification', href: '#in-moncler' },
          { label: 'Circular Fashion & Materials', href: '#in-moncler' },
        ],
      },
      {
        label: 'Boutique Services',
        items: [
          { label: 'Client Service', href: '/client-service' },
          { label: 'Book a Boutique Appointment', href: '/client-service#appointment' },
          { label: 'Aftercare & Repairs', href: '/client-service#aftercare' },
          { label: 'Product Verification', href: '/client-service#verification' },
        ],
      },
    ],
    featured: {
      title: 'Moncler Heritage & Future',
      imageUrl:
        'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
      href: '#in-moncler',
    },
  },
  'Collections': {
    title: 'Collections',
    items: [
      { label: 'Moncler Collection', href: '#collections' },
      { label: 'Moncler Grenoble', href: '#grenoble' },
      { label: 'Moncler Genius', href: '#collections' },
      { label: 'Moncler Matt Black', href: '#collections' },
      { label: 'Archive & Heritage', href: '#collections' },
    ],
    featured: {
      title: 'Moncler Genius Collaborations',
      imageUrl:
        'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
      href: '#collections',
    },
  },
};

interface MobileMenuBottomDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistCount?: number;
  isHighContrast?: boolean;
  onToggleHighContrast?: () => void;
  onOpenCountry?: () => void;
  onOpenPeaks?: () => void;
  onOpenSignup?: () => void;
}

export function MobileMenuBottomDrawer({
  isOpen,
  onClose,
  wishlistCount = 0,
  isHighContrast = false,
  onToggleHighContrast,
  onOpenCountry,
  onOpenPeaks,
  onOpenSignup,
}: MobileMenuBottomDrawerProps) {
  // Navigation stack: ['root'] -> ['root', 'Women'] -> ['root', 'Women', 'Outerwear']
  const [navPath, setNavPath] = useState<string[]>(['root']);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Reset path when menu closes or opens
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setNavPath(['root']);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const currentLevel = navPath.length;
  const currentCategoryKey = navPath[1]; // Level 2 key (e.g., 'Women')
  const currentSubItemKey = navPath[2]; // Level 3 key (e.g., 'Outerwear')

  const handleDrillDown = (name: string) => {
    setDirection('forward');
    setNavPath((prev) => [...prev, name]);
  };

  const handleBack = () => {
    setDirection('backward');
    setNavPath((prev) => prev.slice(0, -1));
  };

  const primaryCategories = [
    'New In',
    'Women',
    'Men',
    'Children',
    'Grenoble',
    'In Moncler',
    'Collections',
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu-drawer-wrapper"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-40 bg-[#fbfbf9] text-black lg:hidden flex flex-col justify-between overflow-hidden"
        >
          {/* Main Scrollable View Area */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {/* LEVEL 1: Root Menu */}
              {currentLevel === 1 && (
                <motion.div
                  key="level-1-root"
                  custom={direction}
                  initial={{ x: direction === 'forward' ? '0%' : '-30%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-30%', opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 overflow-y-auto px-6 pt-7 pb-24 flex flex-col justify-between"
                >
                  <div>
                    {/* Centered Brand Title */}
                    <div className="flex justify-center mb-8">
                      <MonclerLogo size="md" isNegative={true} />
                    </div>

                    {/* Primary Category Links with clean Right Chevrons */}
                    <nav aria-label="Main navigation categories" className="space-y-0.5">
                      {primaryCategories.map((category) => (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleDrillDown(category)}
                          className="w-full flex items-center justify-between py-3.5 text-left text-[17px] font-normal tracking-[-0.01em] text-neutral-900 active:text-neutral-500 transition-colors group cursor-pointer"
                        >
                          <span>{category}</span>
                          <ChevronRight className="w-4 h-4 text-neutral-800 stroke-[1.4] transition-transform duration-200 group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </nav>

                    {/* Secondary Navigation Links */}
                    <div className="mt-8 pt-4 space-y-4 text-[14px] text-neutral-800 font-normal">
                      <button
                        type="button"
                        onClick={onClose}
                        className="block text-left w-full hover:text-black py-0.5 transition-colors cursor-pointer"
                      >
                        Wishlist ({wishlistCount})
                      </button>

                      <Link
                        href="/client-service"
                        onClick={onClose}
                        className="block text-left w-full hover:text-black py-0.5 transition-colors cursor-pointer"
                      >
                        Client Service
                      </Link>

                      <button
                        type="button"
                        onClick={onClose}
                        className="block text-left w-full hover:text-black py-0.5 transition-colors cursor-pointer"
                      >
                        Store Locator
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenCountry?.();
                        }}
                        className="block text-left w-full hover:text-black py-0.5 transition-colors cursor-pointer"
                      >
                        United Kingdom (GBP) | English
                      </button>
                    </div>

                    {/* High Contrast Row */}
                    <div className="mt-7 flex items-center justify-between text-[14px] text-neutral-800">
                      <span>High contrast</span>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            if (!isHighContrast) onToggleHighContrast?.();
                          }}
                          className={`cursor-pointer ${
                            isHighContrast ? 'font-medium underline underline-offset-4' : 'text-neutral-700 hover:text-black'
                          }`}
                        >
                          On
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (isHighContrast) onToggleHighContrast?.();
                          }}
                          className={`cursor-pointer ${
                            !isHighContrast ? 'font-medium underline underline-offset-4' : 'text-neutral-700 hover:text-black'
                          }`}
                        >
                          Off
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Card: Moncler Peaks Banner (exact match to screenshot 1 & 2) */}
                  <div className="mt-10">
                    <div className="relative w-full aspect-[16/10] bg-neutral-900 rounded-none overflow-hidden group">
                      <Image
                        src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90"
                        alt="Moncler Peaks"
                        fill
                        className="object-cover object-center opacity-85 group-hover:scale-103 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-end pb-6 px-4 text-center">
                        {/* Cockerel Badge */}
                        <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center mb-2 bg-white/10 backdrop-blur-xs">
                          <span className="text-[10px] tracking-widest font-serif font-bold text-white">M</span>
                        </div>
                        <h3 className="text-white text-[19px] font-normal tracking-wide mb-3">
                          Moncler Peaks
                        </h3>
                        <div className="flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium text-white">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenPeaks?.();
                            }}
                            className="hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            DISCOVER <ChevronRight className="w-3 h-3 stroke-[2]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenSignup?.();
                            }}
                            className="hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            JOIN <ChevronRight className="w-3 h-3 stroke-[2]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LEVEL 2: Subcategory Menu (e.g. Women, Men, Grenoble) */}
              {currentLevel === 2 && currentCategoryKey && (
                <motion.div
                  key={`level-2-${currentCategoryKey}`}
                  custom={direction}
                  initial={{ x: direction === 'forward' ? '100%' : '-30%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction === 'forward' ? '-30%' : '100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 overflow-y-auto px-6 pt-6 pb-24 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Back Chevron and Centered Title */}
                    <div className="relative flex items-center justify-center pb-6 mb-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        aria-label="Back to main menu"
                        className="absolute left-0 p-2 -ml-2 text-neutral-900 active:text-neutral-500 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[1.4]" />
                      </button>
                      <h2 className="text-[19px] font-normal tracking-[-0.01em] text-neutral-900">
                        {currentCategoryKey}
                      </h2>
                    </div>

                    {/* Subcategories list with clean right chevrons */}
                    <nav aria-label={`${currentCategoryKey} subcategories`} className="space-y-0.5">
                      {MOBILE_MENU_STRUCTURE[currentCategoryKey]?.items.map((item) => (
                        <div key={item.label}>
                          {item.items && item.items.length > 0 ? (
                            <button
                              type="button"
                              onClick={() => handleDrillDown(item.label)}
                              className="w-full flex items-center justify-between py-3.5 text-left text-[16px] font-normal tracking-[-0.01em] text-neutral-900 active:text-neutral-500 transition-colors group cursor-pointer"
                            >
                              <span>{item.label}</span>
                              <ChevronRight className="w-4 h-4 text-neutral-800 stroke-[1.4] transition-transform duration-200 group-hover:translate-x-0.5" />
                            </button>
                          ) : (
                            <a
                              href={item.href || `#${currentCategoryKey.toLowerCase()}`}
                              onClick={onClose}
                              className="w-full flex items-center justify-between py-3.5 text-left text-[16px] font-normal tracking-[-0.01em] text-neutral-900 active:text-neutral-500 transition-colors group cursor-pointer"
                            >
                              <span>{item.label}</span>
                              <ChevronRight className="w-4 h-4 text-neutral-800 stroke-[1.4] transition-transform duration-200 group-hover:translate-x-0.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>

                  {/* Submenu Featured Visual (Screenshot 3 match) */}
                  {MOBILE_MENU_STRUCTURE[currentCategoryKey]?.featured && (
                    <div className="mt-10">
                      <a
                        href={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured?.href || '#'}
                        onClick={onClose}
                        className="block relative w-full aspect-[16/11] bg-neutral-100 overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured!.imageUrl}
                          alt={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured!.title}
                          fill
                          className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </a>
                    </div>
                  )}
                </motion.div>
              )}

              {/* LEVEL 3: Deep Sub-items (e.g. Outerwear -> Short Down Jackets, Long Down Jackets) */}
              {currentLevel === 3 && currentCategoryKey && currentSubItemKey && (
                <motion.div
                  key={`level-3-${currentCategoryKey}-${currentSubItemKey}`}
                  custom={direction}
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0 overflow-y-auto px-6 pt-6 pb-24 flex flex-col justify-between"
                >
                  <div>
                    {/* Header with Back Chevron and Centered Title */}
                    <div className="relative flex items-center justify-center pb-6 mb-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        aria-label={`Back to ${currentCategoryKey}`}
                        className="absolute left-0 p-2 -ml-2 text-neutral-900 active:text-neutral-500 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5 stroke-[1.4]" />
                      </button>
                      <h2 className="text-[19px] font-normal tracking-[-0.01em] text-neutral-900">
                        {currentSubItemKey}
                      </h2>
                    </div>

                    {/* Detailed product category items */}
                    <div className="space-y-1">
                      {MOBILE_MENU_STRUCTURE[currentCategoryKey]?.items
                        .find((item) => item.label === currentSubItemKey)
                        ?.items?.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            onClick={onClose}
                            className="block py-3.5 text-[15px] font-normal text-neutral-800 hover:text-black border-b border-neutral-100 last:border-0 transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* Editorial visual */}
                  {MOBILE_MENU_STRUCTURE[currentCategoryKey]?.featured && (
                    <div className="mt-10">
                      <a
                        href={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured?.href || '#'}
                        onClick={onClose}
                        className="block relative w-full aspect-[16/11] bg-neutral-100 overflow-hidden group cursor-pointer"
                      >
                        <Image
                          src={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured!.imageUrl}
                          alt={MOBILE_MENU_STRUCTURE[currentCategoryKey].featured!.title}
                          fill
                          className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
