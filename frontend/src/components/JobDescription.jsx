import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utlis/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const JobDescription = () => {
  const {singleJob} = useSelector(store=>store.job);
  const {user} = useSelector(store=>store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied,setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  
  
  
  const applyJobHAndler = async() =>{
      try {
        const res = await axios.post(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{},
        {withCredentials:true});
        // console.log(res);

        if(res.data.success){
          setIsApplied(true); //Update the local state
          const updateSinglejob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
          dispatch(setSingleJob(updateSinglejob));//helps us to real time ui update
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
  }

  useEffect(()=>{
    const fetchSingleJobs = async()=>{
       try {
          const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
          if(res.data.success){
            dispatch(setSingleJob(res.data.job));
            setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) //Ensure the state is in sync with fetched data
          }
       } catch (error) {
        console.log(error)
       }
    }
    fetchSingleJobs();
  },[jobId,dispatch,user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge className="text-blue-700 font-bold text-sm" variant="ghost">
             {singleJob?.position} {" "}
            </Badge>
            <Badge className="text-[#F83002] font-bold text-sm" variant="ghost">
              {singleJob?.jobType} {" "}
            </Badge>
            <Badge className="text-black font-bold text-sm" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick = {isApplied?null : applyJobHAndler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-green-600 hover:bg-green-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4 mt-6">Job Description</h1>
      <div className="my-4 max-w-xl space-y-2 break-words">
         <h1 className="font-bold">Role: <span className="pl-4 font-normal text-gray-800"> {singleJob?.title} </span></h1>
         <h1 className="font-bold">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
         <h1 className="font-bold">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
         <h1 className="font-bold">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} Years</span></h1>
         <h1 className="font-bold">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
         <h1 className="font-bold">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h1>
         <h1 className="font-bold">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
