'use client'
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Define TypeScript interfaces based on your schema
interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

interface Category {
  _id: string;
  name: string;
}

interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  image: SanityImage[];
  price: number;
  category: {
    _ref: string;
    _type: 'reference';
  };
  categoryInfo: Category;
}

const FeaturedEquipment: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const query = groq`
          *[_type == "equipment"] {
            _id,
            name,
            description,
            image,
            price,
            category,
            "categoryInfo": category-> {
              _id,
              name
            }
          }[0...6]
        `;

        const data = await client.fetch<EquipmentItem[]>(query);
        setEquipment(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch equipment');
        setIsLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchEquipment();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Featured Equipment
        </h2>
        
        {equipment.length === 0 ? (
          <p className="text-center text-gray-400">No equipment available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item) => (
              <div 
                key={item._id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform 
                         hover:scale-105 transition-transform duration-300 shadow-xl"
              >
                <div className="relative h-64">
                  {item.image && item.image[0] && (
                    <Image
                      src={urlForImage(item.image[0] as SanityImageSource).url()}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white 
                               px-3 py-1 rounded-full text-sm font-medium">
                    {item.categoryInfo?.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-400 font-bold">
                      ${item.price}/day
                    </span>
                    <button 
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg 
                               hover:bg-emerald-600 transition-colors duration-200
                               focus:outline-none focus:ring-2 focus:ring-emerald-500 
                               focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEquipment;
