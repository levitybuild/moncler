'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ExclusiveService {
  id: string;
  title: string;
  image: string;
  linkText: string;
}

const services: ExclusiveService[] = [
  {
    id: 'app',
    title: 'Moncler App Experience',
    image:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt276e129e569e5dac/6aaa53528f05ce20269f3196/22-09-hp-flp-app-fw26-2026-desk-mob.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    linkText: 'MONCLER APP',
  },
  {
    id: 'aftercare',
    title: 'Bespoke Garment Care',
    image:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltc781cefaa6a18aed/68c97f3f702609832cf5577f/ASSET-HP-21-09-GENIUS-ASAP-ROCKY-PROMO-MODULE-02-DESK-MOB-APP.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    linkText: 'EXPERT AFTERCARE',
  },
  {
    id: 'appointment',
    title: 'Private Boutique Appointments',
    image:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt0e1d0b73db16ee47/68c97f5dfdc6165c052bbfc0/ASSET-HP-21-09-GENIUS-ASAP-ROCKY-PROMO-MODULE-03-DESK-MOB-APP.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    linkText: 'BOOK AN APPOINTMENT',
  },
  {
    id: 'locator',
    title: 'Boutique Store Locator',
    image:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltfc4a6491198252b1/68c97f762cc2776e431c3748/ASSET-HP-21-09-GENIUS-ASAP-ROCKY-PROMO-MODULE-04-DESK-MOB-APP.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    linkText: 'STORE LOCATOR',
  },
  {
    id: 'flagship',
    title: 'London Flagship Boutique',
    image:
      'https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blta8fcb06efb2e215f/6a4686559e05cb91115061c5/asset-flaship-londra.jpg?branch=prod_1&auto=auto&width=90p&quality=90',
    linkText: 'EXPLORE DIGITAL FLAGSHIP',
  },
];

interface ExclusivelyMonclerSectionProps {
  onServiceSelect?: (serviceId: string) => void;
}

export function ExclusivelyMonclerSection({ onServiceSelect }: ExclusivelyMonclerSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // On desktop: 4 visible cards out of 5 total cards => 2 scroll positions (0 and 1)
  const maxDesktopIndex = services.length - 4; // 1

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxDesktopIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxDesktopIndex));
  };

  // Mobile navigation
  const handleMobileNext = () => {
    setCurrentIndex((prev) => (prev < services.length - 1 ? prev + 1 : 0));
  };

  const handleMobilePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : services.length - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX < -35) {
      handleMobileNext();
    } else if (deltaX > 35) {
      handleMobilePrev();
    }
    touchStartX.current = null;
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* 100% max width with 28px side padding on desktop */}
      <div className="w-full max-w-full px-4 sm:px-6 md:px-[28px] lg:px-[28px]">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2
              className="text-2xl sm:text-3xl tracking-tight text-neutral-900 leading-tight lg:[font-size:32px] lg:[font-weight:400]"
              style={{ fontSize: '32px', fontWeight: 400 }}
            >
              Exclusively Moncler
            </h2>
          </div>
          <div>
            <p
              className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal md:font-semibold md:w-[350px]"
              style={{ width: '350px', maxWidth: '100%' }}
            >
              From expert aftercare to tailored appointments, explore the world of Moncler for a
              truly bespoke experience.
            </p>
          </div>
        </div>

        {/* Desktop View: Smooth Carousel with 4 visible cards at a time out of 5 */}
        <div className="hidden md:block relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              gap: '0.5em',
              transform: `translateX(calc(-${currentIndex} * ((100% - 1.5em) / 4 + 0.5em)))`,
            }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="relative group shrink-0 overflow-hidden bg-neutral-900 aspect-[1/1.08] cursor-pointer"
                style={{ width: 'calc((100% - 1.5em) / 4)' }}
                onClick={() => onServiceSelect?.(service.id)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-center text-center px-4">
                  <button
                    type="button"
                    className="group/btn flex items-center gap-1.5 text-xs tracking-[0.14em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>{service.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: High-Fidelity Sliding Carousel with Touch Swipe */}
        <div
          className="md:hidden relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out gap-2"
            style={{
              transform: `translateX(calc(-${currentIndex * 82}% + ${currentIndex === 0 ? '0px' : '-8px'}))`,
            }}
          >
            {services.map((service, idx) => (
              <div
                key={service.id}
                className={`relative shrink-0 w-[82vw] aspect-[9/15] bg-neutral-900 overflow-hidden transition-opacity duration-300 ${
                  idx === currentIndex ? 'opacity-100' : 'opacity-70'
                }`}
                onClick={() => onServiceSelect?.(service.id)}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="85vw"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-8 flex items-center justify-center text-center px-4">
                  <button
                    type="button"
                    className="flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>{service.linkText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Carousel Controls: Left Arrow, Centered Progress Bar, Right Arrow (Matching Screenshot) */}
        <div className="mt-8 flex items-center justify-between w-full">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
          </button>

          {/* Progress Bar Track centered */}
          <div className="w-44 sm:w-56 h-[1.5px] bg-neutral-300 relative overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-black transition-all duration-300"
              style={{
                width: `${100 / (maxDesktopIndex + 1)}%`,
                left: `${(currentIndex * 100) / (maxDesktopIndex + 1)}%`,
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
