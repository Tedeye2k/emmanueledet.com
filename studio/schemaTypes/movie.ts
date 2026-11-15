import {defineField, defineType} from 'sanity'
import {ratingOptions} from './rating'

export const movie = defineType({
  name: 'movie',
  title: 'Movie or series',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'format',
      title: 'Movie or series',
      type: 'string',
      options: {list: [{title: 'Movie', value: 'movie'}, {title: 'Series', value: 'series'}], layout: 'radio', direction: 'horizontal'},
      initialValue: 'movie',
    }),
    defineField({name: 'director', title: 'Director or creator (optional)', type: 'string', description: 'Leave empty and it won’t show.'}),
    defineField({
      name: 'year',
      title: 'Year released (optional)',
      type: 'string',
      description: 'Leave empty and it won’t show. For a series you can write a range, like 2019–2023.',
      validation: (rule) => rule.regex(/^\d{4}(\s*[–-]\s*(\d{4})?)?$/).warning('Use four digits, like 2019, or a range, like 2019–2023'),
    }),
    defineField({name: 'seasons', title: 'Season(s) watched (optional)', type: 'string', description: 'Series only, like “Season 1” or “Seasons 1–3”.', hidden: ({document}) => document?.format !== 'series'}),
    defineField({
      name: 'poster',
      title: 'Poster image (optional)',
      type: 'image',
      description: 'A tall image works best. With no image, the first letter of the title shows instead.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'genre', title: 'Genre (optional)', type: 'string'}),
    defineField({name: 'rating', title: 'Rating (1 to 5)', type: 'number', options: ratingOptions}),
    defineField({name: 'note', title: 'One-line note (optional)', type: 'string', description: 'Your honest one-liner.', validation: (rule) => rule.max(140)}),
    defineField({
      name: 'rewatch',
      title: 'Would you rewatch it? (optional)',
      type: 'string',
      options: {list: [{title: 'Yes', value: 'yes'}, {title: 'Maybe', value: 'maybe'}, {title: 'No', value: 'no'}], layout: 'radio', direction: 'horizontal'},
    }),
    defineField({name: 'watchedAt', title: 'Date watched (optional)', type: 'date', description: 'Shows on the page when filled in. Newest shows first; entries with no date sit by the day you added them.'}),
    defineField({
      name: 'review',
      title: 'Full review (optional)',
      type: 'bodyText',
      description: 'Only if you wrote one. When this has text, the entry gets a “Full review” link and its own page.',
    }),
  ],
  preview: {
    select: {title: 'title', director: 'director', format: 'format', media: 'poster'},
    prepare: ({title, director, format, media}) => ({title, subtitle: [format === 'series' ? 'Series' : 'Movie', director].filter(Boolean).join(' · '), media}),
  },
})
