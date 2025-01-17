import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      defineField({
        name: 'categoryName',
        title: 'Category Name', 
        type: 'string'
      }),
      defineField({
        name: 'categoryDescription',
        title: 'Category Description',
        type: 'text'
      }),
    ],
})
  
