import { groq } from 'next-sanity';

// ─── Rooms ───
export const allRoomsQuery = groq`
  *[_type == "room"] | order(order asc) {
    _id, name, slug, tagline, mainImage, maxGuests,
    pricePerNight, directDiscount, amenities, minNights
  }
`;

export const roomBySlugQuery = groq`
  *[_type == "room" && slug.current == $slug][0] {
    _id, name, slug, tagline, description, mainImage, gallery,
    maxGuests, pricePerNight, directDiscount, amenities, minNights,
    icalAirbnb, icalBooking
  }
`;

// ─── Bookings ───
export const bookingsForRoomQuery = groq`
  *[_type == "booking" && room._ref == $roomId && status != "cancelled"] {
    checkIn, checkOut, status
  }
`;

// ─── Blog ───
export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, categories
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, mainImage, body, publishedAt, categories, seo
  }
`;

// ─── Yoga ───
export const yogaStudioQuery = groq`
  *[_type == "yogaStudio"][0] {
    title, description, mainImage, gallery, offerings
  }
`;

// ─── Site Settings ───
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title, tagline, description, heroImage, email, phone, address,
    socialLinks, location
  }
`;
