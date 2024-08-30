import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {  useNavigate} from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog,setOpenDialog]=useState(false);
  const [loading,setLoding]=useState(false);
  
  const navigate=useNavigate();


  const handleInputchange = (name, value) => {
    if (name === 'noOfDay' && value > 5) {
      console.log('You cannot select more than 5 days');
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login=useGoogleLogin({
    onSuccess:(codeResp) => GetUserProfile(codeResp),
    onError:(error) => console.error(error),
  })

  const OnGenerateTrip =async() => {

   const user= localStorage.getItem('user');
   if(!user){
   setOpenDialog(true);
    return;
   }

   
    if (!formData?.noOfDays>5 && !formData?.budget || !formData.traveler) {
      toast('Please fill all the details.');
      return;
    }
    setLoding(true);
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{budget}',formData?.budget)
    .replace('{traveler}',formData?.traveler)
    .replace('{totalDays}',formData?.noOfDays)
   
    
    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--",result?.response?.text());
    setLoding(false);
    SaveAiTrip(result?.response?.text())
  };

const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    try {
      // Add a new document in collection "AITrips"
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,  
        id: docId
      });
    } catch (error) {
      console.error('Error saving trip data:', error);
    } 
       
      setLoding(false); // Stop loading after saving the trip data
      navigate(`/view-trip/${docId}`);
    
  } 

  const GetUserProfile = (tokenInfo) => {
    const accessToken = tokenInfo?.access_token?.trim();
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
       
      headers:{
        Authorization:`Bearer ${accessToken}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp.data);  
      localStorage.setItem('user',JSON.stringify(resp.data)); 
      setOpenDialog(false);
      OnGenerateTrip();
    }).catch(error => {
      console.error('Error fetching user profile:', error);
      setLoding(false);
    });
   };

  

  return (
    <div className='px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 m-4 sm:m-10 md:m-16 lg:m-24 xl:m-32 mt-10'>
      <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-600 text-lg sm:text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-10 md:mt-20 grid gap-10'>
        <div className='mb-10'>
          <h2 className='text-xl sm:text-2xl md:text-3xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputchange('location', v);
              },
            }}
          />
        </div>
        
        <div className='mb-10'>
          <h2 className='text-xl sm:text-2xl md:text-3xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'Ex. 3'} type="number" onChange={(e) => handleInputchange('noOfDay', e.target.value)} />
        </div>
        <div className='mb-10'>
          <h2 className='text-xl sm:text-2xl md:text-3xl my-3 font-medium'>What is Your Budget?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputchange('budget', item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.budget === item.title && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-3xl sm:text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg sm:text-xl'>{item.title}</h2>
                <h2 className='text-sm sm:text-base text-gray-600'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-10'>
          <h2 className='text-xl sm:text-2xl md:text-3xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputchange('traveler', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                  formData?.traveler === item.people && 'shadow-lg border-black'
                }`}
              >
                <h2 className='text-3xl sm:text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg sm:text-xl'>{item.title}</h2>
                <h2 className='text-sm sm:text-base text-gray-600'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button 
        disabled={loading}
        onClick={OnGenerateTrip}>
          {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7  animate-spin'/>:'Generate Trip' 
         }
        </Button>
      </div>
      
      <Dialog open={openDialog}>
        
        <DialogContent className="sm:h-80 w-80 rounded-lg ml-3  lg:h-auto w-auto">
          <DialogHeader>
            
            <DialogDescription>
             <img src='/logo.svg/logo.jpg'/>
             <h2 className='font-bold text-lg mt-7'>Sing In With Google</h2>
             <p>Sign in to the App with Google authentication secure</p>
             <Button
             onClick={login}
             className="w-full mt-5 flex gap-4 items-center">
              <FcGoogle className='h-7 w-7' />Sign In With Google
              </Button>
              
              
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;

