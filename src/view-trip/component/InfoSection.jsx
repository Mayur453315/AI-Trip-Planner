import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect } from 'react';
import { FaShare } from "react-icons/fa";

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
function InfoSection({ trip }) {
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])
  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
      const result=await GetPlaceDetails().then(resp=>{
        console.log(resp.data.places[0].photos[3].name);

        const photoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        console.log(photoUrl);
        
        
      })
  }
  return (
    <div className="p-4">
      <img src='\logo.svg\viewImage.jpg' className='h-[200px] md:h-[300px] lg:h-[340px] w-full object-cover rounded-xl' alt="Trip Image" />
      
      <div className='flex flex-col md:flex-row justify-between items-center my-5'>
        <div className='flex flex-col gap-2 w-full md:w-auto'>
          <h2 className='font-bold text-xl md:text-2xl'>{trip?.userSelection?.location?.label}</h2>
          
          <div className='flex flex-wrap gap-2'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500y'>
              📅 {trip?.userSelection?.noOfDay} Day
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500y'>
              🤑 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500y'>
              🧑🏿‍🤝‍🧑🏿 No. of Traveler: {trip?.userSelection?.traveler}
            </h2>
          </div>    
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button><FaShare /></Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
