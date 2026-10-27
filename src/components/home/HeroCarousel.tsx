'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { heroBanners } from '@/data/banners';

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? heroBanners.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <div className="relative bg-[#1a1a2e] text-white overflow-hidden rounded-2xl shadow-xl my-6">
      <div className="relative min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] flex items-center">
        {heroBanners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            style={{
              background:
                index === 0
                  ? 'linear-gradient(135deg, #111827 0%, #1a1a2e 50%, #2d2311 100%)'
                  : index === 1
                  ? 'linear-gradient(135deg, #090d16 0%, #161a29 50%, #1b263b 100%)'
                  : 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #3e2723 100%)',
            }}
          >
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full py-8 sm:py-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Text */}
                <div className="md:col-span-7">
                  {banner.label && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-[#e8a838] border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{banner.label}</span>
                    </div>
                  )}
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-300 font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
                    {banner.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                    <Link
                      href={banner.ctaLink}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] text-xs sm:text-sm font-extrabold transition-transform duration-200 hover:scale-105 shadow-lg shadow-amber-500/20"
                    >
                      <span>{banner.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/collections"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-xs transition-colors"
                    >
                      <span>Tous les rayons</span>
                    </Link>
                  </div>
                </div>

                {/* Right Framed Product Image */}
                <div className="hidden md:flex md:col-span-5 items-center justify-center">
                  <div className="relative w-full max-w-sm h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-white/5 backdrop-blur-xs p-3 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={banner.imageDesktop}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bullet Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroBanners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-[#e8a838]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Aller au slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
