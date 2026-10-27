'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Clock, Phone, Mail, Navigation, ShieldCheck, Check } from 'lucide-react';
import { siteConfig } from '@/data/site-config';

export default function ShowroomPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#e8a838] mb-1 block">
          Espace Découverte & Conseil
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Notre Showroom à Casablanca
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Venez tester, comparer et choisir vos appareils électroménagers avec nos conseillers experts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-16">
        {/* Showroom Details Box */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Maison Nova — Casablanca Flagship
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Un espace de plus de 500 m² mettant en scène les dernières innovations des marques Samsung, LG, Bosch, Whirlpool, Sony, Dyson et bien d&apos;autres.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#e8a838] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-900">Adresse :</strong>
                <span className="text-gray-600">
                  {siteConfig.address.street}, {siteConfig.address.city}, Maroc
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#e8a838] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-900">Horaires d&apos;ouverture :</strong>
                <ul className="text-gray-600 space-y-1 mt-1">
                  {siteConfig.showroom.hours.map((h, i) => (
                    <li key={i} className="flex justify-between w-64">
                      <span>{h.day} :</span>
                      <span className="font-semibold">{h.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#e8a838] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-gray-900">Téléphone Showroom :</strong>
                <span className="text-gray-600">{siteConfig.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={siteConfig.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white text-xs font-bold rounded-xl transition-all shadow-md"
            >
              <Navigation className="w-4 h-4" />
              <span>Ouvrir sur Google Maps</span>
            </a>
          </div>
        </div>

        {/* Services in Showroom */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d2d44] text-white rounded-2xl p-8 shadow-xl space-y-6">
          <h3 className="text-xl font-black tracking-tight text-[#e8a838]">
            Pourquoi venir en Showroom ?
          </h3>
          <ul className="space-y-4 text-xs text-gray-300">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-[#e8a838] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block">Démonstrations en direct :</strong>
                Découvrez nos réfrigérateurs, lave-linge, fours, plaques à induction et petits appareils en démonstration.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-[#e8a838] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block">Conseils d&apos;architectes et cuisinistes :</strong>
                Nos spécialistes vous aident à vérifier les cotes d&apos;encastrement et la compatibilité électrique de votre cuisine.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-[#e8a838] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <strong className="text-white block">Retrait immédiat (Click & Collect) :</strong>
                Récupérez vos commandes en ligne directement au comptoir en 1h.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
