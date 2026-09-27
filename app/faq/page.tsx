'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft
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

interface FaqItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

interface FaqCategory {
  id: string;
  name: string;
  tagline: string;
  items: FaqItem[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    id: 'shopping',
    name: 'Shopping',
    tagline: 'Orders, size advice and assistance when purchasing.',
    items: [
      {
        id: 'shop-1',
        question: 'How do I place an order on Moncler.com?',
        answer: (
          <p>
            Browse our catalogue, select your preferred item and size, then click &ldquo;Add to Shopping Bag&rdquo;. Follow the straightforward checkout steps to confirm your shipping destination and payment details.
          </p>
        ),
      },
      {
        id: 'shop-2',
        question: 'Can I cancel or modify my order?',
        answer: (
          <p>
            Due to our expedited processing times, orders enter logistics swiftly once confirmed. Please reach out to our Client Service team immediately if you wish to adjust or cancel your order.
          </p>
        ),
      },
      {
        id: 'shop-3',
        question: 'Is gift packaging available?',
        answer: (
          <p>
            All Moncler purchases are delivered in signature luxury packaging. You may also add a complimentary personal message during checkout.
          </p>
        ),
      },
    ],
  },
  {
    id: 'size-guide',
    name: 'Size Guide',
    tagline: 'Measurement tables, conversions and garment fit details.',
    items: [
      {
        id: 'size-1',
        question: 'How do Moncler numeric sizes correspond to international sizing?',
        answer: (
          <div className="space-y-2">
            <p>Moncler outerwear uses a 00 to 7 numeric scale:</p>
            <p>Size 0 = XS / UK 6 / US 2 &bull; Size 1 = S / UK 8 / US 4 &bull; Size 2 = M / UK 10 / US 6 &bull; Size 3 = L / UK 12 / US 8 &bull; Size 4 = XL / UK 14 / US 10</p>
          </div>
        ),
      },
      {
        id: 'size-2',
        question: 'What is the difference between Regular, Slim, and Loose fit?',
        answer: (
          <p>
            Slim fit models are tailored close to the body, Regular fit provides classic comfort with layering room, and Loose fit features contemporary oversized silhouettes.
          </p>
        ),
      },
    ],
  },
  {
    id: 'payments',
    name: 'Payments',
    tagline: 'Payment methods and options available online.',
    items: [
      {
        id: 'pay-1',
        question: 'Which payment methods do you accept?',
        answer: (
          <div className="space-y-3">
            <p>
              We accept all major credit and debit cards (Visa, MasterCard, American Express, Maestro, UnionPay, JCB), as well as Apple Pay, Google Pay, PayPal, Klarna, and Moncler Gift Cards.
            </p>
            <p>
              All online transactions are encrypted and processed through certified secure payment gateways.
            </p>
          </div>
        ),
      },
      {
        id: 'pay-2',
        question: 'Are payments secure?',
        answer: (
          <p>
            Yes. Every transaction is protected with advanced SSL encryption and 3D Secure verification protocol. Moncler never stores your full card number or security code.
          </p>
        ),
      },
      {
        id: 'pay-3',
        question: 'My order is not being accepted. Why?',
        answer: (
          <div className="space-y-2">
            <p>
              Payment authorisations may occasionally be declined by your bank due to automated security triggers, mismatched billing address information, or daily transaction limits.
            </p>
            <p>
              Please ensure your billing address matches your payment method registry, or select an alternative payment method such as PayPal or Apple Pay.
            </p>
          </div>
        ),
      },
      {
        id: 'pay-4',
        question: 'Is VAT included in the final price?',
        answer: (
          <div className="space-y-2">
            <p>
              All prices shown on Moncler.com include value added tax (VAT). At this time, we are unable to process tax-free refunds for purchases completed online.
            </p>
            <p>
              Kindly note that online orders are reserved for private retail purchases.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'shipping',
    name: 'Shipping',
    tagline: 'Delivery methods, express transit times and shipping options.',
    items: [
      {
        id: 'ship-1',
        question: 'What are the delivery times and shipping costs?',
        answer: (
          <p>
            We provide Complimentary Standard Shipping (2-4 business days) on all orders. Express Shipping (1-2 business days) is also available at checkout.
          </p>
        ),
      },
      {
        id: 'ship-2',
        question: 'Can I choose Pick Up in Boutique?',
        answer: (
          <p>
            Yes. Select &ldquo;Pick Up in Boutique&rdquo; at checkout to collect your parcel from any participating Moncler flagship at your convenience.
          </p>
        ),
      },
    ],
  },
  {
    id: 'exchanges-returns',
    name: 'Exchanges and Returns',
    tagline: 'Return requests, prepaid labels and exchanges.',
    items: [
      {
        id: 'ret-1',
        question: 'How do I return an item?',
        answer: (
          <p>
            You have 20 calendar days from delivery to request a return. Use the pre-printed prepaid return label included in your parcel or generate a digital return slip in your account.
          </p>
        ),
      },
      {
        id: 'ret-2',
        question: 'Can I exchange my item for a different size or color?',
        answer: (
          <p>
            Yes, subject to stock availability. You can request an exchange online through your order history or visit any Moncler boutique.
          </p>
        ),
      },
    ],
  },
  {
    id: 'aftercare',
    name: 'Product Aftercare',
    tagline: 'Care, cleaning, repairs and garment preservation.',
    items: [
      {
        id: 'care-1',
        question: 'How should I clean and store my Moncler down jacket?',
        answer: (
          <p>
            We recommend professional gentle dry cleaning by a specialized luxury outerwear cleaner. Store your jacket on a wide hanger in a cool, dry environment away from direct sunlight.
          </p>
        ),
      },
      {
        id: 'care-2',
        question: 'Does Moncler provide garment repair services?',
        answer: (
          <p>
            Yes. Our boutiques and certified repair ateliers provide zipper replacements, patch repairs, and authentic hardware restoration.
          </p>
        ),
      },
    ],
  },
  {
    id: 'boutique-services',
    name: 'Boutique Services',
    tagline: 'Private appointments, personal styling and click & collect.',
    items: [
      {
        id: 'boutique-1',
        question: 'How can I book a private boutique appointment?',
        answer: (
          <p>
            You can book a one-on-one personal styling appointment online through our Boutique Locator or by contacting our Client Advisors.
          </p>
        ),
      },
    ],
  },
  {
    id: 'gift-card',
    name: 'Gift Card',
    tagline: 'Purchasing and redeeming Moncler physical and digital gift cards.',
    items: [
      {
        id: 'gift-1',
        question: 'How do I redeem a Moncler Gift Card?',
        answer: (
          <p>
            Enter your 16-digit gift card number and PIN in the payment section during online checkout, or present the card to an advisor at any Moncler boutique.
          </p>
        ),
      },
    ],
  },
  {
    id: 'account-privacy',
    name: 'My Account and Privacy',
    tagline: 'Managing your profile, password and privacy preferences.',
    items: [
      {
        id: 'acc-1',
        question: 'How do I create or manage my Moncler account?',
        answer: (
          <p>
            Click the account icon in the header to register or log in. From your dashboard, you can track orders, save wishlists, manage addresses, and update communication preferences.
          </p>
        ),
      },
    ],
  },
];

const POPULAR_TOPICS = [
  {
    id: 'shipping-topic',
    title: 'Shipping',
    description: 'Delivery methods and shipping options.',
    cta: 'EXPLORE SHIPPING',
    image: '/images/client-service/shipping-boxes.jpg',
    targetCat: 'shipping',
  },
  {
    id: 'exchanges-topic',
    title: 'Exchanges & Returns',
    description: 'Easy exchanges and returns online and in-store',
    cta: 'EXPLORE EXCHANGES & RETURNS',
    image: '/images/client-service/exchanges-bag.jpg',
    targetCat: 'exchanges-returns',
  },
  {
    id: 'aftercare-topic',
    title: 'Product Aftercare',
    description: 'Care and support for your Moncler pieces',
    cta: 'EXPLORE AFTERCARE',
    image: '/images/client-service/aftercare.jpg',
    targetCat: 'aftercare',
  },
];

export default function FaqPage() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Modals & Navigation state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Category State (Default: 'payments' matching screenshot)
  const [activeCategory, setActiveCategory] = useState<string>('payments');

  // Search input state for FAQs
  const [searchQuery, setSearchQuery] = useState('');

  // Accordion open/close state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  // Mobile carousel index
  const [popularCarouselIndex, setPopularCarouselIndex] = useState(0);

  // Cart items state
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

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const currentCategoryData = useMemo(() => {
    return FAQ_DATA.find((c) => c.id === activeCategory) || FAQ_DATA[2];
  }, [activeCategory]);

  const displayedFaqItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentCategoryData.items;
    }
    const q = searchQuery.toLowerCase();
    return currentCategoryData.items.filter((item) =>
      item.question.toLowerCase().includes(q)
    );
  }, [currentCategoryData, searchQuery]);

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white ${
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-white'
      }`}
    >
      {/* Top Announcement Bar */}
      <AnnouncementBar
        onOpenPeaksModal={() => setIsPeaksOpen(true)}
      />

      {/* Main Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenPeaks={() => setIsPeaksOpen(true)}
        onOpenCountry={() => setIsCountryOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSetMobileMenuOpen={setIsMobileMenuOpen}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast((prev) => !prev)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <main className="w-full">
        {/* Breadcrumbs & Title Section */}
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 sm:pt-8 pb-6 sm:pb-8">
          {/* Breadcrumb line */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-neutral-800 mb-3">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />
            <Link href="/client-service" className="hover:text-black transition-colors">
              CLIENT SERVICE
            </Link>
            <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />
            <span className="text-neutral-900 font-medium">
              FAQ
            </span>
          </nav>

          {/* Category Title & Right Tagline */}
          <div className="w-full flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <h1 className="text-[26px] sm:text-[30px] font-normal tracking-tight text-neutral-900 leading-tight">
              {currentCategoryData.name}
            </h1>
            <p className="text-[12.5px] sm:text-[13px] text-neutral-500 font-light">
              {currentCategoryData.tagline}
            </p>
          </div>
        </div>

        {/* How Can We Help? / Search Section */}
        <section className="w-full bg-[#f8f8f7] py-8 sm:py-10 px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="w-full">
            <h2 className="text-[17px] sm:text-[18px] font-normal text-neutral-900 mb-3">
              How Can We Help?
            </h2>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search FAQs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-neutral-300 pb-2.5 pt-0.5 text-[20px] sm:text-[22px] placeholder:text-neutral-500 font-light text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Mobile Horizontal Category Tabs */}
        <div className="lg:hidden w-full px-6 pt-6 pb-2 overflow-x-auto no-scrollbar flex items-center gap-6 whitespace-nowrap border-b border-neutral-200">
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setSearchQuery('');
              }}
              className={`text-[13px] pb-2 transition-colors shrink-0 cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-neutral-900 font-medium border-b border-neutral-900'
                  : 'text-neutral-500 hover:text-neutral-900 font-light'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Side Categories & Centered Accordion */}
        <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-10 sm:py-14">
          <div className="w-full relative min-h-[380px] lg:flex lg:justify-center">
            
            {/* Desktop Left Categories Column pinned to the left margin */}
            <aside className="hidden lg:block lg:absolute lg:left-0 lg:top-0 lg:w-[22%]">
              <nav aria-label="FAQ categories" className="flex flex-col space-y-3.5">
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`text-[13.5px] tracking-normal text-left transition-colors cursor-pointer w-fit ${
                      activeCategory === cat.id
                        ? 'text-neutral-900 font-medium underline underline-offset-4 decoration-1 decoration-neutral-900'
                        : 'text-neutral-900 font-light hover:underline underline-offset-4'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Accordion centered in the middle of the screen */}
            <div className="w-full lg:w-[50%]">
              <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
                {displayedFaqItems.length === 0 ? (
                  <div className="py-8 text-neutral-500 font-light text-[13.5px]">
                    No FAQs found matching &ldquo;{searchQuery}&rdquo;.
                  </div>
                ) : (
                  displayedFaqItems.map((item) => {
                    const isOpen = !!openAccordions[item.id];
                    return (
                      <div key={item.id} className="transition-colors">
                        <button
                          type="button"
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full py-4 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[13.5px] sm:text-[14px] font-light text-neutral-900 pr-6">
                            {item.question}
                          </span>
                          <span className="shrink-0 text-neutral-800">
                            {isOpen ? (
                              <Minus className="w-3.5 h-3.5 stroke-[1.25]" />
                            ) : (
                              <Plus className="w-3.5 h-3.5 stroke-[1.25]" />
                            )}
                          </span>
                        </button>

                        {/* Accordion Body */}
                        {isOpen && (
                          <div className="pb-4 pt-1 text-[13px] sm:text-[13.5px] text-neutral-600 font-light leading-relaxed">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        </section>

        {/* Explore Popular Topics Section */}
        <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-10 sm:pt-14 pb-14 sm:pb-16 border-t border-neutral-200">
          <div className="w-full flex items-center justify-between mb-6">
            <h2 className="text-[17px] sm:text-[18px] font-normal text-neutral-900">
              Explore Popular Topics
            </h2>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 180, behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
            >
              <span>BROWSE ALL TOPICS</span>
              <ChevronRight className="w-3 h-3 stroke-[2]" />
            </button>
          </div>

          {/* Desktop 3-Card Grid with .2em gap */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-[0.2em]">
            {POPULAR_TOPICS.map((topic) => (
              <div key={topic.id} className="flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 mb-3">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[15px] font-normal text-neutral-900 mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-[12.5px] text-neutral-600 font-light mb-3">
                    {topic.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory(topic.targetCat);
                    window.scrollTo({ top: 220, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer text-left"
                >
                  <span>{topic.cta}</span>
                  <ChevronRight className="w-3 h-3 stroke-[2]" />
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Carousel View */}
          <div className="lg:hidden">
            <div className="overflow-x-auto no-scrollbar flex gap-4 snap-x snap-mandatory pb-3">
              {POPULAR_TOPICS.map((topic) => (
                <div key={topic.id} className="min-w-[80vw] sm:min-w-[50vw] snap-center">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 mb-3">
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-[15px] font-normal text-neutral-900 mb-1">
                    {topic.title}
                  </h3>
                  <p className="text-[12.5px] text-neutral-600 font-light mb-3">
                    {topic.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(topic.targetCat);
                      window.scrollTo({ top: 180, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    <span>{topic.cta}</span>
                    <ChevronRight className="w-3 h-3 stroke-[2]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Indicators */}
            <div className="flex items-center justify-between pt-4 max-w-[240px] mx-auto text-neutral-400">
              <button
                type="button"
                onClick={() => setPopularCarouselIndex((prev) => Math.max(0, prev - 1))}
                className="p-1 hover:text-neutral-900 cursor-pointer"
                aria-label="Previous topic"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <div className="flex-1 mx-4 h-[1px] bg-neutral-300 relative overflow-hidden">
                <div 
                  className="absolute top-0 bottom-0 bg-neutral-900 transition-all duration-300"
                  style={{
                    left: `${(popularCarouselIndex / (POPULAR_TOPICS.length - 1)) * 66}%`,
                    width: '33%',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => setPopularCarouselIndex((prev) => Math.min(POPULAR_TOPICS.length - 1, prev + 1))}
                className="p-1 hover:text-neutral-900 cursor-pointer"
                aria-label="Next topic"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </section>

        {/* Still Looking For Help? Card Section */}
        <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 py-14 sm:py-20 border-t border-neutral-200">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-[22px] sm:text-[26px] font-normal text-neutral-900">
              Still looking for help?
            </h2>
            <Link
              href="/contact"
              className="w-full md:w-auto px-16 py-3 border border-neutral-900 text-[11px] uppercase tracking-[0.16em] font-medium text-neutral-900 text-center hover:bg-neutral-900 hover:text-white transition-colors duration-200"
            >
              GET IN TOUCH
            </Link>
          </div>
        </section>

        {/* Related Services 2-Card Section with .2em gap */}
        <section className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-6 pb-16 sm:pb-24 border-t border-neutral-200">
          <h2 className="text-[17px] sm:text-[18px] font-normal text-neutral-900 mb-6">
            Related Services
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 lg:gap-[0.2em]">
            
            {/* Card 1: Shopping & Product Advice */}
            <Link
              href="/contact"
              className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex items-end justify-center text-center pb-8 p-6 text-white"
            >
              <Image
                src="/images/client-service/shopping-advice.jpg"
                alt="Shopping & Product Advice"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-[18px] sm:text-[20px] font-normal text-white mb-1.5">
                  Shopping & Product Advice
                </h3>
                <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] font-medium text-white/95 group-hover:text-white transition-colors">
                  EXPLORE THIS SERVICE
                  <ChevronRight className="w-3 h-3 stroke-[2]" />
                </span>
              </div>
            </Link>

            {/* Card 2: Order Management */}
            <Link
              href="/client-service"
              className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex items-end justify-center text-center pb-8 p-6 text-white"
            >
              <Image
                src="/images/client-service/order-management.jpg"
                alt="Order Management"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-[18px] sm:text-[20px] font-normal text-white mb-1.5">
                  Order Management
                </h3>
                <span className="inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.16em] font-medium text-white/95 group-hover:text-white transition-colors">
                  MANAGE ORDERS
                  <ChevronRight className="w-3 h-3 stroke-[2]" />
                </span>
              </div>
            </Link>

          </div>
        </section>
      </main>

      {/* Value Proposition Bar */}
      <ValuePropositionBar />

      {/* Standard Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* Mobile Floating Bar */}
      <MobileFloatingBar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsSignupOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMobileMenuOpen(true)}
        onCloseMenu={() => setIsMobileMenuOpen(false)}
        isMenuOpen={isMobileMenuOpen}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Shared Modals */}
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
    </div>
  );
}
