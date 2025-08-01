import React, { useEffect, useState } from "react";
import Navbar from "./shared/navbar";
import FliterCard from "./FliterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);

  // renamed for clarity
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [isFilterVisible, setIsFilterVisible] = useState(true); // for showing/hiding filter UI

  useEffect(() => {
    if (searchedQuery) {
      const result = allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      );
      setFilteredJobs(result);
    } else {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        {/* Toggle button for mobile filter */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterVisible(!isFilterVisible)}
            className="w-full border rounded p-2 text-center transition-all duration-300"
          >
            {isFilterVisible ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Layout: Filter + Job Cards */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Filters section */}
          <div
            className={`overflow-hidden transition-all duration-300
              ${isFilterVisible ? "max-h-[1000px] mb-4" : "max-h-0"}
              lg:max-h-none lg:block w-full lg:w-[20%]`}
          >
            <FliterCard />
          </div>

          {/* Job Cards */}
          {filteredJobs.length <= 0 ? (
            <span className="text-gray-600 text-center w-full">No jobs found.</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
