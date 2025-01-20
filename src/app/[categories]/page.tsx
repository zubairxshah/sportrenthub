// app/[categories]/page.tsx
import { client } from '@/sanity/lib/client';
import { categoriesQuery } from '../queries/categoryQueries';
import CategoryCard from '../components/CategoyCard'

interface Category {
  _id: string;
  name: string;
  image: string;
}

async function CategoriesPage() {
  const categories = await client.fetch<Category[]>(categoriesQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Equipment Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
