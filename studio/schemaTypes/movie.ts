import {defineField, defineType} from 'sanity'
import {ratingOptions} from './rating'

export const movie = defineType({
  name: 'movie',
  title: 'Movie',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'director', title: 'Director (optional)', type: 'string', description: 'Leave empty and it won’t show.'}),
    defineField({name: 'year', title: 'Year released (optional)', type: 'string', description: 'Leave empty and it won’t show.', validation: (rule) => rule.regex(/^\d{4}$/).warning('Use four digits, like 2019')}),
    defineField({
      name: 'poster',
      title: 'Poster image (optional)',
      type: 'image',
      description: 'A tall image works best. With no image, the stub shows a plain block with the title.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'genre', title: 'Genre (optional)', type: 'string'}),
    defineField({name: 'rating', title: 'Rating (1 to 5)', type: 'number', options: ratingOptions}),
    defineField({name: 'note', title: 'One-line note', type: 'string', description: 'Your honest one-liner. Shows on the stub.', validation: (rule) => rule.max(140)}),
    defineField({
      name: 'rewatch',
      title: 'Would you rewatch it? (optional)',
      type: 'string',
      options: {list: [{title: 'Yes', value: 'yes'}, {title: 'Maybe', value: 'maybe'}, {title: 'No', value: 'no'}], layout: 'radio', direction: 'horizontal'},
    }),
    defineField({name: 'watchedAt', title: 'Date watched', type: 'date', description: 'Newest shows first.'}),
    defineField({
      name: 'review',
      title: 'Full review (optional)',
      type: 'bodyText',
      description: 'Only if you wrote one. When this has text, the stub gets a “Read full review” button.',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'director', media: 'poster'}},
})
