'use client';

import React from 'react';
import { Truck, ShieldCheck, Wrench, CreditCard } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export function BenefitsBar() {
  const benefits = [
    {
      icon: Truck,
      title: 'Livraison express partout au Maroc',
      desc: `Offerte dès ${siteConfig.delivery.freeThreshold} DH d'achat`,
      color: 'text-[#e8a838] bg-amber-500/10',
    },
    {
      icon: ShieldCheck,
      title: 'Garantie constructeur 2 ans',
      desc: '100% appareils neufs et certifiés',
      color: 'text-green-600 bg-green-500/10',
    },
    {
      icon: Wrench,
      title: 'Installation & mise en service',
      desc: 'Par nos techniciens qualifiés',
      color: 'text-blue-600 bg-blue-500/10',
    },
    {
      icon: CreditCard,
      title: 'Paiement à la livraison',
      desc: 'Espèces ou Carte bancaire sécurisée',
      color: 'text-purple-600 bg-purple-500/10',
    },
  ];

  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {benefits.map((b, i) => {
          const Icon = b.icon;
          return (
            <div
              key={i}
              className={`flex items-center gap-4 ${i !== 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${b.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">{b.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
