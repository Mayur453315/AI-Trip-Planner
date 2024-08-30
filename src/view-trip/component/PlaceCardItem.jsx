import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';

function PlaceCardItem({ place }) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-5 hover:scale-105 transition-all shadow-md'>
        <img 
          src='\logo.svg\viewImage.jpg' 
          className='w-full sm:w-[130px] h-auto sm:h-[130px] rounded-xl object-cover' 
          alt={place.placeName} 
        />
        <div className='flex flex-col justify-between flex-grow'>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-800'>{place.placeDetails}</p>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3'>
            <div className='flex flex-col'>
              <h2 className='font-bold text-lg'>⭐ {place.rating}</h2>
              <h2 className='font-bold text-lg'>🎫 {place.ticketPricing}</h2>
            </div>
            <div className='mt-3 sm:mt-0 sm:ml-5'>
              <Button className='flex items-center'>
                <FaMapMarkerAlt className='mr-2' />
                View on Map
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
