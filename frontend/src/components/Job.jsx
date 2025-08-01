import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
// import Logo from "../assets/Logo.png";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

const Job = ({job}) => {
  // console.log(job?.id);
  const navigate = useNavigate();
  // const jobId = "qwertyuytdsdfgh"

  const daysAgoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDiff  = currentTime-createdAt;
        return Math.floor(timeDiff/(1000*24*60*60));
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        
          <Avatar className='h-14 w-14 rounded-full overflow-hidden bg-white'>
            <AvatarImage src={job?.company?.logo} className="w-full h-full object-cover" />
          </Avatar>
        
        <div>
          <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position}{" "}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}{" "}
        </Badge>
        <Badge className="text-black font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4'>
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant='outline' className='w-full sm:w-auto'>Details</Button>
        <Button className='bg-[#7209b7] w-full sm:w-auto'>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
