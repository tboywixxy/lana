import {groq} from 'next-sanity'

import {client} from '@/sanity/lib/client'

export type Testimonial = {
  id: string
  name: string
  role: string
  city: string
  quote: string
  statusText: string
  image?: string
  publishedAt: string
}

type TestimonialQueryRow = {
  _id: string
  name: string
  role?: string | null
  city?: string | null
  quote: string
  statusText?: string | null
  image: string | null
  publishedAt: string
}

const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(publishedAt desc) {
    _id,
    name,
    role,
    city,
    quote,
    statusText,
    "image": image.asset->url,
    publishedAt
  }
`

export async function getTestimonials(): Promise<Testimonial[]> {
  const rows = await client.fetch<TestimonialQueryRow[]>(testimonialsQuery)

  return rows
    .filter(
      (row) =>
        Boolean(
          row._id &&
            row.name &&
            (row.quote || row.statusText || row.image)
        )
    )
    .map((row) => ({
      id: row._id,
      name: row.name,
      role: row.role ?? '',
      city: row.city ?? '',
      quote: row.quote ?? '',
      statusText: row.statusText ?? row.quote ?? '',
      image: row.image ?? undefined,
      publishedAt: row.publishedAt,
    }))
}
