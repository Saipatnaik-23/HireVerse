import React, { useEffect, useState } from 'react'
import Navbar from './shared/navbar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/Hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const [input,setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(setSearchCompanyByText(input));
  },[input])
  const navigate = useNavigate();

  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto px-10 my-10'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between  gap-4 my-8'>
            <Input className='w-full sm:w-1/3' onChange={(e)=>setInput(e.target.value)} placeholder = "Filter by name" />
            <Button className='w-full sm:w-auto' onClick ={()=> navigate('/admin/companies/create')}> New Company</Button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies