import {defineArrayMember, defineField, defineType} from 'sanity'

// The main text of a piece. Besides paragraphs, headings, quotes, lists and
// links, the "+" button in the editor can add: image, image row, table,
// video or music embed, highlight box, button and divider.
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
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Highlight', value: 'highlight'},
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
      title: 'Image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Description', description: 'What the image shows, for people who cannot see it.'}),
        defineField({name: 'caption', type: 'string', title: 'Caption (optional)'}),
        defineField({
          name: 'size',
          type: 'string',
          title: 'Size',
          options: {list: [{title: 'Same width as the text', value: 'normal'}, {title: 'Wide', value: 'wide'}, {title: 'Small, centred', value: 'small'}], layout: 'radio', direction: 'horizontal'},
          initialValue: 'normal',
        }),
      ],
    }),

    defineArrayMember({
      name: 'gallery',
      type: 'object',
      title: 'Image row',
      description: 'Two to four images side by side.',
      fields: [
        defineField({
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            defineArrayMember({
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', type: 'string', title: 'Description'})],
            }),
          ],
          options: {layout: 'grid'},
          validation: (rule) => rule.min(2).max(4),
        }),
        defineField({name: 'caption', type: 'string', title: 'Caption (optional)'}),
      ],
      preview: {
        select: {images: 'images', caption: 'caption'},
        prepare: ({images, caption}) => ({title: caption || 'Image row', subtitle: `${images?.length || 0} images`, media: images?.[0]}),
      },
    }),

    defineArrayMember({
      name: 'dataTable',
      type: 'object',
      title: 'Table',
      fields: [
        defineField({name: 'table', type: 'table', title: 'Table', description: 'Add rows and columns, then type into the cells.'}),
        defineField({name: 'headerRow', type: 'boolean', title: 'First row is the heading row', initialValue: true}),
        defineField({name: 'caption', type: 'string', title: 'Caption (optional)'}),
      ],
      preview: {
        select: {rows: 'table.rows', caption: 'caption'},
        prepare: ({rows, caption}) => ({title: caption || 'Table', subtitle: `${rows?.length || 0} rows`}),
      },
    }),

    defineArrayMember({
      name: 'embed',
      type: 'object',
      title: 'Video or music',
      description: 'YouTube, Vimeo, Spotify, SoundCloud or Apple Music.',
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'Link',
          description: 'Paste the normal link from your browser’s address bar, or the share link.',
          validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
        defineField({name: 'caption', type: 'string', title: 'Caption (optional)'}),
      ],
      preview: {select: {title: 'url', subtitle: 'caption'}, prepare: ({title, subtitle}) => ({title: subtitle || 'Video or music', subtitle: title})},
    }),

    defineArrayMember({
      name: 'callout',
      type: 'object',
      title: 'Highlight box',
      description: 'A boxed note, tip or key takeaway.',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Small label (optional)', description: 'Like “Key takeaway” or “Note”.'}),
        defineField({name: 'text', type: 'text', rows: 4, title: 'Text', validation: (rule) => rule.required()}),
      ],
      preview: {select: {title: 'label', subtitle: 'text'}, prepare: ({title, subtitle}) => ({title: title || 'Highlight box', subtitle})},
    }),

    defineArrayMember({
      name: 'button',
      type: 'object',
      title: 'Button',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Button text', validation: (rule) => rule.required()}),
        defineField({name: 'url', type: 'url', title: 'Link', validation: (rule) => rule.required().uri({scheme: ['http', 'https', 'mailto']})}),
      ],
      preview: {select: {title: 'label', subtitle: 'url'}},
    }),

    defineArrayMember({
      name: 'divider',
      type: 'object',
      title: 'Divider',
      fields: [defineField({name: 'style', type: 'string', title: 'Style', options: {list: [{title: 'Line', value: 'line'}, {title: 'Three dots', value: 'dots'}], layout: 'radio'}, initialValue: 'line'})],
      preview: {select: {style: 'style'}, prepare: ({style}) => ({title: style === 'dots' ? 'Divider · · ·' : 'Divider ———'})},
    }),
  ],
})
