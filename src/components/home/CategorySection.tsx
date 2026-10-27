'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { categories } from '@/data/categories';

export function CategorySection() {
  return (
    <section className="my-12">
      <div className="flex items-end justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] flex items-center gap-1.5 mb-1">
            <Layers className="w-4 h-4" />
            Nos Univers
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Explorez par catégorie
          </h2>
        </div>
        <Link
          href="/collections"
          className="text-xs font-bold text-[#1a1a2e] hover:text-[#e8a838] flex items-center gap-1 transition-colors group"
        >
          <span>Tout voir</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          return (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="bg-white rounded-2xl border border-gray-200/90 hover:border-amber-400 p-3 flex flex-col justify-between group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="w-full h-32 rounded-xl bg-gray-50 overflow-hidden mb-3 relative flex items-center justify-center p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold leading-tight text-gray-900 group-hover:text-[#e8a838] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mt-1">
                  {cat.subcategories?.length || 0} sous-rayons
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
