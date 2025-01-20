import React from 'react';
import WelcomeMessage from './components/homepage/WelcomeSection';
import FeaturedEquipment from './components/homepage/FeaturedEquipment';
import SpecialOffers from '../app/components/homepage/SpecialOffer';
import CustomerReviews from './components/homepage/ReviewsTestimonials';
import '@/app/styles/reviews-carousel.module.css'


export default function Home() {

  return (
    <div className="w-full flex min-h-screen items-center justify-center">
      <div className="home-page">
        <WelcomeMessage />
        <FeaturedEquipment />
        <SpecialOffers />
        <CustomerReviews /> </div>
    </div>
  );
}
