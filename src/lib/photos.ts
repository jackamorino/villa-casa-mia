/**
 * Property photographs in /public/photos (taken from the Airbnb listing for
 * the first-floor apartment). All are portrait. Replace with full-size
 * originals before launch.
 */
export const photos = {
  dusk: { src: '/photos/dusk.jpg', alt: "La facciata di Villa Casa Mia illuminata all'imbrunire" },
  bedroom: { src: '/photos/bedroom.jpg', alt: 'Camera con letto king size, travi a vista e muro in pietra' },
  living: { src: '/photos/living.jpg', alt: 'Ingresso al soggiorno con muro in pietra e divano giallo' },
  dining: { src: '/photos/dining.jpg', alt: 'Zona pranzo davanti al muro in pietra antica' },
  kitchen: { src: '/photos/kitchen.jpg', alt: 'Cucina completa sotto le travi in legno' },
  bath: { src: '/photos/bath.jpg', alt: 'Bagno con lavabo in pietra e specchio tondo' },
  terrace: { src: '/photos/terrace.jpg', alt: 'Terrazzo con tavolino in ferro battuto lungo la facciata' },
  welcome: { src: '/photos/welcome.jpg', alt: 'Benvenuto in cucina: pasta, vino e olio del territorio' },
  sunset: { src: '/photos/sunset.jpg', alt: 'Cielo rosso al tramonto sui Colli Euganei' },
  garden: { src: '/photos/garden.jpg', alt: 'Il giardino illuminato al crepuscolo, con i colli sullo sfondo' },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];
