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
      description: `Press Enter to start a new line. Keep each line short (about 13 letters) so it fits on phones. ${italicTip}`,
    }),
    defineField({name: 'role', title: 'Role', type: 'string', group: 'home', description: 'For example: Strategy · Writing · SEO'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4, group: 'home', description: 'Two or three sentences about what you do.'}),
    defineField({name: 'proof', title: 'Small line under the introduction', type: 'string', group: 'home', description: 'Where you work or who you have written for. For example: Currently at Resparkit · Previously Solorosco Web Service'}),

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
    defineField({name: 'email', title: 'Contact email', type: 'string', group: 'general', description: 'Used by the "Send an email" button on the Contact page.', validation: (rule) => rule.email()}),
    defineField({name: 'musicUrl', title: 'Resparkit profile link', type: 'url', group: 'general', description: 'The "Listen on Resparkit" button on the Music page goes here.'}),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'general',
      description: 'Buttons on the Contact page, in this order. Drag to reorder.',
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
    defineField({
      name: 'contactFormKey',
      title: 'Contact form key',
      type: 'string',
      group: 'general',
      description: 'Your access key from web3forms.com. With a key, "Send an email" opens a contact form that delivers to your inbox. Leave empty and the button opens the visitor\'s own email app instead.',
    }),
    defineField({name: 'footerTagline', title: 'Footer line', type: 'string', group: 'general'}),
    defineField({name: 'seoTitle', title: 'Title for Google', type: 'string', group: 'general', description: 'Shown after your name in the browser tab and in search results. For example: Content & SEO Strategist', validation: (rule) => rule.max(45)}),
    defineField({name: 'seoDescription', title: 'Description for Google', type: 'text', rows: 3, group: 'general', description: 'One or two sentences shown under your name in search results.', validation: (rule) => rule.max(170)}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
