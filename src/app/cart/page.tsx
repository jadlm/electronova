'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';
import { ProductImage } from '@/components/ui/ProductImage';

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const freeThreshold = siteConfig.delivery.freeThreshold;
  const progressPercent = Math.min(100, Math.round((state.total / freeThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeThreshold - state.total);
  const deliveryFee = remainingForFreeShipping === 0 ? 0 : siteConfig.delivery.standardPrice;
  const finalTotal = state.total + deliveryFee;

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Votre panier est vide</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">
          Vous n&apos;avez pas encore ajouté de produit. Découvrez nos rayons de gros et petit électroménager.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white text-xs font-bold rounded-xl transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuer mes achats</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">
        Mon Panier ({state.itemCount} articles)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Free Shipping Alert Bar */}
          <div className="bg-amber-50 border border-amber-200/70 rounded-2xl p-4">
            <div className="flex items-center gap-2.5 mb-2 text-xs font-medium text-gray-800">
              <Truck className="w-4 h-4 text-[#e8a838] shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Ajoutez encore{' '}
                  <strong className="text-gray-950">
                    {formatPrice(remainingForFreeShipping)}
                  </strong>{' '}
                  d&apos;achats pour profiter de la <strong>livraison offerte</strong> partout au Maroc !
                </span>
              ) : (
                <span className="text-green-700 font-bold">
                  🎉 Livraison offerte sur cette commande !
                </span>
              )}
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#e8a838] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-xs">
            {state.items.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || 'base'}`}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 p-2 shrink-0 overflow-hidden">
                    <ProductImage src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-sm font-bold text-gray-900 hover:text-[#e8a838] line-clamp-1 transition-colors"
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        Option : {item.variantName}
                      </p>
                    )}
                    <span className="text-xs font-semibold text-gray-700 mt-1 block">
                      {formatPrice(item.price)} l&apos;unité
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1, item.variantId)
                      }
                      className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-extrabold text-gray-900 min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1, item.variantId)
                      }
                      className="p-1.5 hover:bg-white rounded-lg text-gray-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm sm:text-base font-black text-gray-950">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Supprimer l'article"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Link
              href="/collections"
              className="text-xs font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Poursuivre les achats</span>
            </Link>
            <button
              onClick={clearCart}
              className="text-xs font-medium text-red-600 hover:underline"
            >
              Vider le panier
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs h-fit space-y-6">
          <h2 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
            Récapitulatif de commande
          </h2>

          <div className="space-y-3 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Sous-total articles</span>
              <span className="font-semibold text-gray-900">{formatPrice(state.total)}</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison estimée</span>
              <span className="font-semibold text-gray-900">
                {deliveryFee === 0 ? (
                  <span className="text-green-600 font-bold uppercase text-[11px]">Offerte</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TVA (20% incluse)</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(Math.round(state.total * 0.2))}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-baseline justify-between">
            <span className="text-sm font-bold text-gray-900">Total TTC</span>
            <span className="text-2xl font-black text-[#1a1a2e]">
              {formatPrice(finalTotal)}
            </span>
          </div>

          <Link
            href="/checkout"
            className="w-full py-4 bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Passer la commande</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="pt-4 border-t border-gray-100 space-y-2 text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <span>Garantie constructeur officielle incluse</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#e8a838] shrink-0" />
              <span>Paiement possible à la livraison</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
