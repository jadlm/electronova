'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Check, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductImage } from '@/components/ui/ProductImage';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [added, setAdded] = useState(false);

  const discount = product.oldPrice
    ? calculateDiscount(product.oldPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
    openCart();
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-200/90 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Floating Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {discount > 0 && (
          <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-0.5 rounded-md bg-[#1a1a2e] text-[#e8a838] text-[10px] font-bold uppercase tracking-wider shadow-xs">
            Nouveau
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleFavorite}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isFavorite(product.id)
            ? 'bg-red-50 text-red-500 scale-105 shadow-xs'
            : 'bg-white/90 hover:bg-white text-gray-400 hover:text-red-500 shadow-sm'
        }`}
        aria-label="Ajouter aux favoris"
      >
        <Heart
          className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`}
        />
      </button>

      {/* Product Image Frame: Perfectly sized and padded for realistic e-commerce presentation */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block w-full h-56 sm:h-64 bg-[#fbfbfc] p-4 border-b border-gray-100/80 overflow-hidden"
      >
        <ProductImage
          src={product.images[0]?.src}
          alt={product.images[0]?.alt || product.name}
          category={product.category}
        />

        {/* Quick View trigger on hover */}
        {onQuickView && (
          <div className="absolute inset-x-0 bottom-3 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleQuickView}
              className="w-full py-2 bg-white/95 hover:bg-white text-gray-800 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors border border-gray-100"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Aperçu rapide</span>
            </button>
          </div>
        )}
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Reference */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1.5">
            <span className="uppercase tracking-wider font-extrabold text-[#e8a838]">
              {product.brand}
            </span>
            <span className="text-[10px] text-gray-400">Réf. {product.reference}</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#e8a838] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Customer Reviews Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-semibold">(4.8)</span>
          </div>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            {product.oldPrice && (
              <span className="block text-xs line-through text-gray-400 leading-none mb-1">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-gray-950">
              {formatPrice(product.price)}
            </span>
            <span className="block text-[10px] text-green-600 font-semibold mt-0.5">
              ● En stock (Maroc)
            </span>
          </div>

          {/* Fast Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white'
            }`}
            title="Ajouter au panier"
            aria-label="Ajouter au panier"
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouté</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
