import {groq} from 'next-sanity'

import {client} from '@/sanity/lib/client'

export type Product = {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  gallery: string[]
}

type ProductQueryRow = {
  _id: string
  name: string
  price: number
  category: string
  description: string
  image: string | null
  gallery: Array<string | null> | null
}

const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    price,
    category,
    description,
    "image": image.asset->url,
    "gallery": gallery[].asset->url
  }
`

export async function getProducts(): Promise<Product[]> {
  const rows = await client.fetch<ProductQueryRow[]>(productsQuery)

  return rows
    .filter((row) => Boolean(row._id && row.name && row.image))
    .map((row) => {
      const gallery = (row.gallery ?? []).filter((image): image is string => Boolean(image))

      return {
        id: row._id,
        name: row.name,
        price: row.price,
        category: row.category,
        description: row.description,
        image: row.image ?? '',
        gallery: gallery.length ? gallery : [row.image ?? ''],
      }
    })
}