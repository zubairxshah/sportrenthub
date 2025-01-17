import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'shipment',
    title: 'Shipment',
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
        name: 'shipmentDate',
        title: 'Shipment Date',
        type: 'datetime'
      }),
      defineField({
        name: 'shipmentStatus',
        title: 'Shipment Status',
        type: 'string'
      }),
      defineField({
        name: 'trackingNumber',
        title: 'Tracking Number',
        type: 'string'
      }),
    ],
})
  
