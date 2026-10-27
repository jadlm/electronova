'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'promos' | 'nouveautes' | 'vedettes'>('promos');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const promoProducts = products.filter((p) => p.isOnSale).slice(0, 8);
  const newProducts = products.filter((p) => p.isNew).slice(0, 8);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  const displayedProducts =
    activeTab === 'promos'
      ? promoProducts
      : activeTab === 'nouveautes'
      ? newProducts
      : featuredProducts;

  return (
    <section className="my-12">
      {/* Section Header with Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-3 border-b border-gray-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5 mb-1">
            <Flame className="w-4 h-4 fill-current text-red-500" />
            Sélection Spéciale Maison Nova
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Les meilleures offres du moment
          </h2>
        </div>

        {/* Tab filters */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('promos')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'promos'
                ? 'bg-white text-red-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Promotions</span>
          </button>

          <button
            onClick={() => setActiveTab('nouveautes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'nouveautes'
                ? 'bg-white text-[#e8a838] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nouveautés</span>
          </button>

          <button
            onClick={() => setActiveTab('vedettes')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'vedettes'
                ? 'bg-white text-[#1a1a2e] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Best-Sellers</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {displayedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        ))}
      </div>

      {/* Quick view modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Bottom link */}
      <div className="mt-8 text-center">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-xs font-bold text-gray-800 transition-colors shadow-xs"
        >
          <span>Découvrir tous nos {products.length} produits</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
