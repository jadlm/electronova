'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingBag, ShieldCheck, Truck, Check, ChevronRight } from 'lucide-react';
import { Product, ProductVariant } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { ProductImage } from '@/components/ui/ProductImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem, openCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
      openCart();
    }, 800);
  };

  const currentPrice =
    product.price + (selectedVariant?.priceAdjustment || 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl animate-in zoom-in-95">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image section */}
            <div className="p-6 bg-gray-50 flex items-center justify-center">
              <div className="w-full h-72 relative">
                <ProductImage
                  src={product.images[0]?.src}
                  alt={product.name}
                  category={product.category}
                />
              </div>
            </div>

            {/* Details section */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  {product.brand} • {product.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-black text-[#1a1a2e]">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm line-through text-gray-400">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {product.shortDescription || product.description}
                </p>

                {/* Variants if present */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-4">
                    <span className="block text-xs font-bold text-gray-700 mb-1.5">
                      Choisir une option :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                            selectedVariant?.id === v.id
                              ? 'border-[#e8a838] bg-amber-50 text-[#1a1a2e]'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          {v.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key features */}
                <div className="space-y-1.5 text-xs text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#e8a838]" />
                    <span>{product.deliveryInfo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span>Garantie constructeur : {product.warrantyYears} ans</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="py-3 px-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Fiche</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
