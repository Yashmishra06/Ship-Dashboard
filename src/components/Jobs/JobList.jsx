import React, { useState } from "react";
import { useJobs } from "../../Contexts/JobsContext";
import { useComponents } from "../../Contexts/ComponentContext";
import { useShips } from "../../Contexts/ShipContext";
import { useNavigate } from "react-router-dom";

const JobList = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    shipId: "",
    status: "",
    priority: "",
  });

  const handleFilterChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const filteredJobs = jobs.filter((job) => {
    const matchShip = filters.shipId ? job.shipId === filters.shipId : true;
    const matchStatus = filters.status ? job.status === filters.status : true;
    const matchPriority = filters.priority ? job.priority === filters.priority : true;
    return matchShip && matchStatus && matchPriority;
  });

  const handleStatusChange = (job, newStatus) => {
    updateJob({ ...job, status: newStatus });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Maintenance Jobs</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <select name="shipId" onChange={handleFilterChange} value={filters.shipId} className="border p-2">
          <option value="">All Ships</option>
          {ships.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <select name="status" onChange={handleFilterChange} value={filters.status} className="border p-2">
          <option value="">All Status</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" onChange={handleFilterChange} value={filters.priority} className="border p-2">
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          onClick={() => navigate("/jobs/new")}
          className="bg-green-600 text-white px-4 py-2 rounded ml-auto"
        >
          + Add Job
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Component</th>
            <th className="p-2 border">Ship</th>
            <th className="p-2 border">Priority</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Assigned</th>
            <th className="p-2 border">Scheduled</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((j) => {
            const component = components.find((c) => c.id === j.componentId);
            const ship = ships.find((s) => s.id === j.shipId);
            return (
              <tr key={j.id}>
                <td className="p-2 border">{component?.name || "N/A"}</td>
                <td className="p-2 border">{ship?.name || "N/A"}</td>
                <td className="p-2 border">{j.priority}</td>
                <td className="p-2 border">
                  <select
                    value={j.status}
                    onChange={(e) => handleStatusChange(j, e.target.value)}
                    className="border p-1"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
                <td className="p-2 border">{j.assignedEngineerId}</td>
                <td className="p-2 border">{j.scheduledDate}</td>
                <td className="p-2 border">
                  <button onClick={() => navigate(`/jobs/edit/${j.id}`)} className="text-yellow-600 mr-2">Edit</button>
                  <button onClick={() => deleteJob(j.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
