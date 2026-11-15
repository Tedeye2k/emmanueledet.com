import {defineField, defineType} from 'sanity'

export const credit = defineType({
  name: 'credit',
  title: 'Music credit',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Song or project title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'artist', title: 'Artist', type: 'string', description: 'Who released it. Use your own artist name for your songs.'}),
    defineField({
      name: 'roles',
      title: 'What you did',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: ['Producer', 'Co-producer', 'Songwriter', 'Co-writer', 'Artist', 'Mixing', 'Mastering'],
        layout: 'grid',
      },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({name: 'year', title: 'Year released', type: 'string', description: 'Newest shows first.', validation: (rule) => rule.regex(/^\d{4}$/).warning('Use four digits, like 2026')}),
    defineField({name: 'url', title: 'Link to listen (optional)', type: 'url'}),
  ],
  preview: {
    select: {title: 'title', artist: 'artist', year: 'year'},
    prepare: ({title, artist, year}) => ({title, subtitle: [artist, year].filter(Boolean).join(' · ')}),
  },
})
