import { defineType } from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Footer Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' }
          ],
          lists: [],
          marks: {
            decorators: [
              { title: 'Emphasis', value: 'em' },
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
            ],
          },
        },
        {
          type: 'object',
          name: 'lineBreak',
          title: 'Line Break',
          fields: [
            {
              name: 'style',
              type: 'string',
              initialValue: 'lineBreak',
            }
          ],
          preview: {
            prepare() {
              return {
                title: 'Line Break',
                subtitle: '---'
              }
            }
          }
        },
      ],
      description: 'The text that appears in the footer across all pages',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only one footer can be active at a time',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'text.0.children.0.text',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, active } = selection;
      return {
        title: title || 'Footer Content',
        subtitle: active ? 'Active' : 'Inactive',
      };
    },
  },
})