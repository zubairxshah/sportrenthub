import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

interface Image {
  _id: string;
  _type: string;
  name: string;
  description: string;
}


export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.NEXT_SANITY_TOKEN,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function urlForImage(imageId: string): Promise<string> {
  try {
    const image = await client.fetch<Image>(`*[_type == "image" && _id == "${imageId}"][0]`);
    return image ? image.name : '';
  } catch (error) {
    console.error('Error fetching image:', error);
    return '';
  }
}
