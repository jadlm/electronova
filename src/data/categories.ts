import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Gros Électroménager',
    slug: 'gros-electromenager',
    description: 'Réfrigérateurs, lave-linge, lave-vaisselle, sèche-linge et plus encore pour équiper votre maison.',
    image: '/images/products/samsung-fridge-1.jpg',
    featured: true,
    subcategories: [
      { name: 'Réfrigérateurs', slug: 'refrigerateurs', image: '/images/products/samsung-fridge-1.jpg', count: 3 },
      { name: 'Lave-linge', slug: 'lave-linge', image: '/images/products/pexels-washer-load.jpg', count: 2 },
      { name: 'Lave-vaisselle', slug: 'lave-vaisselle', image: '/images/products/pexels-dishwasher-open.jpg', count: 2 },
      { name: 'Sèche-linge', slug: 'seche-linge', image: '/images/products/pexels-dryer.jpg', count: 1 },
      { name: 'Lavante-séchante', slug: 'lavante-sechante', image: '/images/products/pexels-washer-room.jpg', count: 1 },
    ],
  },
  {
    id: 'cat-2',
    name: 'Petit Électroménager',
    slug: 'petit-electromenager',
    description: 'Robots, mixeurs, cafetières, fers à repasser et tout le petit équipement du quotidien.',
    image: '/images/products/pexels-stick-vacuum.jpg',
    featured: true,
    subcategories: [
      { name: 'Cafetières & Expresso', slug: 'cafetieres', image: '/images/products/pexels-espresso.jpg', count: 2 },
      { name: 'Robots de cuisine', slug: 'robots-cuisine', image: '/images/products/pexels-stand-mixer.jpg', count: 1 },
      { name: 'Mixeurs & Blenders', slug: 'mixeurs-blenders', image: '/images/products/pexels-blender.jpg', count: 1 },
      { name: 'Fers & Centrales vapeur', slug: 'fers-repassage', image: '/images/products/pexels-iron.jpg', count: 1 },
      { name: 'Aspirateurs', slug: 'aspirateurs', image: '/images/products/pexels-stick-vacuum.jpg', count: 2 },
    ],
  },
  {
    id: 'cat-3',
    name: 'Cuisine',
    slug: 'cuisine',
    description: 'Fours encastrables, plaques de cuisson, hottes et tout l\'équipement de votre cuisine.',
    image: '/images/products/pexels-oven.jpg',
    featured: true,
    subcategories: [
      { name: 'Fours', slug: 'fours', image: '/images/products/pexels-oven.jpg', count: 1 },
      { name: 'Plaques de cuisson', slug: 'plaques-cuisson', image: '/images/products/pexels-induction-hob.jpg', count: 1 },
      { name: 'Hottes', slug: 'hottes', image: '/images/products/pexels-extractor-hood.jpg', count: 1 },
      { name: 'Micro-ondes', slug: 'micro-ondes', image: '/images/products/pexels-microwave.jpg', count: 1 },
    ],
  },
  {
    id: 'cat-4',
    name: 'Maison',
    slug: 'maison',
    description: 'Climatiseurs et purificateurs d’air pour améliorer le confort de votre intérieur.',
    image: '/images/products/pexels-air-conditioner.jpg',
    featured: true,
    subcategories: [
      { name: 'Climatiseurs', slug: 'climatiseurs', image: '/images/products/pexels-air-conditioner.jpg', count: 2 },
      { name: 'Purificateurs d\'air', slug: 'purificateurs', image: '/images/products/pexels-air-purifier.jpg', count: 1 },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
