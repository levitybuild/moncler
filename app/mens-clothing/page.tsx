'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { ValuePropositionBar } from '@/components/ValuePropositionBar';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modals';
import { MobileFloatingBar } from '@/components/MobileFloatingBar';

// Generated asset paths for menswear campaign
import mensOuterwearImg from '@/src/assets/images/mens_outerwear_hooded_1790463189204.jpg';
import mensAccessoriesImg from '@/src/assets/images/mens_accessories_scarf_1790463201579.jpg';
import fragmentVelvetImg from '@/src/assets/images/fragment_velvet_jacket_1790463215930.jpg';
import look1Img from '@/src/assets/images/mens_look_travel_bag_1790463229599.jpg';
import look2Img from '@/src/assets/images/mens_look_plaid_hat_1790463242369.jpg';
import look3Img from '@/src/assets/images/mens_look_hoodie_side_1790463254009.jpg';
import ravenlockJacketImg from '@/src/assets/images/moncler_ravenlock_jacket_1790463291190.jpg';
import tanTshirtImg from '@/src/assets/images/moncler_tan_tshirt_1790463302766.jpg';
import teddySweatshirtImg from '@/src/assets/images/moncler_teddy_sweatshirt_1790463278502.jpg';
import wallabeeShoeImg from '@/src/assets/images/moncler_trailgrip_wallabee_1790463264965.jpg';
import bootCloseImg from '@/src/assets/images/moncler_boot_close_1790463315265.jpg';
import brownJacketCloseImg from '@/src/assets/images/moncler_brown_jacket_1790463327307.jpg';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  quantity: number;
  image: string;
}

// Curated Compositions Dress Picker data
const curatedLooks = [
  {
    id: 'look-1',
    name: 'Ravelis Hooded Zig-Zag Quilted Short Down Jacket',
    price: '£1,590.00',
    image: look1Img,
    thumb: look1Img,
  },
  {
    id: 'look-2',
    name: 'Plaid Flannel & Down Overshirt Look',
    price: '£1,420.00',
    image: look2Img,
    thumb: look2Img,
  },
  {
    id: 'look-3',
    name: 'Camel Corduroy & Quilted Jacket Ensemble',
    price: '£1,680.00',
    image: look3Img,
    thumb: look3Img,
  },
];

// Seasonal Signatures Carousel Items
const seasonalSignatures = [
  {
    id: 'sig-1',
    name: 'Ravenlock Hooded Short Down Jacket',
    price: '£1,255.00',
    image: ravenlockJacketImg,
  },
  {
    id: 'sig-2',
    name: 'Logo Cotton T-Shirt',
    price: '£300.00',
    image: tanTshirtImg,
  },
  {
    id: 'sig-3',
    name: 'Teddy Zip-Up Sweatshirt',
    price: '£860.00',
    image: (teddySweatshirtImg || fragmentVelvetImg),
  },
  {
    id: 'sig-4',
    name: 'Moncler + Clarks Originals Trailgrip Wallabee GTX...',
    price: '£580.00',
    image: wallabeeShoeImg,
  },
];

export default function MensClothingPage() {
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
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isCorporateInfoOpen, setIsCorporateInfoOpen] = useState(false);

  // Quick view product state
  const [quickViewProduct, setQuickViewProduct] = useState<{
    name: string;
    price: string;
    image: string;
  } | null>(null);

  // Dress picker state
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // Seasonal Signatures carousel state
  const [signatureIndex, setSignatureIndex] = useState(0);
  const signatureTouchStartX = useRef<number | null>(null);

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

  const handleAddToCart = (product: {
    name: string;
    price: string;
    image: string;
    size: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name && item.size === product.size);
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: product.name,
          price: product.price,
          size: product.size,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

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

  // Curated look navigation
  const handleNextLook = () => {
    setActiveLookIndex((prev) => (prev + 1) % curatedLooks.length);
  };

  const handlePrevLook = () => {
    setActiveLookIndex((prev) => (prev - 1 + curatedLooks.length) % curatedLooks.length);
  };

  // Seasonal Signatures navigation
  const handleNextSignature = () => {
    setSignatureIndex((prev) => (prev < seasonalSignatures.length - 1 ? prev + 1 : 0));
  };

  const handlePrevSignature = () => {
    setSignatureIndex((prev) => (prev > 0 ? prev - 1 : seasonalSignatures.length - 1));
  };

  const handleSignatureTouchStart = (e: React.TouchEvent) => {
    signatureTouchStartX.current = e.touches[0].clientX;
  };

  const handleSignatureTouchEnd = (e: React.TouchEvent) => {
    if (signatureTouchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - signatureTouchStartX.current;
    if (deltaX < -40) {
      handleNextSignature();
    } else if (deltaX > 40) {
      handlePrevSignature();
    }
    signatureTouchStartX.current = null;
  };

  const currentLook = curatedLooks[activeLookIndex] || curatedLooks[0];

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white ${
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-white'
      }`}
    >
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        onOpenPeaksModal={() => setIsPeaksOpen(true)}
      />

      {/* 2. Main Floating / Top Navbar */}
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

      {/* 3. Static Hero Section (No animations as requested) */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[560px] max-h-[1080px] bg-neutral-900 overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          {/* Desktop background */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90"
              alt="Moncler Men Collection Autumn/Winter 2026"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_35%]"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Mobile background */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt76607677c37d7c5d/6aa7fefde38d2d518886acda/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_9X16_26.jpg?branch=prod_1&auto=auto&width=800&quality=90"
              alt="Moncler Men Collection Autumn/Winter 2026"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_20%]"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Elegant gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Hero Bottom Typography */}
        <div className="relative z-10 w-full text-center pb-12 sm:pb-16 lg:pb-20 px-4">
          <p className="text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-neutral-300 font-light mb-2">
            Moncler Collection
          </p>
          <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-normal font-serif text-white tracking-tight leading-tight mb-4">
            Autumn/Winter 2026
          </h1>
          <button
            type="button"
            onClick={() => setIsSignupOpen(true)}
            className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-300 transition-colors cursor-pointer"
          >
            <span>SHOP NOW</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* 4. Current Expressions / Moncler x Fragment Section */}
      <section className="w-full bg-[#f6f6f4] py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-[1400px] mx-auto">
          {/* Desktop & Mobile Headings */}
          <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-normal tracking-tight text-neutral-900 font-serif mb-3">
              Current Expressions
            </h2>
            <h3 className="text-[15px] sm:text-[17px] font-medium tracking-wide text-neutral-900 mb-2">
              Moncler x Fragment by Hiroshi Fujiwara
            </h3>
            <p className="text-[13px] sm:text-[14px] text-neutral-600 font-light leading-[1.65]">
              Japanese influences and American vintage references come together in a collection shaped by contrast and continuity.
            </p>
          </div>

          {/* 3-Image Triptych Display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 items-center">
            {/* Left Image: Brown jacket detail */}
            <div className="relative aspect-[4/5] bg-neutral-200 overflow-hidden group">
              <Image
                src={brownJacketCloseImg}
                alt="Current Expressions - Moncler Brown Down Jacket Close-up"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Center Image: Fragment velvet jacket (Elevated focal point) */}
            <div className="relative aspect-[4/5] bg-white overflow-hidden shadow-sm group">
              <Image
                src={fragmentVelvetImg}
                alt="Moncler x Fragment Hiroshi Fujiwara Velvet Jacket"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Image: Boot close-up */}
            <div className="relative aspect-[4/5] bg-neutral-200 overflow-hidden group">
              <Image
                src={bootCloseImg}
                alt="Current Expressions - Moncler Lug Boot Detail"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={() => setIsSignupOpen(true)}
              className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>SHOP NOW</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsPeaksOpen(true)}
              className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>DISCOVER MORE</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Curated Compositions (Dress Picker from Homepage reused & styled for Menswear) */}
      <section className="w-full bg-[#f9f9f8] relative py-14 sm:py-20 lg:py-24 overflow-hidden border-t border-neutral-100">
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-20 mb-8 sm:mb-12">
            <div>
              <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-normal tracking-tight text-neutral-900 font-serif leading-tight">
                Curated Compositions
              </h2>
            </div>

            <div className="max-w-sm">
              <p className="text-[13px] text-neutral-700 font-light leading-[1.65] mb-4">
                Designed to be worn, layered and reimagined, each layer speaks to the next, unlocking endless possibilities for expression.
              </p>
              <button
                type="button"
                onClick={() => setIsSignupOpen(true)}
                className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase text-neutral-950 font-medium hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span>SHOP NOW</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Main Stage Look Preview */}
          <div className="relative w-full flex flex-col md:flex-row items-center justify-center">
            {/* Centered Large Hero Look Model */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-[320px] sm:w-[420px] md:w-[480px] lg:w-[540px] h-[500px] sm:h-[620px] md:h-[680px] lg:h-[720px] cursor-pointer"
                onClick={() =>
                  setQuickViewProduct({
                    name: currentLook.name,
                    price: currentLook.price,
                    image: typeof currentLook.image === 'string' ? currentLook.image : currentLook.image.src,
                  })
                }
              >
                <Image
                  src={currentLook.image}
                  alt={currentLook.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 540px"
                  className="object-contain object-center transition-opacity duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Info */}
              <div className="text-center mt-4 px-4 max-w-lg">
                <h3 className="text-[14px] sm:text-[15px] font-normal text-neutral-900 tracking-[-0.01em]">
                  {currentLook.name}
                </h3>
                <p className="text-[13px] sm:text-[14px] font-normal text-neutral-900 mt-0.5 tabular-nums">
                  {currentLook.price}
                </p>
              </div>
            </div>

            {/* Desktop Right Vertical Thumbnails */}
            <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center z-20">
              <div className="flex flex-col items-center gap-2 mr-3">
                <button
                  type="button"
                  onClick={handlePrevLook}
                  aria-label="Previous look"
                  className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextLook}
                  aria-label="Next look"
                  className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4 stroke-[1.75]" />
                </button>
              </div>

              {/* Thumbnail column */}
              <div className="flex flex-col gap-3">
                {curatedLooks.map((look, idx) => (
                  <button
                    key={look.id}
                    type="button"
                    onClick={() => setActiveLookIndex(idx)}
                    className={`relative w-[60px] lg:w-[72px] h-[90px] lg:h-[105px] border transition-all cursor-pointer overflow-hidden ${
                      activeLookIndex === idx
                        ? 'border-neutral-900 opacity-100 ring-1 ring-neutral-900'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={look.thumb}
                      alt={look.name}
                      fill
                      sizes="72px"
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Bottom Thumbnails Row */}
            <div className="md:hidden flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={handlePrevLook}
                className="p-1.5 text-neutral-600 hover:text-neutral-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                {curatedLooks.map((look, idx) => (
                  <button
                    key={look.id}
                    type="button"
                    onClick={() => setActiveLookIndex(idx)}
                    className={`relative w-[50px] h-[75px] border overflow-hidden transition-all ${
                      activeLookIndex === idx
                        ? 'border-neutral-900 opacity-100'
                        : 'border-neutral-200 opacity-60'
                    }`}
                  >
                    <Image
                      src={look.thumb}
                      alt={look.name}
                      fill
                      sizes="50px"
                      className="object-cover object-top"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={handleNextLook}
                className="p-1.5 text-neutral-600 hover:text-neutral-900"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Renewed Rhythm (3 Category Grid: Outerwear, Knitwear, Accessories) */}
      <section className="w-full bg-white py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1520px] mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-normal tracking-tight text-neutral-900 font-serif leading-tight">
                Renewed Rhythm
              </h2>
            </div>
            <div className="max-w-md">
              <p className="text-[13px] text-neutral-700 font-light leading-[1.65]">
                A seamless union of elegance and function redefines Moncler&apos;s signature silhouettes, setting the pace for the new season ahead.
              </p>
            </div>
          </div>

          {/* 3 Full Bleed Category Banners */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Outerwear */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 overflow-hidden group cursor-pointer">
              <Image
                src={mensOuterwearImg}
                alt="Moncler Men Outerwear"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsSignupOpen(true)}
                  className="group/btn inline-flex items-center gap-1.5 text-[13px] tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors"
                >
                  <span>OUTERWEAR</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Knitwear */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 overflow-hidden group cursor-pointer">
              <Image
                src={fragmentVelvetImg}
                alt="Moncler Men Knitwear"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsSignupOpen(true)}
                  className="group/btn inline-flex items-center gap-1.5 text-[13px] tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors"
                >
                  <span>KNITWEAR</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Accessories */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] bg-neutral-900 overflow-hidden group cursor-pointer">
              <Image
                src={mensAccessoriesImg}
                alt="Moncler Men Accessories"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsSignupOpen(true)}
                  className="group/btn inline-flex items-center gap-1.5 text-[13px] tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors"
                >
                  <span>ACCESSORIES</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Seasonal Signatures (Product Carousel Slider) */}
      <section className="w-full bg-[#fbfbfb] py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1520px] mx-auto">
          {/* Section Heading */}
          <div className="mb-10 sm:mb-14">
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-normal tracking-tight text-neutral-900 font-serif leading-tight">
              Seasonal Signatures
            </h2>
          </div>

          {/* Desktop 4-Product Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 xl:gap-8 items-start">
            {seasonalSignatures.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col cursor-pointer"
                onClick={() =>
                  setQuickViewProduct({
                    name: item.name,
                    price: item.price,
                    image: typeof item.image === 'string' ? item.image : item.image.src,
                  })
                }
              >
                <div className="relative aspect-[3/4] bg-[#f2f2f0] overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="25vw"
                    className="object-contain object-center p-6 transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center px-2">
                  <h3 className="text-[13.5px] font-normal text-neutral-900 leading-snug tracking-[-0.01em] line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="text-[13px] font-normal text-neutral-700 mt-1 tabular-nums">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipeable / Slider with Pagination */}
          <div
            className="lg:hidden"
            onTouchStart={handleSignatureTouchStart}
            onTouchEnd={handleSignatureTouchEnd}
          >
            <div className="relative aspect-[3/4] bg-[#f2f2f0] overflow-hidden mb-4 mx-auto max-w-[340px]">
              <Image
                src={seasonalSignatures[signatureIndex].image}
                alt={seasonalSignatures[signatureIndex].name}
                fill
                sizes="90vw"
                className="object-contain object-center p-6 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-center px-4 mb-6">
              <h3 className="text-[14px] font-normal text-neutral-900 leading-snug">
                {seasonalSignatures[signatureIndex].name}
              </h3>
              <p className="text-[13px] font-normal text-neutral-700 mt-1 tabular-nums">
                {seasonalSignatures[signatureIndex].price}
              </p>
            </div>

            {/* Mobile Carousel Controls & Progress Bar */}
            <div className="flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={handlePrevSignature}
                aria-label="Previous product"
                className="p-2 text-neutral-600 hover:text-neutral-900"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-36 h-[2px] bg-neutral-200 relative overflow-hidden">
                <div
                  className="h-full bg-neutral-900 transition-all duration-300"
                  style={{
                    width: `${100 / seasonalSignatures.length}%`,
                    transform: `translateX(${signatureIndex * 100}%)`,
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleNextSignature}
                aria-label="Next product"
                className="p-2 text-neutral-600 hover:text-neutral-900"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Value Proposition Strip */}
      <ValuePropositionBar />

      {/* 9. Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => setIsCorporateInfoOpen(true)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* 10. Persistent Mobile Floating Navigation Bar */}
      <MobileFloatingBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        isMenuOpen={isMobileMenuOpen}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* 11. Shared Modals & Quick View */}
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
