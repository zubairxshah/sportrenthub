export const mockReviews = [
    {
      _id: 'review1',
      _type: 'review',
      userID: {
        _type: 'reference',
        _ref: 'user1'
      },
      userImage: {
        _type: 'reference',
        _ref: 'user1'
      },
      equipmentID: {
        _type: 'reference',
        _ref: 'equipment1'
      },
      reviewDate: '2023-10-01',
      // Add other fields as necessary
    },
    {
      _id: 'review2',
      _type: 'review',
      userID: {
        _type: 'reference',
        _ref: 'user2'
      },
      userImage: {
        _type: 'reference',
        _ref: 'user2'
      },
      equipmentID: {
        _type: 'reference',
        _ref: 'equipment2'
      },
      reviewDate: '2023-10-02',
      // Add other fields as necessary
    },
    // Add more mock reviews as necessary
  ];