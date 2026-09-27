'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Check, Plus, Minus, MapPin } from 'lucide-react';

export type ProductModalType = 'details' | 'shipping' | 'store' | 'contact' | 'sizeGuide' | null;

interface ProductModalsProps {
  activeModal: ProductModalType;
  onClose: () => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenLiveChat?: () => void;
}

const JACKET_IMAGE = 'https://moncler-cdn.thron.com/api/v1/content-delivery/shares/dpx6uv/contents/L20911A00218597YW26C_1/image/ravelis-hooded-zig-zag-quilted-short-down-jacket-men-beige-moncler-0.jpg?w=1600&q=80';

export function ProductModals({
  activeModal,
  onClose,
  selectedSize,
  onSelectSize,
  onOpenLiveChat,
}: ProductModalsProps) {
  // Details tabs
  const [detailsTab, setDetailsTab] = useState<'details' | 'care'>('details');

  // Shipping tabs
  const [shippingTab, setShippingTab] = useState<'estimates' | 'packaging' | 'returns'>('estimates');

  // Find in store
  const [storeSize, setStoreSize] = useState<string>(selectedSize || '');
  const [selectedCountry] = useState('United Kingdom');
  const [selectedStoreIndex, setSelectedStoreIndex] = useState(0);

  // Size guide multi-step state
  const [sizeGuideTab, setSizeGuideTab] = useState<'guide' | 'chart' | 'measure'>('guide');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('11');
  const [weightSt, setWeightSt] = useState('12');
  const [weightLb, setWeightLb] = useState('8');
  const [age, setAge] = useState('30');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  // Email form confirmation
  const [isEmailSent, setIsEmailSent] = useState(false);

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-0 md:p-6 lg:p-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* ============================================================ */}
        {/* MODAL WRAPPER WITH EMERGE-FROM-MIDDLE ANIMATION              */}
        {/* (No sliding in or out from any edge, purely emerging)        */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'center center' }}
          className={`relative bg-[#fafafa] shadow-2xl overflow-hidden w-full h-full md:w-[90vw] md:max-w-[90vw] md:h-[90vh] md:max-h-[90vh] rounded-none ${
            activeModal === 'sizeGuide'
              ? 'flex items-center justify-center p-0 md:p-8 overflow-y-auto'
              : 'flex flex-col md:flex-row'
          }`}
        >
          {/* Close Button top-right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-30 p-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* ============================================================ */}
          {/* 1. DETAILS & CARE MODAL (DESKTOP TWO-COL & MOBILE)           */}
          {/* ============================================================ */}
          {activeModal === 'details' && (
            <>
              {/* Left Column: Product Cut-out Image (Desktop) */}
              <div className="hidden md:flex w-[45%] h-full bg-[#f6f5f3] items-center justify-center p-10 relative shrink-0">
                <div className="relative w-full h-full max-w-[380px] max-h-[480px]">
                  <Image
                    src={JACKET_IMAGE}
                    alt="Ravelis Down Jacket Details"
                    fill
                    sizes="400px"
                    className="object-contain"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Column: Details Content */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
                {/* Title */}
                <h2 className="text-[21px] sm:text-[23px] font-normal tracking-tight text-neutral-900 mb-6">
                  Details & Care
                </h2>

                {/* Sub-tabs */}
                <div className="flex items-center gap-6 border-b border-neutral-200/80 pb-3 mb-8 text-[13px] tracking-wide">
                  <button
                    type="button"
                    onClick={() => setDetailsTab('details')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      detailsTab === 'details'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Product Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setDetailsTab('care')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      detailsTab === 'care'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Composition & Care
                  </button>
                </div>

                {/* Content */}
                {detailsTab === 'details' ? (
                  <div className="space-y-8 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                    {/* Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Highlights
                      </span>
                      <p className="md:col-span-3 text-neutral-800 leading-[1.8]">
                        Defined by contrast, the Ravelis short down jacket combines smooth polyester with glossy detailing. The construction reworks classic boudins into a subtle optical pattern, creating a distinctive visual effect. A detachable hood completes the puffer, adding versatility across varying conditions.
                      </p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Details
                      </span>
                      <ul className="md:col-span-3 space-y-1.5 text-neutral-800">
                        <li>Crafted from polyester</li>
                        <li>Polyester lining</li>
                        <li>Down-filled</li>
                        <li>Detachable and adjustable hood</li>
                        <li>Zipper closure</li>
                        <li>Logo patch</li>
                      </ul>
                    </div>

                    {/* Size & Fit */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Size & Fit
                      </span>
                      <div className="md:col-span-3 space-y-1 text-neutral-800">
                        <p>Regular fit</p>
                        <p>Straight cut</p>
                        <p>Length (collar to hem): 67 cm</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Composition
                      </span>
                      <p className="md:col-span-3 text-neutral-800 leading-[1.8]">
                        EXTERIOR: 100% Polyester; LINING: 100% Polyester; HOOD LINING: 100% Polyester; PADDING: 90% Down, 10% Feather.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Care
                      </span>
                      <div className="md:col-span-3 space-y-3 text-neutral-800 leading-[1.8]">
                        <p>
                          Wash max 30°C - Mild process; Do not bleach; Do not tumble dry; Ironing maximum temperature 110°C - without steam; Dry cleaning in tetrachloroethene or with hydrocarbons - mild process; Professional wet cleaning - mild process; Flat dry in the shade; Wash separately; It is advisable to wash and iron the garment on reverse.
                        </p>
                        <p className="text-[12px] text-neutral-500 pt-2">
                          Product code: L20911A00218597YW26C. Made in Italy.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 2. SHIPPING & RETURNS MODAL (DESKTOP TWO-COL & MOBILE)       */}
          {/* ============================================================ */}
          {activeModal === 'shipping' && (
            <>
              {/* Left Column: Product Cut-out Image (Desktop) */}
              <div className="hidden md:flex w-[45%] h-full bg-[#f6f5f3] items-center justify-center p-10 relative shrink-0">
                <div className="relative w-full h-full max-w-[380px] max-h-[480px]">
                  <Image
                    src={JACKET_IMAGE}
                    alt="Ravelis Down Jacket Shipping"
                    fill
                    sizes="400px"
                    className="object-contain"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
                <h2 className="text-[21px] sm:text-[23px] font-normal tracking-tight text-neutral-900 mb-6">
                  Shipping & Returns
                </h2>

                <div 
                  style={{ paddingTop: '1em' }}
                  className="flex items-center gap-6 sm:gap-8 border-b border-neutral-200/80 pb-3 mb-8 text-[13px] tracking-wide overflow-x-auto whitespace-nowrap scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                  <button
                    type="button"
                    onClick={() => setShippingTab('estimates')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      shippingTab === 'estimates'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Shipping Estimates
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingTab('packaging')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      shippingTab === 'packaging'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Packaging Options
                  </button>
                  <button
                    type="button"
                    onClick={() => setShippingTab('returns')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      shippingTab === 'returns'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Returns & Exchanges
                  </button>
                </div>

                {shippingTab === 'estimates' ? (
                  <div className="space-y-6 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                    {/* Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[12px] text-neutral-500 font-normal">
                        Highlights
                      </span>
                      <div className="md:col-span-3 space-y-2">
                        <p className="text-neutral-800 leading-[1.8]">
                          Complimentary standard shipping (2-3 working days) on all orders. Choose from the available delivery options at checkout. You can also collect your order in boutique, by opting for our Pick up in store service.
                        </p>
                        <button
                          type="button"
                          onClick={() => setShippingTab('returns')}
                          className="underline underline-offset-4 decoration-1 text-neutral-900 hover:opacity-75 cursor-pointer font-normal text-[13px]"
                        >
                          Read more about delivery
                        </button>
                      </div>
                    </div>

                    {/* Standard */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 pt-2">
                      <span className="text-[13px] font-normal text-neutral-900">
                        Standard
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-[13px] font-medium text-neutral-900">Free</p>
                        <p className="text-[12.5px] text-neutral-600 font-light">
                          Delivery within 2-3 working days from the shipping confirmation.
                        </p>
                      </div>
                    </div>

                    {/* Express */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[13px] font-normal text-neutral-900">
                        Express
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-[13px] font-medium text-neutral-900">GBP 13,00</p>
                        <p className="text-[12.5px] text-neutral-600 font-light">
                          Delivery in 1-2 working days from the shipping confirmation.
                        </p>
                      </div>
                    </div>

                    {/* Next day */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[13px] font-normal text-neutral-900">
                        Next day
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-[13px] font-medium text-neutral-900">GBP 17,00</p>
                        <p className="text-[12.5px] text-neutral-600 font-light">
                          Delivery next working day for orders placed by 2pm GMT
                        </p>
                      </div>
                    </div>

                    {/* Saturday */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[13px] font-normal text-neutral-900">
                        Saturday
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-[13px] font-medium text-neutral-900">GBP 17,00</p>
                        <p className="text-[12.5px] text-neutral-600 font-light">
                          Delivery on Saturday for orders placed by 3.30pm GMT on Friday
                        </p>
                      </div>
                    </div>

                    {/* Same day */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                      <span className="text-[13px] font-normal text-neutral-900">
                        Same day
                      </span>
                      <div className="md:col-span-3">
                        <p className="text-[13px] font-medium text-neutral-900">GBP 30,00</p>
                        <p className="text-[12.5px] text-neutral-600 font-light">
                          Delivery on the same working day for orders placed by 2pm GMT (London area)
                        </p>
                      </div>
                    </div>
                  </div>
                ) : shippingTab === 'packaging' ? (
                  <div className="space-y-6 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                    <div>
                      <span className="block text-[12px] uppercase tracking-wider text-neutral-500 font-medium mb-2">
                        Signature Gift Box
                      </span>
                      <p>
                        Every Moncler garment arrives carefully wrapped in bespoke tissue and boxed in our signature embossed luxury carton, tied with black grosgrain ribbon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                    <div>
                      <span className="block text-[12px] uppercase tracking-wider text-neutral-500 font-medium mb-2">
                        Complimentary 20-Day Returns
                      </span>
                      <p>
                        You have 20 calendar days from delivery to return or exchange your items free of charge. Prepaid courier return labels are included in every shipment.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 3. FIND IN STORE (DESKTOP MAP COL + DETAILS)                  */}
          {/* ============================================================ */}
          {activeModal === 'store' && (
            <>
              {/* Left Column: Styled Monochromatic Map (Screenshot 4) */}
              <div className="hidden md:flex w-[48%] h-full bg-[#d8d8d6] relative overflow-hidden shrink-0 select-none">
                {/* Stylized Google Map Background */}
                <div className="absolute inset-0 bg-[#e4e4e2] flex items-center justify-center">
                  <svg
                    viewBox="0 0 800 800"
                    className="w-full h-full object-cover opacity-80"
                    fill="#cccccc"
                  >
                    {/* Simulated European & UK landmass outlines matching screenshot */}
                    <path
                      d="M260,280 Q270,250 280,260 T310,290 T290,340 T270,390 T240,430 T210,380 T230,320 Z"
                      fill="#ffffff"
                      stroke="#d0d0ce"
                      strokeWidth="2"
                    />
                    <path
                      d="M170,350 Q180,320 200,340 T190,400 T160,390 Z"
                      fill="#ffffff"
                      stroke="#d0d0ce"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M320,380 Q360,350 420,360 T480,320 T540,300 T600,340 T580,440 T520,480 T440,460 T360,420 Z"
                      fill="#f7f7f5"
                      stroke="#d0d0ce"
                      strokeWidth="2"
                    />
                    {/* Store Locations Pins */}
                    <circle cx="280" cy="400" r="6" fill="#111111" />
                    <circle cx="280" cy="400" r="14" fill="#111111" opacity="0.15" />
                    <circle cx="420" cy="460" r="5" fill="#555555" />
                    <circle cx="500" cy="500" r="5" fill="#555555" />
                  </svg>

                  {/* Geographical labels matching screenshot */}
                  <span className="absolute top-[370px] left-[240px] text-[11px] font-medium text-neutral-700 tracking-tight">
                    United Kingdom
                  </span>
                  <span className="absolute top-[420px] left-[170px] text-[10px] text-neutral-500">
                    Ireland
                  </span>
                  <span className="absolute top-[350px] left-[340px] text-[10px] text-neutral-400">
                    North Sea
                  </span>
                  <span className="absolute top-[520px] left-[320px] text-[10px] text-neutral-500">
                    France
                  </span>
                  <span className="absolute top-[490px] left-[420px] text-[10px] text-neutral-500">
                    Netherlands
                  </span>
                  <span className="absolute top-[530px] left-[480px] text-[10px] text-neutral-500">
                    Switzerland
                  </span>
                  <span className="absolute top-[490px] left-[550px] text-[10px] text-neutral-500">
                    Germany
                  </span>
                </div>

                {/* Map Zoom Controls bottom-left */}
                <div className="absolute bottom-5 left-5 z-20 flex flex-col bg-white shadow-md border border-neutral-200">
                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 text-neutral-700 border-b border-neutral-200 cursor-pointer"
                    aria-label="Zoom in"
                  >
                    <Plus className="w-4 h-4 stroke-[2]" />
                  </button>
                  <button
                    type="button"
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 text-neutral-700 cursor-pointer"
                    aria-label="Zoom out"
                  >
                    <Minus className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>

                {/* Google watermark bottom-left */}
                <div className="absolute bottom-1 left-5 z-10 text-[10px] font-semibold text-neutral-500 tracking-tight">
                  Google
                </div>
              </div>

              {/* Right Column: Store Availability Selection */}
              <div className="w-full md:w-[52%] h-full overflow-y-auto p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
                <h2 className="text-[21px] sm:text-[23px] font-normal tracking-tight text-neutral-900 mb-2">
                  Find In Store
                </h2>

                <p className="text-[13.5px] text-neutral-900 font-normal mb-6">
                  Ravelis Hooded Zig-Zag Quilted Short Down Jacket
                </p>

                {/* Colour */}
                <div className="mb-5">
                  <span className="block text-[12.5px] text-neutral-900 font-normal mb-2">
                    Colour: <span className="font-light">Beige</span>
                  </span>
                  <span 
                    className="block w-5 h-5 border border-neutral-400/80 shadow-sm"
                    style={{ backgroundColor: '#9e7b57' }}
                  />
                </div>

                {/* Size Grid */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12.5px] text-neutral-900 font-normal">
                      Size: <span className="font-light">{storeSize ? `Size ${storeSize}` : 'Select'}</span>
                    </span>
                    {!storeSize && (
                      <span className="text-[12px] text-[#d94f3d] font-normal">
                        Please select a size
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-5 gap-2 max-w-sm mb-3">
                    {['1', '2', '3', '4', '5'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          setStoreSize(sz);
                          onSelectSize(sz);
                        }}
                        className={`py-3 text-center text-[13px] transition-colors cursor-pointer border ${
                          storeSize === sz
                            ? 'bg-neutral-900 text-white border-neutral-900 font-medium'
                            : 'bg-[#f0ece5] text-neutral-900 border-transparent hover:border-neutral-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <p className="text-[11.5px] text-neutral-500 font-light">
                    Fit: Regular fit. The model is wearing a size 3 and is 185 cm tall
                  </p>
                </div>

                <div className="border-t border-neutral-200/80 pt-6 space-y-5 text-[13px] text-neutral-800 font-light leading-[1.8]">
                  <div>
                    <span className="block text-[13px] text-neutral-900 font-normal mb-1.5">
                      Details:
                    </span>
                    <p className="text-neutral-700 leading-relaxed mb-2">
                      We will be happy to reserve your item(s) and welcome you in the store. Should you wish, you can book an appointment with one of our client advisors.
                    </p>
                    <p className="text-[11.5px] text-neutral-500 leading-relaxed">
                      This information is for reference only. Since store inventory is subject to frequent changes, the availability of items cannot be guaranteed.
                    </p>
                  </div>

                  {/* Country Selector with Black Underline */}
                  <div className="pt-2">
                    <div className="border-b border-black pb-2 text-[13.5px] text-neutral-900 font-normal">
                      {selectedCountry}
                    </div>
                  </div>

                  {/* Store List or Prompt */}
                  <div className="pt-2">
                    {!storeSize ? (
                      <p className="text-[13px] text-neutral-900 text-center py-4 font-normal">
                        Select a size to check availability in store
                      </p>
                    ) : (
                      <div className="space-y-3 pt-2">
                        <p className="text-[11.5px] uppercase tracking-wider text-neutral-500 font-medium">
                          Available Flagships for Size {storeSize}:
                        </p>

                        <div className="border border-neutral-200 bg-white p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-neutral-900 text-[13.5px]">
                              London Old Bond Street
                            </span>
                            <span className="text-[11px] text-emerald-700 font-medium uppercase tracking-wide bg-emerald-50 px-2 py-0.5">
                              In Stock
                            </span>
                          </div>
                          <p className="text-[12px] text-neutral-600">
                            26 Old Bond St, Mayfair, London W1S 4QD
                          </p>
                          <button
                            type="button"
                            onClick={() => alert(`Size ${storeSize} reserved at London Old Bond Street boutique!`)}
                            className="mt-2 w-full py-2.5 bg-black text-white text-[11px] uppercase tracking-wider font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                          >
                            RESERVE IN BOUTIQUE
                          </button>
                        </div>

                        <div className="border border-neutral-200 bg-white p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-neutral-900 text-[13.5px]">
                              London Harrods Knightsbridge
                            </span>
                            <span className="text-[11px] text-emerald-700 font-medium uppercase tracking-wide bg-emerald-50 px-2 py-0.5">
                              In Stock
                            </span>
                          </div>
                          <p className="text-[12px] text-neutral-600">
                            87-135 Brompton Rd, Knightsbridge, London SW1X 7XL
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 4. CONTACT US MODAL (DESKTOP TWO-COL & MOBILE)               */}
          {/* ============================================================ */}
          {activeModal === 'contact' && (
            <>
              {/* Left Column: Product Cut-out Image (Desktop) */}
              <div className="hidden md:flex w-[45%] h-full bg-[#f6f5f3] items-center justify-center p-10 relative shrink-0">
                <div className="relative w-full h-full max-w-[380px] max-h-[480px]">
                  <Image
                    src={JACKET_IMAGE}
                    alt="Ravelis Down Jacket Contact"
                    fill
                    sizes="400px"
                    className="object-contain"
                    priority
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Right Column: Contact Channels */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto p-6 sm:p-10 lg:p-12 flex flex-col justify-start">
                <h2 className="text-[21px] sm:text-[23px] font-normal tracking-tight text-neutral-900 mb-6">
                  Contact Us
                </h2>

                <div className="space-y-7 text-[13.5px] text-neutral-800 font-light leading-[1.8]">
                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                    <span className="text-[12px] text-neutral-500 font-normal">
                      Highlights
                    </span>
                    <p className="md:col-span-3 text-neutral-800 leading-[1.8]">
                      Our online Client Advisors will be happy to answer your questions. They will be delighted to provide more information, styling tips and assist you in placing your order.
                    </p>
                  </div>

                  {/* Contact details for */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                    <span className="text-[12px] text-neutral-500 font-normal">
                      Contact details for
                    </span>
                    <div className="md:col-span-3 border-b border-neutral-300 pb-2 flex items-center justify-between cursor-pointer">
                      <span className="text-[13px] text-neutral-900 font-normal">United Kingdom</span>
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    </div>
                  </div>

                  {/* Ways to Contact Us */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6 pt-2">
                    <span className="text-[12px] text-neutral-500 font-normal">
                      Ways to Contact Us
                    </span>

                    <div className="md:col-span-3 space-y-6">
                      {/* Live Chat */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[13px] text-neutral-900">
                          <span className="font-medium">Start a Live Chat</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500">Offline</span>
                        </div>
                        <p className="text-[12px] text-neutral-600 font-light">
                          Sunday - Thursday at 09:00 am - 06:00 pm EUROPE/LONDON
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onOpenLiveChat?.();
                          }}
                          className="w-full py-3.5 border border-neutral-300 text-neutral-400 text-[11.5px] uppercase tracking-[0.16em] font-medium text-center hover:border-black hover:text-black transition-colors cursor-pointer"
                        >
                          START CHAT
                        </button>
                      </div>

                      {/* Call Us */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[13px] text-neutral-900">
                          <span className="font-medium">Call Us</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500">Lines Closed</span>
                        </div>
                        <p className="text-[12px] text-neutral-600 font-light">
                          Monday - Friday at 09:00 AM-06:00 PM EUROPE/LONDON
                        </p>
                        <a
                          href="tel:0080010204000"
                          className="block w-full py-3.5 border border-neutral-300 text-neutral-700 text-[12px] tracking-wider font-normal text-center hover:border-black hover:text-black transition-colors"
                        >
                          GB 00 800 10204000
                        </a>
                      </div>

                      {/* Chat on WhatsApp */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[13px] text-neutral-900">
                          <span className="font-medium">Chat on whatsapp</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-500">Lines Closed</span>
                        </div>
                        <p className="text-[12px] text-neutral-600 font-light">
                          Monday - Friday at 09:00 AM-06:00 PM EUROPE/LONDON
                        </p>
                        <a
                          href="https://wa.me/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full py-3.5 border border-neutral-300 text-neutral-400 text-[11.5px] uppercase tracking-[0.16em] font-medium text-center hover:border-black hover:text-black transition-colors"
                        >
                          WHATSAPP
                        </a>
                      </div>

                      {/* Send us an Email */}
                      <div className="space-y-2 pt-2">
                        <h4 className="text-[13px] font-medium text-neutral-900">
                          Send us an Email
                        </h4>
                        <p className="text-[12.5px] text-neutral-600 font-light leading-relaxed">
                          We`re happy to help with any queries you may have, a Client Service Advisor will get back to you as soon as possible.
                        </p>
                        {isEmailSent ? (
                          <div className="p-3 bg-neutral-100 text-neutral-900 text-[12px] text-center border border-neutral-300">
                            Thank you. Your message has been sent to our Client Service team.
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsEmailSent(true)}
                            className="w-full py-3.5 border border-black text-neutral-900 text-[11.5px] uppercase tracking-[0.16em] font-medium text-center hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            EMAIL US
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 5. FIND MY SIZE MODAL (Screenshot 2: Centered Card)          */}
          {/* ============================================================ */}
          {activeModal === 'sizeGuide' && (
            <div className="w-full h-full overflow-y-auto p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Header Tabs */}
                <div className="flex items-center gap-6 sm:gap-8 border-b border-neutral-200/80 pb-3 mb-6 text-[13px] tracking-wide">
                  <button
                    type="button"
                    onClick={() => setSizeGuideTab('guide')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      sizeGuideTab === 'guide'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Find my size
                  </button>
                  <button
                    type="button"
                    onClick={() => setSizeGuideTab('chart')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      sizeGuideTab === 'chart'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    Size Chart
                  </button>
                  <button
                    type="button"
                    onClick={() => setSizeGuideTab('measure')}
                    className={`cursor-pointer pb-1 transition-colors ${
                      sizeGuideTab === 'measure'
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    How to measure
                  </button>
                </div>

                {sizeGuideTab === 'guide' ? (
                  <div className="space-y-6">
                    <div>
                      <span className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider mb-1">
                        1 OF 3
                      </span>
                      <h3 className="text-[20px] font-normal tracking-tight text-neutral-900 mb-1">
                        About You
                      </h3>
                      <p className="text-[12.5px] text-neutral-600 font-light">
                        Tell us about yourself, so we can recommend the right size for you
                      </p>
                    </div>

                    {/* Gender Radio */}
                    <div className="space-y-2">
                      <span className="block text-[12px] text-neutral-700 font-normal">
                        Gender
                      </span>
                      <div className="flex items-center gap-6">
                        <label className="inline-flex items-center gap-2 text-[13px] text-neutral-800 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === 'male'}
                            onChange={() => setGender('male')}
                            className="w-4 h-4 accent-black"
                          />
                          <span>Male</span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-[13px] text-neutral-800 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                            onChange={() => setGender('female')}
                            className="w-4 h-4 accent-black"
                          />
                          <span>Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Height & Weight Inputs */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Height */}
                      <div>
                        <div className="flex items-center justify-between text-[12px] text-neutral-700 mb-1">
                          <span>Height</span>
                          <span className="text-neutral-500">ft ⌄</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={heightFt}
                            onChange={(e) => setHeightFt(e.target.value)}
                            placeholder="E.g. 5"
                            className="border-b border-neutral-400 py-1.5 text-[13px] focus:border-black outline-none bg-transparent"
                          />
                          <input
                            type="text"
                            value={heightIn}
                            onChange={(e) => setHeightIn(e.target.value)}
                            placeholder="E.g. 11"
                            className="border-b border-neutral-400 py-1.5 text-[13px] focus:border-black outline-none bg-transparent"
                          />
                        </div>
                      </div>

                      {/* Weight */}
                      <div>
                        <div className="flex items-center justify-between text-[12px] text-neutral-700 mb-1">
                          <span>Weight</span>
                          <span className="text-neutral-500">st ⌄</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={weightSt}
                            onChange={(e) => setWeightSt(e.target.value)}
                            placeholder="E.g. 12"
                            className="border-b border-neutral-400 py-1.5 text-[13px] focus:border-black outline-none bg-transparent"
                          />
                          <input
                            type="text"
                            value={weightLb}
                            onChange={(e) => setWeightLb(e.target.value)}
                            placeholder="E.g. 8"
                            className="border-b border-neutral-400 py-1.5 text-[13px] focus:border-black outline-none bg-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Age */}
                    <div>
                      <span className="block text-[12px] text-neutral-700 mb-1">
                        Age
                      </span>
                      <input
                        type="text"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="E.g. 30"
                        className="w-full border-b border-neutral-400 py-1.5 text-[13px] focus:border-black outline-none bg-transparent mb-1"
                      />
                      <span className="text-[11px] text-neutral-400 font-light">
                        Age helps us understand your weight distribution better.
                      </span>
                    </div>

                    {recommendedSize && (
                      <div className="p-3 bg-neutral-100 border border-neutral-300 text-center text-[13px] text-neutral-900 font-medium">
                        Your recommended size is: <span className="underline">Size {recommendedSize}</span>
                      </div>
                    )}
                  </div>
                ) : sizeGuideTab === 'chart' ? (
                  <div className="space-y-4 py-2">
                    <h4 className="text-[14px] font-medium text-neutral-900">International Conversion Table</h4>
                    <table className="w-full text-left text-[12px] border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-300 text-neutral-500 uppercase text-[10.5px]">
                          <th className="py-2">Moncler</th>
                          <th className="py-2">UK / US</th>
                          <th className="py-2">IT / FR</th>
                          <th className="py-2">Chest (cm)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {[
                          { m: '0 (XS)', uk: '34', it: '44', c: '88 - 92' },
                          { m: '1 (S)', uk: '36', it: '46', c: '92 - 96' },
                          { m: '2 (M)', uk: '38', it: '48', c: '96 - 100' },
                          { m: '3 (L)', uk: '40', it: '50', c: '100 - 104' },
                          { m: '4 (XL)', uk: '42', it: '52', c: '104 - 108' },
                          { m: '5 (XXL)', uk: '44', it: '54', c: '108 - 114' },
                        ].map((row) => (
                          <tr key={row.m}>
                            <td className="py-2 font-medium">{row.m}</td>
                            <td className="py-2">{row.uk}</td>
                            <td className="py-2">{row.it}</td>
                            <td className="py-2">{row.c}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-4 py-2 text-[13px] text-neutral-700 leading-relaxed font-light">
                    <p>
                      <strong>Chest:</strong> Measure horizontally around the fullest part of your chest, keeping the tape level under your arms.
                    </p>
                    <p>
                      <strong>Length:</strong> Measured from the center back collar seam down to the hem edge.
                    </p>
                  </div>
                )}
              </div>

              {/* Continue button & footer note */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setRecommendedSize('3');
                    onSelectSize('3');
                  }}
                  className="w-full py-4 bg-black text-white text-[11.5px] uppercase tracking-[0.16em] font-medium hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {recommendedSize ? 'APPLY SIZE 3' : 'CONTINUE'}
                </button>

                <p className="text-[10px] text-neutral-400 text-center mt-3 font-light">
                  This service is provided by Measmerize. According to our Privacy Policy, Cookie Policy and ToS
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
