'use client'
import React, { useState } from 'react';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { FiSearch } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';

const SearchBox: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search with location
    console.log({ searchQuery, location, category });
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Here you would typically reverse geocode the coordinates
        // to get the city name using a service like Google Geocoding API
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Selector */}
          <div className="relative lg:w-1/4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-14 px-4 py-2 bg-white/10 backdrop-blur-md 
                       text-white border border-emerald-400/30 rounded-lg
                       appearance-none cursor-pointer hover:bg-white/20 
                       transition-colors duration-200 focus:outline-none 
                       focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
            >
              <option value="all" className="bg-gray-800">All Categories</option>
              <option value="skiing" className="bg-gray-800">Skiing</option>
              <option value="cycling" className="bg-gray-800">Cycling</option>
              <option value="camping" className="bg-gray-800">Camping</option>
              <option value="water-sports" className="bg-gray-800">Water Sports</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <MdKeyboardArrowDown className="h-5 w-5 text-emerald-400" />
            </div>
          </div>

          {/* Location Input */}
          <div className="relative lg:w-1/4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full h-14 pl-11 pr-4 py-2 bg-white/10 backdrop-blur-md 
                       text-white border border-emerald-400/30 rounded-lg
                       placeholder-gray-400 focus:outline-none focus:border-emerald-400 
                       focus:ring-2 focus:ring-emerald-400/20 hover:bg-white/20 
                       transition-colors duration-200"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <HiOutlineLocationMarker className="h-6 w-6 text-emerald-400" />
            </div>
            <button
              type="button"
              onClick={handleLocationDetect}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm 
                       text-emerald-400 hover:text-emerald-300"
            >
              Detect
            </button>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for equipment..."
              className="w-full h-14 pl-11 pr-4 py-2 bg-white/10 backdrop-blur-md 
                       text-white border border-emerald-400/30 rounded-lg
                       placeholder-gray-400 focus:outline-none focus:border-emerald-400 
                       focus:ring-2 focus:ring-emerald-400/20 hover:bg-white/20 
                       transition-colors duration-200"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <FiSearch className="h-6 w-6 text-emerald-400" />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="h-14 px-8 bg-emerald-500 text-white font-semibold 
                     rounded-lg hover:bg-emerald-600 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 
                     focus:ring-offset-2 focus:ring-offset-gray-900
                     whitespace-nowrap"
          >
            Find Gear
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-300">
        <span>Popular:</span>
        <div className="flex flex-wrap gap-2">
          {['Ski Equipment', 'Mountain Bikes', 'Camping Gear', 'Surfboards'].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1 text-emerald-400 border border-emerald-400/30 
                       rounded-full hover:bg-emerald-400/10 transition-colors duration-200
                       backdrop-blur-md text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Locations */}
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
        <span>Recent:</span>
        <div className="flex flex-wrap gap-2">
          {['Vancouver', 'Whistler', 'Squamish'].map((location) => (
            <button
              key={location}
              onClick={() => setLocation(location)}
              className="flex items-center gap-1 px-3 py-1 text-emerald-400 
                       hover:text-emerald-300 transition-colors duration-200"
            >
              <HiOutlineLocationMarker className="h-4 w-4" />
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
