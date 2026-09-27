'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Minus,
  Phone, 
  MessageSquare, 
  Mail, 
  Info,
  Check,
  Paperclip,
  X
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

export default function ContactPage() {
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

  // Country selector
  const [selectedCountry, setSelectedCountry] = useState('UNITED KINGDOM');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Accordion state for contact channels
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+44',
    phone: '',
    country: 'United Kingdom',
    topic: '',
    message: '',
    acceptedTerms: false,
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const toggleAccordion = (name: string) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setAttachedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      return;
    }
    setIsSubmitted(true);
  };

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

      {/* 2. Main Content - NO MAX-WIDTH, ONLY PADDING */}
      <main className="w-full pt-6 md:pt-10 pb-20">
        {/* Breadcrumbs */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pb-4">
          <nav className="flex items-center space-x-2 text-[11px] md:text-xs tracking-[0.18em] uppercase text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
            <Link href="/client-service" className="hover:text-black transition-colors">
              CLIENT SERVICE
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[1.5]" />
            <span className="text-black font-medium">CONTACT US</span>
          </nav>
        </div>

        {/* Page Title */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pt-2 pb-8 md:pb-12 border-b border-neutral-100">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900">
            Contact Us
          </h1>
        </div>

        {/* How can we help section */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 py-10 md:py-14 bg-neutral-50/60 border-b border-neutral-200">
          <h2 className="text-xl md:text-2xl font-light tracking-tight text-neutral-900 mb-2">
            How can we help?
          </h2>
          <p className="text-sm md:text-base text-neutral-600 font-light mb-8">
            We are ready to assist with any queries you have.
          </p>

          {/* Contact details for dropdown */}
          <div className="relative mb-8">
            <span className="text-xs md:text-sm text-neutral-500 mr-2 font-light">Contact details for</span>
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

          {/* 1. Mobile View: Accordion style matching Screenshot 1 */}
          <div className="block md:hidden space-y-3">
            {/* Card 1: Start a Live Chat */}
            <div className="bg-white border border-neutral-200 shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('chat')}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-sm font-normal tracking-wide text-neutral-900">
                  Start a Live Chat
                </span>
                {openAccordion === 'chat' ? (
                  <span className="text-base font-light text-neutral-800 leading-none">―</span>
                ) : (
                  <Plus className="w-4 h-4 text-neutral-800 stroke-[1.5]" />
                )}
              </button>

              {openAccordion === 'chat' && (
                <div className="px-5 pb-5 pt-1 space-y-3 text-xs text-neutral-600 font-light border-t border-neutral-100/70">
                  <div className="flex items-center gap-1.5 pt-2 text-neutral-500">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Offline</span>
                  </div>
                  <div className="space-y-0.5 leading-relaxed text-neutral-700">
                    <p>Monday - Friday</p>
                    <p>09:00 AM - 06:00 PM</p>
                    <p className="uppercase text-[11px] text-neutral-500 tracking-wider">EUROPE/LONDON</p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-black hover:opacity-70 transition-opacity"
                    >
                      <span>LIVE CHAT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Card 2: Chat on Whatsapp */}
            <div className="bg-white border border-neutral-200 shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('whatsapp')}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-sm font-normal tracking-wide text-neutral-900">
                  Chat on Whatsapp
                </span>
                {openAccordion === 'whatsapp' ? (
                  <span className="text-base font-light text-neutral-800 leading-none">―</span>
                ) : (
                  <Plus className="w-4 h-4 text-neutral-800 stroke-[1.5]" />
                )}
              </button>

              {openAccordion === 'whatsapp' && (
                <div className="px-5 pb-5 pt-1 space-y-3 text-xs text-neutral-600 font-light border-t border-neutral-100/70">
                  <div className="flex items-center gap-1.5 pt-2 text-neutral-500">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Offline</span>
                  </div>
                  <div className="space-y-0.5 leading-relaxed text-neutral-700">
                    <p>Monday - Friday:</p>
                    <p>09:00 AM-06:00 PM</p>
                    <p className="uppercase text-[11px] text-neutral-500 tracking-wider">EUROPE/LONDON</p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/448001020400"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-black hover:opacity-70 transition-opacity"
                    >
                      <span>WHATSAPP</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Card 3: Call Us */}
            <div className="bg-white border border-neutral-200 shadow-xs">
              <button
                type="button"
                onClick={() => toggleAccordion('call')}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-sm font-normal tracking-wide text-neutral-900">
                  Call Us
                </span>
                {openAccordion === 'call' ? (
                  <span className="text-base font-light text-neutral-800 leading-none">―</span>
                ) : (
                  <Plus className="w-4 h-4 text-neutral-800 stroke-[1.5]" />
                )}
              </button>

              {openAccordion === 'call' && (
                <div className="px-5 pb-5 pt-1 space-y-3 text-xs text-neutral-600 font-light border-t border-neutral-100/70">
                  <div className="flex items-center gap-1.5 pt-2 text-neutral-500">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>Offline</span>
                  </div>
                  <div className="space-y-0.5 leading-relaxed text-neutral-700">
                    <p>Monday - Friday:</p>
                    <p>09:00 AM-06:00 PM</p>
                    <p className="uppercase text-[11px] text-neutral-500 tracking-wider">EUROPE/LONDON</p>
                  </div>
                  <div className="pt-2">
                    <a
                      href="tel:0080010204000"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-black hover:opacity-70 transition-opacity"
                    >
                      <span>00 800 10204000</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Desktop View: Open by default without additional clicks */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {/* Live Chat Card */}
            <div className="bg-white border border-neutral-200 p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-base font-normal tracking-wide text-neutral-900">
                  Start a Live Chat
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>Offline</span>
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed font-light space-y-0.5">
                  <p>Monday - Friday</p>
                  <p>09:00 AM - 06:00 PM</p>
                  <p className="uppercase text-[11px] text-neutral-400 tracking-wider">EUROPE/LONDON</p>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => setIsChatOpen(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity"
                >
                  <span>LIVE CHAT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white border border-neutral-200 p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-base font-normal tracking-wide text-neutral-900">
                  Chat on Whatsapp
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>Offline</span>
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed font-light space-y-0.5">
                  <p>Monday - Friday:</p>
                  <p>09:00 AM-06:00 PM</p>
                  <p className="uppercase text-[11px] text-neutral-400 tracking-wider">EUROPE/LONDON</p>
                </div>
              </div>
              <div className="pt-6">
                <a
                  href="https://wa.me/448001020400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity"
                >
                  <span>WHATSAPP</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="bg-white border border-neutral-200 p-6 flex flex-col justify-between h-full">
              <div className="space-y-4">
                <h3 className="text-base font-normal tracking-wide text-neutral-900">
                  Call Us
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  <span>Offline</span>
                </div>
                <div className="text-xs text-neutral-600 leading-relaxed font-light space-y-0.5">
                  <p>Monday - Friday:</p>
                  <p>09:00 AM-06:00 PM</p>
                  <p className="uppercase text-[11px] text-neutral-400 tracking-wider">EUROPE/LONDON</p>
                </div>
              </div>
              <div className="pt-6">
                <a
                  href="tel:0080010204000"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-black hover:opacity-70 transition-opacity"
                >
                  <span>00 800 10204000</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* EMAIL US Form Section (matching Screenshot 2) */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 py-12 md:py-20">
          <div className="w-full">
            <h2 className="text-xl md:text-2xl font-light tracking-[0.18em] uppercase text-neutral-900 mb-4">
              EMAIL US
            </h2>
            <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed mb-10 max-w-3xl">
              Our online Client Advisors will be happy to answer your questions. They will be delighted to provide more information, styling tips and assist you in placing your order.
            </p>

            {isSubmitted ? (
              <div className="p-8 md:p-12 border border-black bg-neutral-50 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-normal text-neutral-900">
                  Thank You, {formData.firstName}
                </h3>
                <p className="text-sm text-neutral-600 max-w-xl mx-auto">
                  Your message has been received. One of our dedicated Client Advisors will respond to <span className="font-semibold text-black">{formData.email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-block text-xs font-semibold tracking-[0.2em] uppercase underline hover:opacity-70"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Row 1: Title & First Name */}
                <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[130px_1fr] gap-4 sm:gap-8 items-end">
                  {/* Title */}
                  <div className="border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                    <label className="block text-xs text-neutral-500 font-light mb-1">
                      Title
                    </label>
                    <div className="relative">
                      <select
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none appearance-none cursor-pointer pr-5 py-0.5"
                      >
                        <option value="">Select</option>
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Mx">Mx.</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="First Name*"
                      className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none py-0.5"
                    />
                  </div>
                </div>

                {/* Row 2: Last Name */}
                <div className="w-full border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Last Name*"
                    className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none py-0.5"
                  />
                </div>

                {/* Row 3: Email Address */}
                <div className="w-full border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email address*"
                    className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none py-0.5"
                  />
                </div>

                {/* Row 4: Phone Number */}
                <div className="w-full space-y-1">
                  <label className="block text-xs text-neutral-500 font-light">
                    Phone number*
                  </label>
                  <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[110px_1fr] gap-4 sm:gap-8 items-end">
                    <div className="relative border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                      <select
                        value={formData.phoneCode}
                        onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none appearance-none cursor-pointer pr-5 py-0.5"
                      >
                        <option value="+44">+44</option>
                        <option value="+1">+1</option>
                        <option value="+33">+33</option>
                        <option value="+39">+39</option>
                        <option value="+49">+49</option>
                        <option value="+81">+81</option>
                        <option value="+971">+971</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    <div className="border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone number"
                        className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none py-0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 5: Country/region */}
                <div className="w-full border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                  <label className="block text-xs text-neutral-500 font-light mb-1">
                    Country/region*
                  </label>
                  <div className="relative">
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none appearance-none cursor-pointer pr-6 py-0.5"
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="France">France</option>
                      <option value="Italy">Italy</option>
                      <option value="Germany">Germany</option>
                      <option value="Japan">Japan</option>
                      <option value="Switzerland">Switzerland</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 6: Topic */}
                <div className="w-full border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                  <label className="block text-xs text-neutral-500 font-light mb-1">
                    Topic*
                  </label>
                  <div className="relative">
                    <select
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none appearance-none cursor-pointer pr-6 py-0.5"
                    >
                      <option value="">Select</option>
                      <option value="orders">Orders & Delivery</option>
                      <option value="product">Product Information & Sizing</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="aftercare">Aftercare & Repairs</option>
                      <option value="boutiques">Boutiques & Appointments</option>
                      <option value="authenticity">Authenticity & Verification</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 7: Message */}
                <div className="w-full border-b border-neutral-300 focus-within:border-black transition-colors pb-1">
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Message*"
                    className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none resize-y py-0.5"
                  />
                </div>

                {/* Row 8: Add picture button (matching Screenshot 2) */}
                <div className="w-full">
                  <label className="w-full flex items-center justify-between p-3.5 bg-neutral-100 hover:bg-neutral-200/70 cursor-pointer transition-colors border border-transparent">
                    <div className="flex items-center gap-3">
                      <Plus className="w-4 h-4 text-neutral-800 stroke-[1.5]" />
                      <span className="text-xs md:text-sm font-normal text-neutral-900">
                        Add picture
                      </span>
                    </div>
                    <div className="flex items-center text-neutral-400">
                      <Info className="w-4 h-4" />
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Uploaded files preview list */}
                  {attachedFiles.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {attachedFiles.map((file, index) => (
                        <div key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-200/70 text-xs text-neutral-800">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-neutral-500 hover:text-black ml-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row 9: Terms and Conditions Checkbox (matching Screenshot 2) */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    checked={formData.acceptedTerms}
                    onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded-none border-neutral-400 text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
                  />
                  <label htmlFor="terms" className="text-xs md:text-sm text-neutral-700 leading-relaxed cursor-pointer font-light">
                    I confirm that I accept the{' '}
                    <Link href="/legal" className="underline hover:text-black font-normal">
                      Conditions of Use
                    </Link>{' '}
                    and have read and understood the{' '}
                    <Link href="/privacy" className="underline hover:text-black font-normal">
                      Privacy and Cookie Policy.*
                    </Link>
                  </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-black text-white text-xs md:text-sm font-semibold tracking-[0.25em] uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Related Services Section */}
        <div className="w-full px-5 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 border-t border-neutral-200">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-neutral-900 mb-10">
            Related Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Card 1: Shopping & Product Advice */}
            <div className="relative aspect-[4/3] md:aspect-[16/11] bg-neutral-900 overflow-hidden group">
              <Image
                src="/images/client-service/shopping-advice.jpg"
                alt="Shopping & Product Advice"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-center text-white space-y-3">
                <h3 className="text-lg md:text-2xl font-normal tracking-wide">
                  Shopping & Product Advice
                </h3>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase hover:underline"
                >
                  <span>EXPLORE THIS SERVICE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Order Management */}
            <div className="relative aspect-[4/3] md:aspect-[16/11] bg-neutral-900 overflow-hidden group">
              <Image
                src="/images/client-service/order-management.jpg"
                alt="Order Management"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-center text-white space-y-3">
                <h3 className="text-lg md:text-2xl font-normal tracking-wide">
                  Order Management
                </h3>
                <Link
                  href="/client-service#order-management"
                  className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase hover:underline"
                >
                  <span>MANAGE ORDERS</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Value Proposition Bar */}
      <ValuePropositionBar />

      {/* 4. Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => {}}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() => {}}
        isHighContrast={isHighContrast}
        onToggleHighContrast={(enabled) => setIsHighContrast(enabled)}
      />

      {/* 5. Modals & Drawers */}
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

      {/* 6. Mobile Persistent Floating Bottom Navigation Bar */}
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
