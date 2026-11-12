import {defineField, defineType} from 'sanity'

export const thought = defineType({
  name: 'thought',
  title: 'Thought',
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
    defineField({name: 'body', title: 'Text', type: 'bodyText'}),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'publishedAt'}},
})
