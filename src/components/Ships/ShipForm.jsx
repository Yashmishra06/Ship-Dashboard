import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShips } from "../../Contexts/ShipsContext";

const ShipForm = () => {
  const { ships, addShip, updateShip } = useShips();
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;
  const [form, setForm] = useState({
    name: "",
    imo: "",
    flag: "",
    status: "Active",
  });

  useEffect(() => {
    if (isEdit) {
      const existingShip = ships.find((ship) => ship.id === id);
      if (existingShip) setForm(existingShip);
    }
  }, [id, isEdit, ships]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateShip(form);
    } else {
      addShip(form);
    }
    navigate("/ships");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Ship" : "Add Ship"}</h2>
      <form onSubmit={handleSubmit}>
        {["name", "imo", "flag", "status"].map((field) => (
          <div className="mb-4" key={field}>
            <label className="block capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border p-2"
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? "Update Ship" : "Create Ship"}
        </button>
      </form>
    </div>
  );
};

export default ShipForm;
