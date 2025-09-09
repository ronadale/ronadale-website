import { defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Exhibitions',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current', value: 'current' },
          { title: 'Upcoming', value: 'upcoming' },
          { title: 'Past', value: 'past' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: 'Cover Image (for homepage)',
      type: 'image',
      description: 'Main image shown on homepage when this project is featured',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'images',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
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
            },
          ],
        },
      ],
    },
    {
      name: 'pressLinks',
      title: 'Press Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        },
      ],
    },
    {
      name: 'pressDownloads',
      title: 'Press Downloads (PDFs)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Download Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'file',
              title: 'PDF File',
              type: 'file',
              options: {
                accept: '.pdf',
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'file',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'images.0',
      artist0: 'artists.0.name',
      artist1: 'artists.1.name',
      artist2: 'artists.2.name',
    },
    prepare(selection) {
      const { title, subtitle, media, artist0, artist1, artist2 } = selection;
      const artists = [artist0, artist1, artist2].filter(Boolean);
      const artistNames = artists.length > 0 ? artists.join(', ') : null;
      
      return {
        title: title || artistNames || 'Untitled Exhibition',
        subtitle,
        media,
      };
    },
  },
})