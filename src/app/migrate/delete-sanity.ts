import dotenv from 'dotenv'
import { createClient } from 'next-sanity'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.NEXT_SANITY_TOKEN!,
  apiVersion: '2023-05-03',
  useCdn: false
})

async function deleteAllEquipment() {
  try {
    // First, get all equipment documents
    const query = '*[_type == "equipment"]._id'
    const documentIds = await client.fetch(query)
    
    console.log(`Found ${documentIds.length} documents to delete`)

    // Delete documents one by one
    for (const id of documentIds) {
      await client.delete(id)
      console.log(`Deleted document with ID: ${id}`)
    }

    // Delete any orphaned assets (images)
    const assetsQuery = '*[_type == "sanity.imageAsset" && !defined(references(_id))]._id'
    const assetIds = await client.fetch(assetsQuery)
    
    console.log(`Found ${assetIds.length} orphaned assets to delete`)

    for (const assetId of assetIds) {
      await client.delete(assetId)
      console.log(`Deleted asset with ID: ${assetId}`)
    }

    console.log('All equipment and related assets deleted successfully!')
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

// Add confirmation prompt
async function confirmDelete() {
  console.log(`
⚠️  WARNING: This will delete ALL equipment documents and related assets from:
Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET}
Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}

Are you sure you want to continue? Type 'yes' to confirm:
  `)

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    readline.question('', (answer: string) => {
      readline.close()
      resolve(answer.toLowerCase() === 'yes')
    })
  })
}

// Run the deletion
async function run() {
  const confirmed = await confirmDelete()
  if (confirmed) {
    await deleteAllEquipment()
  } else {
    console.log('Deletion cancelled')
  }
}

run()
