import { defineType } from 'sanity'

export const infoPage = defineType({
  name: 'infoPage',
  title: 'Info Page',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Info Page Content',
      type: 'array',
      description: 'All content for the info page (email, address, etc.)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                title: 'Email',
                name: 'emailLink',
                type: 'object',
                fields: [
                  {
                    title: 'Email Address',
                    name: 'email',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Info Page Content',
      }
    },
  },
})