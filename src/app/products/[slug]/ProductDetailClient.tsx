"use client";

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Wrench,
  Check,
  Star,
  ChevronRight,
  Share2,
  Minus,
  Plus,
  ArrowLeft,
} from 'lucide-react';
import { products } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { ProductImage } from '@/components/ui/ProductImage';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  const { addItem, openCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'delivery'>('desc');
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const discount = product.oldPrice
    ? calculateDiscount(product.oldPrice, product.price)
    : 0;

  const currentPrice =
    product.price + (selectedVariant?.priceAdjustment || 0);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const relatedList = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900">
          Accueil
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/collections/${product.categorySlug}`} className="hover:text-gray-900">
          {product.category}
        </Link>
        {product.subcategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-700">{product.subcategory}</span>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-gray-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-10 shadow-xs mb-12">
        {/* Left: Product Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full h-80 sm:h-96 md:h-[450px] bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-center justify-center overflow-hidden">
            {discount > 0 && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                -{discount}% Réduction
              </span>
            )}
            <ProductImage
              src={product.images[selectedImage]?.src || product.images[0]?.src}
              alt={product.images[selectedImage]?.alt || product.name}
              category={product.category}
              priority
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl bg-gray-50 border-2 p-2 shrink-0 overflow-hidden transition-all ${
                    selectedImage === idx
                      ? 'border-[#e8a838] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <ProductImage src={img.src} alt={img.alt} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Actions & Details */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Brand & Reference */}
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium mb-2">
              <span className="uppercase tracking-wider font-extrabold text-[#e8a838]">
                {product.brand}
              </span>
              <span>Réf. Fabricant : {product.reference}</span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 tracking-tight leading-snug mb-3">
              {product.name}
            </h1>

            {/* Review rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-700">4.9 / 5</span>
              <span className="text-xs text-gray-400">(42 avis clients certifiés)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-[#1a1a2e]">
                  {formatPrice(currentPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-base line-through text-gray-400 font-medium">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-xs font-bold">
                    Économisez {formatPrice(product.oldPrice! - currentPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                TVA marocaine incluse • Facture avec garantie constructeur fournie
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Options disponibles :
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedVariant?.id === v.id
                          ? 'border-[#e8a838] bg-amber-50/70 text-[#1a1a2e] ring-2 ring-[#e8a838]/20'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Buy Buttons */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:bg-white rounded-lg text-gray-600 transition-colors"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-xs font-extrabold text-gray-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:bg-white rounded-lg text-gray-600 transition-colors"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-[#1a1a2e] hover:bg-[#e8a838] hover:text-[#1a1a2e] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3.5 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors ${
                    isFavorite(product.id) ? 'text-red-500 bg-red-50' : 'text-gray-400'
                  }`}
                  aria-label="Ajouter aux favoris"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-current' : ''}`}
                  />
                </button>
              </div>
            </div>

            {/* Reassurance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-gray-100 text-xs text-gray-600">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#e8a838] shrink-0" />
                <span>{product.deliveryInfo}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Garantie constructeur : {product.warrantyYears} ans</span>
              </div>
              {product.installationAvailable && (
                <div className="flex items-center gap-2.5 sm:col-span-2">
                  <Wrench className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Installation & raccordement disponibles au Maroc</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs: Description, Specs, Delivery */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs mb-14">
        <div className="flex border-b border-gray-200 gap-6 text-xs sm:text-sm font-bold mb-6">
          <button
            onClick={() => setActiveTab('desc')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'desc'
                ? 'border-[#e8a838] text-[#1a1a2e]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Description détaillée
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'specs'
                ? 'border-[#e8a838] text-[#1a1a2e]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Fiche technique ({product.specs.length})
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'delivery'
                ? 'border-[#e8a838] text-[#1a1a2e]'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Livraison & Garantie Maroc
          </button>
        </div>

        {activeTab === 'desc' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed max-w-4xl">
            <p>{product.description}</p>
            {product.features && product.features.length > 0 && (
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-3">
                  Points forts du produit :
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8a838]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="max-w-3xl">
            <table className="w-full text-xs text-left">
              <tbody className="divide-y divide-gray-100">
                {product.specs.map((spec, i) => (
                  <tr key={i} className="hover:bg-gray-50/60">
                    <td className="py-2.5 font-bold text-gray-500 w-1/3">{spec.label}</td>
                    <td className="py-2.5 text-gray-900 font-medium">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 max-w-3xl">
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
              <h4 className="font-bold text-[#1a1a2e] mb-1">
                Livraison à domicile partout au Maroc
              </h4>
              <p className="text-xs text-gray-600">
                Délai estimé : 2 à 5 jours ouvrés selon votre ville (Casablanca, Rabat, Fès, Marrakech, Tanger, Agadir, Oujda, etc.).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-green-50/50 border border-green-100">
              <h4 className="font-bold text-green-900 mb-1">
                Garantie constructeur officielle {product.warrantyYears} ans
              </h4>
              <p className="text-xs text-green-800">
                Prise en charge par le réseau agréé au Maroc. Facture officielle fournie à la livraison.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedList.length > 0 && (
        <section className="my-12">
          <h3 className="text-lg font-black text-gray-900 mb-6">
            Produits similaires dans le rayon {product.category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedList.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
