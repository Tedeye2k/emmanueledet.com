import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

// "Site settings" is a single page of settings, not a list, so it gets
// its own entry at the top of the menu and can't be duplicated or deleted.
const SINGLETONS = ['siteSettings']

export default defineConfig({
  name: 'default',
  title: 'Emmanuel Edet',
  projectId: 'ojybom2y',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            S.documentTypeListItem('post').title('Writing'),
            S.documentTypeListItem('caseStudy').title('Case studies'),
            S.documentTypeListItem('thought').title('Thoughts'),
            S.divider(),
            S.documentTypeListItem('book').title('Books'),
            S.documentTypeListItem('movie').title('Movies'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETONS.includes(schemaType)),
  },

  document: {
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
