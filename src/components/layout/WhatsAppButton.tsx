'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function WhatsAppButton() {
  const message = encodeURIComponent(
    'Bonjour Maison Nova, je souhaite avoir des informations sur un produit.'
  );
  // Default Moroccan assistance number or demo
  const phone = siteConfig.whatsapp || '212600000000';
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-1">
        Besoin d&apos;aide ?
      </span>
    </a>
  );
}
