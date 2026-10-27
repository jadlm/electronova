'use client';

import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  category?: string;
}

export function ProductImage({
  src,
  alt,
  className = '',
  priority = false,
  category = '',
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Gradient placeholder based on category or alt if image is missing
  const getCategoryTheme = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('gros')) return 'from-blue-50 to-indigo-100 text-blue-700';
    if (lower.includes('petit')) return 'from-amber-50 to-orange-100 text-amber-700';
    if (lower.includes('tv') || lower.includes('image')) return 'from-purple-50 to-slate-100 text-purple-700';
    if (lower.includes('tel') || lower.includes('smart')) return 'from-emerald-50 to-teal-100 text-emerald-700';
    if (lower.includes('cuis')) return 'from-rose-50 to-red-100 text-rose-700';
    return 'from-gray-50 to-gray-100 text-gray-700';
  };

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br ${getCategoryTheme(
          category
        )} select-none rounded-xl ${className}`}
      >
        <div className="w-14 h-14 rounded-2xl bg-white shadow-xs flex items-center justify-center mb-2">
          <Package className="w-7 h-7 opacity-60" />
        </div>
        <span className="text-[11px] font-semibold text-center line-clamp-2 px-2 opacity-80 text-gray-700">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center bg-white rounded-xl overflow-hidden p-2 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
        style={{
          maxHeight: '100%',
          maxWidth: '100%',
        }}
      />
      <span className="absolute bottom-2 right-2 rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-medium text-gray-500">
        Photo d&apos;illustration
      </span>
    </div>
  );
}
