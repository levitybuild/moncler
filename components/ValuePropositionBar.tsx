'use client';

import React, { useState, useEffect } from 'react';
import { Pause, Play } from 'lucide-react';

interface ValuePropositionBarProps {
  onOpenPeaksModal?: () => void;
  onOpenShippingInfo?: () => void;
  onOpenReturnsInfo?: () => void;
}

export function ValuePropositionBar({
  onOpenPeaksModal,
  onOpenShippingInfo,
  onOpenReturnsInfo,
}: ValuePropositionBarProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);

  const items = [
    { label: 'Join Moncler Peaks', action: onOpenPeaksModal },
    { label: 'Enjoy Complimentary Shipping', action: onOpenShippingInfo },
    { label: 'Free Exchanges & Returns', action: onOpenReturnsInfo },
  ];

  // Mobile cycling ticker
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setMobileIndex((prev) => (prev + 1) % items.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  return (
    <div className="w-full bg-[#f7f7f6] border-y border-neutral-200/60 py-4 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Desktop View: Three evenly distributed value propositions */}
        <div className="hidden md:flex items-center justify-around text-xs sm:text-[13px] tracking-normal font-light text-neutral-800">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className="hover:text-black transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile View: With Pause/Play Toggle Button and Active Carousel Ticker */}
        <div className="flex md:hidden items-center justify-between gap-3 text-xs font-light text-neutral-800">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause marquee ticker' : 'Play marquee ticker'}
            className="p-1 text-neutral-600 hover:text-black cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 stroke-[2] fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 stroke-[2] fill-current" />
            )}
          </button>

          <div className="flex-1 text-center truncate">
            <button
              type="button"
              onClick={items[mobileIndex].action}
              className="text-xs font-light tracking-wide text-neutral-900 transition-opacity duration-300"
            >
              {items[mobileIndex].label}
            </button>
          </div>

          <div className="w-4 shrink-0" />
        </div>
      </div>
    </div>
  );
}
