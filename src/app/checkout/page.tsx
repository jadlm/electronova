'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  ShieldCheck,
  ArrowRight,
  PackageCheck,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';

export default function CheckoutPage() {
  const { state, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    city: 'Casablanca',
    address: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' or 'card'
  });

  const moroccanCities = [
    'Casablanca',
    'Rabat',
    'Marrakech',
    'Tanger',
    'Fès',
    'Agadir',
    'Meknès',
    'Oujda',
    'Kénitra',
    'Tétouan',
    'Salé',
    'Mohammédia',
    'El Jadida',
    'Autre ville au Maroc',
  ];

  const deliveryFee =
    state.total >= siteConfig.delivery.freeThreshold
      ? 0
      : siteConfig.delivery.standardPrice;
  const finalTotal = state.total + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeOrderId = `MN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(fakeOrderId);
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          Commande validée avec succès
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-4 mb-2">
          Merci pour votre confiance, {formData.firstName} !
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          Votre commande <strong>N° {orderId}</strong> a bien été enregistrée. Notre service client basé au Maroc vous contactera par téléphone sous 24h pour confirmer l&apos;adresse et planifier la livraison.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-left text-xs space-y-3 mb-8">
          <div className="flex justify-between border-b border-gray-200 pb-2 font-bold text-gray-800">
            <span>Mode de règlement :</span>
            <span>
              {formData.paymentMethod === 'cod'
                ? '💵 Espèces à la livraison'
                : '💳 Carte bancaire CMI'}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2 text-gray-600">
            <span>Ville de destination :</span>
            <span className="font-semibold text-gray-800">{formData.city}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2 text-gray-600">
            <span>Numéro de contact :</span>
            <span className="font-semibold text-gray-800">{formData.phone}</span>
          </div>
          <div className="flex justify-between pt-1 text-sm font-black text-gray-950">
            <span>Total à régler :</span>
            <span className="text-base text-[#1a1a2e]">{formatPrice(finalTotal)}</span>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white text-xs font-bold rounded-xl transition-all shadow-md"
        >
          <span>Retourner à l&apos;accueil</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Votre panier est vide</h2>
        <p className="text-xs text-gray-500 mb-6">
          Veuillez ajouter des articles à votre panier avant de finaliser la commande.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-[#1a1a2e] text-white rounded-xl text-xs font-bold"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">
        Finaliser ma commande
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Contact & Identity */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1a2e] text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Vos Coordonnées</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="Ex: Karim"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nom de famille *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="Ex: Bennani"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Téléphone au Maroc *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="06 XX XX XX XX ou 05..."
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Adresse Email (pour confirmation)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="votre.email@domaine.com"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1a2e] text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Adresse de Livraison au Maroc</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Ville de livraison *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838] bg-white"
                  >
                    {moroccanCities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Adresse complète (Quartier, Rue, N° immeuble/villa) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="Ex: Boulevard Zerktouni, Résidence Al Manar, Étage 3, N° 12"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Remarques ou instructions pour le livreur (Optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#e8a838]"
                    placeholder="Ex: Sonner à l'interphone Bennani, livraison l'après-midi"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1a1a2e] text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Mode de Paiement</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#e8a838] bg-amber-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="mt-0.5 text-[#e8a838] focus:ring-[#e8a838]"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-xs text-gray-900">
                      <Banknote className="w-4 h-4 text-green-600" />
                      <span>Paiement à la livraison</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Réglez en espèces directement auprès du transporteur après vérification de votre colis.
                    </p>
                  </div>
                </label>

                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-[#e8a838] bg-amber-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-0.5 text-[#e8a838] focus:ring-[#e8a838]"
                  />
                  <div>
                    <div className="flex items-center gap-2 font-bold text-xs text-gray-900">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>Carte bancaire (CMI)</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Paiement sécurisé par carte marocaine ou internationale avec 3D Secure.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>Confirmer ma commande ({formatPrice(finalTotal)})</span>
              <PackageCheck className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Sidebar Order Recap */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs h-fit space-y-4">
          <h3 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
            Votre panier ({state.itemCount})
          </h3>

          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
            {state.items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || 'base'}`}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div className="pr-2">
                  <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                  <span className="text-gray-400">
                    Quantité : {item.quantity} × {formatPrice(item.price)}
                  </span>
                </div>
                <span className="font-bold text-gray-950 shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-200 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Sous-total :</span>
              <span className="font-semibold text-gray-900">{formatPrice(state.total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Frais de livraison :</span>
              <span className="font-semibold text-gray-900">
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[11px]">Offerte</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-100">
              <span>Total TTC :</span>
              <span className="text-[#1a1a2e]">{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
