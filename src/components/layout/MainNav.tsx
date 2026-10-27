'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown, Sparkles, Percent, Award, Flame } from 'lucide-react';
import { categories } from '@/data/categories';

export function MainNav() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="bg-[#1a1a2e] text-white border-b border-gray-800 hidden md:block relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* All Departments Button */}
          <div
            className="relative"
            onMouseEnter={() => setActiveMenu('departments')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button className="flex items-center gap-2 bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] font-bold text-xs uppercase px-4 py-2.5 rounded-t-md transition-colors">
              <Menu className="w-4 h-4" />
              <span>Tous nos rayons</span>
              <ChevronDown className="w-3.5 h-3.5 ml-1" />
            </button>

            {/* Dropdown Menu */}
            {activeMenu === 'departments' && (
              <div className="absolute top-full left-0 w-72 bg-white text-gray-900 rounded-b-xl shadow-2xl border border-gray-100 py-2 z-40 animate-in fade-in slide-in-from-top-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/collections/${cat.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 text-xs font-medium hover:bg-amber-50 hover:text-[#e8a838] transition-colors group"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-gray-400 group-hover:text-[#e8a838]">
                      {cat.subcategories?.length || 0} sous-rayons
                    </span>
                  </Link>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-100">
                  <Link
                    href="/collections"
                    className="block px-4 py-2 text-xs font-bold text-center text-[#1a1a2e] hover:text-[#e8a838]"
                  >
                    Voir tous les catalogues →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Department Direct Links */}
          <div className="flex items-center space-x-1 lg:space-x-3 text-xs font-medium">
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.slug}`}
                className="px-3 py-1.5 rounded-md text-gray-200 hover:text-[#e8a838] hover:bg-white/5 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Quick Highlight Links: Promotions, Nouveautés, Marques */}
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <Link
              href="/pages/promotions"
              className="flex items-center gap-1.5 px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Promos</span>
            </Link>
            <Link
              href="/pages/nouveautes"
              className="flex items-center gap-1.5 px-3 py-1 text-[#e8a838] hover:text-amber-300 hover:bg-amber-500/10 rounded-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nouveautés</span>
            </Link>
            <Link
              href="/pages/marques"
              className="flex items-center gap-1.5 px-3 py-1 text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Marques</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
