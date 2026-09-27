'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { MonclerLogo } from './MonclerLogo';

interface FooterProps {
  onOpenSignup: () => void;
  onOpenCookieSettings: () => void;
  onOpenChat: () => void;
  onOpenCountryModal: () => void;
  onOpenCorporateInfo: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: (enabled: boolean) => void;
}

export function Footer({
  onOpenSignup,
  onOpenCookieSettings,
  onOpenChat,
  onOpenCountryModal,
  onOpenCorporateInfo,
  isHighContrast,
  onToggleHighContrast,
}: FooterProps) {
  // Mobile accordion states
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <footer id="site-footer" data-site-footer className="w-full bg-black text-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-16">
      <div className="w-full max-w-[1520px] mx-auto">
        {/* Desktop Footer Grid: Exactly matching image.png */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-10 xl:gap-14 items-start">
          {/* Column 1: Keep in touch */}
          <div>
            <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
              Keep in touch
            </h3>
            <p className="text-[13px] text-[#a3a3a3] font-light leading-[1.65] mb-5 max-w-[270px]">
              Subscribe now to be the first to know about our latest collections and future
              releases, discover collaborations and events.
            </p>
            <button
              type="button"
              onClick={onOpenSignup}
              className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.14em] uppercase text-white font-medium hover:text-neutral-300 transition-colors cursor-pointer"
            >
              <span>SIGN UP</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Column 2: Contact us */}
          <div>
            <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
              Contact us
            </h3>
            <ul className="space-y-3 text-[13px] text-[#ffffff] font-light">
              <li>
                <a href="tel:0080010204000" className="hover:text-neutral-300 transition-colors block">
                  Call us 00 800 10204000
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="hover:text-neutral-300 transition-colors text-left cursor-pointer block"
                >
                  Start chat with a Client Advisor
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300 transition-colors block"
                >
                  Contact via WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:clientcare@moncler.com" className="hover:text-neutral-300 transition-colors block">
                  Email Us
                </a>
              </li>
              <li>
                <a href="#store-locator" className="hover:text-neutral-300 transition-colors block">
                  Store locator
                </a>
              </li>
              <li>
                <a href="#appointment" className="hover:text-neutral-300 transition-colors block">
                  Book an appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
              Services
            </h3>
            <ul className="space-y-3 text-[13px] text-[#ffffff] font-light">
              <li>
                <Link href="/client-service" className="hover:text-neutral-300 transition-colors block">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-neutral-300 transition-colors block">
                  FAQS
                </Link>
              </li>
              <li>
                <a href="#order-management" className="hover:text-neutral-300 transition-colors block">
                  Order management
                </a>
              </li>
              <li>
                <a href="#shopping-advice" className="hover:text-neutral-300 transition-colors block">
                  Shopping & product advice
                </a>
              </li>
              <li>
                <a href="#boutique-services" className="hover:text-neutral-300 transition-colors block">
                  Boutique services
                </a>
              </li>
              <li>
                <a href="#product-aftercare" className="hover:text-neutral-300 transition-colors block">
                  Product aftercare
                </a>
              </li>
              <li>
                <a href="#code-verification" className="hover:text-neutral-300 transition-colors block">
                  Product Code Verification
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate & App */}
          <div>
            <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
              Corporate
            </h3>
            <ul className="space-y-3 text-[13px] text-[#ffffff] font-light">
              <li>
                <a href="#brand-info" className="hover:text-neutral-300 transition-colors block">
                  Brand information
                </a>
              </li>
              <li>
                <a href="#investor-relations" className="hover:text-neutral-300 transition-colors block">
                  Investor relations
                </a>
              </li>
              <li>
                <a href="#governance" className="hover:text-neutral-300 transition-colors block">
                  Governance
                </a>
              </li>
              <li>
                <a href="#sustainability" className="hover:text-neutral-300 transition-colors block">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-neutral-300 transition-colors block">
                  Careers
                </a>
              </li>
              <li>
                <a href="#accessibility" className="hover:text-neutral-300 transition-colors block">
                  Accessibility Statement
                </a>
              </li>
            </ul>

            {/* App Sub-block */}
            <div className="mt-12">
              <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
                App
              </h3>
              <ul className="space-y-3 text-[13px] text-[#ffffff] font-light">
                <li>
                  <a href="#ios" className="hover:text-neutral-300 transition-colors block">
                    iOS users
                  </a>
                </li>
                <li>
                  <a href="#android" className="hover:text-neutral-300 transition-colors block">
                    Android users
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 5: Follow & High contrast */}
          <div>
            <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
              Follow
            </h3>
            <ul className="space-y-3 text-[13px] text-[#ffffff] font-light">
              <li>
                <a
                  href="https://instagram.com/moncler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300 transition-colors block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/moncler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300 transition-colors block"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/moncler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300 transition-colors block"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/moncler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-300 transition-colors block"
                >
                  YouTube
                </a>
              </li>
            </ul>

            {/* High contrast Sub-block */}
            <div className="mt-12">
              <h3 className="text-[15px] font-normal text-[#d4d4d4] mb-3.5 tracking-tight">
                High contrast
              </h3>
              <div className="flex items-center gap-4 text-[13px]">
                <button
                  type="button"
                  onClick={() => onToggleHighContrast(true)}
                  className={`transition-colors cursor-pointer ${
                    isHighContrast
                      ? 'text-white underline underline-offset-4 font-normal'
                      : 'text-neutral-400 hover:text-white font-light'
                  }`}
                >
                  On
                </button>
                <button
                  type="button"
                  onClick={() => onToggleHighContrast(false)}
                  className={`transition-colors cursor-pointer ${
                    !isHighContrast
                      ? 'text-white underline underline-offset-4 font-normal'
                      : 'text-neutral-400 hover:text-white font-light'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View: Clean accordions with no unnecessary divider lines */}
        <div className="lg:hidden">
          {/* Keep in Touch */}
          <div className="mb-10">
            <h3 className="text-[15px] font-normal text-white mb-3.5 tracking-tight">
              Keep in touch
            </h3>
            <p className="text-[13px] text-white font-light leading-[1.65] mb-6 max-w-sm">
              Subscribe now to be the first to know about our latest collections and future
              releases, discover collaborations and events.
            </p>
            <button
              type="button"
              onClick={onOpenSignup}
              className="group flex items-center gap-1.5 text-[12px] tracking-[0.16em] uppercase text-white font-semibold hover:text-neutral-300 transition-colors cursor-pointer"
            >
              <span>SIGN UP</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Seamless Accordions (No horizontal divider lines per screenshot) */}
          <div className="space-y-1 mb-10">
            {/* Accordion: Contact us */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('contact')}
                className="w-full flex items-center justify-between py-2.5 text-[15px] font-normal text-white text-left cursor-pointer"
              >
                <span>Contact us</span>
                {openSections['contact'] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-white" />
                )}
              </button>
              {openSections['contact'] && (
                <ul className="pt-1 pb-3 pl-0.5 space-y-2.5 text-[13px] text-neutral-300 font-light">
                  <li>
                    <a href="tel:0080010204000" className="hover:text-white">
                      Call us 00 800 10204000
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={onOpenChat}
                      className="hover:text-white text-left"
                    >
                      Start chat with a Client Advisor
                    </button>
                  </li>
                  <li>
                    <a href="https://wa.me/" className="hover:text-white">
                      Contact via WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="mailto:clientcare@moncler.com" className="hover:text-white">
                      Email Us
                    </a>
                  </li>
                  <li>
                    <a href="#store-locator" className="hover:text-white">
                      Store locator
                    </a>
                  </li>
                  <li>
                    <a href="#appointment" className="hover:text-white">
                      Book an appointment
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Accordion: Services */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('services')}
                className="w-full flex items-center justify-between py-2.5 text-[15px] font-normal text-white text-left cursor-pointer"
              >
                <span>Services</span>
                {openSections['services'] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-white" />
                )}
              </button>
              {openSections['services'] && (
                <ul className="pt-1 pb-3 pl-0.5 space-y-2.5 text-[13px] text-neutral-300 font-light">
                  <li>
                    <Link href="/client-service" className="hover:text-white">
                      All services
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:text-white">
                      FAQS
                    </Link>
                  </li>
                  <li>
                    <a href="#order-management" className="hover:text-white">
                      Order management
                    </a>
                  </li>
                  <li>
                    <a href="#shopping-advice" className="hover:text-white">
                      Shopping & product advice
                    </a>
                  </li>
                  <li>
                    <a href="#boutique-services" className="hover:text-white">
                      Boutique services
                    </a>
                  </li>
                  <li>
                    <a href="#product-aftercare" className="hover:text-white">
                      Product aftercare
                    </a>
                  </li>
                  <li>
                    <a href="#code-verification" className="hover:text-white">
                      Product Code Verification
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Accordion: Corporate */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('corporate')}
                className="w-full flex items-center justify-between py-2.5 text-[15px] font-normal text-white text-left cursor-pointer"
              >
                <span>Corporate</span>
                {openSections['corporate'] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-white" />
                )}
              </button>
              {openSections['corporate'] && (
                <ul className="pt-1 pb-3 pl-0.5 space-y-2.5 text-[13px] text-neutral-300 font-light">
                  <li>
                    <a href="#brand-info" className="hover:text-white">
                      Brand information
                    </a>
                  </li>
                  <li>
                    <a href="#investor-relations" className="hover:text-white">
                      Investor relations
                    </a>
                  </li>
                  <li>
                    <a href="#governance" className="hover:text-white">
                      Governance
                    </a>
                  </li>
                  <li>
                    <a href="#sustainability" className="hover:text-white">
                      Sustainability
                    </a>
                  </li>
                  <li>
                    <a href="#careers" className="hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#accessibility" className="hover:text-white">
                      Accessibility Statement
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Accordion: Follow */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('follow')}
                className="w-full flex items-center justify-between py-2.5 text-[15px] font-normal text-white text-left cursor-pointer"
              >
                <span>Follow</span>
                {openSections['follow'] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-white" />
                )}
              </button>
              {openSections['follow'] && (
                <ul className="pt-1 pb-3 pl-0.5 space-y-2.5 text-[13px] text-neutral-300 font-light">
                  <li>
                    <a href="https://instagram.com/moncler" className="hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/moncler" className="hover:text-white">
                      X
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com/moncler" className="hover:text-white">
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/moncler" className="hover:text-white">
                      YouTube
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* Accordion: App */}
            <div>
              <button
                type="button"
                onClick={() => toggleSection('app')}
                className="w-full flex items-center justify-between py-2.5 text-[15px] font-normal text-white text-left cursor-pointer"
              >
                <span>App</span>
                {openSections['app'] ? (
                  <ChevronUp className="w-4 h-4 stroke-[1.5] text-white" />
                ) : (
                  <ChevronDown className="w-4 h-4 stroke-[1.5] text-white" />
                )}
              </button>
              {openSections['app'] && (
                <ul className="pt-1 pb-3 pl-0.5 space-y-2.5 text-[13px] text-neutral-300 font-light">
                  <li>
                    <a href="#ios" className="hover:text-white">
                      iOS users
                    </a>
                  </li>
                  <li>
                    <a href="#android" className="hover:text-white">
                      Android users
                    </a>
                  </li>
                </ul>
              )}
            </div>

            {/* High Contrast Row */}
            <div className="flex items-center justify-between py-2.5 text-[15px] text-white">
              <span className="font-normal text-white">High contrast</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => onToggleHighContrast(true)}
                  className={`transition-colors cursor-pointer text-[14px] ${
                    isHighContrast ? 'text-white underline underline-offset-4' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  On
                </button>
                <button
                  type="button"
                  onClick={() => onToggleHighContrast(false)}
                  className={`transition-colors cursor-pointer text-[14px] ${
                    !isHighContrast ? 'text-white underline underline-offset-4 font-normal' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: Prominent Moncler Logo on Left, Country Selector with Flag, and Legal Info (No border lines) */}
        <div className="mt-20 sm:mt-28 lg:mt-32">
          {/* Giant Moncler Brand Wordmark (Left-aligned as in screenshot) */}
          <div className="select-none mb-10 sm:mb-12">
            <h2 className="font-serif-luxury text-white text-5xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-[0.06em] font-light leading-none">
              MONCLER
            </h2>
          </div>

          {/* Region / Country Selector with Flag & Legal Links */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-[12px] sm:text-[13px] text-neutral-300 font-light">
            {/* Country Selector with UK Flag */}
            <button
              type="button"
              onClick={onOpenCountryModal}
              className="flex items-center gap-2 text-white font-medium hover:text-neutral-300 transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span className="relative w-[18px] h-[12px] inline-block overflow-hidden rounded-[1px] shrink-0">
                <Image
                  src="https://flagcdn.com/w320/gb.png"
                  alt="United Kingdom Flag"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </span>
              <span>UNITED KINGDOM | ENGLISH</span>
            </button>

            {/* Legal Links (No dividing lines) */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-400">
              <Link href="/tos" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/tos" className="hover:text-white transition-colors">
                Legal Area
              </Link>
              <Link href="/tos" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Cookie Settings
              </button>
              <Link href="/tos" className="hover:text-white transition-colors">
                Accessibility Statement
              </Link>
              <button
                type="button"
                onClick={onOpenCorporateInfo}
                className="hover:text-white cursor-pointer"
              >
                Corporate Info
              </button>
            </div>
          </div>

          {/* Copyright & Disclaimer Line */}
          <div className="mt-6 text-[11px] sm:text-[12px] text-neutral-500 font-light flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p>© Moncler S.P.A. All rights reserved.</p>
            <p>
              This site is protected by reCAPTCHA and Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-neutral-400"
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <Link
                href="/tos"
                className="underline hover:text-neutral-400"
              >
                Terms of Service
              </Link>{' '}
              apply.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
