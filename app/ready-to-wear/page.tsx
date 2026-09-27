'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal, 
  X, 
  Check, 
  Filter as FilterIcon,
  Sparkles,
  Search,
  ShoppingBag
} from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { ValuePropositionBar } from '@/components/ValuePropositionBar';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modals';
import { MobileFloatingBar } from '@/components/MobileFloatingBar';

// Imported Generated Image Assets
import editorialCloseImg from '@/src/assets/images/rtw_editorial_close_1790464189938.jpg';
import editorialFullImg from '@/src/assets/images/rtw_editorial_full_1790464206961.jpg';
import brownFleeceImg from '@/src/assets/images/rtw_brown_fleece_1790464231186.jpg';
import horseTeeImg from '@/src/assets/images/rtw_horse_tee_1790464245595.jpg';
import checkOvershirtImg from '@/src/assets/images/rtw_check_overshirt_1790464256838.jpg';
import modelDenimImg from '@/src/assets/images/rtw_model_denim_1790464269897.jpg';
import boucleHoodieImg from '@/src/assets/images/rtw_boucle_hoodie_1790464282139.jpg';
import horseHoodieImg from '@/src/assets/images/rtw_horse_hoodie_1790464293310.jpg';
import beigeTrousersImg from '@/src/assets/images/rtw_beige_trousers_1790464304851.jpg';
import beigeCottonJacketImg from '@/src/assets/images/rtw_beige_cotton_jacket_1790464317578.jpg';
import navyPaddedCardiganImg from '@/src/assets/images/rtw_navy_padded_cardigan_1790464328618.jpg';
import blackPoloImg from '@/src/assets/images/rtw_black_polo_1790464343256.jpg';
import tanSweatshirtImg from '@/src/assets/images/rtw_tan_sweatshirt_1790464358642.jpg';
import denimJeansImg from '@/src/assets/images/rtw_denim_jeans_1790464219766.jpg';
import tanTshirtImg from '@/src/assets/images/moncler_tan_tshirt_1790463302766.jpg';
import teddySweatshirtImg from '@/src/assets/images/moncler_teddy_sweatshirt_1790463278502.jpg';
import ravenlockJacketImg from '@/src/assets/images/moncler_ravenlock_jacket_1790463291190.jpg';

interface ProductItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  category: string;
  colorsCount: number;
  swatches: string[];
  productImage: any;
  modelImage: any;
  isEditorial?: boolean;
}

const ALL_READY_TO_WEAR_PRODUCTS: ProductItem[] = [
  {
    id: 'rtw-1',
    name: 'Logo Knit Sweatshirt',
    price: '£665.00',
    priceNum: 665,
    category: 'Sweatshirts',
    colorsCount: 2,
    swatches: ['#3e2723', '#111111'],
    productImage: brownFleeceImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-2',
    name: 'Horse Print Cotton Jersey T-Shirt',
    price: '£300.00',
    priceNum: 300,
    category: 'T-Shirts',
    colorsCount: 1,
    swatches: ['#f5efe6'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-3',
    name: 'Check Wool Shirt Jacket',
    price: '£1,350.00',
    priceNum: 1350,
    category: 'Shirt Jackets',
    colorsCount: 1,
    swatches: ['#4b5563'],
    productImage: checkOvershirtImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-4',
    name: 'Straight Leg Denim Jeans',
    price: '£570.00',
    priceNum: 570,
    category: 'Trousers',
    colorsCount: 1,
    swatches: ['#3b5998'],
    productImage: denimJeansImg,
    modelImage: modelDenimImg,
  },
  // Row 2
  {
    id: 'rtw-5',
    name: 'Bouclé Wool Blend Zip-up Hoodie',
    price: '£765.00',
    priceNum: 765,
    category: 'Hoodies',
    colorsCount: 2,
    swatches: ['#bcaaa4', '#111111'],
    productImage: boucleHoodieImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-6',
    name: 'Down Jacket Print Cotton T-Shirt',
    price: '£280.00',
    priceNum: 280,
    category: 'T-Shirts',
    colorsCount: 3,
    swatches: ['#f5efe6', '#d7ccc8', '#bbdefb'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-7',
    name: 'Horse Jacquard Teddy Hoodie',
    price: '£675.00',
    priceNum: 675,
    category: 'Hoodies',
    colorsCount: 1,
    swatches: ['#c7a379'],
    productImage: horseHoodieImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-8',
    name: 'Stretch Gabardine Trousers',
    price: '£630.00',
    priceNum: 630,
    category: 'Trousers',
    colorsCount: 3,
    swatches: ['#d7ccc8', '#424242', '#111111'],
    productImage: beigeTrousersImg,
    modelImage: modelDenimImg,
  },
  // Row 3
  {
    id: 'rtw-9',
    name: 'Leather Logo Cotton Shirt Jacket',
    price: '£1,160.00',
    priceNum: 1160,
    category: 'Shirt Jackets',
    colorsCount: 1,
    swatches: ['#e0d2c1'],
    productImage: beigeCottonJacketImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-10',
    name: 'Wool & Cashmere Blend Padded Zip-Up Cardigan',
    price: '£1,110.00',
    priceNum: 1110,
    category: 'Padded Cardigans',
    colorsCount: 3,
    swatches: ['#1e293b', '#bcaaa4', '#111111'],
    productImage: navyPaddedCardiganImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-11',
    name: 'Logo Cotton Piquet Polo Shirt',
    price: '£300.00',
    priceNum: 300,
    category: 'Polos',
    colorsCount: 3,
    swatches: ['#111111', '#f5f5f5', '#1e3a8a'],
    productImage: blackPoloImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-12',
    name: 'Tailored Cotton Blend Trousers',
    price: '£630.00',
    priceNum: 630,
    category: 'Trousers',
    colorsCount: 1,
    swatches: ['#222222'],
    productImage: beigeTrousersImg,
    modelImage: modelDenimImg,
  },
  // Row 4
  {
    id: 'rtw-13',
    name: 'Check Jersey Zip-up Shirt Jacket',
    price: '£820.00',
    priceNum: 820,
    category: 'Shirt Jackets',
    colorsCount: 3,
    swatches: ['#374151', '#4b5563', '#1f2937'],
    productImage: checkOvershirtImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-14',
    name: 'Logo Cotton T-Shirt',
    price: '£300.00',
    priceNum: 300,
    category: 'T-Shirts',
    colorsCount: 3,
    swatches: ['#c2a78e', '#ffffff', '#111111'],
    productImage: tanTshirtImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-15',
    name: 'Tricolour Logo Long Sleeve Cotton T-Shirt',
    price: '£340.00',
    priceNum: 340,
    category: 'T-Shirts',
    colorsCount: 1,
    swatches: ['#f5f5f5'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-16',
    name: 'Logo Cotton T-Shirt',
    price: '£280.00',
    priceNum: 280,
    category: 'T-Shirts',
    colorsCount: 3,
    swatches: ['#f5f5f5', '#111111', '#1e3a8a'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  // Row 5
  {
    id: 'rtw-17',
    name: 'Check Cotton Flannel Zip-Up Shirt',
    price: '£955.00',
    priceNum: 955,
    category: 'Shirts',
    colorsCount: 1,
    swatches: ['#4b5563'],
    productImage: checkOvershirtImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-18',
    name: 'Monogram Cotton T-Shirt',
    price: '£280.00',
    priceNum: 280,
    category: 'T-Shirts',
    colorsCount: 5,
    swatches: ['#f5f5f5', '#c7a379', '#111111', '#1e3a8a', '#10b981'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-19',
    name: 'Padded Zip-Up Cardigan',
    price: '£800.00',
    priceNum: 800,
    category: 'Padded Cardigans',
    colorsCount: 2,
    swatches: ['#1e293b', '#111111'],
    productImage: navyPaddedCardiganImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-20',
    name: 'Monogram Cotton T-Shirt',
    price: '£280.00',
    priceNum: 280,
    category: 'T-Shirts',
    colorsCount: 5,
    swatches: ['#f5efe6', '#d7ccc8', '#111111', '#4b5563', '#1e3a8a'],
    productImage: tanTshirtImg,
    modelImage: modelDenimImg,
  },
  // Row 6
  {
    id: 'rtw-21',
    name: 'Padded Wool Zip-Up Hoodie',
    price: '£955.00',
    priceNum: 955,
    category: 'Hoodies',
    colorsCount: 1,
    swatches: ['#111111'],
    productImage: teddySweatshirtImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-22',
    name: 'Logo Cotton Jersey T-Shirt',
    price: '£300.00',
    priceNum: 300,
    category: 'T-Shirts',
    colorsCount: 3,
    swatches: ['#f5f5f5', '#111111', '#d7ccc8'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-23',
    name: 'Striped Wool Blend Bouclé Jumper',
    price: '£665.00',
    priceNum: 665,
    category: 'Sweaters',
    colorsCount: 2,
    swatches: ['#bcaaa4', '#111111'],
    productImage: boucleHoodieImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-24',
    name: 'Flocked Logo Cotton T-Shirt',
    price: '£260.00',
    priceNum: 260,
    category: 'T-Shirts',
    colorsCount: 2,
    swatches: ['#f5f5f5', '#111111'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  // Row 7
  {
    id: 'rtw-25',
    name: 'Wool & Cashmere Blend Hoodie',
    price: '£1,060.00',
    priceNum: 1060,
    category: 'Hoodies',
    colorsCount: 1,
    swatches: ['#111111'],
    productImage: boucleHoodieImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-26',
    name: 'Logo Patch Cotton Piquet Polo Shirt',
    price: '£300.00',
    priceNum: 300,
    category: 'Polos',
    colorsCount: 3,
    swatches: ['#111111', '#f5f5f5', '#1e3a8a'],
    productImage: blackPoloImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-27',
    name: 'Wool & Cashmere Long Sleeve Polo',
    price: '£665.00',
    priceNum: 665,
    category: 'Polos',
    colorsCount: 2,
    swatches: ['#1e293b', '#111111'],
    productImage: navyPaddedCardiganImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-28',
    name: 'Tailored Trousers',
    price: '£765.00',
    priceNum: 765,
    category: 'Trousers',
    colorsCount: 1,
    swatches: ['#111111'],
    productImage: beigeTrousersImg,
    modelImage: modelDenimImg,
  },
  // Row 8
  {
    id: 'rtw-29',
    name: 'Double Leather Logo Cotton T-Shirt',
    price: '£340.00',
    priceNum: 340,
    category: 'T-Shirts',
    colorsCount: 4,
    swatches: ['#f5f5f5', '#d7ccc8', '#111111', '#1e3a8a'],
    productImage: horseTeeImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-30',
    name: 'Wool & Cashmere Blend Zip-Up Sweatshirt',
    price: '£1,060.00',
    priceNum: 1060,
    category: 'Sweatshirts',
    colorsCount: 1,
    swatches: ['#111111'],
    productImage: brownFleeceImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-31',
    name: 'Leather Logo Cotton Short Sleeve Shirt',
    price: '£580.00',
    priceNum: 580,
    category: 'Shirts',
    colorsCount: 1,
    swatches: ['#111111'],
    productImage: blackPoloImg,
    modelImage: modelDenimImg,
  },
  {
    id: 'rtw-32',
    name: 'Leather Logo Tag Cotton Blend Trousers',
    price: '£580.00',
    priceNum: 580,
    category: 'Trousers',
    colorsCount: 2,
    swatches: ['#d7ccc8', '#111111'],
    productImage: beigeTrousersImg,
    modelImage: modelDenimImg,
  },
];

const CATEGORY_CHIPS = [
  'Polos & T-Shirts',
  'Sweaters & Cardigans',
  'Sweatshirts',
  'Shirts',
  'Swimwear',
  'Trousers',
];

const FILTER_CATEGORIES = [
  'Padded Cardigans',
  'Cardigans',
  'Sweaters',
  'Sweatshirts',
  'Padded Sweatshirts',
  'Zip-up sweatshirt',
  'Hoodies',
  'T-Shirts',
  'Polos',
  'Shirts',
  'Shirt Jackets',
  'Vests',
  'Trousers',
  'Shorts',
  'Tracksuits',
  'Swimwear',
];

const FILTER_COLORS = [
  { name: 'Beige', hex: '#e8d8c8' },
  { name: 'Black', hex: '#111111' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Brown', hex: '#5c4033' },
  { name: 'Grey', hex: '#6b7280' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Multicolour', gradient: 'linear-gradient(135deg, #ef4444, #3b82f6, #10b981)' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'White', hex: '#ffffff', border: true },
];

const FILTER_SIZES = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL',
  '42', '44', '46', '48', '50', '52', '54', '56', '58'
];

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  quantity: number;
  image: string;
}

export default function ReadyToWearPage() {
  // High contrast mode state
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Modals & Navigation state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<{ name: string; price: string; image: string } | null>(null);

  // Filter Drawer State
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'product' | 'model'>('product');
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);

  // Active filters
  const [selectedSort, setSelectedSort] = useState<'suggested' | 'price-desc' | 'price-asc'>('suggested');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedPadding, setSelectedPadding] = useState<'yes' | 'no' | null>(null);
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Infinite Scroll / Lazy Pagination state
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);

  // Image load cache for blue-fade-blur transition
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  // Shopping cart items state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      name: 'Abstraction Hooded Wool Blend Short Down Jacket',
      price: '£1,900.00',
      size: '2',
      quantity: 1,
      image: 'https://placehold.co/700x1050/f5f5f5/222222.png?text=Abstraction+Hooded+Down+Jacket',
    },
  ]);

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (product: { name: string; price: string; image: string; size: string }) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}`,
        name: product.name,
        price: product.price,
        size: product.size || '2',
        quantity: 1,
        image: product.image,
      },
    ]);
    setIsCartOpen(true);
  };

  // Filter & Sort Logic
  const filteredProducts = ALL_READY_TO_WEAR_PRODUCTS.filter((item) => {
    if (activeChip && !item.category.toLowerCase().includes(activeChip.toLowerCase().replace('&', '').split(' ')[0])) {
      // rough matching for chips
    }
    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (selectedSort === 'price-asc') return a.priceNum - b.priceNum;
    if (selectedSort === 'price-desc') return b.priceNum - a.priceNum;
    return 0;
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const totalResults = 306; // Matching screenshot "306 result(s)"

  // Intersection Observer for Smooth Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
            setIsLoadingMore(false);
          }, 450);
        }
      },
      { rootMargin: '300px' }
    );

    if (loadMoreSentinelRef.current) {
      observer.observe(loadMoreSentinelRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, filteredProducts.length, isLoadingMore]);

  // Toggle category in filter
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle color in filter
  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  // Toggle size in filter
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedSort('suggested');
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedPadding(null);
    setActiveChip(null);
  };

  const activeFiltersCount = 
    (selectedSort !== 'suggested' ? 1 : 0) + 
    selectedCategories.length + 
    selectedColors.length + 
    selectedSizes.length + 
    (selectedPadding ? 1 : 0);

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white ${
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-[#fafafa]'
      }`}
    >
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onOpenPeaksModal={() => setIsPeaksOpen(true)}
      />

      {/* Main Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenPeaks={() => setIsPeaksOpen(true)}
        onOpenCountry={() => setIsCountryOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSetMobileMenuOpen={setIsMobileMenuOpen}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast((prev) => !prev)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Header Breadcrumb & Title Area - No fixed max-width restriction */}
      <header className="w-full bg-[#fafafa] pt-5 sm:pt-7 pb-4 px-4 sm:px-8 lg:px-12 border-b border-neutral-100">
        <div className="w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-neutral-500 mb-3">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              HOME
            </Link>
            <span className="text-neutral-400 font-light">&gt;</span>
            <Link href="/mens-clothing" className="hover:text-neutral-900 transition-colors">
              MEN
            </Link>
          </nav>

          {/* Page Heading & Total Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-4">
            <div>
              <h1 className="text-[26px] sm:text-[34px] lg:text-[40px] font-normal tracking-tight text-neutral-900 font-serif leading-[1.1]">
                Clothing for Men
              </h1>
              <p className="text-[13px] text-neutral-500 font-light mt-1">
                {totalResults} result(s)
              </p>
            </div>
          </div>

          {/* Category Quick Chips (Horizontal Scrollable) */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = activeChip === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setActiveChip(isActive ? null : chip)}
                  className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 text-white font-medium shadow-sm'
                      : 'bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Sticky Filter & View Toolbar (Sticks smoothly to the top on mobile and desktop) */}
      <div className="sticky top-0 z-30 w-full bg-[#fafafa]/95 backdrop-blur-md border-b border-neutral-200/80 px-4 sm:px-8 lg:px-12 py-3 transition-shadow shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="w-full flex items-center justify-between">
          
          {/* Left: View Mode Dropdown (Product vs Model) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsViewDropdownOpen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-[13px] sm:text-[14px] text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer py-1 font-medium"
            >
              <span>View: <span className="capitalize font-semibold">{viewMode}</span></span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* View Dropdown Menu */}
            {isViewDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-36 bg-white border border-neutral-200 shadow-xl py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('product');
                    setIsViewDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[13px] transition-colors cursor-pointer ${
                    viewMode === 'product' ? 'bg-neutral-100 font-medium text-black' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('model');
                    setIsViewDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[13px] transition-colors cursor-pointer ${
                    viewMode === 'model' ? 'bg-neutral-100 font-medium text-black' : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  Model
                </button>
              </div>
            )}
          </div>

          {/* Right: Filter Button (Opens slide-up mobile / sidebar overlay) */}
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-medium text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer group py-1"
          >
            <span>Filter</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white text-[10px] flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
            <SlidersHorizontal className="w-4 h-4 stroke-[1.75] transition-transform group-hover:rotate-12" />
          </button>
        </div>
      </div>

      {/* Main Full-Width Product Catalog Grid - No constrained max-width */}
      <main className="w-full px-2 sm:px-6 lg:px-10 py-6 sm:py-8">
        
        {/* Responsive Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 sm:gap-x-4 lg:gap-x-6 gap-y-8 sm:gap-y-12">
          
          {visibleProducts.map((product, index) => {
            const isImageLoaded = loadedImages[product.id];
            const displayImage = viewMode === 'model' ? product.modelImage : product.productImage;

            return (
              <React.Fragment key={product.id}>
                {/* Product Card */}
                <div className="group flex flex-col justify-between">
                  {/* Image Container with Blue Fade / Blur Placeholder */}
                  <div 
                    onClick={() => setQuickViewProduct({
                      name: product.name,
                      price: product.price,
                      image: typeof displayImage === 'string' ? displayImage : displayImage.src
                    })}
                    className="relative aspect-[3/4] w-full bg-[#e8edf2] overflow-hidden cursor-pointer"
                  >
                    {/* Subtle blue pulse placeholder while loading */}
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#dbeafe] via-[#e0e7ff] to-[#eff6ff] animate-pulse" />
                    )}

                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      onLoad={() => {
                        setLoadedImages((prev) => ({ ...prev, [product.id]: true }));
                      }}
                      className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
                        isImageLoaded
                          ? 'opacity-100 scale-100 blur-0'
                          : 'opacity-0 scale-105 blur-md'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick View Button on Desktop Hover */}
                    <div className="absolute inset-x-3 bottom-3 hidden lg:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewProduct({
                            name: product.name,
                            price: product.price,
                            image: typeof displayImage === 'string' ? displayImage : displayImage.src
                          });
                        }}
                        className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-neutral-900 text-[11px] tracking-[0.14em] uppercase font-medium hover:bg-neutral-900 hover:text-white transition-colors shadow-md"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pt-3 flex flex-col gap-1">
                    {/* 3 dots swatch indicator */}
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 inline-block" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 inline-block" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[13px] sm:text-[14px] text-neutral-900 font-normal leading-snug line-clamp-2 hover:underline cursor-pointer">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-[12.5px] sm:text-[13.5px] text-neutral-800 font-light mt-0.5">
                      {product.price}
                    </p>

                    {/* Color Swatch Squares / Count */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {product.swatches && product.swatches.length > 0 && (
                        <div className="flex items-center gap-1">
                          {product.swatches.map((swatch, sIdx) => (
                            <span
                              key={sIdx}
                              className="w-3.5 h-3.5 border border-neutral-300 inline-block shrink-0 shadow-2xs"
                              style={{ backgroundColor: swatch }}
                            />
                          ))}
                        </div>
                      )}
                      <span className="text-[11px] text-neutral-500 font-light ml-1">
                        {product.colorsCount} {product.colorsCount === 1 ? 'Colour' : 'Colours'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Double Inset Banner matching screenshot after Row 1 */}
                {index === 3 && (
                  <div className="col-span-2 md:col-span-3 lg:col-span-4 my-6 sm:my-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                      {/* Left: Scarf detail closeup */}
                      <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden group cursor-pointer">
                        <Image
                          src={editorialCloseImg}
                          alt="Moncler ready to wear scarf detail"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      {/* Right: Full model look */}
                      <div className="relative aspect-square w-full bg-neutral-900 overflow-hidden group cursor-pointer">
                        <Image
                          src={editorialFullImg}
                          alt="Moncler ready to wear dark green jacket look"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Sentinel element for infinite scroll */}
        <div ref={loadMoreSentinelRef} className="w-full h-16 flex items-center justify-center my-8">
          {isLoadingMore && (
            <div className="flex items-center gap-2 text-neutral-500 text-[13px] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-neutral-900 animate-ping" />
              <span>Loading more ready-to-wear pieces...</span>
            </div>
          )}
        </div>

        {/* Bottom Editorial Copy (Matching screenshot) */}
        <div className="w-full pt-12 pb-16 border-t border-neutral-200 mt-12 flex justify-end">
          <p className="max-w-[480px] text-[13px] sm:text-[14px] text-neutral-700 font-light leading-[1.75] text-right">
            Everyday dressing takes shape in men’s Moncler ready-to-wear, where knit layers and tailored outer pieces meet relaxed essentials. Shirts, bomber silhouettes, and coordinated tracksuit sets bring contrast in structure and comfort, aligned with a city-to-mountain sensibility and clean design.
          </p>
        </div>
      </main>

      {/* Slide-Up Mobile / Overlay Filter Drawer (Matching Screenshot) */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-end md:justify-center">
          {/* Backdrop */}
          <div 
            onClick={() => setIsFilterDrawerOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
          />

          {/* Drawer Panel - Full 100dvh / 100vh height on mobile with smooth slide up */}
          <div className="relative w-full h-[100dvh] md:h-full md:max-h-[100dvh] md:w-[480px] md:ml-auto bg-[#faf9f5] flex flex-col shadow-2xl animate-in slide-in-from-bottom md:slide-in-from-right duration-300 ease-out z-10">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/80 bg-[#faf9f5] sticky top-0 z-10 shrink-0">
              <h2 className="text-[19px] sm:text-[21px] font-normal tracking-tight font-serif text-neutral-900">
                Filter
              </h2>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 -mr-2 text-neutral-700 hover:text-black transition-colors cursor-pointer"
                aria-label="Close Filter"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>
            </div>

            {/* Scrollable Filter Options - Flex 1 to fill height naturally */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 space-y-8">
              
              {/* Section 1: Sort by */}
              <div>
                <h3 className="text-[15px] font-medium text-neutral-900 mb-3.5 tracking-tight">
                  Sort by
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSort('suggested')}
                    className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                      selectedSort === 'suggested'
                        ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                        : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                    }`}
                  >
                    Suggested
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSort('price-desc')}
                    className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                      selectedSort === 'price-desc'
                        ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                        : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                    }`}
                  >
                    Price, high to low
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSort('price-asc')}
                    className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                      selectedSort === 'price-asc'
                        ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                        : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                    }`}
                  >
                    Price, low to high
                  </button>
                </div>
              </div>

              {/* Section 2: Category */}
              <div>
                <h3 className="text-[15px] font-medium text-neutral-900 mb-3.5 tracking-tight">
                  Category
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {(showAllCategories ? FILTER_CATEGORIES : FILTER_CATEGORIES.slice(0, 12)).map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                            : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
                {FILTER_CATEGORIES.length > 12 && (
                  <button
                    type="button"
                    onClick={() => setShowAllCategories((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.14em] font-medium text-neutral-900 mt-3.5 hover:text-neutral-600 transition-colors cursor-pointer"
                  >
                    <span>{showAllCategories ? 'SEE LESS' : 'SEE MORE +4'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>

              {/* Section 3: Colour */}
              <div>
                <h3 className="text-[15px] font-medium text-neutral-900 mb-3.5 tracking-tight">
                  Colour
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {FILTER_COLORS.map((col) => {
                    const isSelected = selectedColors.includes(col.name);
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => toggleColor(col.name)}
                        className={`py-3 px-4 text-[13px] tracking-wide text-left flex items-center gap-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                            : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 shrink-0 inline-block shadow-2xs ${
                            col.border ? 'border border-neutral-400' : ''
                          }`}
                          style={{
                            backgroundColor: col.hex,
                            background: col.gradient || col.hex,
                          }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 4: Size */}
              <div>
                <h3 className="text-[15px] font-medium text-neutral-900 mb-3.5 tracking-tight">
                  Size
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {FILTER_SIZES.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`h-11 flex items-center justify-center text-[12px] tracking-wide transition-all cursor-pointer ${
                          isSelected
                            ? 'border border-neutral-900 bg-white font-semibold text-neutral-900 shadow-xs'
                            : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Padding */}
              <div className="pb-6">
                <h3 className="text-[15px] font-medium text-neutral-900 mb-3.5 tracking-tight">
                  Padding
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedPadding(selectedPadding === 'yes' ? null : 'yes')}
                    className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                      selectedPadding === 'yes'
                        ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                        : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPadding(selectedPadding === 'no' ? null : 'no')}
                    className={`py-3 px-4 text-[13px] tracking-wide text-left transition-all cursor-pointer ${
                      selectedPadding === 'no'
                        ? 'border border-neutral-900 bg-white font-medium shadow-xs text-neutral-900'
                        : 'border border-transparent bg-[#f1efe9] text-neutral-800 hover:bg-[#e7e4dc]'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>

            </div>

            {/* Fixed Drawer Footer Action Bar */}
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-white grid grid-cols-2 gap-3 sticky bottom-0 z-10 shadow-lg shrink-0">
              <button
                type="button"
                onClick={resetFilters}
                className="w-full py-3.5 border border-neutral-900 text-neutral-900 text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                RESET ALL
              </button>
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full py-3.5 bg-black text-white text-[12px] uppercase tracking-[0.14em] font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                SHOW RESULTS ({filteredProducts.length > 0 ? totalResults : 0})
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Value Proposition Strip */}
      <ValuePropositionBar />

      {/* Global Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* Persistent Mobile Floating Navigation Bar */}
      <MobileFloatingBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        isMenuOpen={isMobileMenuOpen}
        hideWhen={isFilterDrawerOpen}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Shared Modals */}
      <Modals
        isSearchOpen={isSearchOpen}
        onCloseSearch={() => setIsSearchOpen(false)}
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        isSignupOpen={isSignupOpen}
        onCloseSignup={() => setIsSignupOpen(false)}
        isPeaksOpen={isPeaksOpen}
        onClosePeaks={() => setIsPeaksOpen(false)}
        isChatOpen={isChatOpen}
        onCloseChat={() => setIsChatOpen(false)}
        isCountryOpen={isCountryOpen}
        onCloseCountry={() => setIsCountryOpen(false)}
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
