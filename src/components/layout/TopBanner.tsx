'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MapPin, ShieldCheck, ChevronRight, Truck } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function TopBanner() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const messages = siteConfig.topBannerMessages;

  useEffect(() => {
    if (messages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-[#111827] text-gray-200 text-xs border-b border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
        {/* Left side: phone & showroom */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/showroom"
            className="flex items-center gap-1.5 hover:text-[#e8a838] transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#e8a838]" />
            <span>Showroom Casablanca</span>
          </Link>
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-[#e8a838] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#e8a838]" />
            <span>Service Client : {siteConfig.phone}</span>
          </a>
        </div>

        {/* Center: Ticker message */}
        <div className="flex-1 md:flex-initial flex items-center justify-center overflow-hidden">
          <div className="flex items-center gap-2 text-center font-medium animate-fade-in">
            <Truck className="w-3.5 h-3.5 text-[#e8a838] shrink-0" />
            <span className="truncate max-w-[320px] sm:max-w-md">
              {messages[currentIdx]}
            </span>
          </div>
        </div>

        {/* Right side: Reassurance & Currency */}
        <div className="hidden lg:flex items-center space-x-5 text-gray-300">
          <Link
            href="/pages/garantie-sav"
            className="flex items-center gap-1 hover:text-[#e8a838] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Garantie 2 ans</span>
          </Link>
          <span className="text-gray-600">|</span>
          <span className="font-semibold text-white bg-gray-800 px-2 py-0.5 rounded text-[11px] tracking-wide">
            MAD (DH)
          </span>
        </div>
      </div>
    </div>
  );
}
