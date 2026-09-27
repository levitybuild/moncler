'use client';

import React, { useState } from 'react';
import { X, Search, Check, ShoppingBag, Send } from 'lucide-react';
import Image from 'next/image';

interface ModalsProps {
  // Search
  isSearchOpen: boolean;
  onCloseSearch: () => void;
  // Cart
  isCartOpen: boolean;
  onCloseCart: () => void;
  cartItems: Array<{ id: string; name: string; price: string; size: string; quantity: number; image: string }>;
  onUpdateCartQuantity: (id: string, delta: number) => void;
  onRemoveCartItem: (id: string) => void;
  // Newsletter Signup
  isSignupOpen: boolean;
  onCloseSignup: () => void;
  // Moncler Peaks
  isPeaksOpen: boolean;
  onClosePeaks: () => void;
  // Client Advisor Chat
  isChatOpen: boolean;
  onCloseChat: () => void;
  // Country Selector
  isCountryOpen: boolean;
  onCloseCountry: () => void;
  // Product Quick View
  quickViewProduct: { name: string; price: string; image: string } | null;
  onCloseQuickView: () => void;
  onAddToCart: (product: { name: string; price: string; image: string; size: string }) => void;
}

export function Modals({
  isSearchOpen,
  onCloseSearch,
  isCartOpen,
  onCloseCart,
  cartItems,
  onUpdateCartQuantity,
  onRemoveCartItem,
  isSignupOpen,
  onCloseSignup,
  isPeaksOpen,
  onClosePeaks,
  isChatOpen,
  onCloseChat,
  isCountryOpen,
  onCloseCountry,
  quickViewProduct,
  onCloseQuickView,
  onAddToCart,
}: ModalsProps) {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  // Quick view size
  const [selectedSize, setSelectedSize] = useState('2');
  // Newsletter state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  // Chat state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'advisor' | 'user'; text: string }>>([
    {
      sender: 'advisor',
      text: 'Good day. Welcome to Moncler Client Services. How may I assist your wardrobe selection today?',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Handle send chat
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'advisor',
          text: `Thank you for your inquiry regarding "${userMsg}". A dedicated client stylist is reviewing the collection availability and sizing guidance for you.`,
        },
      ]);
    }, 800);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail) return;
    setSignupSuccess(true);
    setTimeout(() => {
      setSignupSuccess(false);
      onCloseSignup();
    }, 1800);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return acc + numeric * item.quantity;
    }, 0);
  };

  return (
    <>
      {/* 1. SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="max-w-5xl w-full mx-auto p-6 sm:p-8 flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                Search Moncler
              </span>
              <button
                type="button"
                onClick={onCloseSearch}
                className="p-2 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <div className="pt-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jackets, knitwear, footwear..."
                  autoFocus
                  className="w-full text-xl sm:text-3xl font-light text-neutral-900 border-b border-black pb-3 outline-none placeholder:text-neutral-300"
                />
                <Search className="absolute right-2 bottom-4 w-6 h-6 text-neutral-400 stroke-[1.5]" />
              </div>

              <div className="mt-8">
                <p className="text-[11px] uppercase tracking-wider text-neutral-400 mb-4 font-medium">
                  Trending Searches
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Down Jackets', 'Grenoble Skiwear', 'Wool Knitwear', 'Trailgrip Boots', 'Genius Collection', 'Eyewear'].map(
                    (term) => (
                      <button
                        key={term}
                        type="button"
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-neutral-100 hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CART / SHOPPING BAG DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseCart} />
          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                <h3 className="text-xs uppercase tracking-widest font-semibold">
                  Shopping Bag ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
                </h3>
              </div>
              <button
                type="button"
                onClick={onCloseCart}
                className="p-1.5 text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-sm font-light text-neutral-500 mb-4">
                    Your shopping bag is currently empty.
                  </p>
                  <button
                    type="button"
                    onClick={onCloseCart}
                    className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-neutral-800"
                  >
                    Discover Essentials
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 pb-6 border-b border-neutral-100">
                    <div className="relative w-20 h-24 bg-neutral-100 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <h4 className="font-light text-neutral-900 leading-snug">{item.name}</h4>
                      <p className="text-neutral-500 mt-1">Size: {item.size}</p>
                      <p className="font-medium text-neutral-900 mt-1">{item.price}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.id, -1)}
                            className="px-2 py-0.5 hover:bg-neutral-100"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQuantity(item.id, 1)}
                            className="px-2 py-0.5 hover:bg-neutral-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveCartItem(item.id)}
                          className="text-[11px] text-neutral-400 hover:text-black underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-neutral-200 bg-neutral-50 space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-500">Complimentary Shipping</span>
                  <span className="font-medium text-neutral-900">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-2 border-t border-neutral-200">
                  <span>Subtotal</span>
                  <span>£{calculateSubtotal().toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Proceeding to Moncler Secure Checkout.')}
                  className="w-full py-4 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PRODUCT QUICK VIEW / DETAILS MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseQuickView} />
          <div className="relative z-10 max-w-2xl w-full bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={onCloseQuickView}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-neutral-900 space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-semibold">
                  Moncler Collection
                </p>
                <h3 className="text-lg sm:text-xl font-light leading-snug">{quickViewProduct.name}</h3>
                <p className="text-base font-medium">{quickViewProduct.price}</p>
                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  Crafted from water-repellent wool blend with high-fill direct down injection. Featuring
                  detachable hood, tonal branding, and storm cuff closures.
                </p>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-neutral-500 mb-2 font-medium">
                    Select Size
                  </p>
                  <div className="flex gap-2">
                    {['0', '1', '2', '3', '4'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs border transition-colors cursor-pointer ${
                          selectedSize === size
                            ? 'border-black bg-black text-white font-semibold'
                            : 'border-neutral-200 hover:border-black text-neutral-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart({
                      name: quickViewProduct.name,
                      price: quickViewProduct.price,
                      image: quickViewProduct.image,
                      size: selectedSize,
                    });
                    onCloseQuickView();
                  }}
                  className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MONCLER PEAKS MEMBERSHIP MODAL */}
      {isPeaksOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onClosePeaks} />
          <div className="relative z-10 max-w-lg w-full bg-white text-neutral-900 p-8 shadow-2xl">
            <button
              type="button"
              onClick={onClosePeaks}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
            <div className="text-center mb-6">
              <span className="font-brand text-2xl font-bold tracking-[0.2em] block mb-2">
                MONCLER PEAKS
              </span>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                A world of extraordinary privilege
              </p>
            </div>
            <div className="space-y-4 text-xs font-light text-neutral-700 leading-relaxed mb-6">
              <div className="p-3 bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Priority access to new seasonal collections and limited collaborations.</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Complimentary tailoring and bespoke garment aftercare at global boutiques.</span>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                <Check className="w-4 h-4 text-black shrink-0 mt-0.5" />
                <span>Dedicated private appointments with senior Moncler Client Stylists.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClosePeaks}
              className="w-full py-3.5 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
            >
              Join Moncler Peaks Now
            </button>
          </div>
        </div>
      )}

      {/* 5. NEWSLETTER SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={onCloseSignup} />
          <div className="relative z-10 max-w-md w-full bg-white text-neutral-900 p-8 shadow-2xl">
            <button
              type="button"
              onClick={onCloseSignup}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
            <h3 className="text-xl font-light tracking-tight mb-2">Keep in Touch</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed mb-6">
              Subscribe to receive exclusive previews of upcoming drops, private fashion shows, and
              collaborations from Moncler Genius.
            </p>
            {signupSuccess ? (
              <div className="p-4 bg-neutral-100 text-neutral-900 text-xs font-medium text-center">
                Thank you. You have been registered to receive Moncler communications.
              </div>
            ) : (
              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-neutral-300 text-xs text-neutral-900 outline-none focus:border-black"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. CLIENT ADVISOR LIVE CHAT MODAL */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm w-[92vw] sm:w-[380px] bg-white text-neutral-900 shadow-2xl border border-neutral-200 flex flex-col h-[480px]">
          <div className="p-4 bg-black text-white flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest font-semibold">Client Advisor</p>
              <span className="text-[10px] text-neutral-400">Available · Moncler Concierge</span>
            </div>
            <button
              type="button"
              onClick={onCloseChat}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} className="p-3 border-t border-neutral-200 flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about sizing, stock, or styling..."
              className="flex-1 px-3 py-2 text-xs border border-neutral-200 outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-black text-white text-xs hover:bg-neutral-800"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 7. COUNTRY SELECTOR MODAL */}
      {isCountryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseCountry} />
          <div className="relative z-10 max-w-md w-full bg-white p-6 sm:p-8 text-neutral-900 shadow-2xl">
            <button
              type="button"
              onClick={onCloseCountry}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
            <h3 className="text-lg font-light tracking-tight mb-4">Select Country & Language</h3>
            <div className="space-y-2 text-xs">
              {[
                { name: 'United Kingdom | English (GBP)', active: true },
                { name: 'United States | English (USD)', active: false },
                { name: 'France | Français (EUR)', active: false },
                { name: 'Italy | Italiano (EUR)', active: false },
                { name: 'Germany | Deutsch (EUR)', active: false },
                { name: 'Japan | 日本語 (JPY)', active: false },
              ].map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={onCloseCountry}
                  className={`w-full text-left p-3 border transition-colors cursor-pointer flex justify-between items-center ${
                    loc.active
                      ? 'border-black bg-neutral-50 font-medium'
                      : 'border-neutral-200 hover:border-black'
                  }`}
                >
                  <span>{loc.name}</span>
                  {loc.active && <Check className="w-4 h-4 text-black" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
