import { defineField, defineType } from 'sanity';

export const booking = defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'room',
      title: 'Room',
      type: 'reference',
      to: [{ type: 'room' }],
      validation: (r) => r.required(),
    }),
    defineField({ name: 'guestName', title: 'Guest Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'guestEmail', title: 'Guest Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'guestPhone', title: 'Guest Phone', type: 'string' }),
    defineField({ name: 'checkIn', title: 'Check-in', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'checkOut', title: 'Check-out', type: 'date', validation: (r) => r.required() }),
    defineField({ name: 'guests', title: 'Number of Guests', type: 'number', validation: (r) => r.required().min(1) }),
    defineField({ name: 'totalPrice', title: 'Total Price (€)', type: 'number' }),
    defineField({ name: 'notes', title: 'Guest Notes', type: 'text' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Direct (Website)', value: 'direct' },
          { title: 'Airbnb', value: 'airbnb' },
          { title: 'Booking.com', value: 'booking' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'direct',
    }),
  ],
  preview: {
    select: { title: 'guestName', room: 'room.name', checkIn: 'checkIn', status: 'status' },
    prepare({ title, room, checkIn, status }) {
      return {
        title: `${title} — ${room || 'No room'}`,
        subtitle: `${checkIn || '?'} · ${status}`,
      };
    },
  },
});
