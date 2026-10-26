import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Gros Électroménager',
    slug: 'gros-electromenager',
    description: 'Réfrigérateurs, lave-linge, lave-vaisselle, sèche-linge et plus encore pour équiper votre maison.',
    image: '/images/categories/gros-electromenager.jpg',
    featured: true,
    subcategories: [
      { name: 'Réfrigérateurs', slug: 'refrigerateurs', image: '/images/categories/refrigerateurs.jpg', count: 8 },
      { name: 'Lave-linge', slug: 'lave-linge', image: '/images/categories/lave-linge.jpg', count: 6 },
      { name: 'Lave-vaisselle', slug: 'lave-vaisselle', image: '/images/categories/lave-vaisselle.jpg', count: 4 },
      { name: 'Sèche-linge', slug: 'seche-linge', image: '/images/categories/seche-linge.jpg', count: 3 },
      { name: 'Lavante-séchante', slug: 'lavante-sechante', image: '/images/categories/lavante-sechante.jpg', count: 2 },
    ],
  },
  {
    id: 'cat-2',
    name: 'Petit Électroménager',
    slug: 'petit-electromenager',
    description: 'Robots, mixeurs, cafetières, fers à repasser et tout le petit équipement du quotidien.',
    image: '/images/categories/petit-electromenager.jpg',
    featured: true,
    subcategories: [
      { name: 'Cafetières & Expresso', slug: 'cafetieres', image: '/images/categories/cafetieres.jpg', count: 5 },
      { name: 'Robots de cuisine', slug: 'robots-cuisine', image: '/images/categories/robots-cuisine.jpg', count: 4 },
      { name: 'Mixeurs & Blenders', slug: 'mixeurs-blenders', image: '/images/categories/mixeurs.jpg', count: 3 },
      { name: 'Fers & Centrales vapeur', slug: 'fers-repassage', image: '/images/categories/fers.jpg', count: 3 },
      { name: 'Aspirateurs', slug: 'aspirateurs', image: '/images/categories/aspirateurs.jpg', count: 4 },
    ],
  },
  {
    id: 'cat-3',
    name: 'TV & Image',
    slug: 'tv-image',
    description: 'Téléviseurs LED, OLED, QLED, barres de son et accessoires pour votre espace home cinéma.',
    image: '/images/categories/tv-image.jpg',
    featured: true,
    subcategories: [
      { name: 'Téléviseurs', slug: 'televiseurs', image: '/images/categories/televiseurs.jpg', count: 6 },
      { name: 'Barres de son', slug: 'barres-de-son', image: '/images/categories/barres-de-son.jpg', count: 3 },
      { name: 'Vidéoprojecteurs', slug: 'videoprojecteurs', image: '/images/categories/videoprojecteurs.jpg', count: 2 },
    ],
  },
  {
    id: 'cat-4',
    name: 'Téléphonie',
    slug: 'telephonie',
    description: 'Smartphones, tablettes, accessoires et montres connectées des plus grandes marques.',
    image: '/images/categories/telephonie.jpg',
    featured: true,
    subcategories: [
      { name: 'Smartphones', slug: 'smartphones', image: '/images/categories/smartphones.jpg', count: 5 },
      { name: 'Tablettes', slug: 'tablettes', image: '/images/categories/tablettes.jpg', count: 3 },
      { name: 'Montres connectées', slug: 'montres-connectees', image: '/images/categories/montres.jpg', count: 2 },
      { name: 'Accessoires', slug: 'accessoires-telephone', image: '/images/categories/accessoires-tel.jpg', count: 3 },
    ],
  },
  {
    id: 'cat-5',
    name: 'Cuisine',
    slug: 'cuisine',
    description: 'Fours encastrables, plaques de cuisson, hottes et tout l\'équipement de votre cuisine.',
    image: '/images/categories/cuisine.jpg',
    featured: true,
    subcategories: [
      { name: 'Fours', slug: 'fours', image: '/images/categories/fours.jpg', count: 4 },
      { name: 'Plaques de cuisson', slug: 'plaques-cuisson', image: '/images/categories/plaques.jpg', count: 3 },
      { name: 'Hottes', slug: 'hottes', image: '/images/categories/hottes.jpg', count: 3 },
      { name: 'Micro-ondes', slug: 'micro-ondes', image: '/images/categories/micro-ondes.jpg', count: 3 },
    ],
  },
  {
    id: 'cat-6',
    name: 'Maison',
    slug: 'maison',
    description: 'Climatisation, chauffage, purificateurs d\'air et équipements de confort pour la maison.',
    image: '/images/categories/maison.jpg',
    featured: true,
    subcategories: [
      { name: 'Climatiseurs', slug: 'climatiseurs', image: '/images/categories/climatiseurs.jpg', count: 4 },
      { name: 'Chauffages', slug: 'chauffages', image: '/images/categories/chauffages.jpg', count: 2 },
      { name: 'Purificateurs d\'air', slug: 'purificateurs', image: '/images/categories/purificateurs.jpg', count: 2 },
      { name: 'Ventilateurs', slug: 'ventilateurs', image: '/images/categories/ventilateurs.jpg', count: 2 },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
