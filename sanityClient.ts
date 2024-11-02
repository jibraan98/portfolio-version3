import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Create the client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Replace with your project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Replace with your dataset
  apiVersion: '2023-09-06', // Use current date
  useCdn: true, // `false` if you want to ensure fresh data
})

// To generate image URLs
const builder = imageUrlBuilder(client)

export const urlFor = (source:any) => builder.image(source)
