import dotenv from 'dotenv'
import { createClient } from 'next-sanity'
import { equipmentData } from '../data-sets/mockData'
import imageUrlBuilder from '@sanity/image-url'
import fetch from 'node-fetch'

dotenv.config({ path: '.env.local' })

const { projectId, dataset, token } = validateEnvironment()

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2023-05-03',
  useCdn: false
})



// Function to upload image to Sanity
async function uploadImageToSanity(imageUrl: string) {
  try {
    // Fetch the image
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`)
    
    // Convert arrayBuffer to Buffer
    const buffer = Buffer.from(await response.arrayBuffer())

    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop() // Get filename from URL
    })

    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Failed to upload image ${imageUrl}:`, error)
    return null
  }
}


// Function to process document with images
async function processDocument(item: any) {
  const processedDoc = { ...item }

  // Handle single image field
  if (item.image) {
    const uploadedImage = await uploadImageToSanity(item.image)
    if (uploadedImage) {
      processedDoc.image = uploadedImage
    }
  }

  // Handle image array if exists
  if (item.images && Array.isArray(item.images)) {
    const uploadedImages = await Promise.all(
      item.images.map((imageUrl: string) => uploadImageToSanity(imageUrl))
    )
    processedDoc.images = uploadedImages.filter(img => img !== null)
  }

  // Handle nested image fields if any
  if (item.gallery) {
    processedDoc.gallery = await Promise.all(
      item.gallery.map(async (galleryItem: any) => {
        if (galleryItem.image) {
          const uploadedImage = await uploadImageToSanity(galleryItem.image)
          return {
            ...galleryItem,
            image: uploadedImage
          }
        }
        return galleryItem
      })
    )
  }

  return processedDoc
}

// Function to create Category in Sanity
async function createCategory(categoryData: { name: string }) {
  try {
    // Check if category already exists
    const existingCategory = await client.fetch(
      `*[_type == "category" && name == $name][0]`,
      { name: categoryData.name }
    )

    if (existingCategory) {
      console.log(`Category "${categoryData.name}" already exists`)
      return existingCategory
    }

    // Create new category
    const category = await client.create({
      _type: 'category',
      name: categoryData.name,
      slug: {
        _type: 'slug',
        current: categoryData.name.toLowerCase().replace(/\s+/g, '-')
      }
    })

    console.log(`Created category: ${category.name}`)
    return category
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

// Create a document in Sanity
const createDocument = async (item: any) => {
  try {
    // Process the document and upload images
    const processedDoc = await processDocument(item)
    
    const doc = {
      _type: 'equipment',
      ...processedDoc,
    }
    
    const response = await client.create(doc)
    console.log(`✅ Created document with ID: ${response._id}`)
    return response
  } catch (error) {
    console.error('⚠️ Error:', error)
    throw error
  }
}

// Main migration function
async function migrateData() {
  try {
    console.log('Starting migration...')
    console.log('Project ID:', projectId)
    console.log('Dataset:', dataset)
    
    const total = equipmentData.length
    let completed = 0

    for (const item of equipmentData) {
      await createDocument(item)
      completed++
      console.log(`Progress: ${completed}/${total} (${Math.round(completed/total * 100)}%)`)
    }

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

function validateEnvironment() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const token = process.env.NEXT_SANITY_TOKEN

  if (!projectId) throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined')
  if (!dataset) throw new Error('NEXT_PUBLIC_SANITY_DATASET is not defined')
  if (!token) throw new Error('NEXT_SANITY_TOKEN is not defined')
  
  if (!token.startsWith('sk')) {
    throw new Error('NEXT_SANITY_TOKEN should start with "sk"')
  }

  return { projectId, dataset, token }
}

// Run migration
migrateData()
