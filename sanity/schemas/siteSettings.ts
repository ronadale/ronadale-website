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
      description: 'Select the exhibition to feature on the homepage (required if no hero page is selected)',
      options: {
        filter: 'status in ["current", "upcoming"]',
      },
      validation: (Rule) => Rule.custom((exhibition, context) => {
        const heroPage = context.document?.heroPage;
        if (!exhibition && !heroPage) {
          return 'Either a Featured Exhibition or Hero Page must be selected';
        }
        return true;
      }),
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
      validation: (Rule) => Rule.custom((heroPage, context) => {
        const exhibition = context.document?.upcomingExhibition;
        if (!heroPage && !exhibition) {
          return 'Either a Hero Page or Featured Exhibition must be selected';
        }
        return true;
      }),
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