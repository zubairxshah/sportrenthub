
// import { createClient } from '@sanity/client'
// import axios from 'axios'
// import dotenv from 'dotenv'
// import { fileURLToPath } from 'url'
// import path from 'path'

// // Load environment variables from .env.local
// dotenv.config({ path: '.env.local' })

// const { projectId, dataset, token } = validateEnvironment()

// const client = createClient({
//   projectId,
//   dataset,
//   token,
//   apiVersion: '2023-05-03',
//   useCdn: false
// })

// function validateEnvironment() {
//   const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
//   const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
//   const token = process.env.NEXT_SANITY_TOKEN

//   if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined')
//   if (!dataset) throw new Error('NEXT_PUBLIC_SANITY_DATASET is not defined')
//   if (!token) throw new Error('NEXT_SANITY_TOKEN is not defined')
  
//   if (!token.startsWith('sk')) {
//     throw new Error('NEXT_SANITY_TOKEN should start with "sk"')
//   }

//   return { projectId, dataset, token }
// }

// // data insertion function
// async function uploadImageToSanity(imageUrl:string) {
//   try {
//     console.log(`Uploading image: ${imageUrl}`)
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' })
//     const buffer = Buffer.from(response.data)
//     const asset = await client.assets.upload('image', buffer, {
//       filename: imageUrl.split('/').pop()
//     })
//     console.log(`Image uploaded successfully: ${asset._id}`)
//     return asset._id
//   } catch (error) {
//     console.error('Failed to upload image:', imageUrl, error)
//     return null
//   }
// }
// async function importData() {
//   try {
//     console.log('Fetching products from API...')
//     const response = await axios.get('https://template6-six.vercel.app/api/products')
//     const products = response.data
//     console.log(`Fetched ${products.length} products`)
//     for (const product of products) {
//       console.log(`Processing product: ${product.title}`)
//       let imageRef = null
//       if (product.image) {
//         imageRef = await uploadImageToSanity(product.image)
//       }
//       const sanityProduct = {
//         _type: 'product',
//         name: product.title,
//         description: product.description,
//         price: product.price,
//         discountPercentage: 0,
//         priceWithoutDiscount: product.price,
//         rating: product.rating?.rate || 0,
//         ratingCount: product.rating?.count || 0,
//         tags: product.category ? [product.category] : [],
//         sizes: [],
//         image: imageRef ? {
//           _type: 'image',
//           asset: {
//             _type: 'reference',
//             _ref: imageRef,
//           },
//         } : undefined,
//       }
//       console.log('Uploading product to Sanity:', sanityProduct.name)
//       const result = await client.create(sanityProduct)
//       console.log(`Product uploaded successfully: ${result._id}`)
//     }
//     console.log('Data import completed successfully!')
//   } catch (error) {
//     console.error('Error importing data:', error)
//   }
// }
// importData()