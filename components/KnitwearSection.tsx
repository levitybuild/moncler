'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface KnitwearSectionProps {
  onShopWomen?: () => void;
  onShopMen?: () => void;
}

export function KnitwearSection({ onShopWomen, onShopMen }: KnitwearSectionProps) {
  return (
    <section className="w-full bg-white pt-8 pb-10 sm:py-14 lg:py-16">
      {/* Editorial Intro (Featured prominently in mobile and responsive desktop) */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900 mb-3">
          A New Knit
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed max-w-2xl">
          Autumn/Winter 2026 evolves the language of knitwear through rich textures and considered
          details, shaping a tactile approach to seasonal dressing.
        </p>
      </div>

      {/* Two Column Knitwear Dual Tiles */}
      <div className="w-full px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {/* Card 1: Knitwear for Her */}
          <div className="relative group overflow-hidden bg-neutral-900 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]">
            <Image
              src="https://placehold.co/900x1100/18181b/eeeeee.png?text=Knitwear+for+Her"
              alt="Moncler Knitwear for Her"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradient scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Bottom Content */}
            <div className="absolute inset-x-0 bottom-8 sm:bottom-10 flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-light tracking-wide text-white mb-3">
                Knitwear for Her
              </h3>
              <button
                type="button"
                onClick={onShopWomen}
                className="group/btn flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <span>SHOP WOMEN</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Knitwear for Him */}
          <div className="relative group overflow-hidden bg-neutral-900 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/5]">
            <Image
              src="https://placehold.co/900x1100/18181b/eeeeee.png?text=Knitwear+for+Him"
              alt="Moncler Knitwear for Him"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Gradient scrim for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

            {/* Overlaid Bottom Content */}
            <div className="absolute inset-x-0 bottom-8 sm:bottom-10 flex flex-col items-center justify-center text-center px-4">
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-light tracking-wide text-white mb-3">
                Knitwear for Him
              </h3>
              <button
                type="button"
                onClick={onShopMen}
                className="group/btn flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <span>SHOP MEN</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
