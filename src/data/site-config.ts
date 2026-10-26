import { SiteConfig } from '@/lib/types';

export const siteConfig: SiteConfig = {
  name: 'Maison Nova',
  tagline: 'L\'électroménager & high-tech au Maroc',
  description: 'Votre destination pour l\'électroménager, TV, téléphonie et équipement de la maison au Maroc. Livraison, installation et garantie incluses.',
  url: 'https://maison-nova.ma',
  currency: 'MAD',
  currencySymbol: 'DH',
  locale: 'fr-MA',
  phone: '+212 5XX-XXXXXX',
  email: 'contact@maison-nova.ma',
  whatsapp: '', // Set a real WhatsApp number to enable the floating button
  address: {
    street: '123 Boulevard de Démonstration',
    city: 'Casablanca',
    region: 'Casablanca-Settat',
    postalCode: '20000',
    country: 'Maroc',
    mapUrl: 'https://maps.google.com/?q=Casablanca+Maroc',
  },
  showroom: {
    name: 'Showroom Maison Nova — Casablanca',
    hours: [
      { day: 'Lundi – Vendredi', hours: '09h00 – 19h00' },
      { day: 'Samedi', hours: '09h00 – 18h00' },
      { day: 'Dimanche', hours: 'Fermé' },
    ],
    image: '/images/banners/showroom.jpg',
  },
  social: {
    facebook: 'https://facebook.com/maisonnova',
    instagram: 'https://instagram.com/maisonnova',
    youtube: 'https://youtube.com/maisonnova',
    twitter: 'https://twitter.com/maisonnova',
  },
  delivery: {
    freeThreshold: 5000,
    standardPrice: 99,
    expressPrice: 199,
    estimatedDays: '2 à 5 jours ouvrés',
  },
  topBannerMessages: [
    'Livraison offerte dès 5 000 DH d\'achat',
    'Service d\'installation disponible sur tous les gros appareils',
    'Garantie constructeur incluse sur tous nos produits',
  ],
  financing: {
    enabled: true,
    minAmount: 3000,
    months: [3, 6, 10, 12],
  },
};
