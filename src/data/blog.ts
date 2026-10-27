import { BlogPost } from '@/lib/types';

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'guide-choisir-refrigerateur',
    title: 'Guide complet : comment choisir son réfrigérateur',
    excerpt: 'Capacité, classe énergétique, type de froid… Tous les critères pour bien choisir votre réfrigérateur en fonction de vos besoins.',
    content: `
## Quel type de réfrigérateur choisir ?

Le choix d'un réfrigérateur dépend de la taille de votre foyer, de l'espace disponible dans votre cuisine et de vos habitudes de consommation.

### Réfrigérateur combiné
Le modèle le plus courant au Maroc. Il dispose d'une partie réfrigérateur en haut et d'un congélateur en bas. Idéal pour les familles de 2 à 4 personnes.

### Side-by-Side
Deux portes côte à côte, souvent avec distributeur d'eau et de glaçons. Parfait pour les grandes familles avec un besoin de stockage important.

### Double porte
Un grand espace de réfrigération en haut et un congélateur en bas. Bon compromis entre capacité et encombrement.

## Les critères essentiels

### Capacité
- 1 à 2 personnes : 150 à 250 litres
- 3 à 4 personnes : 250 à 400 litres
- 5 personnes et plus : 400 litres et plus

### Classe énergétique
Privilégiez les appareils classés A+ ou mieux. La différence de consommation peut représenter des centaines de dirhams d'économie par an.

### Technologie No Frost
Le No Frost empêche la formation de givre. Plus besoin de dégivrer manuellement votre appareil. Un vrai gain de temps et de confort.

### Niveau sonore
Si votre cuisine est ouverte sur le salon, un appareil silencieux (moins de 40 dB) sera plus agréable au quotidien.

## Notre sélection

Découvrez notre gamme de réfrigérateurs Samsung, LG, Bosch et Brandt dans notre rayon dédié.
    `,
    image: '/images/blog/guide-refrigerateur.jpg',
    category: 'Guides d\'achat',
    author: 'Équipe Maison Nova',
    date: '2026-10-15',
    readTime: '5 min',
    relatedPosts: ['blog-2', 'blog-3'],
  },
  {
    id: 'blog-2',
    slug: 'entretenir-lave-linge',
    title: '5 astuces pour entretenir votre lave-linge',
    excerpt: 'Un entretien régulier prolonge la durée de vie de votre lave-linge et garantit un linge toujours propre et frais.',
    content: `
## Pourquoi entretenir son lave-linge ?

Un lave-linge mal entretenu peut développer des odeurs, laisser des résidus sur le linge et voir sa durée de vie réduite. Voici 5 astuces simples pour un appareil toujours au top.

### 1. Nettoyez le tambour une fois par mois
Lancez un cycle à vide à 90°C avec un verre de vinaigre blanc. Cela élimine les résidus de lessive et les bactéries.

### 2. Laissez la porte ouverte après chaque lavage
L'humidité résiduelle favorise les moisissures. Laissez la porte entrouverte pour ventiler le tambour.

### 3. Nettoyez le filtre régulièrement
Le filtre de vidange récupère les petits objets et les peluches. Nettoyez-le tous les 2 mois pour éviter les bouchons.

### 4. Détartrez l'appareil
Utilisez un détartrant spécial lave-linge tous les 3 mois, surtout si vous avez une eau calcaire.

### 5. Dosez correctement la lessive
Trop de lessive = des résidus dans la machine. Suivez les recommandations du fabricant et utilisez la dose adaptée au poids du linge.

## En résumé

Un entretien minimal mais régulier suffit à garantir des performances optimales pendant de nombreuses années.
    `,
    image: '/images/blog/entretien-lave-linge.jpg',
    category: 'Conseils',
    author: 'Équipe Maison Nova',
    date: '2026-10-08',
    readTime: '3 min',
    relatedPosts: ['blog-1', 'blog-3'],
  },
  {
    id: 'blog-3',
    slug: 'tendances-smart-home-2026',
    title: 'Smart Home 2026 : les tendances au Maroc',
    excerpt: 'Climatiseurs connectés, purificateurs intelligents, robots aspirateurs : la maison connectée s\'installe au Maroc.',
    content: `
## La maison connectée au Maroc

La domotique n'est plus réservée aux passionnés de technologie. En 2026, les appareils connectés deviennent accessibles et pratiques pour tous les foyers marocains.

### Climatisation intelligente
Les climatiseurs Samsung Wind-Free™ et LG Dual Inverter se contrôlent depuis votre smartphone. Programmez le refroidissement avant votre retour à la maison pour un confort immédiat.

### Robots aspirateurs
Les robots aspirateurs-laveurs comme le Xiaomi X10+ gèrent le ménage en autonomie pendant 7 semaines grâce à leur station de vidage automatique. Un gain de temps considérable.

### Purification de l'air
Les purificateurs Dyson surveillent la qualité de l'air en temps réel et ajustent leur filtration. Idéal dans les grandes villes.

### Électroménager connecté
Les réfrigérateurs LG InstaView et les fours Bosch avec connectivité WiFi offrent un contrôle à distance et des diagnostics intelligents.

## Par où commencer ?

Commencez par un appareil qui résout un problème concret du quotidien. Un robot aspirateur ou un climatiseur connecté sont d'excellents premiers pas.
    `,
    image: '/images/blog/smart-home-2026.jpg',
    category: 'Tendances',
    author: 'Équipe Maison Nova',
    date: '2026-09-25',
    readTime: '4 min',
    relatedPosts: ['blog-1', 'blog-2'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(post: BlogPost): BlogPost[] {
  return (post.relatedPosts || [])
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter(Boolean) as BlogPost[];
}
