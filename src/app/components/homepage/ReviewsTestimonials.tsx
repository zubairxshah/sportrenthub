// components/ReviewsTestimonials.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { groq } from 'next-sanity';
import ReviewCard from './support/ReviewCard';
// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Review {
  _id: string;
  rating: number;
  comments: string;
  reviewDate: string;
  user: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
  };
  equipment: {
    name: string;
  };
}

const ReviewsTestimonials: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const query = groq`
          *[_type == "review"] | order(reviewDate desc) {
            _id,
            rating,
            comments,
            reviewDate,
            "user": userID->{
              name,
              image
            },
            "equipment": equipmentID->{
              name
            }
          }
        `;

        const data = await client.fetch<Review[]>(query);
        setReviews(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load reviews');
        setIsLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
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
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-gray-900 to-blue-900/20 opacity-50"></div>
      
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Read authentic reviews from our community of sports enthusiasts who have experienced our premium equipment rental service.
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-400">No reviews available yet.</p>
        ) : (
          <div className="relative review-carousel">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={32}
              slidesPerView={1}
              centeredSlides={false}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              navigation={true}
              breakpoints={{
                // When window width is >= 640px
                640: {
                  slidesPerView: 1,
                },
                // When window width is >= 768px
                768: {
                  slidesPerView: 2,
                },
                // When window width is >= 1024px
                1024: {
                  slidesPerView: 2,
                },
              }}
              className="px-4 py-8"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review._id}>
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsTestimonials;
