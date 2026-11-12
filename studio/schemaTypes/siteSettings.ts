import {defineField, defineType} from 'sanity'

const italicTip = 'Put *stars* around a word to make it italic.'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'home', title: 'Home page', default: true},
    {name: 'pages', title: 'Page headings'},
    {name: 'general', title: 'General'},
  ],
  fields: [
    defineField({name: 'eyebrow', title: 'Small line above the headline', type: 'string', group: 'home', description: 'For example: Hello, I\'m Emmanuel Edet'}),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 3,
      group: 'home',
      description: `Press Enter to start a new line. Keep each line short (about 12 letters) so it fits on phones. ${italicTip}`,
    }),
    defineField({name: 'role', title: 'Role', type: 'string', group: 'home', description: 'For example: Writer & Creative Strategist'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4, group: 'home', description: 'Two or three sentences about what you do.'}),

    defineField({name: 'writingTitle', title: 'Writing: heading', type: 'string', group: 'pages', description: italicTip}),
    defineField({name: 'writingIntro', title: 'Writing: introduction', type: 'text', rows: 2, group: 'pages'}),
    defineField({name: 'musicTitle', title: 'Music: heading', type: 'string', group: 'pages', description: italicTip}),
    defineField({name: 'musicIntro', title: 'Music: introduction', type: 'text', rows: 2, group: 'pages'}),
    defineField({name: 'booksTitle', title: 'Books: heading', type: 'string', group: 'pages', description: italicTip}),
    defineField({name: 'booksIntro', title: 'Books: introduction', type: 'text', rows: 2, group: 'pages'}),
    defineField({name: 'moviesTitle', title: 'Movies: heading', type: 'string', group: 'pages', description: italicTip}),
    defineField({name: 'moviesIntro', title: 'Movies: introduction', type: 'text', rows: 2, group: 'pages'}),

    defineField({name: 'contactTitle', title: 'Contact: heading', type: 'string', group: 'pages', description: italicTip}),
    defineField({name: 'contactIntro', title: 'Contact: introduction', type: 'text', rows: 2, group: 'pages'}),

    defineField({name: 'name', title: 'Your name', type: 'string', group: 'general'}),
    defineField({name: 'email', title: 'Contact email', type: 'string', group: 'general', description: 'Shown on the Contact page.', validation: (rule) => rule.email()}),
    defineField({name: 'musicUrl', title: 'Resparkit profile link', type: 'url', group: 'general', description: 'The "Listen on Resparkit" button on the Music page goes here.'}),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'general',
      description: 'Shown on the Contact page under your email, in this order.',
      of: [
        {
          type: 'object',
          name: 'social',
          title: 'Social link',
          fields: [
            defineField({name: 'label', title: 'Name', type: 'string', description: 'For example: Instagram', validation: (rule) => rule.required()}),
            defineField({name: 'url', title: 'Link', type: 'url', validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    }),
    defineField({name: 'footerTagline', title: 'Footer line', type: 'string', group: 'general'}),
    defineField({name: 'seoDescription', title: 'Description for Google', type: 'text', rows: 3, group: 'general', description: 'One or two sentences shown under your name in search results.', validation: (rule) => rule.max(170)}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
