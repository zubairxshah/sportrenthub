// scripts/migrateReviews.ts
// import { client } from '@/sanity/lib/client'
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

interface Review {
  _type: string;
  userID: {
    _type: string;
    _ref: string;
  };
  equipmentID: {
    _type: string;
    _ref: string;
  };
  reviewDate: string;
  rating: number;
  comments: string;
}

const migrateReviews = async () => {
  try {
    console.log('Starting reviews migration...')

    // First, fetch existing users
    const usersQuery = `*[_type == "user"]{
      _id,
      name
    }`
    const users = await client.fetch(usersQuery)
    
    if (users.length === 0) {
      throw new Error('No users found in the database')
    }

    // Fetch existing equipment
    const equipmentQuery = `*[_type == "equipment"]{
      _id,
      name
    }`
    const equipment = await client.fetch(equipmentQuery)
    
    if (equipment.length === 0) {
      throw new Error('No equipment found in the database')
    }

    // Create sample reviews using existing users and equipment
    const reviews : Review[] = []
    
    // Create one review per user for random equipment items
    users.forEach((user: { _id: any; }) => {
      // Get 2 random equipment items for each user
      const randomEquipment = equipment
        .sort(() => 0.5 - Math.random())
        .slice(0, 2)

      randomEquipment.forEach((equip: { _id: any; name: any; }) => {
        reviews.push({
          _type: 'review',
          userID: {
            _type: 'reference',
            _ref: user._id
          },
          equipmentID: {
            _type: 'reference',
            _ref: equip._id
          },
          reviewDate: new Date().toISOString(),
          rating: Math.floor(Math.random() * 2) + 4, // Random rating 4-5
          comments: `Great experience with ${equip.name}! The equipment was in perfect condition and exactly what I needed.`
        })
      })
    })

    // Create reviews in Sanity
    const createdReviews = await Promise.all(
      reviews.map(review => client.create(review))
    )

    console.log(`Successfully created ${createdReviews.length} reviews`)
    console.log('Reviews created:', createdReviews.map(review => ({
      id: review._id,
      userId: review.userID._ref,
      equipmentId: review.equipmentID._ref
    })))
    
    return createdReviews
  } catch (error) {
    console.error('Reviews migration failed:', error)
    return []
  }
}

// Run the migration if this file is executed directly
if (require.main === module) {
  migrateReviews()
}

export default migrateReviews
