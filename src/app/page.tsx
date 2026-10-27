'use client';

import React from 'react';
import Link from 'next/link';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { BenefitsBar } from '@/components/home/BenefitsBar';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EditorialBanners } from '@/components/home/EditorialBanners';
import { BrandBar } from '@/components/home/BrandBar';
import { MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust & Benefits Strip */}
      <BenefitsBar />

      {/* Categories Department Grid */}
      <CategorySection />

      {/* Featured Products with Tabs (Promos, Nouveautés, Best-Sellers) */}
      <FeaturedProducts />

      {/* Editorial Banners */}
      <EditorialBanners />

      {/* Official Brand Partners */}
      <BrandBar />

      {/* Showroom Casablanca Visit Teaser Banner */}
      <section className="my-14 bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] text-white rounded-2xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e8a838]/20 text-[#e8a838] border border-[#e8a838]/30 text-xs font-bold uppercase tracking-wider mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>Casablanca — Maroc</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
            Venez découvrir nos appareils dans notre Showroom
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
            Plus de 500 m² d&apos;exposition dédiés aux plus grandes marques mondiales d&apos;électroménager.
            Nos conseillers experts vous accueillent pour tester et configurer vos futurs équipements.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/showroom"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] text-xs font-extrabold transition-all shadow-md"
            >
              <span>Horaires & Itinéraire</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#e8a838]" />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
