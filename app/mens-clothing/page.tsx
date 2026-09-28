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
import { FragmentCampaignSection } from '@/components/FragmentCampaignSection';
import { CuratedCompositionsSection } from '@/components/CuratedCompositionsSection';

// Generated asset paths for menswear campaign
import mensOuterwearImg from '@/src/assets/images/mens_outerwear_hooded_1790463189204.jpg';
import mensAccessoriesImg from '@/src/assets/images/mens_accessories_scarf_1790463201579.jpg';
import fragmentVelvetImg from '@/src/assets/images/fragment_velvet_jacket_1790463215930.jpg';
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

      {/* 4. Moncler x Fragment by Hiroshi Fujiwara Interactive Campaign Stage */}
      <FragmentCampaignSection
        onShopNow={() => setIsSignupOpen(true)}
        onDiscoverMore={() => setIsPeaksOpen(true)}
      />

      {/* 5. Curated Compositions (Direct clone of A Change in the Air with header text Curated Compositions) */}
      <CuratedCompositionsSection
        onSelectProduct={(product) =>
          setQuickViewProduct({
            name: product.name,
            price: product.price,
            image: product.image,
          })
        }
        onShopCategory={() => setIsSignupOpen(true)}
      />

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
