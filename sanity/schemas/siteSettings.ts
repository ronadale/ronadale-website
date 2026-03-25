import { defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'upcomingExhibition',
      title: 'Featured Exhibition',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Select the exhibition to feature on the homepage',
      options: {
        filter: 'status in ["current", "upcoming"]',
      },
    },
    {
      name: 'heroPage',
      title: 'Hero Page',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'Optional page to display as hero section on homepage (takes priority over featured exhibition)',
      options: {
        filter: 'status == "published"',
      },
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Standalone image for the homepage when no exhibition or hero page is active',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroImageLink',
      title: 'Hero Image Link',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Optional: link the hero image to an exhibition',
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage Settings',
      }
    },
  },
})