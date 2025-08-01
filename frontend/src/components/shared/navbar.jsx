import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utlis/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      console.log("Logout response:", res.data);

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed on server");
      }
    } catch (error) {
      console.log("Logout error:", error);
      console.log("Full response:", error?.response);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        {/* LEFT PART */}
        <div className="text-2xl font-bold">
          Hire<span className="text-[#F83002]">Verse</span>
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center font-medium gap-10">
          <ul className="flex gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-4 mb-2">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link" className="p-0 h-auto">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="p-0 h-auto text-red-500"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}

            {!user ? (
              <div className="flex flex-col gap-2 pt-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-gray-600 pt-2">
                {
                  user && user.role==='student' && (
                    <div className="flex items-center gap-2">
                  <User2 />
                  <Button variant="link" className="p-0 h-auto">
                    View Profile
                  </Button>
                </div>
                  )
                }
                <div className="flex items-center gap-2">
                  <LogOut />
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="p-0 h-auto text-red-500"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
