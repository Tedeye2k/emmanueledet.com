import {defineField, defineType} from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
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
    defineField({name: 'client', title: 'Client', type: 'string'}),
    defineField({name: 'role', title: 'Your role', type: 'string', description: 'For example: Strategy & copy'}),
    defineField({name: 'year', title: 'Year', type: 'string', validation: (rule) => rule.regex(/^\d{4}$/).warning('Use four digits, like 2026')}),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 3, description: 'The problem in a sentence, the result in another.', validation: (rule) => rule.max(240)}),
    defineField({
      name: 'coverImage',
      title: 'Cover image (optional)',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
    }),
    defineField({name: 'body', title: 'The story', type: 'bodyText'}),
  ],
  preview: {select: {title: 'title', subtitle: 'client', media: 'coverImage'}},
})
