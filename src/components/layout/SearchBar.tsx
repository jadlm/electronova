'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ProductImage } from '@/components/ui/ProductImage';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const q = query.toLowerCase();
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
            (p.reference && p.reference.toLowerCase().includes(q))
        )
        .slice(0, 5);
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Rechercher réfrigérateur, lave-linge, aspirateur, Bosch..."
          className="w-full h-11 pl-4 pr-24 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-400 text-sm border border-transparent focus:outline-none focus:border-[#e8a838] focus:bg-white transition-all shadow-inner"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-12 text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 h-8 px-3.5 bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] font-semibold rounded-md flex items-center justify-center transition-colors shadow-xs"
          aria-label="Rechercher"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {/* Autocomplete dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
          {results.length > 0 ? (
            <div>
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                <span>Produits correspondants ({results.length})</span>
                <span className="text-[#e8a838] flex items-center gap-1 font-medium lowercase">
                  <Sparkles className="w-3 h-3" /> suggestions directes
                </span>
              </div>
              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0 overflow-hidden">
                      <ProductImage
                        src={product.images[0]?.src}
                        alt={product.name}
                        category={product.category}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                        {product.brand} • {product.category}
                      </div>
                      <div className="text-sm font-medium text-gray-900 truncate group-hover:text-[#e8a838]">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-[11px] line-through text-gray-400">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#e8a838] shrink-0" />
                  </Link>
                ))}
              </div>
              <div className="p-2.5 bg-gray-50 text-center border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-xs font-semibold text-[#1a1a2e] hover:text-[#e8a838] transition-colors"
                >
                  Voir tous les résultats pour « {query} » →
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-sm text-gray-500">
              Aucun produit trouvé pour « {query} ». Essayez avec une autre marque ou catégorie.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
