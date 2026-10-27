'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function NouveautesPage() {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white rounded-2xl p-8 mb-10 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] flex items-center gap-1.5 mb-2">
          <Sparkles className="w-4 h-4" />
          Derniers Arrivages
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
          Nouveautés Électro & High-Tech
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
          Découvrez en exclusivité les technologies de pointe récemment sorties chez Samsung, Bosch, Sony, Apple et LG.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {newProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
