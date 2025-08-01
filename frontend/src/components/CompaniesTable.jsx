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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";


const CompaniesTable = () => {
  const { companies,searchCompanyByText} = useSelector((store) => store.company);
  const [filterCompany,setFilterCompany] = useState(companies);
  const navigate = useNavigate();
  useEffect(()=>{
   const filteredCompany =companies.length >= 0 && companies.filter((company)=>{
    if(!searchCompanyByText){
      return true;
    }
    return company?.name?.toLowerCase()?.includes(searchCompanyByText.toLowerCase())
   })

   setFilterCompany(filteredCompany);   
  },[companies,searchCompanyByText])
  return (
    <div className="overflow-x-auto">
      <Table className='min-w-full'>
        <TableCaption>A List of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          filterCompany.length <= 0 ? (
            <span>No registered Company </span>
          ) : (
            <>
              {filterCompany?.map((company) => (
                <tr key={company._id}>
                  <TableCell>
                      <Avatar>
                        <AvatarImage src={company.logo} />
                      </Avatar>
                    </TableCell>
                    <TableCell className='min-w-[120px]'>{company.name} </TableCell>
                    <TableCell>{company.createdAt.split('T')[0]} </TableCell>
                    <TableCell className="text-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                          <PopoverContent className="w-32">
                            <div onClick={()=>navigate(`/admin/companies/${company._id}`,{state:company})} className="flex items-center agp-2 w-fit  cursor-pointer">
                              <Edit2 className="w-4 mx-2" />
                              <span>Edit</span>
                            </div>
                          </PopoverContent>
                        </PopoverTrigger>
                      </Popover>
                    </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
