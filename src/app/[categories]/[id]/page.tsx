// app/category/[id]/page.tsx
import { client } from '@/sanity/lib/client';
import ProductCard from '@/app/components/ProductCard';

const categoryProductsQuery = `*[_type == "equipment" && category._ref == $categoryId] {
  _id,
  name,
  description,
  price,
  "image": image[0].asset->url,
  category->{
    _id,
    name
  }
}`;

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    _id: string;
    name: string;
  };
}

async function CategoryPage({ params }: { params: { id: string } }) {
  const products = await client.fetch<Product[]>(categoryProductsQuery, {
    categoryId: params.id,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {products[0]?.category.name || 'Category'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
