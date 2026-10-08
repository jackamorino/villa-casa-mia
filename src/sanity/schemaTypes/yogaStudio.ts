import { defineField, defineType } from 'sanity';

export const yogaStudio = defineType({
  name: 'yogaStudio',
  title: 'Yoga Studio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', initialValue: 'Yoga Studio' }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'offerings',
      title: 'Offerings',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'duration', title: 'Duration', type: 'string' }),
          defineField({ name: 'price', title: 'Price (€)', type: 'number' }),
        ],
      }],
    }),
  ],
});
