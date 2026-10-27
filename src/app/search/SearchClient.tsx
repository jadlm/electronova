"use client";

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
        (p.reference && p.reference.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour à l&apos;accueil</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
          Résultats pour « <span className="text-[#e8a838]">{query}</span> »
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          {results.length} produit{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-base font-bold text-gray-900 mb-2">
            Aucun résultat correspondant
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Nous n&apos;avons trouvé aucun article pour cette recherche. Vérifiez l&apos;orthographe ou essayez un terme plus générique (ex. « Samsung », « aspirateur », « lave-linge »).
          </p>
          <Link
            href="/collections"
            className="px-6 py-3 bg-[#1a1a2e] text-white text-xs font-bold rounded-xl hover:bg-[#e8a838] hover:text-[#1a1a2e] transition-colors"
          >
            Explorer tous nos rayons
          </Link>
        </div>
      )}
    </div>
  );
}
