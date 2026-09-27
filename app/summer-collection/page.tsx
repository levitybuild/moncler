'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { ValuePropositionBar } from '@/components/ValuePropositionBar';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modals';
import { MobileFloatingBar } from '@/components/MobileFloatingBar';

// Generated Asset Imports
import heroSeahorse from '@/src/assets/images/summer_hero_seahorse_1790466496077.jpg';
import blueWhale from '@/src/assets/images/summer_blue_whale_1790466511381.jpg';
import bubblegumModel from '@/src/assets/images/summer_bubblegum_model_1790466523322.jpg';
import yellowSeahorseFull from '@/src/assets/images/summer_yellow_seahorse_full_1790466535615.jpg';
import redOctopus from '@/src/assets/images/summer_red_octopus_1790466548311.jpg';
import layerStripes from '@/src/assets/images/summer_layer_stripes_1790466561296.jpg';
import layerOlive from '@/src/assets/images/summer_layer_olive_1790466574014.jpg';
import asianModelGilet from '@/src/assets/images/summer_asian_model_gilet_1790466585526.jpg';
import burgundyInflatable from '@/src/assets/images/summer_burgundy_inflatable_1790466596926.jpg';
import blueprintCourtyard from '@/src/assets/images/summer_blueprint_courtyard_1790466609301.jpg';
import blueprintFacade from '@/src/assets/images/summer_blueprint_facade_1790466621357.jpg';
import cardBluePocket from '@/src/assets/images/summer_card_blue_pocket_1790466634386.jpg';
import cardRedGilet from '@/src/assets/images/summer_card_red_gilet_1790466646928.jpg';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  quantity: number;
  image: string;
}

// Video Block Component
interface VideoBlockProps {
  id: string;
  posterSrc: any;
  videoUrl?: string;
  altText: string;
  badgeText?: string;
}

function VideoBlock({ posterSrc, videoUrl, altText, badgeText }: VideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[560px] bg-black overflow-hidden select-none">
      {/* Fallback Image / Video Container */}
      <div className="absolute inset-0 w-full h-full">
        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={typeof posterSrc === 'string' ? posterSrc : posterSrc.src}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={posterSrc}
              alt={altText}
              fill
              priority
              className={`w-full h-full object-cover transition-transform duration-1000 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />
            {/* Subtle luxury ambient scanline overlay */}
            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Optional Badge */}
      {badgeText && (
        <div className="absolute top-24 left-6 md:left-12 z-10">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/90 font-medium bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/20">
            {badgeText}
          </span>
        </div>
      )}

      {/* Video Control Buttons: Bottom Left */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20 flex items-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          className="w-10 h-10 md:w-11 md:h-11 rounded-none bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-white/25 transition-all duration-200 active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          className="w-10 h-10 md:w-11 md:h-11 rounded-none bg-black/70 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-sm border border-white/25 transition-all duration-200 active:scale-95"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </section>
  );
}

export default function SummerCollectionPage() {
  // Global modal and nav state
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isCorporateInfoOpen, setIsCorporateInfoOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<{
    name: string;
    price: string;
    image: string;
  } | null>(null);

  const handleAddToCart = (product: { name: string; price: string; image: string; size: string }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name && item.size === product.size);
      if (existing) {
        return prev.map((item) =>
          item.name === product.name && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.name}-${product.size}-${Date.now()}`,
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

  // Free-scroll Carousel State for Section 3
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const carouselItems = [
    {
      id: 1,
      image: blueWhale,
      alt: 'Blue inflatable puffer whale sculpture with Moncler pocket',
      title: 'Puffy Creatures',
      tag: 'Moncler Summer 2026',
    },
    {
      id: 2,
      image: bubblegumModel,
      alt: 'Model with bubblegum bubble wearing striped shirt and Moncler bucket hat',
      title: 'Summer Layering',
      tag: 'Moncler Collection',
    },
    {
      id: 3,
      image: yellowSeahorseFull,
      alt: 'Yellow inflatable puffer seahorse with Moncler logo',
      title: 'Whimsical Sculpture',
      tag: 'Art & Design',
    },
  ];

  const updateScrollProgress = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(Math.max(scrollLeft / maxScroll, 0), 1));
    } else {
      setScrollProgress(0);
    }
  };

  const handleScrollPrev = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
  };

  const handleScrollNext = () => {
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
  };

  // Mouse Drag Handlers for Desktop/Trackpad
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
    updateScrollProgress();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Layering Section Subcategory Tabs
  const [selectedLayerTab, setSelectedLayerTab] = useState<'volume' | 'texture' | 'comfort'>('volume');

  const layeringInfo = {
    volume: {
      title: 'Puffy Volume',
      desc: 'Quilted jackets, light down gilets and field jackets. The signature puffiness of summer, with considered details and bold colors.',
    },
    texture: {
      title: 'Light texture',
      desc: 'Nylon micro-ripstop, crinkled poplin, and breathable cotton mesh crafted for transitional comfort under the sun.',
    },
    comfort: {
      title: 'Soft comfort',
      desc: 'Weightless base-layers and soft terry fleece pieces that effortlessly stack beneath our iconic lightweight outerwear.',
    },
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white ${
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-white'
      }`}
    >
      {/* 0. Top Announcement Bar */}
      <AnnouncementBar onOpenPeaksModal={() => setIsPeaksOpen(true)} />

      {/* Top Navbar */}
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

      {/* 1. HERO VIDEO BLOCK (100dvh) */}
      <VideoBlock
        id="hero-video"
        posterSrc={heroSeahorse}
        altText="Moncler Puffy Summer Campaign Yellow Seahorse"
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-bright-summer-sun-shining-through-palm-leaves-43405-large.mp4"
      />

      {/* 2. "Summer, the Moncler Way" EDITORIAL SECTION */}
      <section className="w-full bg-[#f6f6f6] py-16 md:py-24 px-6 md:px-14 lg:px-20 border-b border-neutral-200">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left Title */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
              Summer, the Moncler Way
            </h2>
          </div>

          {/* Right Description & CTA */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-6">
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal max-w-2xl">
              More than a season, Puffy Summer reimagines the brand&apos;s DNA for brighter, lighter days outdoors.
              Weightless comfort, lovingly layered; summer takes on a new Moncler dimension.
            </p>

            <div>
              <Link
                href="/ready-to-wear"
                className="inline-flex items-center text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-neutral-900 hover:text-neutral-600 transition-colors group"
              >
                DISCOVER THE CAMPAIGN
                <span className="ml-2 font-normal transition-transform duration-200 group-hover:translate-x-1">
                  &gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREE-SCROLL CAROUSEL / EDITORIAL SHOWCASE */}
      <section className="w-full bg-white pt-2 pb-10 md:py-16 overflow-hidden">
        <div className="w-full max-w-[1700px] mx-auto">
          {/* Desktop 3-Card Grid (>= 768px) */}
          <div className="hidden md:grid grid-cols-3 gap-4 lg:gap-8 px-6 md:px-10 lg:px-16">
            {carouselItems.map((item) => (
              <div key={item.id} className="relative aspect-[3/4] bg-[#f0f2f5] overflow-hidden group">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>

          {/* Mobile Free-Scroll Carousel (< 768px) with .2em gap & gesture scrolling */}
          <div className="block md:hidden">
            <div
              ref={carouselRef}
              onScroll={updateScrollProgress}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="flex gap-[3px] overflow-x-auto scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing px-4 overscroll-x-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {carouselItems.map((item) => (
                <div
                  key={item.id}
                  className="relative w-[78vw] shrink-0 aspect-[3/4] bg-[#f0f2f5] overflow-hidden"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover pointer-events-none"
                    referrerPolicy="no-referrer"
                    priority
                  />
                </div>
              ))}
            </div>

            {/* Carousel Navigation Bar (Arrows + Continuous Progress Line) */}
            <div className="flex items-center justify-between mt-6 px-6 max-w-sm mx-auto">
              <button
                onClick={handleScrollPrev}
                aria-label="Scroll Left"
                className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Dynamic Sliding Progress Indicator */}
              <div className="relative flex-1 mx-4 h-[1.5px] bg-neutral-200 overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 bg-neutral-950 transition-all duration-75 rounded-full"
                  style={{
                    width: '33.33%',
                    left: `${scrollProgress * (100 - 33.33)}%`,
                  }}
                />
              </div>

              <button
                onClick={handleScrollNext}
                aria-label="Scroll Right"
                className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-black active:scale-90 transition-transform"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FULL-BLEED VIDEO BLOCK 2: RED OCTOPUS (100dvh) */}
      <VideoBlock
        id="red-octopus-video"
        posterSrc={redOctopus}
        altText="Moncler Red Inflatable Octopus Sculpture"
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-red-water-drop-macro-shot-42999-large.mp4"
      />

      {/* 5. DUAL EDITORIAL DETAIL SHOTS */}
      <section className="w-full bg-[#fafafa] py-6 md:py-12 px-4 md:px-10 lg:px-16">
        <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Left Detail: Blue striped shirt & denim */}
          <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden group">
            <Image
              src={layerStripes}
              alt="Moncler menswear layered striped shirt with denim"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Right Detail: Olive quilted bomber & pink knit */}
          <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden group">
            <Image
              src={layerOlive}
              alt="Moncler olive green quilted bomber jacket with striped tee"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 6. "LOVINGLY LAYERED" INTERACTIVE EDITORIAL SECTION */}
      <section className="w-full bg-[#f8f8f8] pt-10 pb-14 md:py-24 border-y border-neutral-200">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Section Header & Non-wrapping Tab Strip */}
          <div className="px-6 md:px-14 lg:px-20 mb-6 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-sans font-normal tracking-tight text-neutral-900 mb-5 md:mb-8">
              Lovingly Layered
            </h2>

            {/* Category Tabs: Horizontally scrollable without wrapping or underlines */}
            <div className="flex items-center gap-7 sm:gap-10 overflow-x-auto scrollbar-none whitespace-nowrap -mx-6 px-6 md:mx-0 md:px-0">
              <button
                onClick={() => setSelectedLayerTab('volume')}
                className={`text-lg sm:text-xl md:text-2xl tracking-tight transition-colors duration-200 shrink-0 ${
                  selectedLayerTab === 'volume'
                    ? 'text-neutral-950 font-normal'
                    : 'text-neutral-400 hover:text-neutral-700 font-normal'
                }`}
              >
                Puffy Volume
              </button>

              <button
                onClick={() => setSelectedLayerTab('texture')}
                className={`text-lg sm:text-xl md:text-2xl tracking-tight transition-colors duration-200 shrink-0 ${
                  selectedLayerTab === 'texture'
                    ? 'text-neutral-950 font-normal'
                    : 'text-neutral-400 hover:text-neutral-700 font-normal'
                }`}
              >
                Light texture
              </button>

              <button
                onClick={() => setSelectedLayerTab('comfort')}
                className={`text-lg sm:text-xl md:text-2xl tracking-tight transition-colors duration-200 shrink-0 ${
                  selectedLayerTab === 'comfort'
                    ? 'text-neutral-950 font-normal'
                    : 'text-neutral-400 hover:text-neutral-700 font-normal'
                }`}
              >
                Soft comfort
              </button>
            </div>
          </div>

          {/* Model Showcase & Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-center">
            {/* Center / Left Look Image: Flush edge-to-edge on mobile */}
            <div className="lg:col-span-8 lg:px-14 lg:pl-20">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] bg-white overflow-hidden w-full">
                <Image
                  src={asianModelGilet}
                  alt="Model wearing Moncler bucket hat and red quilted gilet"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            </div>

            {/* Description & CTA */}
            <div className="lg:col-span-4 px-6 md:px-14 lg:px-0 lg:pr-20 flex flex-col justify-center space-y-6 pt-2 md:pt-0">
              <p className="text-[15px] sm:text-base md:text-lg text-neutral-800 leading-[1.6] font-normal">
                {layeringInfo[selectedLayerTab].desc}
              </p>

              <div>
                <Link
                  href="/ready-to-wear"
                  className="inline-flex items-center text-xs md:text-sm font-semibold tracking-[0.16em] uppercase text-neutral-900 hover:text-neutral-600 transition-colors group"
                >
                  EXPLORE THE ART OF LAYERING
                  <span className="ml-2 font-normal transition-transform duration-200 group-hover:translate-x-1">
                    &gt;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FULL-BLEED VIDEO BLOCK 3: BURGUNDY INFLATABLE (100dvh) */}
      <VideoBlock
        id="burgundy-sculpture-video"
        posterSrc={burgundyInflatable}
        altText="Moncler Burgundy Inflatable Sculpture"
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-smoke-in-the-dark-44283-large.mp4"
      />

      {/* 8. "Summer meets art" EDITORIAL SECTION */}
      <section className="w-full bg-[#f6f6f6] py-16 md:py-24 px-6 md:px-14 lg:px-20 border-b border-neutral-200">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left Title */}
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
              Summer meets art
            </h2>
          </div>

          {/* Right Description & CTA */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-6">
            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal max-w-2xl">
              Larger-than-life interpretations of the campaign&apos;s whimsical sea creatures inflate at dedicated pop-up spaces in Milan and Seoul.
            </p>

            <div>
              <Link
                href="/contact"
                className="inline-flex items-center text-xs md:text-sm font-semibold tracking-[0.18em] uppercase text-neutral-900 hover:text-neutral-600 transition-colors group"
              >
                PUFFY SUMMER POP-UPS
                <span className="ml-2 font-normal transition-transform duration-200 group-hover:translate-x-1">
                  &gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. ARCHITECTURAL BLUEPRINT GALLERY */}
      <section className="w-full bg-[#fafafa] py-6 md:py-12 px-4 md:px-10 lg:px-16">
        <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Blueprint 1: Courtyard View */}
          <div className="relative aspect-[4/4] sm:aspect-[4/3] md:aspect-[4/4] bg-[#0c1f38] overflow-hidden group">
            <Image
              src={blueprintCourtyard}
              alt="Moncler Puffy Summer Courtyard Architectural Blueprint"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Blueprint 2: Street Facade Elevation */}
          <div className="relative aspect-[4/4] sm:aspect-[4/3] md:aspect-[4/4] bg-[#0c1f38] overflow-hidden group">
            <Image
              src={blueprintFacade}
              alt="Moncler Puffy Summer Facade Architectural Blueprint"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 10. 3-CARD FEATURE BANNERS (HAVE A PUFFY* SUMMER / THE ART OF LAYERING / POP-UP STORES) */}
      <section className="w-full bg-white py-8 md:py-16 px-4 md:px-10 lg:px-16">
        <div className="w-full max-w-[1700px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Card 1: Seahorse */}
          <Link
            href="/ready-to-wear"
            className="group relative aspect-[3/4] md:aspect-[3/4] bg-neutral-900 overflow-hidden block"
          >
            <Image
              src={heroSeahorse}
              alt="Moncler yellow puffy seahorse feature"
              fill
              className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                HAVE A PUFFY* SUMMER &gt;
              </span>
            </div>
          </Link>

          {/* Card 2: Blue Pocket */}
          <Link
            href="/ready-to-wear"
            className="group relative aspect-[3/4] md:aspect-[3/4] bg-neutral-900 overflow-hidden block"
          >
            <Image
              src={cardBluePocket}
              alt="Moncler sky blue down pocket layering"
              fill
              className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                THE ART OF LAYERING &gt;
              </span>
            </div>
          </Link>

          {/* Card 3: Red Look */}
          <Link
            href="/contact"
            className="group relative aspect-[3/4] md:aspect-[3/4] bg-neutral-900 overflow-hidden block"
          >
            <Image
              src={cardRedGilet}
              alt="Moncler pop up stores red look"
              fill
              className="object-cover brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
                POP-UP STORES &gt;
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 11. "MONCLER COLLECTION SUMMER 2026" EDITORIAL OVERVIEW */}
      <section className="w-full bg-[#f6f6f6] py-16 md:py-24 px-6 md:px-14 lg:px-20 border-t border-neutral-200">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left Title */}
          <div className="md:col-span-5">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.15]">
              Moncler Collection
              <br />
              Summer 2026
            </h2>
          </div>

          {/* Right Rich Editorial Paragraph */}
          <div className="md:col-span-7">
            <p className="text-sm sm:text-base md:text-[15px] text-neutral-700 leading-relaxed font-normal">
              Led by fresh colours and classic patterns, explore a curated edit of men&apos;s and women&apos;s outerwear,
              mid-layers and base-layer essentials designed for the summer wardrobe. Refined outerwear, ranging from
              lightweight nylon shells and parkas to quilted shirt jackets, features thoughtful details that elevate function
              and style, while mid-layer pieces deliver versatile options for transitional dressing. Foundational layers
              expand styling possibilities with polos, shirts, pants, dresses, shorts and T-shirts that balance ease and
              refinement. Accessories such as bucket hats and beanies top off the layered look.
            </p>
          </div>
        </div>
      </section>

      {/* Service Value Proposition Bar */}
      <ValuePropositionBar />

      {/* Complete Footer with Site-wide Intersection observer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => setIsCorporateInfoOpen(true)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* Mobile Floating Bottom Bar */}
      <MobileFloatingBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        isMenuOpen={isMobileMenuOpen}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Modals Suite */}
      <Modals
        isSearchOpen={isSearchOpen}
        onCloseSearch={() => setIsSearchOpen(false)}
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        isSignupOpen={isSignupOpen}
        onCloseSignup={() => setIsSignupOpen(false)}
        isPeaksOpen={isPeaksOpen}
        onClosePeaks={() => setIsPeaksOpen(false)}
        isChatOpen={isChatOpen}
        onCloseChat={() => setIsChatOpen(false)}
        isCountryOpen={isCountryOpen}
        onCloseCountry={() => setIsCountryOpen(false)}
        cartItems={cartItems}
        onUpdateCartQuantity={(id, delta) => {
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
        }}
        onRemoveCartItem={(id) => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
        }}
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
