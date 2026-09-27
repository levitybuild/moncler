'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp,
  Bookmark, 
  Play, 
  Pause, 
  Ruler, 
  Menu,
  Check,
  X
} from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { ValuePropositionBar } from '@/components/ValuePropositionBar';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modals';
import { ProductModals, ProductModalType } from '@/components/ProductModals';
import { MobileFloatingBar } from '@/components/MobileFloatingBar';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  quantity: number;
  image: string;
}

const PRODUCT_DATA = {
  id: 'ravelis-jacket',
  name: 'Ravelis Hooded Zig-Zag Quilted Short Down Jacket',
  price: '£1,590.00',
  priceNumber: 1590,
  color: 'Beige',
  colorHex: '#9e7b57',
  description: "Nodding to the collection's geometric influences, the Ravelis short down jacket for men transforms quilting into a zig-zag motif.",
  breadcrumbs: [
    { label: 'HOME', href: '/' },
    { label: 'MEN', href: '/mens-clothing' },
    { label: 'OUTERWEAR', href: '/mens-clothing' },
    { label: 'SHORT DOWN JACKETS', href: '/mens-clothing' },
  ],
  videoUrl: 'https://moncler-cdn.thron.com/static/Z1XY6Q_L20911A00218597YW26C_V1_EUVYPK.mp4?xseo=',
  images: [
    'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20911A00218597YW26C_1/image/ravelis-hooded-zig-zag-quilted-short-down-jacket-men-beige-moncler-0.jpg?w=1600&q=80',
    'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20911A00218597YW26C_2/image/ravelis-hooded-zig-zag-quilted-short-down-jacket-men-beige-moncler-1.jpg?w=1600&q=80',
  ],
  twistImage: 'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20911A00218597YW26C_16/image/slide-1-a-twist-on-texture.jpg?w=2500&q=80',
  sizes: [
    { code: '0', label: '0 — XS' },
    { code: '1', label: '1 — S' },
    { code: '2', label: '2 — M' },
    { code: '3', label: '3 — L' },
    { code: '4', label: '4 — XL' },
    { code: '5', label: '5 — XXL' },
    { code: '6', label: '6 — 3XL' },
    { code: '7', label: '7 — 4XL' },
  ],
  details: [
    'Crafted from lightweight nylon technique with a refined matte surface',
    'Filled with 90% premium goose down and 10% feather insulation',
    'Detachable and adjustable drawstring hood with integrated chin guard',
    'Two-way front die-cast zipper closure with branded gunmetal pulls',
    'Exterior flap patch pocket on sleeve with iconic felt Moncler cockerel patch',
    'Internal zip security pocket and two side welt zip pockets',
    'Elasticated cuffs with adjustable snap buttons for thermal protection',
  ],
};

export default function ProductPage() {
  // Navigation & modals state
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Product selection state
  const [selectedSize, setSelectedSize] = useState<string>('2');
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<ProductModalType>(null);

  // Mobile media carousel state (0 = video, 1 = image 1, 2 = image 2)
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Video play/pause states
  const [isDesktopVideoPlaying, setIsDesktopVideoPlaying] = useState(true);
  const [isMobileVideoPlaying, setIsMobileVideoPlaying] = useState(true);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init',
      name: 'Abstraction Hooded Wool Blend Short Down Jacket',
      price: '£1,900.00',
      size: '2',
      quantity: 1,
      image: 'https://placehold.co/700x1050/f5f5f5/222222.png?text=Abstraction+Hooded+Down+Jacket',
    },
  ]);

  const toggleDesktopVideo = () => {
    if (!desktopVideoRef.current) return;
    if (isDesktopVideoPlaying) {
      desktopVideoRef.current.pause();
      setIsDesktopVideoPlaying(false);
    } else {
      desktopVideoRef.current.play();
      setIsDesktopVideoPlaying(true);
    }
  };

  const toggleMobileVideo = () => {
    if (!mobileVideoRef.current) return;
    if (isMobileVideoPlaying) {
      mobileVideoRef.current.pause();
      setIsMobileVideoPlaying(false);
    } else {
      mobileVideoRef.current.play();
      setIsMobileVideoPlaying(true);
    }
  };

  const handleAddToCart = () => {
    const newItem: CartItem = {
      id: `ravelis-${selectedSize}-${Date.now()}`,
      name: PRODUCT_DATA.name,
      price: PRODUCT_DATA.price,
      size: selectedSize,
      quantity: 1,
      image: PRODUCT_DATA.images[0],
    };

    setCartItems((prev) => [newItem, ...prev]);
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

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white ${
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-[#fafafa]'
      }`}
    >
      {/* Announcement Bar */}
      <AnnouncementBar onOpenPeaksModal={() => setIsPeaksOpen(true)} />

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

      <main className="w-full relative pb-32">
        {/* ============================================================ */}
        {/* DESKTOP HERO: 100vh height and 3-grid with NO gap            */}
        {/* ============================================================ */}
        <section className="hidden md:grid md:grid-cols-3 w-full h-[100vh] gap-0 overflow-hidden relative bg-black">
          {/* Column 1: Video with Pause/Play Button only */}
          <div className="relative w-full h-full overflow-hidden bg-neutral-900 group">
            <video
              ref={desktopVideoRef}
              src={PRODUCT_DATA.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Play/Pause Button appears exclusively on the video aspect */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <button
                type="button"
                onClick={toggleDesktopVideo}
                aria-label={isDesktopVideoPlaying ? 'Pause video' : 'Play video'}
                className="w-10 h-10 bg-white/75 hover:bg-white text-neutral-900 backdrop-blur-md flex items-center justify-center shadow-md transition-all cursor-pointer"
              >
                {isDesktopVideoPlaying ? (
                  <Pause className="w-4 h-4 fill-neutral-900 stroke-none" />
                ) : (
                  <Play className="w-4 h-4 fill-neutral-900 stroke-none ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Column 2: First Image */}
          <div className="relative w-full h-full overflow-hidden bg-neutral-100">
            <Image
              src={PRODUCT_DATA.images[0]}
              alt="Ravelis Hooded Down Jacket Front View"
              fill
              priority
              sizes="33vw"
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Column 3: Second Image */}
          <div className="relative w-full h-full overflow-hidden bg-neutral-100">
            <Image
              src={PRODUCT_DATA.images[1]}
              alt="Ravelis Hooded Down Jacket Detail View"
              fill
              priority
              sizes="33vw"
              className="object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* MOBILE HERO: Swipeable Carousel with Pagination              */}
        {/* ============================================================ */}
        <section className="md:hidden relative w-full h-[76vh] overflow-hidden bg-neutral-900">
          <div className="relative w-full h-full">
            {activeMediaIndex === 0 ? (
              <div className="relative w-full h-full bg-neutral-900">
                <video
                  ref={mobileVideoRef}
                  src={PRODUCT_DATA.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Pause/Play Button ONLY on Video aspect */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                  <button
                    type="button"
                    onClick={toggleMobileVideo}
                    aria-label={isMobileVideoPlaying ? 'Pause video' : 'Play video'}
                    className="w-9 h-9 bg-white/75 hover:bg-white text-neutral-900 backdrop-blur-md flex items-center justify-center shadow-sm cursor-pointer"
                  >
                    {isMobileVideoPlaying ? (
                      <Pause className="w-3.5 h-3.5 fill-neutral-900 stroke-none" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-neutral-900 stroke-none ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            ) : activeMediaIndex === 1 ? (
              <div className="relative w-full h-full bg-neutral-100">
                <Image
                  src={PRODUCT_DATA.images[0]}
                  alt="Ravelis Hooded Down Jacket Front"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="relative w-full h-full bg-neutral-100">
                <Image
                  src={PRODUCT_DATA.images[1]}
                  alt="Ravelis Hooded Down Jacket Detail"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => setActiveMediaIndex((prev) => (prev > 0 ? prev - 1 : 2))}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/70 hover:bg-white text-neutral-900 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => setActiveMediaIndex((prev) => (prev < 2 ? prev + 1 : 0))}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/70 hover:bg-white text-neutral-900 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-sm"
          >
            <ChevronRight className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Mobile Slide Pagination Bar */}
          <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5 px-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveMediaIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-[2px] transition-all duration-300 ${
                  activeMediaIndex === idx ? 'w-8 bg-white' : 'w-4 bg-white/40'
                }`}
              />
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* DESKTOP/LAPTOP PRODUCT SECTION: MATCHING SCREENSHOT 1        */}
        {/* No max-width, side padding only, left title/desc/breadcrumb  */}
        {/* and right service links list                                 */}
        {/* ============================================================ */}
        <section className="hidden md:block w-full px-8 lg:px-14 xl:px-16 pt-12 lg:pt-16 pb-16 lg:pb-20 bg-[#fafafa]">
          <div className="w-full flex justify-between items-start">
            {/* Left Column: Title, Price, Description, Breadcrumbs */}
            <div className="max-w-xl flex flex-col justify-between min-h-[220px]">
              <div>
                <h1 className="text-[17px] lg:text-[18px] font-normal tracking-tight text-neutral-900 mb-1 leading-snug">
                  {PRODUCT_DATA.name}
                </h1>
                <p className="text-[14px] font-normal text-neutral-900 mb-4">
                  {PRODUCT_DATA.price}
                </p>
                <p className="text-[13px] lg:text-[13.5px] text-neutral-700 font-light leading-relaxed max-w-md">
                  {PRODUCT_DATA.description}
                </p>
              </div>

              {/* Breadcrumb line at the bottom of the left column */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-neutral-700 pt-10">
                {PRODUCT_DATA.breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.label}>
                    {idx > 0 && <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />}
                    <Link href={crumb.href} className="hover:text-black transition-colors">
                      {crumb.label}
                    </Link>
                  </React.Fragment>
                ))}
              </nav>
            </div>

            {/* Right Column: 5 Service Links */}
            <div className="w-64 lg:w-72 space-y-3.5 text-right">
              <button
                type="button"
                onClick={() => setActiveProductModal('details')}
                className="w-full flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black transition-colors py-1 cursor-pointer"
              >
                <span>Details & Care</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5] text-neutral-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveProductModal('sizeGuide')}
                className="w-full flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black transition-colors py-1 cursor-pointer"
              >
                <span>Find my size</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5] text-neutral-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveProductModal('shipping')}
                className="w-full flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black transition-colors py-1 cursor-pointer"
              >
                <span>Shipping & Returns</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5] text-neutral-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveProductModal('store')}
                className="w-full flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black transition-colors py-1 cursor-pointer"
              >
                <span>Find in store</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5] text-neutral-500" />
              </button>

              <button
                type="button"
                onClick={() => setActiveProductModal('contact')}
                className="w-full flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black transition-colors py-1 cursor-pointer"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 stroke-[1.5] text-neutral-500" />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MOBILE PRODUCT DETAILS SECTION                               */}
        {/* ============================================================ */}
        <section className="md:hidden w-full px-5 pt-6 pb-10 bg-[#fafafa]">
          {/* Breadcrumb row */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[10.5px] tracking-[0.14em] uppercase text-neutral-800 mb-4">
            {PRODUCT_DATA.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                {idx > 0 && <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />}
                <Link href={crumb.href} className="hover:text-black transition-colors">
                  {crumb.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* Title & Bookmark */}
          <div className="flex items-start justify-between gap-4 mb-1">
            <h1 className="text-[20px] font-normal tracking-tight text-neutral-900 leading-tight">
              {PRODUCT_DATA.name}
            </h1>
            <button
              type="button"
              onClick={() => setIsBookmarked((prev) => !prev)}
              aria-label={isBookmarked ? 'Remove from wishlist' : 'Save to wishlist'}
              className="p-1 hover:text-black cursor-pointer"
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-700 stroke-[1.5]'}`} />
            </button>
          </div>

          {/* Price */}
          <p className="text-[16px] font-normal text-neutral-900 mb-3">
            {PRODUCT_DATA.price}
          </p>

          {/* Description */}
          <p className="text-[13px] text-neutral-700 font-light leading-relaxed mb-6">
            {PRODUCT_DATA.description}
          </p>

          {/* Colour Box */}
          <div className="mb-3">
            <div className="w-full bg-[#f0ece5] px-4 py-3.5 flex items-center justify-between">
              <span className="text-[13px] text-neutral-900 font-normal">
                Colour: <span className="font-light">{PRODUCT_DATA.color}</span>
              </span>
              <span 
                className="w-5 h-5 border border-neutral-400/60 shadow-inner" 
                style={{ backgroundColor: PRODUCT_DATA.colorHex }}
              />
            </div>
          </div>

          {/* Size Box */}
          <div className="mb-3 relative">
            <button
              type="button"
              onClick={() => setIsSizeDropdownOpen((prev) => !prev)}
              className="w-full bg-[#f0ece5] px-4 py-3.5 flex items-center justify-between text-left cursor-pointer"
            >
              <span className="text-[13px] text-neutral-900 font-normal">
                Size: <span className="font-light">{selectedSize ? `Size ${selectedSize}` : 'Select'}</span>
              </span>
              <ChevronDown className={`w-4 h-4 text-neutral-700 transition-transform ${isSizeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSizeDropdownOpen && (
              <div className="absolute top-full left-0 right-0 z-30 bg-white border border-neutral-200 shadow-xl mt-1 max-h-56 overflow-y-auto">
                {PRODUCT_DATA.sizes.map((s) => (
                  <button
                    key={s.code}
                    type="button"
                    onClick={() => {
                      setSelectedSize(s.code);
                      setIsSizeDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-[13px] hover:bg-neutral-50 flex items-center justify-between cursor-pointer border-b border-neutral-100 last:border-b-0"
                  >
                    <span className={selectedSize === s.code ? 'font-medium text-black' : 'text-neutral-800'}>
                      {s.label}
                    </span>
                    {selectedSize === s.code && <Check className="w-4 h-4 text-black" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Find my size */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setActiveProductModal('sizeGuide')}
              className="inline-flex items-center gap-2 text-[12px] text-neutral-800 hover:text-black underline underline-offset-4 decoration-1 cursor-pointer"
            >
              <Ruler className="w-4 h-4 stroke-[1.5]" />
              <span>Find my size</span>
            </button>
          </div>

          {/* Mobile Accordions */}
          <div className="w-full divide-y divide-neutral-200 border-t border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveProductModal('details')}
              className="w-full py-4 flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black cursor-pointer"
            >
              <span>Details & Care</span>
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() => setActiveProductModal('shipping')}
              className="w-full py-4 flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black cursor-pointer"
            >
              <span>Shipping & Returns</span>
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() => setActiveProductModal('store')}
              className="w-full py-4 flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black cursor-pointer"
            >
              <span>Find in store</span>
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>

            <button
              type="button"
              onClick={() => setActiveProductModal('contact')}
              className="w-full py-4 flex items-center justify-between text-[13.5px] text-neutral-900 font-light hover:text-black cursor-pointer"
            >
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* "A TWIST ON TEXTURE": FROSTED WHITE-ISH GLASSMORPHISM BG      */}
        {/* Image background of the image with high frosted glass effect */}
        {/* ============================================================ */}
        <section className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 xl:px-16 border-t border-neutral-200/50">
          {/* Background Image of the image with heavy blur */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              src={PRODUCT_DATA.twistImage}
              alt="Twist on Texture ambient glow"
              fill
              className="object-cover scale-125 filter blur-3xl opacity-75 transform -translate-y-8"
              priority
              referrerPolicy="no-referrer"
            />
            {/* High frosted white-ish glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-[60px]" />
          </div>

          {/* Desktop Layout: Title on Left, Portrait in Center, Description on Right */}
          <div className="hidden lg:flex relative z-10 w-full items-center justify-between gap-12 max-w-7xl mx-auto">
            {/* Left Title */}
            <div className="w-1/4">
              <h2 className="text-[28px] sm:text-[34px] font-normal tracking-tight text-neutral-900 leading-tight font-serif">
                A Twist on Texture
              </h2>
            </div>

            {/* Center Portrait Image */}
            <div className="w-2/4 flex flex-col items-center">
              <div className="relative w-[380px] xl:w-[420px] aspect-[3/4] overflow-hidden bg-white/50 shadow-md backdrop-blur-sm border border-white/60">
                <Image
                  src={PRODUCT_DATA.twistImage}
                  alt="A Twist on Texture editorial look"
                  fill
                  sizes="420px"
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Carousel Indicators Underneath Image */}
              <div className="flex items-center justify-between w-full max-w-[280px] mt-6 text-neutral-500">
                <button
                  type="button"
                  className="p-1 hover:text-black transition-colors cursor-pointer"
                  aria-label="Previous twist slide"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
                </button>
                <div className="flex-1 mx-4 h-[1.5px] bg-neutral-300 relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-neutral-900" />
                </div>
                <button
                  type="button"
                  className="p-1 hover:text-black transition-colors cursor-pointer"
                  aria-label="Next twist slide"
                >
                  <ChevronRight className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Right Editorial Paragraph */}
            <div className="w-1/4">
              <p className="text-[13px] xl:text-[14px] text-neutral-800 font-light leading-relaxed">
                Distinct textures converge in a sophisticated construction, blending material contrasts into a harmonious dialogue of detail and design.
              </p>
            </div>
          </div>

          {/* Mobile Layout: Stacked vertically */}
          <div className="lg:hidden relative z-10 w-full flex flex-col items-center text-center max-w-md mx-auto">
            <h2 className="text-[24px] sm:text-[28px] font-normal tracking-tight text-neutral-900 mb-6 font-serif">
              A Twist on Texture
            </h2>

            <div className="relative w-full max-w-[320px] aspect-[3/4] overflow-hidden bg-white/50 shadow-md mb-5 border border-white/60">
              <Image
                src={PRODUCT_DATA.twistImage}
                alt="A Twist on Texture editorial look"
                fill
                sizes="320px"
                className="object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-[13px] text-neutral-800 font-light leading-relaxed mb-6 px-4">
              Distinct textures converge in a sophisticated construction, blending material contrasts into a harmonious dialogue of detail and design.
            </p>

            {/* Carousel navigation controls */}
            <div className="flex items-center justify-between w-full max-w-[260px] text-neutral-500">
              <button
                type="button"
                className="p-1.5 hover:text-black transition-colors cursor-pointer"
                aria-label="Previous twist slide"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <div className="flex-1 mx-4 h-[1.5px] bg-neutral-300 relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-neutral-900" />
              </div>
              <button
                type="button"
                className="p-1.5 hover:text-black transition-colors cursor-pointer"
                aria-label="Next twist slide"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* FLOATING BAR (DESKTOP): MATCHING SCREENSHOT 2                */}
        {/* Not attached to edges, evenly spaced items, glassmorphic     */}
        {/* buttons except ADD TO BAG                                    */}
        {/* ============================================================ */}
        <div className="hidden md:flex fixed bottom-5 left-6 right-6 lg:left-10 lg:right-10 z-40 items-stretch gap-2.5 lg:gap-3 pointer-events-auto">
          {/* Card 1: Title & Price */}
          <div className="flex-1 bg-[#eae6df]/80 hover:bg-[#eae6df]/90 backdrop-blur-xl border border-white/60 shadow-lg px-5 py-3.5 flex items-center justify-between transition-colors">
            <span className="text-[13px] font-normal text-neutral-900 truncate pr-3">
              {PRODUCT_DATA.name}
            </span>
            <span className="text-[13px] font-normal text-neutral-900 shrink-0">
              {PRODUCT_DATA.price}
            </span>
          </div>

          {/* Card 2: Colour selector */}
          <div className="bg-[#eae6df]/80 hover:bg-[#eae6df]/90 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-3.5 flex items-center gap-3 shrink-0 transition-colors">
            <span className="text-[12.5px] text-neutral-900 font-normal">
              Colour: <span className="font-light">{PRODUCT_DATA.color}</span>
            </span>
            <span 
              className="w-4 h-4 border border-neutral-400/80 shadow-sm" 
              style={{ backgroundColor: PRODUCT_DATA.colorHex }}
            />
          </div>

          {/* Card 3: Size selector dropdown with Glassmorphic Popover */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsSizeDropdownOpen((prev) => !prev)}
              className={`h-full px-4 py-3.5 flex items-center gap-3 text-[12.5px] cursor-pointer transition-all ${
                isSizeDropdownOpen
                  ? 'bg-white text-neutral-900 border border-neutral-300 shadow-md'
                  : 'bg-[#eae6df]/80 hover:bg-[#eae6df]/90 backdrop-blur-xl border border-white/60 shadow-lg text-neutral-900'
              }`}
            >
              <span>Size: <span className="font-light">{selectedSize ? `Select` : 'Select'}</span></span>
              {isSizeDropdownOpen ? (
                <ChevronUp className="w-3.5 h-3.5 text-neutral-800 stroke-[1.5]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-neutral-700 stroke-[1.5]" />
              )}
            </button>

            {isSizeDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2.5 w-[480px] sm:w-[510px] bg-[#ece8e1]/80 backdrop-blur-2xl border border-white/70 shadow-2xl overflow-hidden z-50">
                {/* Popover Top Bar */}
                <div className="bg-[#ece8e1]/95 px-5 py-3.5 flex items-center justify-between border-b border-neutral-300/40 text-[12px]">
                  <span className="text-neutral-700 font-light">
                    Regular fit. The model is wearing a size 3 and is 185 cm tall
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSizeDropdownOpen(false);
                      setActiveProductModal('sizeGuide');
                    }}
                    className="inline-flex items-center gap-1.5 text-[12px] font-normal text-neutral-900 underline underline-offset-4 decoration-1 hover:opacity-75 cursor-pointer shrink-0 ml-3"
                  >
                    <Ruler className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Find my size</span>
                  </button>
                </div>

                {/* Popover Size Rows */}
                <div className="divide-y divide-neutral-300/40">
                  {[
                    { code: '1', uk: 'UK 36' },
                    { code: '2', uk: 'UK 38' },
                    { code: '3', uk: 'UK 40' },
                    { code: '4', uk: 'UK 42' },
                    { code: '5', uk: 'UK 44' },
                  ].map((item) => {
                    const isSelected = selectedSize === item.code;
                    return (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => {
                          setSelectedSize(item.code);
                          setIsSizeDropdownOpen(false);
                        }}
                        className={`w-full px-5 py-3.5 flex items-center gap-12 text-[13px] text-left cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-white text-neutral-900 shadow-sm'
                            : 'bg-white/40 hover:bg-white/75 backdrop-blur-md text-neutral-800'
                        }`}
                      >
                        <span className={`w-4 font-normal ${isSelected ? 'text-[#1e6091] font-medium' : 'text-neutral-900'}`}>
                          {item.code}
                        </span>
                        <span className="text-neutral-700 font-light tracking-wide">
                          {item.uk}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Bookmark / Wishlist button */}
          <button
            type="button"
            onClick={() => setIsBookmarked((prev) => !prev)}
            aria-label={isBookmarked ? 'Saved to wishlist' : 'Save to wishlist'}
            className="bg-[#eae6df]/80 hover:bg-[#eae6df]/90 backdrop-blur-xl border border-white/60 shadow-lg px-4 py-3.5 flex items-center justify-center cursor-pointer transition-colors shrink-0"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-700 stroke-[1.5]'}`} />
          </button>

          {/* Card 5: ADD TO BAG (Solid Black, not glassmorphic per request) */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-black hover:bg-neutral-800 text-white px-10 py-3.5 text-[11.5px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer shadow-xl shrink-0"
          >
            ADD TO BAG
          </button>
        </div>

        {/* ============================================================ */}
        {/* FLOATING BAR (MOBILE): MATCHING SCREENSHOT 3                 */}
        {/* Not edge to edge (detached from edges), spaced evenly,       */}
        {/* glassmorphism for buttons except ADD TO BAG                  */}
        {/* ============================================================ */}
        {!isMobileMenuOpen ? (
          <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 flex items-stretch gap-2 pointer-events-auto">
            {/* Button 1: ADD TO BAG (Solid Black) */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-neutral-800 text-white text-[11px] uppercase tracking-[0.16em] font-medium py-3.5 flex items-center justify-center cursor-pointer shadow-xl active:scale-[0.98] transition-transform"
            >
              ADD TO BAG
            </button>

            {/* Button 2: Price (Glassmorphic) */}
            <div className="w-[30%] bg-[#eae6df]/85 backdrop-blur-xl border border-white/60 text-neutral-900 text-[12px] font-normal flex items-center justify-center shadow-lg">
              {PRODUCT_DATA.price}
            </div>

            {/* Button 3: Menu Toggle (Glassmorphic) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-[18%] bg-[#eae6df]/85 hover:bg-[#eae6df]/95 backdrop-blur-xl border border-white/60 text-neutral-900 flex items-center justify-center shadow-lg cursor-pointer active:scale-[0.98] transition-transform"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        ) : (
          <MobileFloatingBar
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAccount={() => setIsSignupOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenMenu={() => setIsMobileMenuOpen(true)}
            onCloseMenu={() => setIsMobileMenuOpen(false)}
            isMenuOpen={isMobileMenuOpen}
            cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          />
        )}
      </main>

      {/* Value Proposition Bar */}
      <ValuePropositionBar />

      {/* Standard Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* Product Modals (Full screen on mobile per screenshots) */}
      <ProductModals
        activeModal={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        selectedSize={selectedSize}
        onSelectSize={(sz) => setSelectedSize(sz)}
        onOpenLiveChat={() => setIsChatOpen(true)}
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
        quickViewProduct={null}
        onCloseQuickView={() => {}}
        onAddToCart={() => {}}
      />
    </div>
  );
}
