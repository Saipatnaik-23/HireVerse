import React from 'react'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-md bg-white border border-gray-100 cursor-pointer transition-transform hover:scale-[1.02]'>
       <div>
       <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
       <p className='text-sm text-gray-500'>{job?.location}</p>
       </div>

       <div className='mt-3'>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
       </div>

       <div className='flex flex-wrap items-center gap-2 mt-4'>
         <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} </Badge>
         <Badge className='text-[#F83002] font-bold' variant='ghost'>{job?.jobType}</Badge>
         <Badge className='text-black font-bold' variant='ghost'>{job?.salary} LPA</Badge>
       </div>
    </div>
  )
}

export default LatestJobCards