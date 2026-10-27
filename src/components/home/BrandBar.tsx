'use client';

import React from 'react';
import Link from 'next/link';
import { brands } from '@/data/brands';

export function BrandBar() {
  return (
    <section className="my-12 py-8 border-y border-gray-200/80 bg-gray-50/50 rounded-2xl px-6">
      <div className="text-center mb-6">
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          Partenaires Officiels & Marques Agréées
        </span>
        <h3 className="text-base font-extrabold text-gray-900 mt-0.5">
          Toutes vos marques préférées au Maroc
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {brands.map((b) => (
          <Link
            key={b.id}
            href={`/collections?brand=${encodeURIComponent(b.name)}`}
            className="px-4 py-2 bg-white rounded-xl border border-gray-200/70 shadow-2xs hover:border-[#e8a838] hover:shadow-sm text-xs font-black uppercase tracking-wider text-gray-700 hover:text-[#1a1a2e] transition-all"
          >
            {b.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
