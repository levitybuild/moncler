'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface FragmentCampaignSectionProps {
  onShopNow?: () => void;
  onDiscoverMore?: () => void;
}

interface CampaignItem {
  id: string;
  src: string;
  alt: string;
  isWhiteBg: boolean;
}

const CAMPAIGN_ITEMS: CampaignItem[] = [
  {
    id: 'editorial-brown',
    src: '/images/moncler_brown_jacket.jpg',
    alt: 'Moncler x Fragment Brown Outerwear Detail',
    isWhiteBg: false,
  },
  {
    id: 'velvet-jacket',
    src: '/images/fragment_velvet_jacket_white.jpg',
    alt: 'Moncler x Fragment Hiroshi Fujiwara Velvet Jacket',
    isWhiteBg: true,
  },
  {
    id: 'lug-boot',
    src: '/images/moncler_boot_close.jpg',
    alt: 'Moncler x Fragment Lug Boot Detail',
    isWhiteBg: false,
  },
];

export function FragmentCampaignSection({
  onShopNow,
  onDiscoverMore,
}: FragmentCampaignSectionProps) {
  // Active index (default: 1 for the center white velvet jacket as in screenshot)
  const [activeIndex, setActiveIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll detection trigger: moves into formation when user scrolls into view
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#676a69] overflow-hidden select-none py-10 sm:py-14 lg:py-16 text-white"
    >
      {/* Ambient top/bottom gradient overlay matching editorial vignette in screenshot */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/25 pointer-events-none z-0" />

      {/* Top Section Typography */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-14 xl:px-16 mb-8 sm:mb-12">
        <div className="w-full flex flex-col md:flex-row md:items-start justify-between gap-3">
          {/* Left Title */}
          <h2 className="text-[17px] sm:text-[19px] lg:text-[21px] font-semibold text-white tracking-tight leading-snug">
            Moncler x Fragment by Hiroshi Fujiwara
          </h2>

          {/* Right Description */}
          <p className="text-[11.5px] sm:text-[12px] lg:text-[12.5px] text-white/90 font-light leading-relaxed max-w-sm sm:max-w-md md:text-left">
            Japanese influences and American vintage references come together in a collection shaped by contrast and continuity.
          </p>
        </div>
      </div>

      {/* 3-Image Interactive Formation Stage */}
      <div className="relative z-10 w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[620px] flex items-center justify-center overflow-hidden">
        {CAMPAIGN_ITEMS.map((item, idx) => {
          // Calculate relative slot offset (-1: left, 0: center, 1: right)
          let diff = (idx - activeIndex + 3) % 3;
          if (diff === 2) diff = -1;

          const isCenter = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          // Animations:
          // Before scrolled into view (!isInView): flat, uniform size, same elevation
          // When scrolled into view (isInView): animated into formation
          let targetX = '0%';
          let targetScale = 0.72;
          let targetOpacity = 0.55;
          let zIndex = 10;

          if (!isInView) {
            targetX = isLeft ? '-68%' : isRight ? '68%' : '0%';
            targetScale = 0.72;
            targetOpacity = 0.55;
            zIndex = 10;
          } else {
            if (isCenter) {
              targetX = '0%';
              targetScale = 1;
              targetOpacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              targetX = '-82%';
              targetScale = 0.62;
              targetOpacity = 0.8;
              zIndex = 10;
            } else if (isRight) {
              targetX = '82%';
              targetScale = 0.62;
              targetOpacity = 0.8;
              zIndex = 10;
            }
          }

          return (
            <motion.div
              key={item.id}
              onClick={() => !isCenter && handleSelect(idx)}
              animate={{
                x: targetX,
                scale: targetScale,
                opacity: targetOpacity,
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ zIndex }}
              className={`absolute top-auto flex items-center justify-center w-[84vw] sm:w-[72vw] md:w-[64vw] lg:w-[60vw] max-w-[940px] aspect-[16/10] overflow-hidden ${
                isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-95'
              } ${item.isWhiteBg ? 'bg-white' : 'bg-[#181818]'}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 85vw, 65vw"
                  className={item.isWhiteBg ? 'object-contain p-3 sm:p-6' : 'object-cover'}
                  priority={item.isWhiteBg}
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Action Links */}
      <div className="relative z-10 w-full pt-6 sm:pt-8 flex items-center justify-center gap-8 sm:gap-10">
        <button
          type="button"
          onClick={onShopNow}
          className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-medium text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          <span>SHOP NOW</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        <button
          type="button"
          onClick={onDiscoverMore}
          className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-medium text-white hover:text-white/80 transition-colors cursor-pointer"
        >
          <span>DISCOVER MORE</span>
          <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
