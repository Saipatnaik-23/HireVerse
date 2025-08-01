import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/shared/navbar";
import Home from "./components/Home";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Jobs from "./components/Jobs"
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/Companies";
import CreateCompany from "./components/CreateCompany";
import CompanySetUp from "./components/CompanySetUp";
import AdminJobs from "./components/AdminJobs";
import PostJob from "./components/PostJob";
import Applicants from "./components/Applicants";
import ProtectedRoute from "./components/protectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },
  {
    path:"/browse",
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/admin/companies',
    element: <ProtectedRoute><Companies/></ProtectedRoute>  
  },
  {
    path:'/admin/companies/create',
    element:<CreateCompany/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetUp/>
  },{
    path:'/admin/jobs',
    element:<AdminJobs/>
  },{
    path:'/admin/jobs/create',
    element:<PostJob/>
  },{
    path:'/admin/jobs/:id/applicants',
    element:<Applicants/>
  }
]);
function App() {
  return (
    <>
      <RouterProvider router ={appRouter}/>
    </>
  );
}

export default App;
