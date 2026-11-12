import {defineArrayMember, defineField, defineType} from 'sanity'

// The main text of a piece: paragraphs, headings, quotes, lists, links, images.
export const bodyText = defineType({
  name: 'bodyText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Small heading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbers', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'Web address',
                validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Description', description: 'What the image shows, for people who cannot see it.'}),
        defineField({name: 'caption', type: 'string', title: 'Caption'}),
      ],
    }),
  ],
})
