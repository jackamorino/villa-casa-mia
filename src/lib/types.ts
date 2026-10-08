import type { PortableTextBlock } from '@portabletext/react';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface Room {
  _id: string;
  name: string;
  slug: { current: string };
  tagline?: string;
  description?: PortableTextBlock[];
  mainImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  maxGuests: number;
  pricePerNight: number;
  directDiscount: number;
  amenities?: string[];
  minNights: number;
  icalAirbnb?: string;
  icalBooking?: string;
  order?: number;
}

export interface Booking {
  checkIn: string;
  checkOut: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
  publishedAt: string;
  categories?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  _updatedAt?: string;
}

export interface YogaStudio {
  title: string;
  description?: PortableTextBlock[];
  mainImage?: SanityImageSource;
  gallery?: SanityImageSource[];
  offerings?: {
    _key: string;
    name: string;
    description?: string;
    duration?: string;
    price?: number;
  }[];
}

export interface SiteSettings {
  title?: string;
  tagline?: string;
  description?: string;
  heroImage?: SanityImageSource;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    airbnb?: string;
    booking?: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}
