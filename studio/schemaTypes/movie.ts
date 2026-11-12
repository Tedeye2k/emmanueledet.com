import {defineField, defineType} from 'sanity'

export const movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'director', title: 'Director', type: 'string'}),
    defineField({name: 'year', title: 'Year released', type: 'string', validation: (rule) => rule.regex(/^\d{4}$/).warning('Use four digits, like 2019')}),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      description: 'A tall image works best.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'rating', title: 'Rating (1 to 5)', type: 'number', options: {list: [1, 2, 3, 4, 5], layout: 'radio', direction: 'horizontal'}}),
    defineField({name: 'note', title: 'One-line note', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({name: 'watchedAt', title: 'Date watched', type: 'date', description: 'Newest shows first.'}),
  ],
  preview: {select: {title: 'title', subtitle: 'director', media: 'poster'}},
})
