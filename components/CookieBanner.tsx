'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

interface CookieBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export function CookieBanner({ isOpen, onClose, onOpenPrivacyPolicy }: CookieBannerProps) {
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [cookieChoices, setCookieChoices] = useState({
    technical: true, // always required
    analytics: true,
    profiling: true,
    social: true,
  });

  // Lock scrolling when banner or preferences modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinueWithoutAccepting = () => {
    setCookieChoices({
      technical: true,
      analytics: false,
      profiling: false,
      social: false,
    });
    onClose();
  };

  const handleAcceptAll = () => {
    setCookieChoices({
      technical: true,
      analytics: true,
      profiling: true,
      social: true,
    });
    onClose();
  };

  const handleSavePreferences = () => {
    setShowPreferencesModal(false);
    onClose();
  };

  return (
    <>
      {/* Dimmed backdrop ensuring scroll restriction and visual focus */}
      <div 
        className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[1px] transition-opacity"
        aria-hidden="true"
      />

      {/* Main Cookie Banner at the bottom of the page - High z-index above bottom nav */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-heading"
        className="fixed bottom-0 left-0 right-0 z-[100] bg-white text-neutral-900 border-t border-neutral-200 shadow-2xl p-4 sm:p-7 lg:p-8 max-h-[85vh] overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top row: Continue without accepting */}
          <div className="flex justify-end mb-1.5 sm:mb-3">
            <button
              type="button"
              onClick={handleContinueWithoutAccepting}
              className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase underline underline-offset-4 text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              CONTINUE WITHOUT ACCEPTING
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between gap-4 sm:gap-6 lg:gap-8">
            {/* Title & Explanatory Text */}
            <div className="w-full md:w-1/2 lg:w-1/2">
              <h2
                id="cookie-heading"
                className="text-lg sm:text-2xl font-light tracking-tight text-neutral-900 mb-2 sm:mb-3"
              >
                Cookie Settings
              </h2>
              <div className="text-[10px] sm:text-[12px] leading-[1.35] sm:leading-relaxed text-neutral-700 font-normal">
                <p className="text-[10px] sm:text-[12px]">
                  This website — www.moncler.com — uses both first- and third-party cookies and
                  tracking technologies, and may, with the user&apos;s consent, use marketing and
                  profiling cookies, including of third parties, in order to: personalise the
                  sending of information and advertising communications reflecting the interests
                  expressed by the user while using and browsing the Internet; analyse and monitor
                  user behaviour; allow the user to communicate and interact via social networks.
                  By clicking on the &apos;CONTINUE WITHOUT ACCEPTING&apos; button, the user does
                  not consent to the use of cookies requiring consent, maintaining the default
                  settings (only technical cookies active). By clicking instead on the &apos;ACCEPT
                  ALL&apos; button, the user consents to the use of all non-technical cookies,
                  including marketing, profiling and social cookies. Consent is optional and can be
                  withdrawn at any time. If the user wishes to manage their preferences, they can
                  click on the &apos;PERSONALISE COOKIE CHOICES&apos; button. To learn more about
                  the cookies we use, see the{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacyPolicy}
                    className="underline underline-offset-2 text-neutral-900 font-medium hover:text-neutral-600 cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </div>
            </div>

            {/* Desktop & Mobile Buttons - positioned at the bottom of the section */}
            <div className="flex flex-col sm:flex-row items-stretch md:items-end justify-end gap-2.5 sm:gap-3 self-end w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-5 lg:px-8 py-2.5 sm:py-3.5 bg-black text-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors text-center cursor-pointer rounded-none whitespace-nowrap"
              >
                ACCEPT ALL
              </button>

              <button
                type="button"
                onClick={() => setShowPreferencesModal(true)}
                className="w-full sm:w-auto px-4 lg:px-6 py-2.5 sm:py-3.5 bg-black text-white text-[10px] sm:text-xs font-semibold tracking-widest uppercase hover:bg-neutral-800 transition-colors text-center cursor-pointer rounded-none whitespace-nowrap"
              >
                PERSONALISE COOKIE CHOICES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Preferences Modal (When Personalise Cookie Choices is clicked) */}
      {showPreferencesModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreferencesModal(false)}
          />
          <div className="relative z-10 w-full max-w-xl bg-white p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <h3 className="text-lg sm:text-xl font-light tracking-tight">
                Personalise Cookie Preferences
              </h3>
              <button
                type="button"
                onClick={() => setShowPreferencesModal(false)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-xs text-neutral-700">
              <div className="p-4 bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Technical & Necessary Cookies
                  </h4>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                    Always Active
                  </span>
                </div>
                <p className="mt-1 text-neutral-600 leading-relaxed">
                  Required for browsing the site and utilizing essential shopping cart, secure authentication, and payment capabilities.
                </p>
              </div>

              <div className="p-4 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Analytics & Measurement Cookies
                  </h4>
                  <input
                    type="checkbox"
                    checked={cookieChoices.analytics}
                    onChange={(e) =>
                      setCookieChoices({ ...cookieChoices, analytics: e.target.checked })
                    }
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-neutral-600 leading-relaxed">
                  Allow us to aggregate anonymous statistical data regarding store traffic and visitor navigation paths to enhance experience.
                </p>
              </div>

              <div className="p-4 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Marketing & Profiling Cookies
                  </h4>
                  <input
                    type="checkbox"
                    checked={cookieChoices.profiling}
                    onChange={(e) =>
                      setCookieChoices({ ...cookieChoices, profiling: e.target.checked })
                    }
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-neutral-600 leading-relaxed">
                  Used to curate tailored product recommendations and advertisements matching your specific style preferences.
                </p>
              </div>

              <div className="p-4 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-neutral-900 uppercase tracking-wider text-[11px]">
                    Social Media Cookies
                  </h4>
                  <input
                    type="checkbox"
                    checked={cookieChoices.social}
                    onChange={(e) =>
                      setCookieChoices({ ...cookieChoices, social: e.target.checked })
                    }
                    className="w-4 h-4 accent-black cursor-pointer"
                  />
                </div>
                <p className="mt-1 text-neutral-600 leading-relaxed">
                  Enable content sharing across social media platforms like Instagram, X, and YouTube directly from product pages.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={handleContinueWithoutAccepting}
                className="px-5 py-2.5 border border-neutral-300 text-[11px] font-semibold uppercase tracking-wider hover:bg-neutral-100 transition-colors"
              >
                Reject Non-Essential
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="px-6 py-2.5 bg-black text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
