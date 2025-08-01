import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchJobByText } from '@/redux/jobSlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/Hooks/useGetAllAdminJobs'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(searchJobByText(input));
  },[input])
  const navigate = useNavigate();

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto px-10 my-10'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4 my-8'>
            <Input className='w-full sm:w-1/3' onChange={(e)=>setInput(e.target.value)} placeholder = "Filter by name, role" />
            <Button className='w-full sm:w-auto' onClick ={()=> navigate('/admin/jobs/create')}> New Jobs </Button>
            </div>
            <AdminJobsTable/>
        </div>
    </div>
  )
}

export default AdminJobs