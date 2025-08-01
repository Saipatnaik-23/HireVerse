import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarImage } from "./ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";


const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs,setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
//    console.log("Filtering jobs....");
    if (!allAdminJobs) return;
   const filteredjobs = allAdminJobs.filter((job)=>{
    if(!searchJobByText){
      return true;
    }
    return job?.title?.toLowerCase()?.includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
   })

   setFilterJobs(filteredjobs);   
  },[allAdminJobs,searchJobByText])
  return (
    <div className="overflow-x-auto">
      <Table className='min-w-full'>
        <TableCaption>A List of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
              {filterJobs?.map((job) => (
                <tr key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split('T')[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                      <PopoverContent className="w-32">
                        <div onClick={() => navigate(`/admin/jobs/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                          <Edit2 className="w-4 mx-2" />
                          <span>Edit</span>
                        </div>
                        <div onClick={()=>navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                          <Eye className="w-4 mx-2"/>
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </PopoverTrigger>
                  </Popover>
                </TableCell>
              </tr>              
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
