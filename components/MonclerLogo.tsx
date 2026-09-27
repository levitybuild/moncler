/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface MonclerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer';
  isNegative?: boolean;
}

const LOGO_SRC = 'https://i.ibb.co/Q7v1T1Hg/IMG-20260925-WA0001.jpg';

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
      src={LOGO_SRC}
      alt="Moncler Logo"
      className={`w-auto object-contain transition-all duration-200 select-none ${sizeClasses[size]} ${
        isInv ? 'invert mix-blend-screen' : 'mix-blend-multiply'
      } ${className}`}
      referrerPolicy="no-referrer"
    />
  );
}
