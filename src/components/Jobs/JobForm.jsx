import React, { useState, useEffect } from "react";
import { useJobs } from "../../Contexts/JobsContext";
import { useComponents } from "../../Contexts/ComponentContext";
import { useParams, useNavigate } from "react-router-dom";

const JobForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const { jobs, addJob, updateJob } = useJobs();
  const { components } = useComponents();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    componentId: "",
    shipId: "",
    type: "Inspection",
    priority: "Medium",
    status: "Open",
    assignedEngineerId: "",
    scheduledDate: "",
  });

  useEffect(() => {
    if (isEdit) {
      const job = jobs.find((j) => j.id === id);
      if (job) setForm(job);
    }
  }, [id, isEdit, jobs]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? updateJob(form) : addJob(form);
    navigate("/jobs");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "New"} Maintenance Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Component</label>
        <select
          name="componentId"
          value={form.componentId}
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        >
          <option value="">Select Component</option>
          {components.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {["type", "priority", "status", "assignedEngineerId", "scheduledDate"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type={field === "scheduledDate" ? "date" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
        ))}

        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {isEdit ? "Update" : "Create"} Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
