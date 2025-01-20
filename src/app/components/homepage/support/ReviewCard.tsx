// components/ReviewCard.tsx
import React from 'react';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';

interface ReviewCardProps {
  review: {
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
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate stars array based on rating
  const stars = Array.from({ length: 5 }, (_, index) => ({
    filled: index < review.rating,
  }));

  // Format date without date-fns
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/30">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"></div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* User Info and Rating Section */}
        <div className="flex items-start space-x-4">
          {/* User Avatar */}
          <div className="relative w-12 h-12">
            {review.user.image ? (
              <Image
                src={urlForImage(review.user.image).url()}
                alt={review.user.name}
                fill
                className="rounded-full object-cover border-2 border-emerald-500/20"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {review.user.name[0]}
                </span>
              </div>
            )}
            {/* Online Status Indicator */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
          </div>

          {/* User Details and Rating */}
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">
              {review.user.name}
            </h3>
            
            {/* Star Rating */}
            <div className="flex items-center space-x-1 mt-1">
              {stars.map((star, index) => (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    star.filled ? 'text-yellow-400' : 'text-gray-600'
                  } transition-colors duration-200`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          {/* Review Date */}
          <span className="text-gray-400 text-sm">
            {formatDate(review.reviewDate)}
          </span>
        </div>

        {/* Review Content */}
        <div className="mt-4">
          <p className="text-gray-300 leading-relaxed">
            {review.comments}
          </p>
        </div>

        {/* Equipment Info and Verification Badge */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-emerald-400">
              {review.equipment.name}
            </span>
          </div>
          
          {/* Verified Review Badge */}
          <div className="flex items-center text-emerald-400 text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Verified Review
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
