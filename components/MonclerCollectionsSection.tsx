'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface CollectionItem {
  id: string;
  title: string;
  image: string;
  alt: string;
  linkText: string;
}

const collections: CollectionItem[] = [
  {
    id: 'collection',
    title: 'Moncler Collection',
    image:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/51a861dc-6245-4e89-9884-ff07c7b34662/image/moncler-discover-all-the-collections?q_auto=high&q=90&w=1900',
    alt: 'Moncler Collection - Urban Elegance',
    linkText: 'DISCOVER MORE',
  },
  {
    id: 'grenoble',
    title: 'Moncler Grenoble',
    image:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/114fc755-d466-415c-9728-4f97489461b4/image/moncler-discover-grenoble-collection?q_auto=high&q=90&w=1900',
    alt: 'Moncler Grenoble - High Performance Mountain Wear',
    linkText: 'DISCOVER MORE',
  },
  {
    id: 'genius',
    title: 'Moncler Genius',
    image:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/pyvhkj/contents/0e70bae0-674b-4adc-b6a4-ea112040c783/image/moncler-discover-genius-collection?q_auto=high&q=90&w=1900',
    alt: 'Moncler Genius - Collaborative Innovations',
    linkText: 'DISCOVER MORE',
  },
];

interface MonclerCollectionsSectionProps {
  onDiscover?: (collectionId: string) => void;
}

export function MonclerCollectionsSection({ onDiscover }: MonclerCollectionsSectionProps) {
  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      {/* 100% max width with 28px side padding on desktop */}
      <div className="w-full max-w-full px-4 sm:px-6 md:px-[28px] lg:px-[28px]">
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
              Moncler&apos;s Collections
            </h2>
          </div>
          <div className="max-w-md lg:max-w-xl">
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              From Moncler Collection&apos;s city elegance to the performance-oriented outdoor
              innovation of Moncler Grenoble or the cutting-edge co-creations of Moncler Genius, each
              collection tells a unique story.
            </p>
          </div>
        </div>

        {/* 3 Column Grid with 0.5em gap on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 md:gap-[0.5em] lg:gap-[0.5em]">
          {collections.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden bg-neutral-900 aspect-[3/4] sm:aspect-[4/5] cursor-pointer"
              onClick={() => onDiscover?.(item.id)}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle bottom gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Overlaid Title & Discover More */}
              <div className="absolute inset-x-0 bottom-6 sm:bottom-8 flex flex-col items-center justify-center text-center px-4">
                <h3 className="text-xl sm:text-2xl font-light tracking-wide text-white mb-2 sm:mb-3">
                  {item.title}
                </h3>
                <button
                  type="button"
                  className="group/btn flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase text-white font-medium hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  <span>{item.linkText}</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
