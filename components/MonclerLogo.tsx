/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface MonclerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer';
  isNegative?: boolean;
}

const WHITE_LOGO_URL = 'https://i.ibb.co/VY4fsPhd/1000786854-removebg-preview.png';

export function MonclerLogo({ className = '', size = 'md', isNegative = false }: MonclerLogoProps) {
  const isInv = isNegative || className.includes('invert');

  const sizeClasses = {
    sm: 'h-4 sm:h-5',
    md: 'h-6 sm:h-7 md:h-8',
    lg: 'h-8 sm:h-10 md:h-12',
    hero: 'h-10 sm:h-12 md:h-16',
    footer: 'h-12 sm:h-16 md:h-20 lg:h-24',
  };

  return (
    <img
      src={WHITE_LOGO_URL}
      alt="Moncler Logo"
      className={`w-auto object-contain transition-all duration-200 select-none ${sizeClasses[size]} ${
        isInv ? 'invert' : ''
      } ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
