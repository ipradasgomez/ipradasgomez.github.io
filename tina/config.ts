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
            type: 'boolean',
            name: 'published',
            label: 'Publicado',
            description: 'Solo los artículos publicados aparecen en el blog.',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Autor',
          },
          {
            type: 'image',
            name: 'coverImage',
            label: 'Imagen de cabecera',
            description: 'Banner en la página del artículo.',
          },
          {
            type: 'image',
            name: 'previewImage',
            label: 'Imagen de previa',
            description: 'Miniatura en el listado del blog. Vacío: usa la imagen de cabecera.',
          },
          {
            type: 'string',
            name: 'summary',
            label: 'Resumen (ES)',
            description: 'Texto corto para el listado del blog. Vacío: usa el extracto.',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'summaryEn',
            label: 'Summary (EN)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Extracto (ES)',
            description: 'Entradilla en la página del artículo. Vacío: usa el resumen.',
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
            type: 'string',
            name: 'ogTitle',
            label: 'Compartir — título (ES)',
            description: 'Open Graph / redes. Vacío: usa el título del artículo.',
          },
          {
            type: 'string',
            name: 'ogTitleEn',
            label: 'Share — title (EN)',
          },
          {
            type: 'string',
            name: 'ogDescription',
            label: 'Compartir — descripción (ES)',
            description: 'Vacío: usa el extracto.',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'ogDescriptionEn',
            label: 'Share — description (EN)',
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'ogImage',
            label: 'Compartir — imagen',
            description: 'Vacío: usa la imagen de cabecera. Recomendado 1200×630 px.',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Contenido (ES)',
            isBody: true,
          },
          {
            type: 'string',
            name: 'bodyEn',
            label: 'Contenido (EN)',
            description: 'Markdown en inglés. Si está vacío, se usa el contenido en español.',
            ui: { component: 'textarea' },
          },
        ],
      },
      {
        name: 'experience',
        label: 'Experiencia',
        path: 'content/experience',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) => {
              const base = [values?.company, values?.role].filter(Boolean).join(' ')
              return (
                base
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-|-$/g, '') || 'experience-entry'
              )
            },
          },
        },
        defaultItem: () => ({
          published: false,
          current: false,
          startDate: new Date().toISOString(),
        }),
        fields: [
          {
            type: 'string',
            name: 'company',
            label: 'Empresa (ES)',
            required: true,
          },
          {
            type: 'string',
            name: 'companyEn',
            label: 'Company (EN)',
            description: 'Opcional. Si se omite, se usa el nombre en ES también en inglés.',
          },
          {
            type: 'string',
            name: 'role',
            label: 'Puesto (ES)',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'roleEn',
            label: 'Role (EN)',
          },
          {
            type: 'datetime',
            name: 'startDate',
            label: 'Fecha inicio',
            required: true,
          },
          {
            type: 'boolean',
            name: 'published',
            label: 'Publicado',
            description: 'Solo las entradas publicadas aparecen en la página de experiencia.',
          },
          {
            type: 'datetime',
            name: 'endDate',
            label: 'Fecha fin',
          },
          {
            type: 'boolean',
            name: 'current',
            label: 'Puesto actual',
          },
          {
            type: 'string',
            name: 'period',
            label: 'Periodo (ES)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'periodEn',
            label: 'Period (EN)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'description',
            label: 'Descripción (ES)',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'descriptionEn',
            label: 'Description (EN)',
            ui: { component: 'textarea' },
          },
          {
            type: 'object',
            name: 'highlights',
            label: 'Detalle — acciones y logros',
            description:
              'Lista opcional para el desplegable «Ver más» en la web (responsabilidades, logros técnicos, etc.).',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'type',
                label: 'Tipo',
                options: [
                  { label: 'Acción / responsabilidad', value: 'action' },
                  { label: 'Logro técnico', value: 'achievement' },
                ],
              },
              {
                type: 'string',
                name: 'text',
                label: 'Texto (ES)',
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'textEn',
                label: 'Text (EN)',
                ui: { component: 'textarea' },
              },
            ],
          },
        ],
      },
    ],
  },
})
