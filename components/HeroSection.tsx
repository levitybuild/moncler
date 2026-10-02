'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'motion/react';

interface HeroSectionProps {
  onShopWomen?: () => void;
  onShopMen?: () => void;
}

const heroImages = [
  {
    id: 1,
    title: 'Autumn/Winter 2026',
    desktopUrl:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd33293f7bee7893a/6aa7fef38f05ce161d9f18b7/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_21.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    mobileUrl:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt76607677c37d7c5d/6aa7fefde38d2d518886acda/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_9X16_26.jpg?branch=prod_1&auto=auto&width=800&quality=90',
    alt: 'Moncler Collection Campaign 1',
  },
  {
    id: 2,
    title: 'Autumn/Winter 2026',
    desktopUrl:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt37d49f6704f623bc/6aa7ff7fc2a7875c326f3242/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_16X9_6-2.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    mobileUrl:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd209994ae5cdeb30/6aa7ff8b8f05ce8df39f18bd/MC_FW_2026_DIGITALCAMPAIGN_DS_RGB_150DPI_9X16_6-2.jpg?branch=prod_1&auto=auto&width=800&quality=90',
    alt: 'Moncler Collection Campaign 2',
  },
];

const variants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? '105%' : '-105%',
    scale: 0.72,
    opacity: 0.6,
  }),
  center: {
    y: '0%',
    scale: 1,
    opacity: 1,
    transition: {
      y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.45 },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? '-105%' : '105%',
    scale: 0.72,
    opacity: 0.6,
    transition: {
      y: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      scale: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.45 },
    },
  }),
};

export function HeroSection({ onShopWomen, onShopMen }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const goToSlide = (targetIndex: number, newDirection: number) => {
    if (isAnimating.current || targetIndex === currentIndex) return;
    isAnimating.current = true;
    setDirection(newDirection);
    setCurrentIndex(targetIndex);
    setTimeout(() => {
      isAnimating.current = false;
    }, 850);
  };

  // Auto transition every 5 seconds (paused if isPaused is true)
  React.useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (isAnimating.current) return;
      isAnimating.current = true;
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      setTimeout(() => {
        isAnimating.current = false;
      }, 850);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    // Strict horizontal swipe check: if vertical movement is greater, do not intercept so normal page scroll works
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (deltaX < 0) {
        // Swiped right-to-left -> go to second image (index 1)
        goToSlide(1, 1);
      } else {
        // Swiped left-to-right -> go to first image (index 0)
        goToSlide(0, -1);
      }
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[95vh] min-h-[560px] bg-neutral-950 overflow-hidden flex items-end justify-center pb-16 sm:pb-20 lg:pb-24 select-none"
    >
      {/* Animated Background Images with AnimatePresence */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={heroImages[currentIndex].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full origin-center"
          >
            {/* Mobile 9x16 Image */}
            <div className="block md:hidden relative w-full h-full">
              <Image
                src={heroImages[currentIndex].mobileUrl}
                alt={heroImages[currentIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop 16x9 Image */}
            <div className="hidden md:block relative w-full h-full">
              <Image
                src={heroImages[currentIndex].desktopUrl}
                alt={heroImages[currentIndex].alt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient overlay matching the original Moncler look */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40 pointer-events-none z-10" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center pointer-events-auto">
        {/* Eyebrow / Collection Kicker */}
        <p className="text-[12px] sm:text-[13px] tracking-normal text-neutral-300 font-light mb-2 sm:mb-3">
          Moncler Collection
        </p>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-[36px] font-light tracking-wide text-white mb-6 sm:mb-8">
          {heroImages[currentIndex].title}
        </h1>

        {/* Action Links */}
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          <button
            type="button"
            onClick={onShopWomen}
            className="group flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <span>SHOP WOMEN</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={onShopMen}
            className="group flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
          >
            <span>SHOP MEN</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Carousel Controls: Pause button on the left, Dynamic Progress Lines in the center */}
        <div className="w-full max-w-sm sm:max-w-md mx-auto mt-6 sm:mt-7 relative flex items-center justify-center">
          {/* Pause / Play Button */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            className="absolute left-1 sm:left-3 w-7 h-7 bg-black/50 hover:bg-black/70 backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPaused ? (
              <svg
                className="w-2.5 h-2.5 fill-white text-white ml-0.5"
                viewBox="0 0 24 24"
              >
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            ) : (
              <span className="flex items-center gap-[2.5px]">
                <span className="w-[2px] h-[9px] bg-white rounded-none" />
                <span className="w-[2px] h-[9px] bg-white rounded-none" />
              </span>
            )}
          </button>

          {/* Centered Progress Lines */}
          <div className="flex items-center gap-2">
            {heroImages.map((_, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index, index > currentIndex ? 1 : -1)}
                  aria-label={`Go to slide ${index + 1}`}
                  className="py-2.5 flex items-center cursor-pointer group"
                >
                  <div
                    className={`h-[1.5px] transition-[width] duration-300 ease-out relative overflow-hidden ${
                      isActive ? 'w-[54px] bg-white/30' : 'w-[26px] bg-white/40 group-hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <div
                        key={`progress-${currentIndex}`}
                        className="h-full bg-white animate-hero-progress"
                        style={{
                          animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
