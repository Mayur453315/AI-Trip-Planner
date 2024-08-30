import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
    
  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all h-[220px]'>
       <img src="\logo.svg\viewImage.jpg" alt="images"  className='object-cover rounded-xl'/>
       <div className='mt-5'>
         <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
         <h2 className='text-sm text-blue-950'>{trip?.userSelection.noOfDay} Days trip with {trip.userSelection.budget} Budget</h2>
       </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
