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
  User,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2
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

      {/* 2. Main Page Content - NO MAX WIDTH, ONLY PADDING */}
      <main className="w-full pt-6 md:pt-10 pb-20">
        {/* Breadcrumbs */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pb-4">
          <nav className="flex items-center space-x-2 text-[11px] md:text-xs tracking-[0.18em] uppercase text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
            <span className="text-black font-medium">CLIENT SERVICE</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pt-2 pb-8 md:pb-12 border-b border-neutral-100">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
            Client Service
          </h1>
        </div>

        {/* Contact Info & Channel Bar */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8 border-b border-neutral-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Country Selector */}
            <div className="relative">
              <span className="text-xs md:text-sm text-neutral-500 mr-2">Contact details for</span>
              <button
                type="button"
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="inline-flex items-center text-xs md:text-sm font-semibold tracking-wider text-black hover:opacity-75 transition-opacity"
              >
                <span>{selectedCountry}</span>
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
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

            {/* Direct Contact Links - Single line on mobile with smooth natural horizontal scroll */}
            <div className="flex flex-nowrap items-center overflow-x-auto scrollbar-none whitespace-nowrap gap-6 md:gap-8 text-[11px] md:text-xs font-semibold tracking-[0.18em] uppercase text-neutral-900 -mx-5 px-5 md:mx-0 md:px-0 py-1">
              <a 
                href="tel:0080010204000" 
                className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity shrink-0"
              >
                <Phone className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>00 800 10204000</span>
              </a>

              <button 
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity uppercase shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>WHATSAPP</span>
              </button>

              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity shrink-0"
              >
                <Mail className="w-3.5 h-3.5 stroke-[1.8]" />
                <span>EMAIL</span>
              </Link>

              <Link 
                href="/contact" 
                className="hover:underline underline-offset-4 shrink-0"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* 3. Editorial Service Cards Section - Full Width with Horizontal Padding */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pt-10 md:pt-14 space-y-16 md:space-y-24">
          {serviceCards.map((card, index) => (
            <section 
              key={card.id}
              className="w-full border-b border-neutral-100 pb-16 md:pb-24 last:border-b-0"
            >
              {/* Full width image container */}
              <div className="w-full relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.4/1] bg-neutral-100 overflow-hidden mb-8 md:mb-10">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority={index < 2}
                />
              </div>

              {/* Text Information block */}
              <div className="w-full max-w-none space-y-3 md:space-y-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-normal tracking-tight text-neutral-900">
                  {card.title}
                </h2>
                <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed max-w-4xl">
                  {card.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={card.ctaHref}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity group"
                  >
                    <span>{card.ctaText}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </section>
          ))}

          {/* 4. Over 300 Boutiques Hero Block */}
          <section className="w-full pt-4 pb-12">
            <div className="w-full relative aspect-[16/10] md:aspect-[21/9] lg:aspect-[2.5/1] bg-neutral-100 overflow-hidden mb-8 md:mb-10">
              <Image
                src="/images/client-service/boutiques-300.jpg"
                alt="Moncler luxury boutique interior architectural staircase"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="w-full space-y-3 md:space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-neutral-900">
                Over 300 Boutiques
              </h2>
              <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">
                Explore the world of Moncler
              </p>
              
              <div className="flex flex-wrap items-center gap-6 md:gap-10 pt-2">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity group"
                >
                  <span>BOOK YOUR APPOINTMENT</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href="/boutiques"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity group"
                >
                  <span>FIND A BOUTIQUE</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* 5. Value Proposition Bar */}
      <ValuePropositionBar />

      {/* 6. Standard Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={(enabled) => setIsHighContrast(enabled)}
      />

      {/* 7. Modals & Drawers */}
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

      {/* 8. Mobile Persistent Floating Bottom Navigation Bar */}
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
