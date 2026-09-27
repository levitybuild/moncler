'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AnnouncementBarProps {
  onOpenPeaksModal?: () => void;
  isHovered?: boolean;
  onHoverChange?: (hovered: boolean) => void;
}

export function AnnouncementBar({
  onOpenPeaksModal,
  isHovered: externalHovered,
  onHoverChange,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [internalHovered, setInternalHovered] = useState(false);

  const isHovered = externalHovered !== undefined ? externalHovered || internalHovered : internalHovered;

  const handleMouseEnter = () => {
    setInternalHovered(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setInternalHovered(false);
    onHoverChange?.(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      aria-label="Announcement" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative z-40 px-4 py-2 text-[11px] sm:text-xs tracking-normal font-normal border-b transition-colors duration-200 ${
        isHovered
          ? 'bg-[#f9f9f8] text-black border-neutral-200/80 shadow-sm'
          : 'bg-black text-white border-neutral-900'
      }`}
    >
      <div className="w-full px-2 sm:px-4 lg:px-8 flex items-center justify-center relative">
        <p className="text-center font-normal pr-6 pl-2">
          <span>Enter a world of extraordinary, join </span>
          <button
            type="button"
            onClick={onOpenPeaksModal}
            className={`underline underline-offset-2 font-medium cursor-pointer transition-colors ${
              isHovered ? 'text-black hover:text-neutral-600' : 'text-white hover:text-neutral-300'
            }`}
          >
            Moncler Peaks.
          </button>
        </p>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Dismiss banner"
          className={`absolute right-0 top-1/2 -translate-y-1/2 p-1 transition-colors cursor-pointer ${
            isHovered ? 'text-neutral-500 hover:text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <X className="w-3.5 h-3.5 stroke-[1.75]" />
        </button>
      </div>
    </aside>
  );
}
