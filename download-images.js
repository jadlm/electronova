const fs = require('fs');
const path = require('path');

const images = [
  // ─── Products ───────────────────────────────────────────
  // p-001 Samsung Fridge
  { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-fridge-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-fridge-2.jpg' },

  // p-002 Bosch Lave-linge
  { url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/bosch-lave-linge-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/bosch-lave-linge-2.jpg' },

  // p-003 Beko Lave-vaisselle
  { url: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/beko-lave-vaisselle-1.jpg' },

  // p-004 LG Side-by-Side InstaView
  { url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-side-by-side-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-side-by-side-2.jpg' },

  // p-005 Whirlpool Sèche-linge
  { url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/whirlpool-seche-linge-1.jpg' },

  // p-006 DeLonghi Magnifica
  { url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/delonghi-magnifica-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/delonghi-magnifica-2.jpg' },

  // p-007 Dyson V15
  { url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/dyson-v15-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/dyson-v15-2.jpg' },

  // p-008 Bosch Robot
  { url: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/bosch-robot-1.jpg' },

  // p-009 Bosch Fer vapeur
  { url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/bosch-fer-1.jpg' },

  // p-010 Blender
  { url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/xiaomi-blender-1.jpg' },

  // p-011 Samsung TV QLED 65
  { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-tv-qled-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-tv-qled-2.jpg' },

  // p-012 LG OLED evo 55
  { url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-oled-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-oled-2.jpg' },

  // p-013 Sony Soundbar
  { url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/sony-barre-son-1.jpg' },

  // p-014 iPhone 15 Pro Max
  { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/iphone-15-pro-max-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/iphone-15-pro-max-2.jpg' },

  // p-015 Galaxy S24 Ultra
  { url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/galaxy-s24-ultra-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/galaxy-s24-ultra-2.jpg' },

  // p-016 Xiaomi 14 Pro
  { url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/xiaomi-14-pro-1.jpg' },

  // p-017 Apple Watch Ultra
  { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/apple-watch-ultra-1.jpg' },

  // p-018 Four encastrable Bosch
  { url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/bosch-four-1.jpg' },

  // p-019 Plaque induction
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-plaque-1.jpg' },

  // p-020 Hotte décorative
  { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/electrolux-hotte-1.jpg' },

  // p-021 Micro-ondes
  { url: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-micro-ondes-1.jpg' },

  // p-022 Climatiseur Samsung
  { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-clim-1.jpg' },

  // p-023 Purificateur d'air
  { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/dyson-purifier-1.jpg' },

  // p-024 Lave-linge Samsung
  { url: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-lave-linge-1.jpg' },

  // p-025 Brandt fridge
  { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/brandt-fridge-1.jpg' },

  // p-026 Sony Bravia
  { url: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/sony-bravia-1.jpg' },

  // p-027 iPad Air M2
  { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/ipad-air-m2-1.jpg' },

  // p-028 Climatiseur LG
  { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/lg-clim-1.jpg' },

  // p-029 Lavante-séchante
  { url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/electrolux-lavante-sechante-1.jpg' },

  // p-030 Robot Aspirateur Xiaomi
  { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/xiaomi-robot-1.jpg' },

  // p-031 Samsung Crystal UHD
  { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/samsung-crystal-uhd-1.jpg' },

  // p-032 Nespresso Vertuo
  { url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/nespresso-vertuo-1.jpg' },

  // p-033 Whirlpool Lave-vaisselle
  { url: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=800&q=80', dest: 'public/images/products/whirlpool-lave-vaisselle-1.jpg' },

  // ─── Categories ─────────────────────────────────────────
  { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/gros-electromenager.jpg' },
  { url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/petit-electromenager.jpg' },
  { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/tv-image.jpg' },
  { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/telephonie.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/cuisine.jpg' },
  { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', dest: 'public/images/categories/climatisation.jpg' },

  // Subcategories
  { url: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/refrigerateurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/lave-linge.jpg' },
  { url: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/lave-vaisselle.jpg' },
  { url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/seche-linge.jpg' },
  { url: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/lavante-sechante.jpg' },
  { url: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/cafetieres.jpg' },
  { url: 'https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/robots-cuisine.jpg' },
  { url: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/mixeurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/fers.jpg' },
  { url: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/aspirateurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/televiseurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/barres-de-son.jpg' },
  { url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/videoprojecteurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/smartphones.jpg' },
  { url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/tablettes.jpg' },
  { url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/montres.jpg' },
  { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/accessoires-tel.jpg' },
  { url: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/fours.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/plaques-cuisson.jpg' },
  { url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/hottes.jpg' },
  { url: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/micro-ondes.jpg' },
  { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/climatiseurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/purificateurs.jpg' },
  { url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', dest: 'public/images/categories/ventilateurs.jpg' },

  // ─── Banners ────────────────────────────────────────────
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/banners/hero-dishwasher-desktop.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80', dest: 'public/images/banners/hero-dishwasher-mobile.jpg' },
  { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/banners/hero-iphone-desktop.jpg' },
  { url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80', dest: 'public/images/banners/hero-iphone-mobile.jpg' },
  { url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1200&q=80', dest: 'public/images/banners/hero-oven-desktop.jpg' },
  { url: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80', dest: 'public/images/banners/hero-oven-mobile.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', dest: 'public/images/banners/editorial-kitchen.jpg' },
  { url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', dest: 'public/images/banners/editorial-financing.jpg' },
  { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', dest: 'public/images/banners/editorial-showroom.jpg' },
  { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', dest: 'public/images/banners/showroom.jpg' },
];

async function downloadAll() {
  console.log(`Starting download of ${images.length} images...`);
  let successCount = 0;

  for (const item of images) {
    try {
      const dir = path.dirname(item.dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(item.dest) && fs.statSync(item.dest).size > 1000) {
        // already downloaded
        successCount++;
        continue;
      }

      const res = await fetch(item.url);
      if (!res.ok) {
        console.warn(`Failed ${item.url} (${res.status})`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(item.dest, buffer);
      successCount++;
      process.stdout.write('.');
    } catch (err) {
      console.warn(`Error on ${item.dest}:`, err.message);
    }
  }

  console.log(`\nFinished: ${successCount}/${images.length} images downloaded successfully!`);
}

downloadAll();
