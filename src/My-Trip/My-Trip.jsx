import { db } from '@/service/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrip() {
  const navigation=useNavigate();
  const [usertrips,setUserTrips]=useState([]);
    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }
       
        const q=query(collection(db,'AITrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUserTrips(prevVal=>[...prevVal,doc.data()])
        });
    }
  return (
    <div className='p-10 md:px-20 lg:px-36'>
      <h2 className='font-bold text-3xl'>My Trips</h2>
      <div className='grid grid-cols-2 mt-10 md:grid-cols-3 gap-5'>
        {usertrips?.length>0?usertrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index}/>
        ))
      :[1,2,3,4,5,6].map((item,index)=>(
        <div key={index} className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>

        </div>
      ))
      }
      </div>
    </div>
  )
}

export default MyTrip
