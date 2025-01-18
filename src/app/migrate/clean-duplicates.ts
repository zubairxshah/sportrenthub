// cleanup-duplicates.ts
import dotenv from 'dotenv'
import { createClient } from 'next-sanity'

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
        console.log(`Found ${itemsArray.length - 1} duplicates for: ${name}`)
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

// Run cleanup
cleanupDuplicates()
