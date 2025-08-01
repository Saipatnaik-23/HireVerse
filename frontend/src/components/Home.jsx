import React from 'react'
import Navbar from './shared/navbar'
import HeroSection from "../components/HeroSection";
import CategoryCarousel from '../components/CategoryCarousel';
import LatestJobs from '../components/LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/Hooks/useGetAllJobs';
const Home = () => {
  useGetAllJobs();
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home