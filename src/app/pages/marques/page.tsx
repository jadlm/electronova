'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import { brands } from '@/data/brands';
import { products } from '@/data/products';

export default function MarquesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] mb-1 block">
          Distributeur Agréé
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Nos Marques Partenaires
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Tous nos produits proviennent directement des filiales officielles des fabricants au Maroc, garantissant authenticité et service après-vente constructeur.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => {
          const brandProducts = products.filter((p) => p.brandSlug === brand.slug);
          return (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:border-[#e8a838] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-gray-950 uppercase tracking-wide">
                    {brand.name}
                  </h2>
                  <span className="text-[11px] font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">
                    {brandProducts.length} références
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-6">
                  {brand.description}
                </p>
              </div>

              <Link
                href={`/collections?brand=${encodeURIComponent(brand.name)}`}
                className="w-full py-2.5 px-4 bg-gray-50 hover:bg-[#1a1a2e] hover:text-white rounded-xl text-xs font-bold text-[#1a1a2e] flex items-center justify-between transition-colors"
              >
                <span>Voir les produits {brand.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
