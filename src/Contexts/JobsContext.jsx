import React, { createContext, useContext, useEffect, useState } from "react";

const JobsContext = createContext();
export const useJobs = () => useContext(JobsContext);

export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("jobs");
    if (stored) setJobs(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    setJobs((prev) => [...prev, { ...job, id: crypto.randomUUID() }]);
  };

  const updateJob = (updated) => {
    setJobs((prev) => prev.map((j) => (j.id === updated.id ? updated : j)));
  };

  const deleteJob = (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <JobsContext.Provider value={{ jobs, addJob, updateJob, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
};
