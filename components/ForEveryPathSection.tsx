'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface ForEveryPathSectionProps {
  onShopWomen?: () => void;
  onShopMen?: () => void;
}

export function ForEveryPathSection({ onShopWomen, onShopMen }: ForEveryPathSectionProps) {
  return (
    <section className="relative w-full h-screen min-h-[100vh] bg-neutral-900 overflow-hidden flex items-end">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/bltd1b66f5fc8eeee46/6aa801f78f05ce58b49f190c/MC_FW_2026_FTW_BS_RGB_150DPI_9x16_19_FW.jpg?branch=prod_1&auto=auto&width=800&quality=90"
          alt="Moncler Footwear - For Every Path"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-90"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 pointer-events-none" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 items-end">
          {/* Title on Left */}
          <div className="md:col-span-6 lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold tracking-normal text-white leading-tight">
              For Every Path
            </h2>
          </div>

          {/* Description & Action Links on Right */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-end">
            <p className="text-xs sm:text-sm text-neutral-200 font-light leading-relaxed mb-6 max-w-md">
              Inspired by the metropolis and mountain peaks, considered materials and technical
              innovation accompany every step from the trail to the city.
            </p>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={onShopWomen}
                className="group flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <span>SHOP WOMEN</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onShopMen}
                className="group flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-300 transition-colors cursor-pointer"
              >
                <span>SHOP MEN</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
