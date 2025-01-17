import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'returnSchema',
    title: 'Return',
    type: 'document',
    fields: [
      defineField({
        name: 'rentalID',
        title: 'Rental ID',
        type: 'reference',
        to: [{ type: 'rental' }]
      }),
      defineField({
        name: 'equipmentID',
        title: 'Equipment ID', 
        type: 'reference',
        to: [{ type: 'equipment' }]
      }),
      defineField({
        name: 'userID',
        title: 'User ID',
        type: 'reference',
        to: [{ type: 'user' }]
      }),
      defineField({
        name: 'returnDate',
        title: 'Return Date',
        type: 'datetime'
      }),
      defineField({
        name: 'returnStatus',
        title: 'Return Status',
        type: 'string'
      }),
      defineField({
        name: 'pickupDate',
        title: 'Pickup Date',
        type: 'datetime'
      }),
    ],
})
  
