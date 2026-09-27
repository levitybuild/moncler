'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface ThroughDifferentLensSectionProps {
  onShopHer?: () => void;
  onShopHim?: () => void;
}

export function ThroughDifferentLensSection({
  onShopHer,
  onShopHim,
}: ThroughDifferentLensSectionProps) {
  return (
    <section className="relative w-full h-[110vh] min-h-[110vh] md:h-auto md:min-h-[640px] lg:min-h-[720px] bg-neutral-300 overflow-hidden flex items-end">
      {/* Background Images: Mobile & Desktop */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="relative w-full h-full lg:hidden">
          <Image
            src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt04d54100434d41f5/6aa80325dcc836db560efa9e/in-page-hero-22-09-fw26-lunettes-mob-app.jpg?branch=prod_1&auto=auto&width=800&quality=90"
            alt="Moncler Eyewear - Through a Different Lens"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Background */}
        <div className="relative w-full h-full hidden lg:block">
          <Image
            src="https://azure-eu-images.contentstack.com/v3/assets/blt70cb06b4414428cc/blt66829a9a962de43f/6aa8031d8f05ce7dfc9f191e/in-page-hero-22-09-fw26-lunettes-desk.jpg?branch=prod_1&auto=auto&width=90p&quality=90"
            alt="Moncler Eyewear - Through a Different Lens"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Soft dark gradient scrim at the bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content Grid Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-0 lg:max-w-none lg:[margin:0em_4em_0em_5.5em] pb-24 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-12 items-end">
          {/* Title on Left: 32px on desktop */}
          <div className="md:col-span-6 lg:col-span-7">
            <h2 className="text-[28px] sm:text-3xl md:text-5xl lg:text-[32px] font-light tracking-wide text-white leading-tight">
              Through a Different Lens
            </h2>
          </div>

          {/* Description & Links on Right: Bold on desktop with lesser letter spacing and line-height */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-end">
            <p className="text-[13px] sm:text-sm text-white/95 font-light lg:font-bold lg:tracking-[-0.01em] lg:leading-[1.35] leading-relaxed mb-6 max-w-sm lg:max-w-md">
              Bold frames and unexpected proportions channel an adventurous spirit into the
              everyday.
            </p>

            {/* Stacked links on mobile, horizontal on desktop */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-8">
              <button
                type="button"
                onClick={onShopHer}
                className="group flex items-center gap-1.5 text-xs tracking-[0.16em] lg:tracking-[0.08em] uppercase text-white font-medium lg:font-bold lg:leading-tight hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <span>SUNGLASSES FOR HER</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={onShopHim}
                className="group flex items-center gap-1.5 text-xs tracking-[0.16em] lg:tracking-[0.08em] uppercase text-white font-medium lg:font-bold lg:leading-tight hover:text-neutral-200 transition-colors cursor-pointer"
              >
                <span>SUNGLASSES FOR HIM</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
