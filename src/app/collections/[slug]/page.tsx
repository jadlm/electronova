'use client';

import React, { useState, useMemo, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Filter,
  ArrowUpDown,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const category = categories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const allCategoryProducts = useMemo(
    () => products.filter((p) => p.categorySlug === category.slug),
    [category.slug]
  );

  // Available brands in this category
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    allCategoryProducts.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [allCategoryProducts]);

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...allCategoryProducts];

    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }
    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategorySlug === selectedSubcategory);
    }
    if (onlyPromos) {
      result = result.filter((p) => p.isOnSale);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [allCategoryProducts, selectedBrand, selectedSubcategory, onlyPromos, sortBy]);

  const clearFilters = () => {
    setSelectedBrand(null);
    setSelectedSubcategory(null);
    setOnlyPromos(false);
  };

  const hasActiveFilters = Boolean(selectedBrand || selectedSubcategory || onlyPromos);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/collections" className="hover:text-gray-900">
          Rayons
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold">{category.name}</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] mb-1 block">
          Rayon Électroménager
        </span>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          {category.name}
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Subcategory Pills */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedSubcategory === null
                ? 'bg-[#1a1a2e] text-white shadow-xs'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
            }`}
          >
            Tous ({allCategoryProducts.length})
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub.slug}
              onClick={() =>
                setSelectedSubcategory((prev) => (prev === sub.slug ? null : sub.slug))
              }
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSubcategory === sub.slug
                  ? 'bg-[#e8a838] text-[#1a1a2e] shadow-xs'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Layout: Sidebar Filter + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <SlidersHorizontal className="w-4 h-4 text-[#e8a838]" />
                <span>Filtres</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Réinitialiser
                </button>
              )}
            </div>

            {/* Promotions only filter */}
            <div className="mb-6">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-800 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyPromos}
                  onChange={(e) => setOnlyPromos(e.target.checked)}
                  className="w-4 h-4 rounded text-[#e8a838] focus:ring-[#e8a838] border-gray-300"
                />
                <span>🔥 En promotion uniquement</span>
              </label>
            </div>

            {/* Brands filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Marques
              </h4>
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="brandFilter"
                        checked={selectedBrand === brand}
                        onChange={() =>
                          setSelectedBrand((prev) => (prev === brand ? null : brand))
                        }
                        className="text-[#e8a838] focus:ring-[#e8a838]"
                      />
                      <span>{brand}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      ({allCategoryProducts.filter((p) => p.brand === brand).length})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {/* Controls Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-semibold text-gray-600">
              <strong className="text-gray-900">{filteredProducts.length}</strong> produits trouvés
            </span>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Trigger */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrer</span>
              </button>

              {/* Sort selector */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 hidden sm:inline">Trier par :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-800 focus:outline-none focus:border-[#e8a838]"
                >
                  <option value="featured">Pertinence</option>
                  <option value="price-asc">Prix : croissant</option>
                  <option value="price-desc">Prix : décroissant</option>
                  <option value="newest">Nouveautés en premier</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active filter pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-[#1a1a2e]">
                  Marque : {selectedBrand}
                  <button onClick={() => setSelectedBrand(null)}>
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-800" />
                  </button>
                </span>
              )}
              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-[#1a1a2e]">
                  Sous-rayon : {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory(null)}>
                    <X className="w-3.5 h-3.5 text-gray-500 hover:text-gray-800" />
                  </button>
                </span>
              )}
              {onlyPromos && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  En promotion
                  <button onClick={() => setOnlyPromos(false)}>
                    <X className="w-3.5 h-3.5 text-red-500 hover:text-red-800" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product cards */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-base font-bold text-gray-900 mb-1">
                Aucun produit ne correspond à vos filtres
              </p>
              <p className="text-xs text-gray-500 mb-6">
                Essayez de supprimer certains filtres pour élargir vos résultats.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-[#1a1a2e] text-white text-xs font-bold rounded-lg hover:bg-[#e8a838] hover:text-[#1a1a2e] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
