import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'delivery',
    title: 'Delivery',
    type: 'document',
    fields: [
      defineField({
        name: 'shipmentID',
        title: 'Shipment ID', 
        type: 'reference',
        to: [{ type: 'shipment' }]
      }),
      defineField({
        name: 'deliveryDate',
        title: 'Delivery Date',
        type: 'datetime'
      }),
      defineField({
        name: 'deliveryStatus', 
        title: 'Delivery Status',
        type: 'string'
      })
    ]
})
  
