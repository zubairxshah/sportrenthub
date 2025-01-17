export default {
    name: 'rental',
    title: 'Rental',
    type: 'document',
    fields: [
      {
        name: 'userID',
        title: 'User ID',
        type: 'reference',
        to: [{ type: 'user' }]
      },
      {
        name: 'equipmentID', 
        title: 'Equipment ID',
        type: 'reference',
        to: [{ type: 'equipment' }]
      },
      {
        name: 'rentalStartDate',
        title: 'Rental Start Date', 
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        }
      },
      {
        name: 'rentalEndDate',
        title: 'Rental End Date',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        }
      },
      {
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number',
        validation: (Rule: any) => Rule.required().min(0)
      },
      {
        name: 'rentalStatus',
        title: 'Rental Status',
        type: 'string',
        options: {
          list: ['pending', 'active', 'completed', 'cancelled']
        }
      },
      {
        name: 'returnDate',
        title: 'Return Date',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        }
      },
      {
        name: 'delayStatus',
        title: 'Delay Status',
        type: 'string',
        options: {
          list: ['onTime', 'delayed', 'notReturned']
        }
      },
      {
        name: 'penaltyApplied',
        title: 'Penalty Applied',
        type: 'boolean',
        initialValue: false
      },
    ],
  }
