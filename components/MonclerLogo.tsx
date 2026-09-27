import React from 'react';

interface MonclerLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'footer';
}

export function MonclerLogo({ className = '', size = 'md' }: MonclerLogoProps) {
  // Moncler wordmark styling: flare serif, bold, tracked uppercase
  if (size === 'footer') {
    return (
      <div className={`w-full select-none ${className}`}>
        <span
          className="font-brand block text-left lg:text-center font-bold text-[46px] sm:text-[72px] md:text-[110px] lg:text-[144px] leading-none text-white uppercase"
          style={{ letterSpacing: '0.18em' }}
        >
          MONCLER
        </span>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-lg tracking-[0.2em]',
    md: 'text-xl sm:text-2xl tracking-[0.22em]',
    lg: 'text-3xl sm:text-4xl tracking-[0.24em]',
    hero: 'text-2xl sm:text-3xl md:text-4xl tracking-[0.26em]',
  };

  return (
    <span
      className={`font-brand font-bold uppercase transition-opacity duration-200 hover:opacity-90 inline-block text-center ${sizeClasses[size]} ${className}`}
      style={{ letterSpacing: '0.22em' }}
    >
      MONCLER
    </span>
  );
}
