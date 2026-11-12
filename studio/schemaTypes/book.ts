import {defineField, defineType} from 'sanity'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'author', title: 'Author', type: 'string'}),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      description: 'A tall image works best.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'rating', title: 'Rating (1 to 5)', type: 'number', options: {list: [1, 2, 3, 4, 5], layout: 'radio', direction: 'horizontal'}}),
    defineField({name: 'note', title: 'One-line note', type: 'string', validation: (rule) => rule.max(140)}),
    defineField({name: 'finishedAt', title: 'Date finished', type: 'date', description: 'Newest shows first.'}),
  ],
  preview: {select: {title: 'title', subtitle: 'author', media: 'cover'}},
})
