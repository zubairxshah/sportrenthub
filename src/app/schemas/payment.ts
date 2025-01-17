import { defineType, defineField } from "sanity"

export default defineType({
    name: 'payment',
    title: 'Payment',
    type: 'document',
    fields: [
      defineField({ name: 'rentalID', title: 'Rental ID', type: 'reference', to: [{ type: 'rental' }] }),
      defineField({ name: 'userID', title: 'User ID', type: 'reference', to: [{ type: 'user' }] }),
      defineField({ name: 'paymentDate', title: 'Payment Date', type: 'datetime' }),
      defineField({ name: 'paymentAmount', title: 'Payment Amount', type: 'number' }),
      defineField({ name: 'paymentMethod', title: 'Payment Method', type: 'string' }),
      defineField({ name: 'paymentStatus', title: 'Payment Status', type: 'string' }),
      defineField({ name: 'penaltyAmount', title: 'Penalty Amount', type: 'number' }),
    ],
})
  
