import { defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Artists',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'bio',
    },
  },
})