import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../component/InfoSection';
import Hotels from '../component/Hotels';
import PlacesToVisit from '../component/PlacesToVisit';


function Viewtrip() {
  const {tripId}=useParams();
  const [trip,setTrip]=useState([]);
  useEffect(()=>{
    tripId&&GetTripData();

  },[tripId])

  const GetTripData=async()=>{
    const docRef=doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef);

    if(docSnap.exists()){
      console.log("Dodcument:",docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("No Such Document");
      toast("No Trip found!")
      
    }
  }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56' >
       {/* information section */}
       <InfoSection trip={trip}/>
        
       {/* recommendation Hotels */}
        <Hotels trip={trip}/>
       {/* Daily plan */}
        <PlacesToVisit trip={trip}/>
       {/* footer */}
       
    </div>
  )
}

export default Viewtrip
