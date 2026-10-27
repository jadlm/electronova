'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CreditCard, Building2 } from 'lucide-react';
import { editorialBanners } from '@/data/banners';

export function EditorialBanners() {
  return (
    <section className="my-14">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {editorialBanners.map((banner, i) => {
          const icons = [Sparkles, CreditCard, Building2];
          const Icon = icons[i % icons.length];

          return (
            <div
              key={banner.id}
              className="relative rounded-2xl overflow-hidden shadow-md group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between min-h-[320px] p-7 text-white"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute inset-0 ${
                    i === 1
                      ? 'bg-gradient-to-t from-[#111827] via-[#111827]/85 to-black/50'
                      : i === 0
                      ? 'bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/85 to-transparent'
                      : 'bg-gradient-to-t from-gray-950 via-gray-900/85 to-black/40'
                  }`}
                />
              </div>

              {/* Top Icon */}
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-[#e8a838] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black tracking-tight mb-2 text-white">
                  {banner.title}
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed max-w-xs">
                  {banner.subtitle}
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 pt-6">
                <Link
                  href={banner.ctaLink}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#e8a838] hover:text-amber-300 group transition-colors"
                >
                  <span>{banner.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
