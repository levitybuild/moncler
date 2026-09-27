'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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

const LEGAL_TABS = [
  { id: 'tos', label: 'Terms and Conditions of Use', href: '/tos', active: true },
  { id: 'sales', label: 'Terms and Conditions of Sale', href: '#', active: false },
  { id: 'return', label: 'Return Policy', href: '#', active: false },
  { id: 'cookies', label: 'Cookie Policy', href: '#', active: false },
  { id: 'privacy', label: 'Privacy Policy', href: '#', active: false },
];

export default function TermsOfServicePage() {
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
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isCorporateInfoOpen, setIsCorporateInfoOpen] = useState(false);

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

  const handleOpenCookieSettings = () => {
    setIsCookieSettingsOpen(true);
  };

  const handleOpenCorporateInfo = () => {
    setIsCorporateInfoOpen(true);
  };

  return (
    <div
      className={`min-h-screen font-sans antialiased text-neutral-900 selection:bg-neutral-900 selection:text-white pb-20 md:pb-0 ${
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

      <main className="w-full bg-[#fbfbfb]">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-8 sm:pt-14 pb-16 sm:pb-24">
          
          {/* Header section: LEGAL & Title */}
          <div className="mb-8 sm:mb-12">
            <span className="block text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-neutral-500 font-medium mb-3">
              LEGAL
            </span>
            <h1 className="text-[28px] sm:text-[38px] lg:text-[44px] font-normal tracking-tight text-neutral-900 font-serif leading-[1.15]">
              Terms and Conditions of Use
            </h1>
          </div>

          {/* Mobile Horizontal Sliding Tabs with Fading Edge Gradients */}
          <div className="lg:hidden relative -mx-5 px-5 mb-10">
            {/* Left fade gradient */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#fbfbfb] to-transparent pointer-events-none z-10" />
            
            {/* Scrollable links row */}
            <div className="overflow-x-auto no-scrollbar flex items-center gap-6 sm:gap-8 pb-3 whitespace-nowrap scroll-smooth">
              {LEGAL_TABS.map((tab) => (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`text-[13px] sm:text-[14px] tracking-wide transition-colors shrink-0 ${
                    tab.active
                      ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            {/* Right fade gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#fbfbfb] to-transparent pointer-events-none z-10" />
          </div>

          {/* Grid Layout: Desktop Sidebar Links (Col 1) + Terms Content (Col 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            
            {/* Desktop Left Column Navigation */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4 pt-1">
              <nav aria-label="Legal navigation" className="space-y-3.5">
                {LEGAL_TABS.map((tab) => (
                  <div key={tab.id}>
                    <Link
                      href={tab.href}
                      className={`text-[13px] leading-snug tracking-wide block transition-colors ${
                        tab.active
                          ? 'text-neutral-900 font-medium underline underline-offset-8 decoration-1 decoration-neutral-900'
                          : 'text-neutral-500 hover:text-neutral-900'
                      }`}
                    >
                      {tab.label}
                    </Link>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Terms Body (Col 2) */}
            <div className="lg:col-span-9 w-full text-[13.5px] sm:text-[14.5px] leading-[1.8] text-neutral-800 font-light space-y-6">
              
              {/* Introduction paragraphs */}
              <p className="leading-[1.85]">
                Welcome to our web site (hereinafter, &ldquo;<em>moncler.com</em>&rdquo; or also the &ldquo;Website&rdquo;). These general terms and conditions of use (hereinafter, the &ldquo;Terms of Use&rdquo;) govern the access to and use of moncler.com website. <span className="underline decoration-1 underline-offset-2">The access to and use of this Website, as well as the purchase of products on moncler.com, are based on the assumption that these Terms of Use have been read, understood and accepted by the user.</span>
              </p>

              <p className="leading-[1.85]">
                The Website is managed and maintained by Moncler UK Ltd. (hereinafter &ldquo;Moncler&rdquo; or &ldquo;We&rdquo; or &ldquo;Us&rdquo;), Third Floor, 20 Old Bailey, London EC4M 7AN (United Kingdom), GB974109996.
              </p>

              <p className="leading-[1.85]">
                If you need assistance, visit our <Link href="/client-service" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Client Service</Link> area. There you will find information on orders, shipping, refunds and returning products purchased on the Website, as well as and other general information on the services provided by the Website. Remember that you can always contact Moncler through <Link href="/contact" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Client Service</Link>.
              </p>

              <p className="leading-[1.85]">
                For any other legal information, consult the <Link href="/tos" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">General Terms and Conditions of Sale</Link>, <Link href="/client-service" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Return Policy</Link>, <Link href="/tos" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Privacy Policy</Link> e <Link href="/tos" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Cookie Policy</Link>. Moncler may amend or simply update all or part of these Terms of Use. We may amend these Terms of Use in the following cases:
              </p>

              <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 text-neutral-800">
                <li>developments which are beyond our reasonable control;</li>
                <li>changes in the applicable law;</li>
                <li>changes to the Website that reflects evolution in Moncler&rsquo;s business;</li>
                <li>adaptation to new technologies;</li>
                <li>security issues.</li>
              </ul>

              <p className="leading-[1.85]">
                Any amendment or update of the Terms of Use shall be notified to users in reasonable advance and in a transparent manner, by also specifying the date on which such changes will enter into force. Changes will be published on the Home Page of the Website in the form of a pop-up, which will appear at the first visit to the Website after the implementation of said changes and which the customer shall be required to accept if he/she wishes to continue to use the Website, and could be notified by email to all users who have provided their email address. The changes will only be applicable for the future.
              </p>

              <p className="leading-[1.85]">
                We recommend to visit this section of the Website before accessing and/or using our services and/or before purchasing any product on the Website in order to check the most recent and updated version of the Terms of Use, as changes may affect the use of the services and/or purchase on the Website. In case of failure to agree to all or part of the Terms of Use, please do not use our Website (please also see article 5 &ldquo;Registration and Account&rdquo; for managing any personal account).
              </p>

              <p className="leading-[1.85]">
                Access to and use of the Website, including display of web pages, communication with Us, download of product information and purchases on the Website, are carried out by our users exclusively for personal purposes, which should in no way be connected to any trade, business or professional activity. The user shall be liable for the use of the Website and its contents made by users that is not compliant with these Terms of Use, the laws and/or any applicable regulation in force, without prejudice to Moncler&rsquo;s liability for fraud or gross negligence or for any other liability which cannot be contractually excluded or limited pursuant to applicable laws.
              </p>

              <p className="leading-[1.85]">
                In particular, the user shall be exclusively responsible for providing information or data which is not correct, false or concerning third parties (in the event such third parties have not given their consent), as well as for any improper use of such data or information.
              </p>

              {/* Section 1 */}
              <div className="pt-6 sm:pt-8">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  1. PRIVACY AND COOKIE POLICY
                </h2>
                <p className="leading-[1.85]">
                  We recommend to read our <Link href="/tos" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Privacy Policy</Link> e <Link href="/tos" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">Cookie Policy</Link> which also apply in the event that users access the Website and use the relevant services without making purchases. The Privacy and Cookie Policy will help the user understand how and for what purposes Moncler collects and uses personal data.
                </p>
              </div>

              {/* Section 2 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  2. INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <p className="leading-[1.85]">
                  <strong>Proprietary content.</strong> The Website and all content contained therein, including but not limited to images, pictures, texts, music, sounds, videos and in general audio-visual materials, documents, drawings, figures, menus, web pages, graphics, colours, schemes, tools, fonts, designs, diagrams, layouts, methods, processes, functions and software, including HTML code and other computer codes contained therein (collectively, the &ldquo;Content&rdquo;), is the sole and exclusive property of Moncler and is protected by national and international copyright and other intellectual property laws.
                </p>
                <p className="leading-[1.85]">
                  <strong>Trademarks and Logos.</strong> The Moncler trademark and all other trademarks, trade names, logos, brand names and product names displayed on the Website are the exclusive property of Moncler or of their respective companies (&ldquo;Trademarks&rdquo;). These Terms of Use do not allow the use the Trademarks: the use of the Trademarks in any manner is strictly prohibited.
                </p>
                <p className="leading-[1.85]">
                  The user acknowledges that it is forbidden to copy or reproduce (except where such copying or reproduction is made for non-commercial and personal use), publish, disclose, distribute, provide to the public, re-publish, notify, display, delete, cancel, supplement the content or create derivative works of the Website for any purpose unless the user has been expressly authorised by Us in writing.
                </p>
                <p className="leading-[1.85]">
                  Downloading or copying the Content, where authorized in writing by Moncler, does not imply acquisition by the user of any right, title or interest in the Content and/or the Website.
                </p>
              </div>

              {/* Section 3 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  3. LINKS TO THIRD PARTIES&rsquo; WEBSITES
                </h2>
                <p className="leading-[1.85]">
                  The Website may contain links to other web sites which are in no way connected to Moncler. Moncler does not control or monitor such third-party web sites or their contents. Moncler shall not be held liable for the contents of such sites, including for their accuracy, security or reliability, and/or for the rules adopted by them in respect of, but not limited to, privacy and processing of personal data of the user. Please, pay attention when accessing these web sites through the links provided on moncler.com and carefully read their terms and conditions of use and their privacy policies. Our Terms of Use and Privacy Policy do not apply to the web sites of third parties. Access to any third party content and web sites is at the user&rsquo;s own risk and Moncler shall have no liability to the user for any loss or damage suffered (including but not limited to any loss or damage to the user&rsquo;s computer equipment, hardware or software) arising out of or related to access or use of, or reliance on, any third party content and web sites or caused by or in connection with any purchase of goods or services available on or through any such third party content and web sites.
                </p>
              </div>

              {/* Section 4 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  4. USE OF THE MONCLER WEBSITE
                </h2>
                <p className="leading-[1.85]">
                  The user is permitted to use the Website and any of its Content for personal and non-commercial use only and always in compliance with these Terms of Use. The user may not and may not permit, assist or allow any third party to:
                </p>
                <div className="space-y-3 pl-1 sm:pl-2">
                  <p className="leading-[1.85]">
                    (i) copy, reproduce, publish, send, distribute, perform, upload, post, publicly display, encode, translate, modify or create derivative works from, sell, license or otherwise distribute the Website or any Content, including but not limited to mirroring, framing or linking, to any other computer, server, web site;
                  </p>
                  <p className="leading-[1.85]">
                    (ii) access or use the Website or any Content for any commercial purposes, including any advertising or advertising revenue generation activity on one&rsquo;s own web site;
                  </p>
                  <p className="leading-[1.85]">
                    (iii) use any deep-link, page-scrape, robot, spider or any other automatic or manual processes, to access, acquire, copy or monitor the Website and/or its Content or any portion thereof, or in any way reproduce the structure or presentation of the Website or any Content, or circumvent any copy-protection devices, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Website;
                  </p>
                  <p className="leading-[1.85]">
                    (iv) attempt to access any portion or feature of the Website that the user is not allowed to without authorization, or any other systems or networks connected to the Website or any Moncler&rsquo;s server, by hacking, password mining or any other illegitimate means;
                  </p>
                  <p className="leading-[1.85]">
                    (v) use anyone else&rsquo;s password or account at any time without the express permission and consent of the holder of that password or account;
                  </p>
                  <p className="leading-[1.85]">
                    (vi) probe, scan or test the vulnerability of the Website or any network connected thereto, nor breach the security or authentication measures on the same;
                  </p>
                  <p className="leading-[1.85]">
                    (vii) reverse look-up, trace or seek to trace any information on any other user of or visitor to the Website, or any other customer of the Website, or exploit the Website or any service or information made available or offered by or through the Website, in any way where the purpose is to reveal any personal data, or for any purposes not allowed by these Terms of Use, or solicit the performance of any illegal activity or other activity which infringes the rights of Moncler or of others;
                  </p>
                  <p className="leading-[1.85]">
                    (viii) take any action that imposes an unreasonable or disproportionately large load on the infrastructure of the Website, or any systems or networks connected to the same;
                  </p>
                  <p className="leading-[1.85]">
                    (ix) use any device, software or routine to interfere or attempt to interfere with the proper functioning of the Website or any transaction being conducted on the same, or with any other person&rsquo;s use thereof.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  5. REGISTRATION AND ACCOUNT
                </h2>
                <p className="leading-[1.85]">
                  To access certain services and to make purchases on the Website, registering and opening an account may be necessary (the &ldquo;Account&rdquo;). Please read the Terms of Use of the <button type="button" onClick={() => setIsPeaksOpen(true)} className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75 font-normal cursor-pointer">My Moncler Services</button> for more details on the services accessible by registration and the conditions for registration. If the user creates an Account, the same shall be responsible for maintaining the confidentiality of login information and for controlling access to the Account. The user shall be responsible for all activity occurring on his/her Account unless the user informs Moncler that his/her Account has been used by a third party without his/her consent.
                </p>
                <p className="leading-[1.85]">
                  Moncler disclaims any liability for any loss or damage resulting from failure to comply with the above obligations.
                </p>
                <p className="leading-[1.85]">
                  Instructions to close the Account can be retrieved at the following <Link href="/contact" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">link</Link>.
                </p>
              </div>

              {/* Section 6 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  6. DISCLAIMERS - LIMITATION OF LIABILITY
                </h2>
                <p className="leading-[1.85]">
                  Moncler does not warrant that the Contents of the Website are appropriate or lawful in any Country. In the event that such Contents are deemed to be unlawful or illegal in the Country where the user resides or is domiciled, we invite the same not to access the Website and, where he/she nonetheless chooses to access it, we hereby inform the user that the use of the services provided on the Website shall be at his/her own exclusive risk and responsibility.
                </p>
                <p className="leading-[1.85]">
                  Due to the dynamic nature of the Internet and the Internet connection, Moncler cannot guarantee that the Website will operate continuously, without any interruptions and/or that errors or defects will be corrected. If the user experiences any problem in using our Website, he/she may contact our Client Service at the following <Link href="/contact" className="underline underline-offset-2 decoration-1 text-neutral-900 hover:opacity-75">link</Link>. One of our representatives will assist and help the user to restore his/her access to the Website, as far as possible. At the same time, the user is requested to contact his/her Internet services provider or check that each device for Internet connection and access to content is correctly activated, including the user&rsquo;s Internet browser.
                </p>
                <p className="leading-[1.85]">
                  Moncler shall use its best endeavours to ensure that the Content of the Website is accurate and does not contain any incorrect or out-of-date information, acting with due professional diligence during the whole time the Website is available. However, Moncler disclaims all warranties, express or implied, including any warranty of accuracy, completeness, non-infringement, or fitness for a particular purpose.
                </p>
                <p className="leading-[1.85]">
                  Moncler has also adopted all reasonable technical and organisational security measures to ensure that the Website and the Contents are free from virus, and to protect the integrity of data and electronic communications in order to prevent unauthorised use of or access to data, as well as to prevent risks of dissemination, destruction and loss of data and confidential/non confidential information regarding users of the Website. However, provided Moncler has carried out its activities with a due professional diligence, Moncler shall not be deemed liable to the user or anyone else for any loss and/or damage arising out of use of the Website and/or the Content, including without limitation, liability for:
                </p>
                <div className="space-y-2 pl-1 sm:pl-2">
                  <p className="leading-[1.85]">(a) any loss of or corruption to data;</p>
                  <p className="leading-[1.85]">(b) loss of or damage to the user&rsquo;s computer equipment;</p>
                  <p className="leading-[1.85]">(c) any loss or damage suffered by the user as a result of failure to take reasonable precautions against such loss or damage, such as through the installation of reputable anti-virus software.</p>
                </div>
                <p className="leading-[1.85]">
                  Moncler shall not be held liable for damage that arises from events beyond its reasonable control.
                </p>
                <p className="leading-[1.85]">
                  Nothing in these Terms of Use shall exclude or limit Moncler&rsquo;s liability to the user for fraud or gross negligence or for any other liability which may not be contractually excluded or limited under any mandatory provision of applicable law.
                </p>
              </div>

              {/* Section 7 */}
              <div className="pt-6 sm:pt-8 space-y-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  7. OUR BUSINESS POLICY
                </h2>
                <p className="leading-[1.85]">
                  The remote sale of products through the Website is exclusively reserved to consumers for personal use. &ldquo;Consumer&rdquo; shall mean any natural person who is acting for purposes, which are outside his or her trade, business, craft or profession. If the user is not a consumer, the same is requested not to use our Website to purchase products. Moncler shall be entitled to refuse to process purchase orders and to terminate the accounts of persons other than consumers, as well as not to process any other purchase order which does not comply with the Terms and Conditions of Sale and these Terms and Conditions of Use.
                </p>
              </div>

              {/* Section 8 */}
              <div className="pt-6 sm:pt-8 space-y-4 pb-4">
                <h2 className="text-[16px] sm:text-[18px] font-medium tracking-[0.05em] uppercase text-neutral-900 mb-4">
                  8. GOVERNING LAW AND DISPUTES
                </h2>
                <p className="leading-[1.85]">
                  These General Terms and Conditions of Use are governed by Laws of England and Wales. Any dispute which may arise between Moncler and the user, in a capacity as consumer, in connection with these Terms of Use, shall be subject to the jurisdiction of the Country where the user has his/her habitual place of residence.
                </p>
                <p className="leading-[1.85]">
                  Should the user act within the scope of a business and entrepreneurial activity (and thus not in a capacity as consumer), the exclusive jurisdiction shall be that of the Court of Milan (Italy).
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Value Proposition Strip */}
      <ValuePropositionBar />

      {/* Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={handleOpenCookieSettings}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={handleOpenCorporateInfo}
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* Persistent Mobile Floating Navigation Bar */}
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
