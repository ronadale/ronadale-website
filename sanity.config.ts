import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { project, artist, siteSettings, infoPage, page } from './sanity/schemas'

const projectId = '46dv8ptd'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'ronadale-studio',
  title: 'Ronadale',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [project, artist, siteSettings, infoPage, page],
  },
  studio: {
    components: {
      toolMenu: () => null,
    },
  },
})