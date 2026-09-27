'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  Search
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
        question: 'How do I find the right size?',
        answer: (
          <div className="space-y-3">
            <p>
              On every product page, you can find a dedicated Size Guide with detailed measurements for chest, waist, and hips in centimeters and inches.
            </p>
            <p>
              You can also contact our Client Advisors via Live Chat, WhatsApp, or Phone for personalized styling and fit recommendations.
            </p>
          </div>
        ),
      },
      {
        id: 'shop-2',
        question: 'Can I cancel or modify my order?',
        answer: (
          <div className="space-y-3">
            <p>
              Due to our fast processing times, once an order is confirmed it enters our logistics flow immediately. If you need to make changes or cancel, please contact Client Service as quickly as possible.
            </p>
            <p>
              If the order has already been dispatched, you may return the items free of charge once received.
            </p>
          </div>
        ),
      },
      {
        id: 'shop-3',
        question: 'Is gift packaging available?',
        answer: (
          <p>
            All Moncler orders are delivered in signature luxury packaging. During checkout, you may also add a complimentary personalized gift message.
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
        question: 'How do Moncler numeric sizes correspond to standard sizing?',
        answer: (
          <div className="space-y-3">
            <p>
              Moncler outerwear generally uses a 00 to 7 numeric scale:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[13.5px]">
              <li>Size 0 = XS / UK 6 / US 2</li>
              <li>Size 1 = S / UK 8 / US 4</li>
              <li>Size 2 = M / UK 10 / US 6</li>
              <li>Size 3 = L / UK 12 / US 8</li>
              <li>Size 4 = XL / UK 14 / US 10</li>
              <li>Size 5 = XXL / UK 16 / US 12</li>
            </ul>
          </div>
        ),
      },
      {
        id: 'size-2',
        question: 'What is the difference between Regular, Slim, and Loose fit?',
        answer: (
          <p>
            Each product page outlines the cut of the garment. Slim fits are tailored closer to the silhouette, Regular fits provide classic comfort with room for light knitwear underneath, while Loose fits feature modern oversized volumes.
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
              We accept all major credit and debit cards (Visa, Mastercard, American Express, Maestro, UnionPay, JCB), as well as Apple Pay, Google Pay, PayPal, Klarna (Pay in 3 / Pay Later), and Moncler Gift Cards.
            </p>
            <p>
              All transactions are encrypted and processed through certified secure payment gateways.
            </p>
          </div>
        ),
      },
      {
        id: 'pay-2',
        question: 'Are payments secure?',
        answer: (
          <p>
            Yes. Every transaction is processed through SSL encryption and 3D Secure verification protocol. Moncler does not store your full card number or CVV code on its servers.
          </p>
        ),
      },
      {
        id: 'pay-3',
        question: 'My order is not being accepted. Why?',
        answer: (
          <div className="space-y-3">
            <p>
              Payment authorization can occasionally be declined by your issuing bank for security checks, incorrect billing address details, or insufficient funds.
            </p>
            <p>
              Please verify that the billing address entered matches the exact address registered with your payment provider, or try an alternative payment method like PayPal or Apple Pay.
            </p>
          </div>
        ),
      },
      {
        id: 'pay-4',
        question: 'Is VAT included in the final price?',
        answer: (
          <div className="space-y-3">
            <p>
              All prices include VAT. At this time we are unable to provide tax refunds for purchases made on <Link href="/" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Moncler.com</Link>.
            </p>
            <p>
              Kindly note that all orders placed online must be related to private purchases. Order invoices can only be issued to private individuals.
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
          <div className="space-y-3">
            <p>
              We offer Complimentary Standard Shipping (2-4 business days) on all orders. Express Delivery (1-2 business days) and Same Day Delivery in select metropolitan areas are available at checkout.
            </p>
            <p>
              All packages are fully insured and require an adult signature upon delivery.
            </p>
          </div>
        ),
      },
      {
        id: 'ship-2',
        question: 'Can I choose Click & Collect in a Moncler Boutique?',
        answer: (
          <p>
            Yes. You can select Pick Up in Boutique at checkout to collect your parcel from your preferred Moncler boutique free of charge. You will receive an email confirmation once your parcel is ready for collection.
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
    image: '/images/client-service/order-management.jpg',
    targetCat: 'shipping',
  },
  {
    id: 'exchanges-topic',
    title: 'Exchanges & Returns',
    description: 'Easy exchanges and returns online and in-store.',
    cta: 'EXPLORE EXCHANGES & RETURNS',
    image: '/images/client-service/boutique-services.jpg',
    targetCat: 'shopping',
  },
  {
    id: 'aftercare-topic',
    title: 'Product Aftercare',
    description: 'Care and support for your Moncler pieces.',
    cta: 'EXPLORE AFTERCARE',
    image: '/images/client-service/aftercare.jpg',
    targetCat: 'shopping',
  },
];

export default function FaqPage() {
  // High contrast state
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Modals & Navigation state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isPeaksOpen, setIsPeaksOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Category State (Default: 'payments' as shown in screenshots)
  const [activeCategory, setActiveCategory] = useState<string>('payments');

  // Search input state for FAQs
  const [searchQuery, setSearchQuery] = useState('');

  // Accordion open/close state: maps item ID to boolean
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'pay-4': true, // Default open matching screenshot
  });

  // Mobile carousel index for Popular Topics
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

  // Filtered FAQ items if search query is typed
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
        isHighContrast ? 'bg-white font-medium text-black' : 'bg-[#fafafa]'
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
        <div className="w-full bg-[#fafafa] border-b border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 pt-6 sm:pt-10 pb-8 sm:pb-12">
            
            {/* Breadcrumb line */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-neutral-500 mb-3">
              <Link href="/" className="hover:text-neutral-900 transition-colors">
                HOME
              </Link>
              <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />
              <Link href="/client-service" className="hover:text-neutral-900 transition-colors">
                CLIENT SERVICE
              </Link>
              <ChevronRight className="w-3 h-3 text-neutral-400 stroke-[1.5]" />
              <span className="text-neutral-900 font-medium">
                FAQ
              </span>
            </nav>

            {/* Category Title & Tagline */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div>
                <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-normal tracking-tight text-neutral-900 font-serif leading-[1.1]">
                  {currentCategoryData.name}
                </h1>
                <p className="text-[13.5px] sm:text-[14.5px] text-neutral-600 font-light mt-2 max-w-xl">
                  {currentCategoryData.tagline}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* How Can We Help? / Search & FAQ Section */}
        <section className="w-full bg-[#fafafa] py-10 sm:py-16">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
            
            {/* Search Input Box */}
            <div className="mb-10 sm:mb-14">
              <h2 className="text-[18px] sm:text-[22px] font-normal tracking-tight text-neutral-900 mb-4">
                How Can We Help?
              </h2>
              <div className="relative max-w-full">
                <input
                  type="text"
                  placeholder="Search FAQs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b border-neutral-300 pb-3.5 pt-1 text-[20px] sm:text-[26px] placeholder-neutral-400 font-serif font-light text-neutral-900 focus:outline-none focus:border-neutral-900 transition-colors pr-10"
                />
                <Search className="absolute right-2 top-2.5 w-5 h-5 text-neutral-400 stroke-[1.5]" />
              </div>
            </div>

            {/* Mobile Category Horizontal Tabs with Clean Underline & Fades */}
            <div className="lg:hidden relative -mx-5 px-5 mb-8">
              <div className="overflow-x-auto no-scrollbar flex items-center gap-6 sm:gap-8 pb-3 whitespace-nowrap scroll-smooth">
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSearchQuery('');
                    }}
                    className={`text-[14px] sm:text-[15px] tracking-wide transition-colors shrink-0 cursor-pointer ${
                      activeCategory === cat.id
                        ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                        : 'text-neutral-500 hover:text-neutral-900 font-light'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Layout: Left Category Tabs + Right Accordion List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              
              {/* Desktop Left Categories Column */}
              <aside className="hidden lg:block lg:col-span-3 space-y-4 pt-1">
                <nav aria-label="FAQ categories" className="space-y-4">
                  {FAQ_DATA.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSearchQuery('');
                      }}
                      className={`text-[14px] tracking-wide block text-left transition-colors cursor-pointer w-full ${
                        activeCategory === cat.id
                          ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-900 font-light'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </nav>
              </aside>

              {/* FAQ Accordion List (Right Column) */}
              <div className="lg:col-span-9 max-w-[880px] divide-y divide-neutral-200 border-t border-b border-neutral-200">
                {displayedFaqItems.length === 0 ? (
                  <div className="py-10 text-neutral-500 font-light text-[14.5px]">
                    No FAQs found matching &ldquo;{searchQuery}&rdquo;. Try another keyword or contact our Client Advisors.
                  </div>
                ) : (
                  displayedFaqItems.map((item) => {
                    const isOpen = !!openAccordions[item.id];
                    return (
                      <div key={item.id} className="py-4 sm:py-5 transition-colors">
                        <button
                          type="button"
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <span className="text-[14px] sm:text-[15.5px] font-light text-neutral-900 group-hover:text-black transition-colors pr-6">
                            {item.question}
                          </span>
                          <span className="shrink-0 text-neutral-700 group-hover:text-black transition-transform duration-200">
                            {isOpen ? (
                              <Minus className="w-4 h-4 stroke-[1.5]" />
                            ) : (
                              <Plus className="w-4 h-4 stroke-[1.5]" />
                            )}
                          </span>
                        </button>

                        {/* Accordion Content */}
                        {isOpen && (
                          <div className="pt-3.5 pb-2 text-[13.5px] sm:text-[14.5px] text-neutral-600 font-light leading-[1.8] animate-in fade-in duration-200">
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
        <section className="w-full bg-[#fafafa] pt-10 sm:pt-16 pb-14 sm:pb-20 border-t border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
            
            <div className="flex items-center justify-between mb-8 sm:mb-12">
              <h2 className="text-[20px] sm:text-[26px] font-normal tracking-tight text-neutral-900 font-serif">
                Explore Popular Topics
              </h2>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 200, behavior: 'smooth' });
                }}
                className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
              >
                <span>BROWSE ALL TOPICS</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Desktop 3-Card Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {POPULAR_TOPICS.map((topic) => (
                <div key={topic.id} className="group flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 mb-4">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-[17px] font-normal text-neutral-900 mb-1.5">
                      {topic.title}
                    </h3>
                    <p className="text-[13px] text-neutral-600 font-light mb-4 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(topic.targetCat);
                      window.scrollTo({ top: 250, behavior: 'smooth' });
                    }}
                    className="group/btn inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer text-left"
                  >
                    <span>{topic.cta}</span>
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile Carousel View matching screenshot with Pagination Bar */}
            <div className="lg:hidden">
              <div className="overflow-x-auto no-scrollbar flex gap-5 snap-x snap-mandatory pb-4">
                {POPULAR_TOPICS.map((topic) => (
                  <div key={topic.id} className="min-w-[82vw] sm:min-w-[50vw] snap-center group">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 mb-4">
                      <Image
                        src={topic.image}
                        alt={topic.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-[16px] font-normal text-neutral-900 mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-[12.5px] text-neutral-600 font-light mb-3 leading-relaxed">
                      {topic.description}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory(topic.targetCat);
                        window.scrollTo({ top: 180, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-neutral-900 font-medium hover:opacity-75 transition-opacity cursor-pointer"
                    >
                      <span>{topic.cta}</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2]" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Carousel Navigation Indicator Strip (Matching Screenshot) */}
              <div className="flex items-center justify-between pt-6 max-w-[280px] mx-auto text-neutral-400">
                <button
                  type="button"
                  onClick={() => setPopularCarouselIndex((prev) => Math.max(0, prev - 1))}
                  className="p-1 hover:text-neutral-900 cursor-pointer"
                  aria-label="Previous topic"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
                </button>
                
                {/* Horizontal progress bar */}
                <div className="flex-1 mx-4 h-[1.5px] bg-neutral-300 relative overflow-hidden">
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

          </div>
        </section>

        {/* Still Looking For Help? Card Section (Matching Screenshot) */}
        <section className="w-full bg-[#fafafa] py-12 sm:py-16 border-t border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <h2 className="text-[24px] sm:text-[32px] font-normal tracking-tight text-neutral-900 font-serif text-center md:text-left">
                Still looking for help?
              </h2>
              <Link
                href="/contact"
                className="w-full md:w-auto px-10 py-3.5 border border-neutral-900 text-[12px] uppercase tracking-[0.18em] font-medium text-neutral-900 text-center hover:bg-neutral-900 hover:text-white transition-colors duration-200"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services 2-Card Banners (Matching Screenshot) */}
        <section className="w-full bg-[#fafafa] pt-8 pb-16 sm:pb-24 border-t border-neutral-200/60">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16">
            <h2 className="text-[22px] sm:text-[28px] font-normal tracking-tight text-neutral-900 font-serif mb-8 sm:mb-12">
              Related Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Card 1: Shopping & Product Advice */}
              <Link
                href="/contact"
                className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex items-center justify-center text-center p-6 text-white"
              >
                <Image
                  src="/images/client-service/shopping-advice.jpg"
                  alt="Shopping and Product Advice Moncler jacket"
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-[20px] sm:text-[24px] font-serif font-normal text-white mb-2">
                    Shopping & Product Advice
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-white/90 group-hover:text-white transition-colors">
                    EXPLORE THIS SERVICE
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>

              {/* Card 2: Order Management */}
              <Link
                href="/client-service#order-management"
                className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-neutral-900 flex items-center justify-center text-center p-6 text-white"
              >
                <Image
                  src="/images/client-service/order-management.jpg"
                  alt="Order Management Moncler package ribbon"
                  fill
                  className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                <div className="relative z-10 flex flex-col items-center">
                  <h3 className="text-[20px] sm:text-[24px] font-serif font-normal text-white mb-2">
                    Order Management
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-white/90 group-hover:text-white transition-colors">
                    MANAGE ORDERS
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>

            </div>
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
