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
      validation: (Rule) => Rule.required(),
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