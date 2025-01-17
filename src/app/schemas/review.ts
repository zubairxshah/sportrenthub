import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'review',
    title: 'Review',
    type: 'document',
    fields: [
      defineField({
        name: 'userID',
        title: 'User ID',
        type: 'reference',
        to: [{ type: 'user' }]
      }),
      defineField({
        name: 'equipmentID', 
        title: 'Equipment ID',
        type: 'reference',
        to: [{ type: 'equipment' }]
      }),
      defineField({
        name: 'reviewDate',
        title: 'Review Date', 
        type: 'datetime'
      }),
      defineField({
        name: 'rating',
        title: 'Rating',
        type: 'number'
      }),
      defineField({
        name: 'comments',
        title: 'Comments',
        type: 'text'
      })
    ]
})
  
