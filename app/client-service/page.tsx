'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Mail, 
} from 'lucide-react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { ValuePropositionBar } from '@/components/ValuePropositionBar';
import { Footer } from '@/components/Footer';
import { Modals } from '@/components/Modals';
import { MobileFloatingBar } from '@/components/MobileFloatingBar';

interface CartItem {
  id: string;
  name: string;
  price: string;
  size: string;
  quantity: number;
  image: string;
}

export default function ClientServicePage() {
  // High contrast mode state
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Modals & Navigation state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Country selector state
  const [selectedCountry, setSelectedCountry] = useState('UNITED KINGDOM');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Shopping cart items state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      name: 'Abstraction Hooded Wool Blend Short Down Jacket',
      price: '£1,900.00',
      size: '2',
      quantity: 1,
      image: 'https://placehold.co/700x1050/f5f5f5/222222.png?text=Abstraction+Hooded+Down+Jacket',
    },
  ]);

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const serviceCards = [
    {
      id: 'faqs',
      title: 'FAQs',
      description: 'Easily find the answer to your questions.',
      ctaText: 'LEARN MORE',
      ctaHref: '/faq',
      imageSrc: '/images/client-service/faqs.jpg',
      imageAlt: 'Moncler FAQs emblem',
    },
    {
      id: 'order-management',
      title: 'Order Management',
      description: 'Track all purchases, seamlessly request an exchange or return and select the best delivery and payment method for you.',
      ctaText: 'LEARN MORE',
      ctaHref: '#order-management',
      imageSrc: '/images/client-service/order-management.jpg',
      imageAlt: 'Moncler luxury packaging box and order ribbon',
    },
    {
      id: 'shopping-advice',
      title: 'Shopping and Product Advice',
      description: 'From style suggestions to joyful gifts, let our advisors find the perfect products for you.',
      ctaText: 'LEARN MORE',
      ctaHref: '/contact',
      imageSrc: '/images/client-service/shopping-advice.jpg',
      imageAlt: 'Moncler camel down jacket with buckle belt',
    },
    {
      id: 'boutique-services',
      title: 'Boutique Services',
      description: 'A true customer destination, explore our tailored services from personal appointments to unrivalled styling advice.',
      ctaText: 'LEARN MORE',
      ctaHref: '#boutique-services',
      imageSrc: '/images/client-service/boutique-services.jpg',
      imageAlt: 'Moncler boutique luxury interior staircase',
    },
    {
      id: 'aftercare',
      title: 'Aftercare',
      description: 'Our experts are here to help keep your purchase looking its best for years to come.',
      ctaText: 'LEARN MORE',
      ctaHref: '#aftercare',
      imageSrc: '/images/client-service/aftercare.jpg',
      imageAlt: 'Moncler artisan inspecting embroidered badge aftercare',
    },
    {
      id: 'verification',
      title: 'Product Code Verification',
      description: 'Visit our dedicate product code verification website Code Moncler.',
      ctaText: 'LEARN MORE',
      ctaHref: '#code-moncler',
      imageSrc: '/images/client-service/verification.jpg',
      imageAlt: 'Moncler product authenticity passport code verification',
    },
  ];

  const countries = [
    'UNITED KINGDOM',
    'UNITED STATES',
    'FRANCE',
    'ITALY',
    'GERMANY',
    'JAPAN',
    'SWITZERLAND',
    'UNITED ARAB EMIRATES',
  ];

  return (
    <div className={`min-h-screen bg-white text-neutral-900 ${isHighContrast ? 'high-contrast' : ''}`}>
      {/* 1. Header & Navigation */}
      <AnnouncementBar onOpenPeaksModal={() => setIsPeaksOpen(true)} />
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSetMobileMenuOpen={setIsMobileMenuOpen}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={0}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        onOpenCountry={() => setIsCountryOpen(true)}
        onOpenPeaks={() => setIsPeaksOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />

      {/* 2. Main Page Content - NO MAX WIDTH, FULL WIDTH WITH PADDING */}
      <main className="w-full pt-4 md:pt-6 pb-16">
        {/* Breadcrumbs */}
        <div className="w-full px-6 md:px-10 lg:px-14 xl:px-16 pt-2 pb-1">
          <nav className="flex items-center space-x-1.5 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-neutral-600 font-light">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />
            <span className="text-black font-normal">CLIENT SERVICE</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="w-full px-6 md:px-10 lg:px-14 xl:px-16 pt-2 pb-4">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-light tracking-tight text-neutral-900">
            Client Service
          </h1>
        </div>

        {/* Contact Info & Channel Bar */}
        <div className="w-full px-6 md:px-10 lg:px-14 xl:px-16 py-3.5 mb-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Country Selector */}
            <div className="relative inline-flex items-center text-xs md:text-[13px] text-neutral-600 font-light">
              <span className="mr-1.5">Contact details for</span>
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="inline-flex items-center font-semibold text-neutral-900 tracking-wider hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span>{selectedCountry}</span>
                <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCountryDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-neutral-200 shadow-xl z-30 py-2">
                  {countries.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs tracking-wider uppercase hover:bg-neutral-50 transition-colors ${
                        selectedCountry === c ? 'font-bold text-black bg-neutral-100' : 'text-neutral-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-7 xl:gap-9 text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
              <a 
                href="tel:0080010204000" 
                className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity shrink-0"
              >
                <Phone className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>00 800 10204000</span>
              </a>

              <button 
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity uppercase shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>WHATSAPP</span>
              </button>

              <Link 
                href="/contact" 
                className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity shrink-0"
              >
                <Mail className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>EMAIL</span>
              </Link>

              <Link 
                href="/contact" 
                className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity shrink-0"
              >
                <span>CONTACT US</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. "How Can We Help?" Search Section */}
        <section className="w-full bg-[#f8f8f7] px-6 md:px-10 lg:px-14 xl:px-16 py-10 lg:py-14 my-3">
          <h2 className="text-[17px] md:text-[19px] font-normal tracking-normal text-neutral-900 mb-6">
            How Can We Help?
          </h2>
          <div className="w-full border-b border-neutral-300 pb-3 flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs"
              className="w-full bg-transparent text-2xl md:text-3xl lg:text-[32px] text-neutral-900 placeholder:text-neutral-500 font-light focus:outline-none tracking-tight"
            />
          </div>
        </section>

        {/* 4. Exclusive Services Header & 3-Column Desktop Grid */}
        <section className="w-full px-6 md:px-10 lg:px-14 xl:px-16 pt-10 lg:pt-14 pb-14">
          {/* Header Row */}
          <div className="w-full flex items-center justify-between pb-7">
            <h2 className="text-[17px] md:text-[19px] font-normal tracking-normal text-neutral-900">
              Exclusive Services
            </h2>
            <div className="hidden lg:flex items-center space-x-7 xl:space-x-8 text-[11px] xl:text-[12px] font-semibold tracking-[0.16em] uppercase text-neutral-900">
              <button type="button" onClick={() => {}} className="hover:opacity-70 transition-opacity cursor-pointer">
                SIZE GUIDE
              </button>
              <button type="button" onClick={() => {}} className="hover:opacity-70 transition-opacity cursor-pointer">
                SHOP WITH US
              </button>
              <button type="button" onClick={() => {}} className="hover:opacity-70 transition-opacity cursor-pointer">
                EXCHANGES
              </button>
              <button type="button" onClick={() => {}} className="hover:opacity-70 transition-opacity cursor-pointer">
                APPOINTMENTS
              </button>
            </div>
          </div>

          {/* 3-Column Cards Grid on Desktop */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-[0.2em]">
            {serviceCards.map((card, index) => (
              <div key={card.id} className="w-full flex flex-col pb-6 lg:pb-8">
                {/* Landscape card image */}
                <div className="w-full relative aspect-[16/10] bg-neutral-100 overflow-hidden mb-4">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>

                {/* Card Title */}
                <h3 className="text-base lg:text-[17px] font-medium text-neutral-900 mb-1.5 tracking-tight">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs lg:text-[13px] text-neutral-600 font-light leading-relaxed mb-4 min-h-[38px]">
                  {card.description}
                </p>

                {/* Card Link CTA */}
                <div className="mt-auto">
                  <Link
                    href={card.ctaHref}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-black hover:opacity-70 transition-opacity group"
                  >
                    <span>{card.ctaText}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. "Over 300 Boutiques" Wide Feature Block */}
        <section className="w-full px-6 md:px-10 lg:px-14 xl:px-16 pt-2 pb-16">
          {/* Wide Feature Image */}
          <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.35/1] bg-neutral-100 overflow-hidden mb-6">
            <Image
              src="/images/client-service/moncler_300_boutiques_1790438016640.jpg"
              alt="Moncler luxury boutique interior architectural staircase"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Text & CTAs Row */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            <h2 className="text-2xl md:text-3xl lg:text-[34px] font-light tracking-tight text-neutral-900">
              Over 300 Boutiques
            </h2>

            <div className="flex flex-col items-start lg:items-end gap-2">
              <span className="text-xs md:text-[13px] text-neutral-600 font-light">
                Explore the world of Moncler
              </span>
              <div className="flex flex-wrap items-center gap-6 xl:gap-8 text-[11px] xl:text-xs font-semibold tracking-[0.18em] uppercase text-neutral-900">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity cursor-pointer group"
                >
                  <span>BOOK YOUR APPOINTMENT</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:translate-x-0.5" />
                </button>

                <Link
                  href="/boutiques"
                  className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity group"
                >
                  <span>FIND A BOUTIQUE</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Value Proposition Bar */}
      <ValuePropositionBar />

      {/* 7. Standard Moncler Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={(enabled) => setIsHighContrast(enabled)}
      />

      {/* 8. Modals & Drawers */}
      <Modals
        isSearchOpen={isSearchOpen}
        onCloseSearch={() => setIsSearchOpen(false)}
        isCartOpen={isCartOpen}
        onCloseCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onRemoveCartItem={handleRemoveCartItem}
        isSignupOpen={isSignupOpen}
        onCloseSignup={() => setIsSignupOpen(false)}
        isPeaksOpen={isPeaksOpen}
        onClosePeaks={() => setIsPeaksOpen(false)}
        isChatOpen={isChatOpen}
        onCloseChat={() => setIsChatOpen(false)}
        isCountryOpen={isCountryOpen}
        onCloseCountry={() => setIsCountryOpen(false)}
        quickViewProduct={null}
        onCloseQuickView={() => {}}
        onAddToCart={() => {}}
      />

      {/* 9. Mobile Persistent Floating Bottom Navigation Bar */}
      <MobileFloatingBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsPeaksOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        isMenuOpen={isMobileMenuOpen}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
    </div>
  );
}
