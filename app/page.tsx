'use client';

import React, { useState } from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CookieBanner } from '@/components/CookieBanner';
import { KnitwearSection } from '@/components/KnitwearSection';
import { ForEveryPathSection } from '@/components/ForEveryPathSection';
import { ChangeInTheAirSection } from '@/components/ChangeInTheAirSection';
import { ThroughDifferentLensSection } from '@/components/ThroughDifferentLensSection';
import { MonclerCollectionsSection } from '@/components/MonclerCollectionsSection';
import { ExclusivelyMonclerSection } from '@/components/ExclusivelyMonclerSection';
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

export default function HomePage() {
  // Cookie banner state: Open on initial page load per specification
  const [isCookieBannerOpen, setIsCookieBannerOpen] = useState(true);

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

  // Quick view product state
  const [quickViewProduct, setQuickViewProduct] = useState<{
    name: string;
    price: string;
    image: string;
  } | null>(null);

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

  const handleAddToCart = (product: {
    name: string;
    price: string;
    image: string;
    size: string;
  }) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.name === product.name && item.size === product.size);
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `item-${Date.now()}`,
          name: product.name,
          price: product.price,
          size: product.size,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

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

  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  return (
    <div className={`min-h-screen bg-white text-neutral-900 ${isHighContrast ? 'high-contrast' : ''}`}>
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar
        onOpenPeaksModal={() => setIsPeaksOpen(true)}
        isHovered={isHeaderHovered}
        onHoverChange={setIsHeaderHovered}
      />

      {/* 2. Floating Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenAccount={() => setIsPeaksOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onSetMobileMenuOpen={setIsMobileMenuOpen}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={1}
        isAnnouncementHovered={isHeaderHovered}
        onHoverChange={setIsHeaderHovered}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        onOpenCountry={() => setIsCountryOpen(true)}
        onOpenPeaks={() => setIsPeaksOpen(true)}
        onOpenSignup={() => setIsSignupOpen(true)}
      />

      <main className="pb-14 lg:pb-0">
        {/* 3. Hero Section: Moncler Collection - Outerwear Essentials */}
        <HeroSection
          onShopWomen={() =>
            setQuickViewProduct({
              name: 'Moncler Collection Hooded Wool Blend Down Jacket',
              price: '£1,900.00',
              image: 'https://placehold.co/700x1050/151618/ffffff.png?text=Outerwear+Essentials',
            })
          }
          onShopMen={() =>
            setQuickViewProduct({
              name: 'Moncler Collection Montgenevre Down Jacket',
              price: '£1,650.00',
              image: 'https://placehold.co/700x1050/151618/ffffff.png?text=Montgenevre+Outerwear',
            })
          }
        />

        {/* 4. Knitwear Section: A New Knit / Knitwear for Her / Knitwear for Him */}
        <KnitwearSection
          onShopWomen={() =>
            setQuickViewProduct({
              name: 'Knitwear for Her - Ribbed Wool Turtleneck & Down Vest',
              price: '£1,150.00',
              image: 'https://placehold.co/900x1100/18181b/ffffff.png?text=Knitwear+for+Her',
            })
          }
          onShopMen={() =>
            setQuickViewProduct({
              name: 'Knitwear for Him - Jacquard Pattern Cardigan & Beanie',
              price: '£1,250.00',
              image: 'https://placehold.co/900x1100/18181b/ffffff.png?text=Knitwear+for+Him',
            })
          }
        />

        {/* 5. Boots Section: For Every Path */}
        <ForEveryPathSection
          onShopWomen={() =>
            setQuickViewProduct({
              name: 'Trailgrip Après High Boots - Technical Leather',
              price: '£790.00',
              image: 'https://placehold.co/1920x1080/2c3033/ffffff.png?text=Trailgrip+High+Boots',
            })
          }
          onShopMen={() =>
            setQuickViewProduct({
              name: 'Trailgrip GTX Mountain Boots',
              price: '£650.00',
              image: 'https://placehold.co/1920x1080/2c3033/ffffff.png?text=Trailgrip+GTX+Boots',
            })
          }
        />

        {/* 6. Product Lookbook Carousel: A Change in the Air */}
        <ChangeInTheAirSection
          onSelectProduct={(product) => setQuickViewProduct(product)}
          onShopCategory={(gender) =>
            setQuickViewProduct({
              name:
                gender === 'women'
                  ? 'Abstraction Hooded Wool Blend Short Down Jacket'
                  : 'Montgenevre Wool Flannel Short Down Jacket',
              price: gender === 'women' ? '£1,900.00' : '£1,650.00',
              image:
                gender === 'women'
                  ? 'https://placehold.co/700x1050/f5f5f5/222222.png?text=Abstraction+Hooded+Down+Jacket'
                  : 'https://placehold.co/700x1050/f3f3f3/1a1a1a.png?text=Montgenevre+Wool+Flannel+Down+Jacket',
            })
          }
        />

        {/* 7. Eyewear Section: Through a Different Lens */}
        <ThroughDifferentLensSection
          onShopHer={() =>
            setQuickViewProduct({
              name: 'Terrabeam Oversized Shield Ski Sunglasses',
              price: '£420.00',
              image: 'https://placehold.co/1920x1080/bcb8af/262626.png?text=Terrabeam+Shield+Sunglasses',
            })
          }
          onShopHim={() =>
            setQuickViewProduct({
              name: 'Monestier Wrap-Around Glacier Goggles',
              price: '£460.00',
              image: 'https://placehold.co/1920x1080/bcb8af/262626.png?text=Monestier+Glacier+Goggles',
            })
          }
        />

        {/* 8. Moncler Collections: Collection, Grenoble, Genius */}
        <MonclerCollectionsSection
          onDiscover={(colId) => {
            const names: Record<string, string> = {
              collection: 'Moncler Collection City Outerwear',
              grenoble: 'Moncler Grenoble High-Altitude Performance Parka',
              genius: 'Moncler Genius Limited Edition Co-Creation',
            };
            setQuickViewProduct({
              name: names[colId] || 'Moncler Collection Item',
              price: '£2,100.00',
              image: `https://placehold.co/800x1000/222222/ffffff.png?text=${encodeURIComponent(
                names[colId] || colId
              )}`,
            });
          }}
        />

        {/* 9. Exclusively Moncler: App, Aftercare, Appointment */}
        <ExclusivelyMonclerSection
          onServiceSelect={(serviceId) => {
            if (serviceId === 'appointment') {
              setIsChatOpen(true);
            } else if (serviceId === 'app') {
              alert('Moncler App available on iOS App Store and Google Play.');
            } else {
              setIsChatOpen(true);
            }
          }}
        />

        {/* 10. Value Propositions Bar */}
        <ValuePropositionBar
          onOpenPeaksModal={() => setIsPeaksOpen(true)}
          onOpenShippingInfo={() =>
            alert('Moncler offers complimentary express shipping and climate-neutral delivery on all orders.')
          }
          onOpenReturnsInfo={() =>
            alert('Enjoy free 20-day returns and exchanges via courier collection or in-store boutique return.')
          }
        />
      </main>

      {/* 11. Footer */}
      <Footer
        onOpenSignup={() => setIsSignupOpen(true)}
        onOpenCookieSettings={() => setIsCookieBannerOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenCountryModal={() => setIsCountryOpen(true)}
        onOpenCorporateInfo={() =>
          alert('Moncler S.p.A. - Share Capital € 54,929,869.40 fully paid up - Milan Monza Brianza Lodi.')
        }
        isHighContrast={isHighContrast}
        onToggleHighContrast={setIsHighContrast}
      />

      {/* 12. Cookie Banner Overlay (Prevents scrolling when active per user specification) */}
      <CookieBanner
        isOpen={isCookieBannerOpen}
        onClose={() => setIsCookieBannerOpen(false)}
        onOpenPrivacyPolicy={() =>
          alert(
            'Moncler Privacy Policy: We respect your privacy and protect personal data under GDPR and applicable data security regulations.'
          )
        }
      />

      {/* 13. Interactive Modals (Search, Cart, Chat, Signup, Peaks, Country, QuickView) */}
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
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 14. Mobile Persistent Floating Bottom Navigation Bar */}
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
