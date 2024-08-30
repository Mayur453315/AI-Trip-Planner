import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Check if tripData and itinerary are defined
  const itinerary = trip?.tripData?.itinerary || [];

  return (
    <div>
      <h2 className='font-bold text-lg my-5'>Places TO Visit</h2>
      <div className=''>
        {itinerary.length > 0 ? (
          itinerary.map((item, index) => (
            <div key={index} className='border rounded-lg shadow-lg p-10 my-5'>
              <h2 className='font-medium text-lg'>Day {item.day}</h2>
              {item.plan.map((place, placeIndex) => (
                <div key={placeIndex} className='my-5'>
                  <h2 className='font-medium text-l text-orange-600'>🕙 {place.timeToTravel}</h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No places to visit found.</p>
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
