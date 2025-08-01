import React, { useEffect, useState } from "react";
import Navbar from "./shared/navbar";
import { Button } from "./ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utlis/constant";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";

const CompanySetUp = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [company, setCompany] = useState(location.state || null);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  // Local fetch fallback
  useEffect(() => {
    if (!location.state) {
      const fetchCompany = async () => {
        try {
          const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
            withCredentials: true,
          });
          console.log("Fetched company:", res.data.company);
          if (res.data.success) {
            setCompany(res.data.company);
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch company data.");
        }
      };
      fetchCompany();
    }
  }, [params.id, location.state]);

  // Set form inputs when company data is ready
  useEffect(() => {
    if (company) {
      console.log("Company data received:", company);
      setInput({
        name: company.name || "",
        description: company.description || "",
        website: company.website || "",
        location: company.location || "",
        file: null,
      });
    }
  }, [company]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 my-10">
        <form onSubmit={submitHandler}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Company Name"
              />
            </div>
            <div>
              <Label className="mb-2">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Description"
              />
            </div>
            <div>
              <Label className="mb-2">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="Website"
              />
            </div>
            <div>
              <Label className="mb-2">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="Location"
              />
            </div>
            <div>
              <Label className="mb-2">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full mt-8">
              <Loader2 className="mr-3 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-8">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
