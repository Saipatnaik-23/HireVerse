import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        allAdminJobs:[],
        singleJob:null,
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        //actions
        setAllJobs:(state,actions)=>{
            state.allJobs = actions.payload;
        },
        setSingleJob:(state,actions)=>{
            state.singleJob = actions.payload
        },
        setAllAdminJobs:(state,actions)=>{
            state.allAdminJobs = actions.payload
        },
        searchJobByText:(state,actions)=>{
            state.searchJobByText = actions.payload
        },
        setAllAppliedJobs:(state,actions)=>{
            state.allAppliedJobs = actions.payload
        },
        setSearchedQuery:(state,actions)=>{
            state.searchedQuery = actions.payload
        }
    }
})

export const {setSingleJob,setAllJobs,setAllAdminJobs,searchJobByText,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;