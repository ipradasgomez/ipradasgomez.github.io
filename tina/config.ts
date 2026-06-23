import { defineConfig } from 'tinacms'

const branch =
  process.env.TINA_BRANCH ||
  process.env.GITHUB_HEAD_REF ||
  process.env.GITHUB_REF_NAME ||
  'develop'

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? '',
  token: process.env.TINA_TOKEN ?? '',

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
    // Required for Docker: Tina admin assets load from :4001 on the host browser.
    host: true,
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'post',
        label: 'Blog',
        path: 'content/posts',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Título (ES)',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'titleEn',
            label: 'Title (EN)',
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Fecha',
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Extracto (ES)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'excerptEn',
            label: 'Excerpt (EN)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenido',
            isBody: true,
          },
        ],
      },
    ],
  },
})
