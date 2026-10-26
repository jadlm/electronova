// ─── Product Types ───────────────────────────────────────────────
export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'capacity' | 'model';
  value: string;
  colorHex?: string;
  priceAdjustment?: number;
  stock: number;
  sku: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: string;
  categorySlug: string;
  subcategory?: string;
  subcategorySlug?: string;
  reference: string;
  price: number;
  oldPrice?: number;
  currency: string;
  images: ProductImage[];
  variants?: ProductVariant[];
  description: string;
  shortDescription: string;
  specs: ProductSpec[];
  features: string[];
  stock: number;
  isNew?: boolean;
  isOnSale?: boolean;
  isFeatured?: boolean;
  deliveryInfo: string;
  installationAvailable: boolean;
  warrantyYears: number;
  relatedProducts?: string[];
  tags?: string[];
  createdAt: string;
}

// ─── Category Types ──────────────────────────────────────────────
export interface Subcategory {
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  subcategories: Subcategory[];
  featured?: boolean;
}

// ─── Cart Types ──────────────────────────────────────────────────
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  name: string;
  brand: string;
  image: string;
  variant?: string;
  slug: string;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

// ─── Brand Types ─────────────────────────────────────────────────
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
  featured?: boolean;
}

// ─── Banner Types ────────────────────────────────────────────────
export interface HeroBanner {
  id: string;
  label?: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  imageDesktop: string;
  imageMobile: string;
  bgColor?: string;
  textColor?: string;
}

export interface EditorialBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string;
  bgColor: string;
  textColor: string;
  position: 'left' | 'right';
}

// ─── Blog Types ──────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  relatedPosts?: string[];
}

// ─── Site Config Types ───────────────────────────────────────────
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    mapUrl: string;
  };
  showroom: {
    name: string;
    hours: { day: string; hours: string }[];
    image: string;
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  delivery: {
    freeThreshold: number;
    standardPrice: number;
    expressPrice: number;
    estimatedDays: string;
  };
  topBannerMessages: string[];
  financing: {
    enabled: boolean;
    minAmount: number;
    months: number[];
  };
}

// ─── Filter Types ────────────────────────────────────────────────
export interface FilterState {
  brands: string[];
  priceMin: number | null;
  priceMax: number | null;
  inStock: boolean;
  isNew: boolean;
  isOnSale: boolean;
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'newest';
