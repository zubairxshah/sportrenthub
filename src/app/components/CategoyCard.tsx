// components/CategoryCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  category: {
    _id: string;
    name: string;
    image: string;
  };
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{category.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
