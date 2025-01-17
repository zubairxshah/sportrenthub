export default {
    name: 'admin',
    title: 'Admin',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'email', 
        title: 'Email',
        type: 'string',
        validation: (Rule: any) => Rule.required().email()
      },
      {
        name: 'password',
        title: 'Password',
        type: 'string',
        validation: (Rule: any) => Rule.required().min(6)
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number', 
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'role',
        title: 'Role',
        type: 'string',
        options: {
          list: ['admin', 'editor', 'author']
        },
        validation: (Rule: any) => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'email'
      }
    }
}
  
