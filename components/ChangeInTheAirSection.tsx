'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';

interface LookItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  thumbUrl: string;
}

const womenLooks: LookItem[] = [
  {
    id: 'w-1',
    name: 'Cristallin Hooded Wool Blend Short Down Jacket',
    price: '£1,450.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A00231599VV262_1/image/slide-3-cristallin-hooded-wool-blend-short-down-jacket.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A00231599VV262_1/image/slide-3-cristallin-hooded-wool-blend-short-down-jacket.jpg?w=800&q=80',
  },
  {
    id: 'w-2',
    name: 'Diamond Quilted Padded Wool Cardigan',
    price: '£955.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00025M1131828_1/image/slide-4-diamond-quilted-padded-wool-cardigan.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00025M1131828_1/image/slide-4-diamond-quilted-padded-wool-cardigan.jpg?w=800&q=80',
  },
  {
    id: 'w-3',
    name: 'Moncler Maya 70 Hooded Short Down Jacket',
    price: '£1,380.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
  },
  {
    id: 'w-4',
    name: 'Alpaca Blend Cardigan',
    price: '£890.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00020N0403856_1/image/slide-6-alpaca-blend-cardigan.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00020N0403856_1/image/slide-6-alpaca-blend-cardigan.jpg?w=800&q=80',
  },
  {
    id: 'w-5',
    name: 'Wool and Cashmere Padded Zip-Up Cardigan',
    price: '£1,150.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00041M4281035_1/image/slide-8-wool-and-cashmere-padded-zip-up-cardigan.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00041M4281035_1/image/slide-8-wool-and-cashmere-padded-zip-up-cardigan.jpg?w=800&q=80',
  },
];

const menLooks: LookItem[] = [
  {
    id: 'm-1',
    name: 'Montgenevre Wool Flannel Short Down Jacket',
    price: '£1,650.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A00231599VV262_1/image/slide-3-cristallin-hooded-wool-blend-short-down-jacket.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A00231599VV262_1/image/slide-3-cristallin-hooded-wool-blend-short-down-jacket.jpg?w=800&q=80',
  },
  {
    id: 'm-2',
    name: 'Maya High-Gloss Nylon Laqué Down Jacket',
    price: '£1,380.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20931A0016254A81248_1/image/slide-5-moncler-maya-70-hooded-short-down-jacket.jpg?w=800&q=80',
  },
  {
    id: 'm-3',
    name: 'Wool and Cashmere Padded Zip-Up Cardigan',
    price: '£1,150.00',
    imageUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00041M4281035_1/image/slide-8-wool-and-cashmere-padded-zip-up-cardigan.jpg?w=800&q=80',
    thumbUrl:
      'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20939B00041M4281035_1/image/slide-8-wool-and-cashmere-padded-zip-up-cardigan.jpg?w=800&q=80',
  },
];

interface ChangeInTheAirSectionProps {
  onSelectProduct?: (product: { name: string; price: string; image: string }) => void;
  onShopCategory?: (gender: 'women' | 'men') => void;
}

export function ChangeInTheAirSection({
  onSelectProduct,
  onShopCategory,
}: ChangeInTheAirSectionProps) {
  const [activeGender, setActiveGender] = useState<'women' | 'men'>('women');
  // Default to index 1 (Diamond Quilted Padded Wool Cardigan) to match screenshot exactly
  const [activeIndex, setActiveIndex] = useState(1);

  const activeList = activeGender === 'women' ? womenLooks : menLooks;
  const currentItem = activeList[activeIndex] || activeList[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % activeList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
  };

  const handleGenderChange = (gender: 'women' | 'men') => {
    setActiveGender(gender);
    setActiveIndex(0);
  };

  // Thumbnail dimensions on desktop: height = 168px, gap = 24px => total step = 192px
  // Middle active slot is at position 1 (192px from top of 3-slot window)
  const thumbStep = 192;
  const translateYOffset = -(activeIndex - 1) * thumbStep;

  return (
    <section className="w-full bg-[#f9f9f8] relative py-10 sm:py-14 lg:py-16 overflow-hidden">
      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top Header Row on Desktop (Higher z-index than preview image) */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-20">
          {/* Left Title: "A Change in the Air" with font-size 32px, font-weight 400, pl 2em on desktop */}
          <div>
            <h2
              className="tracking-[-0.01em] text-neutral-900 leading-tight pl-0 md:pl-[2em]"
              style={{ fontSize: '32px', fontWeight: 400 }}
            >
              A Change in the Air
            </h2>
          </div>

          {/* Right Header Block: Higher z-index than the preview image */}
          <div className="flex flex-col items-start md:items-start text-left max-w-sm md:mr-28 lg:mr-36 relative z-30">
            {/* Tabs: Women | Men */}
            <div className="flex items-center gap-4 text-[15px] font-normal">
              <button
                type="button"
                onClick={() => handleGenderChange('women')}
                className={`pb-0.5 cursor-pointer transition-colors ${
                  activeGender === 'women'
                    ? 'text-neutral-950 border-b border-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Women
              </button>
              <button
                type="button"
                onClick={() => handleGenderChange('men')}
                className={`pb-0.5 cursor-pointer transition-colors ${
                  activeGender === 'men'
                    ? 'text-neutral-950 border-b border-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                Men
              </button>
            </div>

            {/* Description - strictly higher z-index than preview image */}
            <p className="text-[13px] text-neutral-800 font-light leading-[1.65] mt-4 mb-4">
              As season&apos;s start to shift, pieces transform and layer into sophisticated
              combinations.
            </p>

            {/* Shop CTA */}
            <button
              type="button"
              onClick={() => onShopCategory?.(activeGender)}
              className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase text-neutral-950 font-medium hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>{activeGender === 'women' ? 'SHOP WOMEN' : 'SHOP MEN'}</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        {/* Main Stage: Lesser z-index (z-0) than the header text */}
        <div className="relative w-full mt-4 lg:-mt-12 flex items-center justify-center z-0">
          {/* Centered Large Hero Look Model (No hover animation, just pointer cursor, smooth fade in on change) */}
          <div className="flex flex-col items-center z-0">
            <div
              key={`${activeGender}-${activeIndex}`}
              className="relative w-[340px] sm:w-[440px] md:w-[500px] lg:w-[540px] h-[520px] sm:h-[620px] md:h-[680px] lg:h-[720px] cursor-pointer"
              onClick={() =>
                onSelectProduct?.({
                  name: currentItem.name,
                  price: currentItem.price,
                  image: currentItem.imageUrl,
                })
              }
            >
              <Image
                src={currentItem.imageUrl}
                alt={currentItem.name}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 540px"
                className="object-contain object-center transition-opacity duration-300 opacity-100 animate-fadeIn"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Meta underneath */}
            <div className="text-center mt-3 px-4 max-w-lg">
              <h3 className="text-[14px] sm:text-[15px] font-normal text-neutral-900 tracking-[-0.01em]">
                {currentItem.name}
              </h3>
              <p className="text-[13px] sm:text-[14px] font-normal text-neutral-900 mt-0.5 tabular-nums">
                {currentItem.price}
              </p>
            </div>
          </div>

          {/* Desktop Right Vertical Carousel: Smooth sliding carousel */}
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 items-center z-20">
            {/* Fixed Up & Down Chevrons beside the middle active slot */}
            <div className="flex flex-col items-center gap-2 mr-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous look"
                className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <ChevronUp className="w-4 h-4 stroke-[1.75]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next look"
                className="p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4 stroke-[1.75]" />
              </button>
            </div>

            {/* 3-slot visible window that smoothly scrolls the full list */}
            <div className="relative w-[68px] lg:w-[86px] h-[552px] overflow-hidden">
              <div
                className="flex flex-col items-center transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  transform: `translateY(${translateYOffset}px)`,
                }}
              >
                {activeList.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={item.id}
                      className="flex flex-col items-center justify-start h-[192px] shrink-0"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-[65px] lg:w-[84px] h-[130px] lg:h-[168px] overflow-hidden cursor-pointer transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-65 hover:opacity-90'
                        }`}
                        aria-label={`View look: ${item.name}`}
                      >
                        <Image
                          src={item.thumbUrl}
                          alt={item.name}
                          fill
                          sizes="84px"
                          className="object-cover object-center"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                      {/* Active Indicator Underline below the active thumbnail */}
                      <div
                        className={`w-full h-[1.5px] bg-black mt-2.5 transition-opacity duration-300 ${
                          isActive ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Horizontal Thumbnail Slider (Visible on <md) */}
        <div className="md:hidden mt-8 flex flex-col items-center">
          <div className="flex items-center justify-center gap-3 overflow-x-auto no-scrollbar py-2 w-full scroll-smooth">
            {activeList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`relative shrink-0 w-16 h-28 overflow-hidden transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? 'ring-1 ring-black opacity-100 scale-102'
                    : 'opacity-55 hover:opacity-80'
                }`}
              >
                <Image
                  src={item.thumbUrl}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
