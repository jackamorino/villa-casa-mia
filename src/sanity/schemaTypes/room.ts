import { defineField, defineType } from 'sanity';

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'Short description for cards' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'maxGuests', title: 'Max Guests', type: 'number', validation: (r) => r.required().min(1) }),
    defineField({ name: 'pricePerNight', title: 'Price per Night (€)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'directDiscount', title: 'Direct Booking Discount (%)', type: 'number', initialValue: 5 }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'minNights', title: 'Minimum Nights', type: 'number', initialValue: 2 }),
    defineField({ name: 'icalAirbnb', title: 'Airbnb iCal URL', type: 'url', description: 'Export URL from Airbnb calendar' }),
    defineField({ name: 'icalBooking', title: 'Booking.com iCal URL', type: 'url', description: 'Export URL from Booking.com calendar' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'mainImage' },
  },
});
