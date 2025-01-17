import { defineType, defineField } from "sanity"

export default defineType({
    name: 'penalty',
    title: 'Penalty',
    type: 'document',
    fields: [
      defineField({
        name: 'userID',
        title: 'User ID',
        type: 'reference',
        to: [{ type: 'user' }]
      }),
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
        name: 'penaltyAmount',
        title: 'Penalty Amount',
        type: 'number'
      }),
      defineField({
        name: 'penaltyDate',
        title: 'Penalty Date',
        type: 'datetime'
      }),
      defineField({
        name: 'penaltyReason',
        title: 'Penalty Reason',
        type: 'string'
      }),
      defineField({
        name: 'penaltyStatus',
        title: 'Penalty Status',
        type: 'string'
      })
    ]
})
  
