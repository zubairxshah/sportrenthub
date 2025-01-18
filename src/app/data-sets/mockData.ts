interface Image {
  _id: string;
  _type: string;
  name: string;
  description: string;
}

interface Category {
  _id: string;
  _type: string;
  name: string;
}

interface Equipment {
  _id: string;
  _type: string;
  name: string;
  description: string;
  image: Image[];
  price: number;
  category: Category;
}

interface CategoryData {
  name: string;
  image: string; // URL of the category image
}

// Category Data
export const categoryData: CategoryData[] = [
  {
    name: "Winter Sports",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256"
  },
  {
    name: "Water Sports",
    image: "https://images.unsplash.com/photo-1530539595977-0aa9890547c4"
  },
  {
    name: "Camping",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4"
  },
  {
    name: "Hiking",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306"
  },
  {
    name: "Climbing",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851"
  },
  {
    name: "Biking",
    image: "https://cdn.pixabay.com/photo/2016/11/18/12/49/bicycle-1834265_1280.jpg"
  }
];

export const equipmentData: Equipment[] = [
  {
    _id: '1',
    _type: 'equipment',
    name: 'Snowboard',
    description: 'High-quality snowboard for all skill levels.',
    image: [
      {
        _id: '1',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2013/05/26/18/01/snowboard-113784_960_720.jpg',
        description: 'A snowboard on a snowy slope.'
      }
    ],
    price: 19.99,
    category: { _id: '1', _type: 'category', name: 'Winter Sports' }
  },
  {
    _id: '2',
    _type: 'equipment',
    name: 'Tent',
    description: 'Spacious tent for camping trips.',
    image: [
      {
        _id: '2',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2022/11/02/07/21/camping-7564211_960_720.jpg',
        description: 'A tent set up in a forest.'
      }
    ],
    price: 9.99,
    category: { _id: '2', _type: 'category', name: 'Camping' }
  },
  {
    _id: '3',
    _type: 'equipment',
    name: 'Mountain Bike',
    description: 'Durable mountain bike for off-road adventures.',
    image: [
      {
        _id: '3',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2016/11/18/12/49/bicycle-1834265_960_720.jpg',
        description: 'A mountain bike on a rocky trail.'
      }
    ],
    price: 29.99,
    category: { _id: '3', _type: 'category', name: 'Biking' }
  },
  {
    _id: '4',
    _type: 'equipment',
    name: 'Kayak',
    description: 'Sturdy kayak for water sports enthusiasts.',
    image: [
      {
        _id: '4',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2018/08/21/14/47/kayak-3621398_960_720.jpg',
        description: 'A kayak on a calm lake.'
      }
    ],
    price: 99.99,
    category: { _id: '4', _type: 'category', name: 'Water Sports' }
  },
  {
    _id: '5',
    _type: 'equipment',
    name: 'Ski Jacket',
    description: 'Warm and waterproof ski jacket for winter sports.',
    image: [
      {
        _id: '5',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2014/02/25/16/34/skier-274391_1280.jpg',
        description: 'A skier wearing a ski jacket on a snowy slope.'
      }
    ],
    price: 79.99,
    category: { _id: '5', _type: 'category', name: 'Winter Sports' }
  },
  {
    _id: '6',
    _type: 'equipment',
    name: 'Climbing Harness',
    description: 'Secure and comfortable climbing harness for outdoor adventures.',
    image: [
      {
        _id: '6',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2021/04/05/19/37/quickdraws-6154461_960_720.jpg',
        description: 'A climber wearing a harness on a rock wall.'
      }
    ],
    price: 59.99,
    category: { _id: '6', _type: 'category', name: 'Climbing' }
  },
  {
    _id: '7',
    _type: 'equipment',
    name: 'Hiking Boots',
    description: 'Durable and supportive hiking boots for long treks.',
    image: [
      {
        _id: '7',
        _type: 'image',
        name: 'https://cdn.pixabay.com/photo/2018/01/10/23/00/hiking-shoes-3074971_960_720.png',
        description: 'A hiker wearing hiking boots on a trail.'
      }
    ],
    price: 119.99,
    category: { _id: '7', _type: 'category', name: 'Hiking' }
  },
  { _id: '8',
    _type: 'equipment',
    name: 'Dirt Bike',
    description: 'Lightweight sturdy dirt bike for off road rides.',
    image: [{ _id: '8', _type: 'image',
      name: 'https://cdn.pixabay.com/photo/2017/07/20/22/47/kawasaki-2524025_960_720.jpg', 
      description: 'A Kawasaki dirt bike.' }],
      price: 199.99,
      category: { _id: '3', _type: 'category', name: 'Biking' } }
];
