import React, { useState, useEffect } from "react";
import { useComponents } from "../../Contexts/ComponentContext";
import { useShips } from "../../Contexts/ShipContext";
import { useParams, useNavigate } from "react-router-dom";

const ComponentForm = () => {
  const { id } = useParams();
  const { components, addComponent, updateComponent } = useComponents();
  const { ships } = useShips();
  const navigate = useNavigate();

  const isEdit = !!id;
  const [form, setForm] = useState({
    shipId: "",
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
  });

  useEffect(() => {
    if (isEdit) {
      const found = components.find((c) => c.id === id);
      if (found) setForm(found);
    }
  }, [id, components, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? updateComponent(form) : addComponent(form);
    navigate("/components");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit" : "Add"} Component</h2>
      <form onSubmit={handleSubmit}>
        <label>Ship</label>
        <select name="shipId" value={form.shipId} onChange={handleChange} required className="w-full p-2 border mb-4">
          <option value="">Select a ship</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>{ship.name}</option>
          ))}
        </select>
        {["name", "serialNumber", "installDate", "lastMaintenanceDate"].map((field) => (
          <div key={field} className="mb-4">
            <label>{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border"
              required
            />
          </div>
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {isEdit ? "Update" : "Add"} Component
        </button>
      </form>
    </div>
  );
};

export default ComponentForm;
