'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { siteConfig } from '@/data/site-config';
import { ProductImage } from '@/components/ui/ProductImage';

export function CartSidebar() {
  const { state, closeCart, updateQuantity, removeItem } = useCart();
  const freeThreshold = siteConfig.delivery.freeThreshold;
  const progressPercent = Math.min(100, Math.round((state.total / freeThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeThreshold - state.total);

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#e8a838]" />
              <h2 className="text-base font-bold text-gray-900">
                Mon Panier ({state.itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping bar */}
          <div className="bg-amber-50/60 p-3.5 border-b border-amber-100 text-xs">
            <div className="flex items-center gap-2 mb-1.5 font-medium text-gray-800">
              <Truck className="w-4 h-4 text-[#e8a838] shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Plus que{' '}
                  <strong className="text-[#1a1a2e]">
                    {formatPrice(remainingForFreeShipping)}
                  </strong>{' '}
                  pour la <strong>livraison offerte</strong> partout au Maroc !
                </span>
              ) : (
                <span className="text-green-700 font-semibold flex items-center gap-1">
                  🎉 Félicitations ! Votre livraison est offerte !
                </span>
              )}
            </div>
            <div className="w-full bg-amber-200/60 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#e8a838] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-gray-100">
            {state.items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-semibold text-gray-800 mb-1">
                  Votre panier est vide
                </p>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Découvrez nos offres de gros et petit électroménager.
                </p>
                <button
                  onClick={closeCart}
                  className="px-5 py-2.5 bg-[#1a1a2e] hover:bg-black text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>
            ) : (
              state.items.map((item) => (
                <div key={`${item.productId}-${item.variantId || 'base'}`} className="py-4 flex gap-3.5 group">
                  <div className="w-20 h-20 rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0 overflow-hidden">
                    <ProductImage src={item.image} alt={item.name} />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeCart}
                          className="text-xs font-medium text-gray-900 hover:text-[#e8a838] line-clamp-2 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors shrink-0"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.variantName && (
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Option : {item.variantName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1, item.variantId)
                          }
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-gray-800 min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1, item.variantId)
                          }
                          className="p-1 hover:bg-gray-100 text-gray-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals & action */}
          {state.items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Sous-total</span>
                <span className="font-semibold text-gray-800">{formatPrice(state.total)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Livraison estimée</span>
                <span className="font-semibold text-gray-800">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-green-600 uppercase font-bold text-[11px]">Offerte</span>
                  ) : (
                    formatPrice(siteConfig.delivery.standardPrice)
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total estimé</span>
                <span className="text-base text-[#1a1a2e]">
                  {formatPrice(
                    state.total +
                      (remainingForFreeShipping === 0 ? 0 : siteConfig.delivery.standardPrice)
                  )}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 border border-gray-300 rounded-lg text-center text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Voir le panier
                </Link>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-2.5 bg-[#e8a838] hover:bg-[#d4962e] text-[#1a1a2e] rounded-lg text-center text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Commander</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-[10px] text-center text-gray-400">
                Paiement sécurisé • Espèces à la livraison ou Carte bancaire
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
