import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-12 sm:mt-16 md:mt-20 lg:mt-24'>
      <h1 className='font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center'>
        <span className='text-emerald-900'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      <p className='text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-700 text-center'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="text-base sm:text-lg md:text-xl lg:text-2xl">Get Started, It's Free</Button>
      </Link>
      <div>
        <img src="\laptopimage (2).jpg" alt="laptop image"  />
      </div>
    </div>
  );
}

export default Hero;
