export default {
    name: 'user',
    title: 'User',
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
        hidden: true
      },
      {
        name: 'phoneNumber',
        title: 'Phone Number',
        type: 'string',
        validation: (Rule: any) => Rule.required()
      },
      {
        name: 'address',
        title: 'Address',
        type: 'text',
        rows: 3
      },
      {
        name: 'userType',
        title: 'User Type',
        type: 'string',
        options: {
          list: ['admin', 'user', 'vendor'],
          layout: 'radio'
        }
      },
      {
        name: 'verificationDocuments',
        title: 'Verification Documents',
        type: 'file',
        options: {
          accept: '.pdf,.doc,.docx'
        }
      },
      {
        name: 'approvalStatus',
        title: 'Approval Status',
        type: 'string',
        options: {
          list: ['pending', 'approved', 'rejected'],
          layout: 'dropdown'
        }
      },
      {
        name: 'delayedReturnCount',
        title: 'Delayed Return Count',
        type: 'number',
        validation: (Rule: any) => Rule.min(0)
      },
      {
        name: 'penaltyAmount',
        title: 'Penalty Amount',
        type: 'number',
        validation: (Rule: any) => Rule.min(0).precision(2)
      }
    ]
  }
  
