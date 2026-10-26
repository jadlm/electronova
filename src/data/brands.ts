import { Brand } from '@/lib/types';

export const brands: Brand[] = [
  { id: 'br-1', name: 'Samsung', slug: 'samsung', logo: '/images/brands/samsung.svg', featured: true },
  { id: 'br-2', name: 'LG', slug: 'lg', logo: '/images/brands/lg.svg', featured: true },
  { id: 'br-3', name: 'Bosch', slug: 'bosch', logo: '/images/brands/bosch.svg', featured: true },
  { id: 'br-4', name: 'Whirlpool', slug: 'whirlpool', logo: '/images/brands/whirlpool.svg', featured: true },
  { id: 'br-5', name: 'Beko', slug: 'beko', logo: '/images/brands/beko.svg', featured: true },
  { id: 'br-6', name: 'Sony', slug: 'sony', logo: '/images/brands/sony.svg', featured: true },
  { id: 'br-7', name: 'Apple', slug: 'apple', logo: '/images/brands/apple.svg', featured: true },
  { id: 'br-8', name: 'Xiaomi', slug: 'xiaomi', logo: '/images/brands/xiaomi.svg', featured: true },
  { id: 'br-9', name: 'Dyson', slug: 'dyson', logo: '/images/brands/dyson.svg', featured: true },
  { id: 'br-10', name: 'De\'Longhi', slug: 'delonghi', logo: '/images/brands/delonghi.svg', featured: true },
  { id: 'br-11', name: 'Brandt', slug: 'brandt', logo: '/images/brands/brandt.svg', featured: true },
  { id: 'br-12', name: 'Electrolux', slug: 'electrolux', logo: '/images/brands/electrolux.svg', featured: true },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
