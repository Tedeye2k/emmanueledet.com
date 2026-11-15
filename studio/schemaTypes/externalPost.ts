import {defineField, defineType} from 'sanity'

// A piece published on someone else's site. It shows in the Writing list
// next to the full articles, and clicking it opens the original page.
export const externalPost = defineType({
  name: 'externalPost',
  title: 'Writing link',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Article title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'client',
      title: 'Brand name',
      type: 'string',
      description: 'Who you wrote it for, such as Resparkit. Shows as "Written for Resparkit".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Article link',
      type: 'url',
      description: 'Paste the full address of the article, starting with https://',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'date',
      description: 'When it was published. Decides where it sits in the list (newest first).',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      description: 'Turn on for your best pieces. The homepage shows up to three, newest first. If none are on, it shows your three newest pieces.',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category (optional)',
      type: 'string',
      options: {list: ['Strategy', 'SEO', 'Content marketing', 'Personal']},
    }),
    defineField({
      name: 'excerpt',
      title: 'Summary (optional)',
      type: 'text',
      rows: 3,
      description: 'One or two sentences shown under the title in the list.',
      validation: (rule) => rule.max(240),
    }),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', client: 'client', date: 'publishedAt'},
    prepare: ({title, client, date}) => ({title, subtitle: [client, date].filter(Boolean).join(' · ')}),
  },
})
