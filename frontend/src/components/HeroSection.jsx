import React, { useState } from 'react'
import {Button} from "./ui/button"
import {Search} from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const searchJobHandler =()=>{
    
     dispatch(setSearchedQuery(query));
     navigate('/browse');
  }

  

  return (
    <div className='text-center px-4 py-4'>

        <div className='flex flex-col gap-5 max-w-auto mx-auto my-10'>
        <h2 className='mx-auto  px-4 py-2 rounded-full bg-violet-50 text-[#F83002] font-medium text-sm sm:text-base'>Unlock Opportunities. Empower Careers</h2>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-snug'>Search, Apply & <br/>Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p className='text-sm sm-text-base text-gray-600'>Find your dream job or your next hire — fast, easy, reliable.</p>

        <div className='flex items-center justify-center'>
          <div className='flex items-center shadow-lg border border-gray-200 rounded-full overflow-hidden w-full max-w-md'>
            <input
              type="text"
              placeholder="Find your dream job"
              onChange={(e)=>setQuery(e.target.value)}
              className="w-full px-4 py-2 focus:outline-none"
            />
            <Button onClick={searchJobHandler} className="bg-[#6A38C2] rounded-none rounded-r-full px-4">
              <Search  className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroSection