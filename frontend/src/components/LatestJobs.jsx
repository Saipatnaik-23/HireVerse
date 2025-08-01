import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux';



const LatestJobs = () => {

  const {allJobs} = useSelector(store=>store.job)
  // console.log("Latest jobs from store:", allJobs);

  return (
    <div className='max-w-7xl mx-auto my-16 px-4 sM:px-6 lg:px-0'>
        <h1 className='text-3xl sm:text-4xl font-bold text-center sm:text-left'><span className='text-[#6A38C2]'>Latest & Top </span>Job Openings</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8 px-4'>
        {
            allJobs.length <= 0?<span>No Job available</span>:allJobs.slice(0,7).map((job)=>(
                <LatestJobCards  key={job._id} job={job}/>
            ))
        }
        </div>  
    </div>
  )
}

export default LatestJobs