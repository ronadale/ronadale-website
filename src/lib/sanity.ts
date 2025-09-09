import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityConfig = {
  projectId: '46dv8ptd',
  dataset: 'production',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
}

export const client = createClient(sanityConfig)

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// GROQ queries
export const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  images[] {
    asset->,
    caption
  },
  status,
  startDate,
  endDate,
  artists[]-> {
    name
  }
}`

export const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images[] {
    asset->,
    caption
  },
  pressLinks[] {
    title,
    url
  },
  pressDownloads[] {
    title,
    file {
      asset->
    }
  },
  status,
  startDate,
  endDate,
  artists[]-> {
    name,
    bio
  }
}`

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  upcomingExhibition-> {
    title,
    slug,
    status,
    coverImage {
      asset->
    },
    images[] {
      asset->,
      caption
    },
    startDate,
    endDate,
    artists[]-> {
      name
    }
  }
}`

export const PAGES_QUERY = `*[_type == "page"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  images[] {
    asset->,
    caption
  },
  status,
  date,
  artists[] {
    name
  }
}`

export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  images[] {
    asset->,
    caption
  },
  pressLinks[] {
    title,
    url
  },
  pressDownloads[] {
    title,
    file {
      asset->
    }
  },
  status,
  date,
  artists[] {
    name
  }
}`

export const FOOTER_QUERY = `*[_type == "footer" && isActive == true][0] {
  _id,
  text,
  isActive
}`