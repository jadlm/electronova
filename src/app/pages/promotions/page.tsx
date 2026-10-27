'use client';

import React from 'react';
import { Flame } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function PromotionsPage() {
  const onSaleProducts = products.filter((p) => p.isOnSale);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white rounded-2xl p-8 mb-10 shadow-md">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 mb-2">
          <Flame className="w-4 h-4 fill-current" />
          Offres Spéciales & Ventes Flash
        </span>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
          Promotions Électroménager au Maroc
        </h1>
        <p className="text-xs sm:text-sm text-red-100 max-w-xl">
          Bénéficiez de remises exceptionnelles jusqu&apos;à -30% sur une sélection de réfrigérateurs, lave-linge, aspirateurs et robots de cuisine.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {onSaleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
