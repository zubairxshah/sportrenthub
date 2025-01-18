import dotenv from 'dotenv'
import { createClient } from 'next-sanity'
import { equipmentData, categoryData } from '../data-sets/mockData'
import fetch from 'node-fetch'
import path from 'path'
import { v4 as uuidv4 } from 'uuid' // Add this import for generating unique keys


dotenv.config({ path: '.env.local' })

const { projectId, dataset, token } = validateEnvironment()

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2023-05-03',
  useCdn: false
})

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

// Function to upload image to Sanity including duplicate checks

// Function to check if equipment exists
async function checkEquipmentExists(name: string) {
  const existingEquipment = await client.fetch(
    `*[_type == "equipment" && name == $name][0]`,
    { name }
  )
  return existingEquipment
}

// Function to check if category exists
async function checkCategoryExists(name: string) {
  const existingCategory = await client.fetch(
    `*[_type == "category" && name == $name][0]`,
    { name }
  )
  return existingCategory
}

// Function to upload image
async function uploadImageToSanity(imageUrl: string) {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Failed to fetch image: ${imageUrl}`)
    
    const buffer = Buffer.from(await response.arrayBuffer())
    const filename = path.basename(imageUrl)

    const asset = await client.assets.upload('image', buffer, {
      filename: filename
    })

    return {
      _type: 'image',
      _key: uuidv4(),
      asset: {
        _type: 'reference',
        _ref: asset._id
      }
    }
  } catch (error) {
    console.error(`Failed to upload image ${imageUrl}:`, error)
    throw error
  }
}

// Function to create or update category
async function createOrUpdateCategory(categoryData: any) {
  try {
    const existingCategory = await checkCategoryExists(categoryData.name)

    if (existingCategory) {
      console.log(`Category "${categoryData.name}" already exists, skipping...`)
      return existingCategory
    }

    // Upload category image
    const categoryImage = await uploadImageToSanity(categoryData.image)

    // Create new category
    const category = await client.create({
      _type: 'category',
      name: categoryData.name,
      slug: {
        _type: 'slug',
        current: categoryData.name.toLowerCase().replace(/\s+/g, '-')
      },
      image: categoryImage
    })

    console.log(`Created category: ${category.name}`)
    return category
  } catch (error) {
    console.error('Error in createOrUpdateCategory:', error)
    throw error
  }
}

// Function to create or update equipment
async function createOrUpdateEquipment(equipmentItem: any) {
  try {
    const existingEquipment = await checkEquipmentExists(equipmentItem.name)

    if (existingEquipment) {
      console.log(`Equipment "${equipmentItem.name}" already exists, skipping...`)
      return existingEquipment
    }

    // Get or create category
    const category = await createOrUpdateCategory(equipmentItem.category)

    // Upload equipment images
    const uploadedImages = await Promise.all(
      equipmentItem.image.map((img: any) => uploadImageToSanity(img.name))
    )

    // Create new equipment
    const equipment = {
      _type: 'equipment',
      name: equipmentItem.name,
      description: equipmentItem.description,
      price: equipmentItem.price,
      category: {
        _type: 'reference',
        _ref: category._id
      },
      image: uploadedImages
    }

    const createdEquipment = await client.create(equipment)
    console.log(`Created equipment: ${createdEquipment.name}`)
    return createdEquipment
  } catch (error) {
    console.error('Error in createOrUpdateEquipment:', error)
    throw error
  }
}

// Main migration function
async function migrateData() {
  try {
    console.log('Starting data migration...')

    // First, migrate categories
    console.log('Migrating categories...')
    for (const category of categoryData) {
      await createOrUpdateCategory(category)
    }

    // Then migrate equipment
    console.log('Migrating equipment...')
    for (const item of equipmentData) {
      await createOrUpdateEquipment(item)
    }

    console.log('Data migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Function to clean up duplicates
async function cleanupDuplicates() {
  try {
    console.log('Starting duplicate cleanup...')

    // Get all equipment grouped by name
    const duplicates = await client.fetch(`
      *[_type == "equipment"] {
        "id": _id,
        "name": name,
        "created": _createdAt
      } | order(_createdAt asc)
    `)

    // Group by name
    const groupedByName = duplicates.reduce((acc: any, curr: any) => {
      if (!acc[curr.name]) {
        acc[curr.name] = []
      }
      acc[curr.name].push(curr)
      return acc
    }, {})

    // Delete duplicates (keep the oldest entry)
    for (const [name, items] of Object.entries(groupedByName)) {
      const itemsArray = items as any[]
      if (itemsArray.length > 1) {
        // Keep the first (oldest) item, delete the rest
        const duplicatesToDelete = itemsArray.slice(1)
        for (const item of duplicatesToDelete) {
          await client.delete(item.id)
          console.log(`Deleted duplicate equipment: ${name} (ID: ${item.id})`)
        }
      }
    }

    console.log('Duplicate cleanup completed!')
  } catch (error) {
    console.error('Error cleaning up duplicates:', error)
  }
}

// Execute migration and cleanup
async function main() {
  await migrateData()
  await cleanupDuplicates()
}

main()

