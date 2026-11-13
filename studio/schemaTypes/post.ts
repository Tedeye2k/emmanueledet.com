import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Writing',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      title: 'Web address',
      type: 'slug',
      description: 'Click "Generate". This becomes the end of the page link.',
      options: {source: 'title', maxLength: 80},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'publishedAt', title: 'Date', type: 'date', initialValue: () => new Date().toISOString().slice(0, 10), validation: (rule) => rule.required()}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {list: ['Strategy', 'SEO', 'Content marketing', 'Personal']},
    }),
    defineField({name: 'client', title: 'Written for (optional)', type: 'string', description: 'For client work: the company it was written for, such as Resparkit. Shows as "Written for Resparkit". Leave empty for personal pieces.'}),
    defineField({name: 'excerpt', title: 'Summary', type: 'text', rows: 3, description: 'One or two sentences shown in the list and at the top of the piece.', validation: (rule) => rule.max(240)}),
    defineField({
      name: 'coverImage',
      title: 'Cover image (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'body', title: 'Text', type: 'bodyText'}),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'coverImage'}},
})
