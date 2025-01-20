'use client'

import React from 'react';
import SearchBox from './SearchBox';
import { AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';

const WelcomeSection: React.FC = () => {
  return (
    <div className="relative min-h-[600px] w-full py-6">
      {/* Hero Background with Overlay */}
      <div className="absolute inset-0 bg-[url('/equipment/mountain-bike.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] w-full">
        {/* Main Content */}
        <div className="text-center w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
            <span className="block">Rent Premium Sports Gear</span>
            <span className="block mt-2 text-emerald-400">For Your Next Adventure</span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-200 mx-auto mb-8 w-full max-w-4xl">
            Access high-quality sports equipment without the commitment of ownership. 
            From skiing to cycling, we've got your adventure covered.
          </p>

          {/* Search Component Integration */}
          <div className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-lg p-4 mb-8">
            <SearchBox />
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 w-full max-w-7xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-lg">
              <div className="text-emerald-400 mb-2">
                <AiOutlineClockCircle className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold">Quick Booking</h3>
              <p className="text-gray-300 text-sm sm:text-base">Reserve your gear in minutes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-lg">
              <div className="text-emerald-400 mb-2">
                <AiOutlineCheckCircle className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold">Quality Assured</h3>
              <p className="text-gray-300 text-sm sm:text-base">Premium equipment, always maintained</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-lg">
              <div className="text-emerald-400 mb-2">
                <HiOutlineUserGroup className="h-8 w-8 mx-auto" />
              </div>
              <h3 className="text-white text-base sm:text-lg lg:text-xl font-semibold">Local Community</h3>
              <p className="text-gray-300 text-sm sm:text-base">Connect with fellow sports enthusiasts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
