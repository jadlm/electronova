'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Menu, X, PhoneCall, Building2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { SearchBar } from './SearchBar';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';
import { categories } from '@/data/categories';

export function Header() {
  const { state, openCart } = useCart();
  const { totalFavorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col shrink-0">
              <span className="text-2xl font-black tracking-tight text-[#1a1a2e] flex items-center">
                MAISON<span className="text-[#e8a838] ml-1.5">NOVA</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-widest text-gray-500 -mt-1">
                Électro & High-Tech Maroc
              </span>
            </Link>

            {/* Desktop search bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <SearchBar />
            </div>

            {/* Header actions: Showroom, Wishlist, Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Showroom shortcut */}
              <Link
                href="/showroom"
                className="hidden lg:flex items-center gap-2 text-xs font-medium text-gray-700 hover:text-[#e8a838] p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Building2 className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <span className="block text-[10px] text-gray-400 uppercase">Visiter</span>
                  <span className="font-semibold text-gray-900">Showroom</span>
                </div>
              </Link>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="relative p-2.5 text-gray-700 hover:text-[#e8a838] hover:bg-gray-50 rounded-xl transition-colors"
                aria-label="Mes favoris"
              >
                <Heart className="w-5 h-5" />
                {totalFavorites > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {totalFavorites}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="flex items-center gap-3 p-2 sm:px-3 sm:py-2 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/60 rounded-xl transition-colors group"
                aria-label="Ouvrir le panier"
              >
                <div className="relative text-[#1a1a2e]">
                  <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  {state.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-5 h-5 rounded-full bg-[#1a1a2e] text-[#e8a838] text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {state.itemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-[10px] uppercase font-bold text-gray-500">Mon Panier</span>
                  <span className="text-xs font-extrabold text-[#1a1a2e]">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile search bar (below logo on small screens) */}
          <div className="md:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-50 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <span className="text-lg font-black text-[#1a1a2e]">
                MAISON<span className="text-[#e8a838] ml-1">NOVA</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                  Nos Rayons
                </p>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-gray-800 hover:bg-amber-50 rounded-lg hover:text-[#e8a838]"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-2 mb-2">
                  Navigation Rapide
                </p>
                <Link
                  href="/pages/promotions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                >
                  🔥 Offres & Promotions
                </Link>
                <Link
                  href="/pages/nouveautes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 rounded-lg"
                >
                  ✨ Nouveautés
                </Link>
                <Link
                  href="/pages/marques"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-lg"
                >
                  🏷️ Marques Partenaires
                </Link>
                <Link
                  href="/showroom"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 rounded-lg"
                >
                  📍 Visiter notre Showroom
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#1a1a2e]"
                >
                  <PhoneCall className="w-4 h-4 text-[#e8a838]" />
                  <span>Service client : {siteConfig.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
