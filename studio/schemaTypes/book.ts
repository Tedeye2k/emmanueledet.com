import {defineField, defineType} from 'sanity'
import {ratingOptions} from './rating'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'author', title: 'Writer (optional)', type: 'string', description: 'Leave empty and it won’t show.'}),
    defineField({name: 'year', title: 'Year published (optional)', type: 'string', description: 'Leave empty and it won’t show.', validation: (rule) => rule.regex(/^\d{4}$/).warning('Use four digits, like 1958')}),
    defineField({
      name: 'cover',
      title: 'Cover image (optional)',
      type: 'image',
      description: 'A tall image works best. With no image, a plain block with the title shows instead.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'genre', title: 'Genre (optional)', type: 'string'}),
    defineField({name: 'rating', title: 'Rating (1 to 5)', type: 'number', options: ratingOptions}),
    defineField({name: 'note', title: 'One-line note (optional)', type: 'string', description: 'Your honest one-liner. Shows as the big quote.', validation: (rule) => rule.max(140)}),
    defineField({name: 'summary', title: 'Short review (optional)', type: 'text', rows: 4, description: 'A few sentences under the quote. Leave empty and it won’t show.', validation: (rule) => rule.max(600)}),
    defineField({
      name: 'reread',
      title: 'Would you reread it? (optional)',
      type: 'string',
      options: {list: [{title: 'Yes', value: 'yes'}, {title: 'Maybe', value: 'maybe'}, {title: 'No', value: 'no'}], layout: 'radio', direction: 'horizontal'},
    }),
    defineField({name: 'finishedAt', title: 'Date finished', type: 'date', description: 'Newest shows first.'}),
    defineField({
      name: 'review',
      title: 'Full review (optional)',
      type: 'bodyText',
      description: 'Only if you wrote one. When this has text, the book gets a “Read the full review” link and its own page.',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'author', media: 'cover'}},
})
