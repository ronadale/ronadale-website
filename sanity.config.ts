import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { project, artist, siteSettings, infoPage } from './sanity/schemas'

const projectId = '46dv8ptd'
const dataset = 'production'

export default defineConfig({
  basePath: '/studio',
  name: 'ronadale-studio',
  title: 'Ronadale Art Residency',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [project, artist, siteSettings, infoPage],
  },
})