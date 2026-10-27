'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { ArrowRight, Layers } from 'lucide-react';

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] flex items-center gap-1.5 mb-1">
          <Layers className="w-4 h-4" />
          Catalogue Maison Nova
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Tous nos rayons électroménager
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl">
          Parcourez l&apos;ensemble de nos gammes pour équiper votre maison avec les marques les plus fiables du marché marocain.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs hover:border-[#e8a838] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{cat.name}</h2>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {cat.description}
              </p>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="space-y-1 mb-6">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                    Sous-catégories :
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub) => (
                      <span
                        key={sub.slug}
                        className="px-2.5 py-1 bg-gray-100 rounded-md text-[11px] font-medium text-gray-700"
                      >
                        {sub.name} ({sub.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/collections/${cat.slug}`}
              className="inline-flex items-center justify-between w-full py-2.5 px-4 bg-gray-50 hover:bg-[#1a1a2e] hover:text-white rounded-xl text-xs font-bold text-[#1a1a2e] transition-colors"
            >
              <span>Accéder au rayon</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
