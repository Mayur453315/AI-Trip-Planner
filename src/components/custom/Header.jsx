import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Default to an empty object if 'user' is not in localStorage
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user); // Check what is logged here to ensure 'user' has the expected structure
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  const GetUserProfile = (tokenInfo) => {
    const accessToken = tokenInfo?.access_token?.trim();
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'Application/json',
      },
    }).then((resp) => {
      console.log(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch(error => {
      console.error('Error fetching user profile:', error);
    });
  };

  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5 flex-wrap xl:flex-nowrap'>
      <img 
        className="h-20 w-auto object-contain"  // Adjusted for full image display and responsiveness
        src='/logo.svg/logo.jpg' 
        alt='Logo' 
      />
      <div className='flex items-center gap-3 flex-wrap xl:flex-nowrap'>
        {user && user.picture ? ( // Check for user and picture property explicitly
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>

            <a href="/MyTrip">
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  alt="User profile"
                  className='h-[35px] w-[35px] rounded-full' 
                  onError={(e) => e.target.style.display = 'none'}
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="sm:h-80 w-80 rounded-lg ml-3 lg:h-auto w-auto">
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg/logo.jpg' alt='Logo' className='h-20 w-20 mx-auto object-contain' />
              <h2 className='font-bold text-lg mt-7 text-center'>Sign In With Google</h2>
              <p className='text-center'>Sign in to the App with Google authentication secure</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
