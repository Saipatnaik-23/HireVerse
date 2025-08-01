import React, { useState } from "react";
import Navbar from "./shared/navbar";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/Hooks/useGetAppliedJob";

// const skills = ["HTML", "Css", "Javascript", "ReactJS"];

const isResume = true;
const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-8 p-6 bg-white border border-gray-200 rounded-2xl space-y-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Avatar & user info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
                className="rounded-full object-cover"
              />
            </Avatar>
            <div>
              <h1 className="text-xl font-semibold">{user?.fullname}</h1>
              <p className="text-sm text-gray-600 max-w-xs break-words">
                {user?.profile?.bio}
              </p>
             {/* {console.log("BIO VALUE:", user?.profile?.bio)} */}
            </div>
          </div>

          {/* Edit button */}
          <Button onClick={() => setOpen(true)} size="icon" variant="outline">
            <Pen />
          </Button>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <span className="text-sm break-all">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-5 h-5" />
            <span className="text-sm">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length === 0 ? (
              <span>NA</span>
            ) : (
              user?.profile?.skills.map((item, idx) => (
                <Badge key={idx}>{item}</Badge>
              ))
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              href={user?.profile?.resume}
              target="blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {user?.profile?.resumeOriginalname || "View Resume"}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-6">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
