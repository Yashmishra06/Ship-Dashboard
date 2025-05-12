import React from "react";
import { useComponents } from "../../Contexts/ComponentContext";
import { useNavigate } from "react-router-dom";
import { useShips } from "../../Contexts/ShipContext";

const ComponentList = () => {
  const { components, deleteComponent } = useComponents();
  const { ships } = useShips();
  const navigate = useNavigate();

  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "Unknown";

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Components</h2>
      <button
        onClick={() => navigate("/components/new")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Component
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Ship</th>
            <th className="p-2 border">Serial</th>
            <th className="p-2 border">Install Date</th>
            <th className="p-2 border">Last Maintenance</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map((c) => (
            <tr key={c.id}>
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{getShipName(c.shipId)}</td>
              <td className="p-2 border">{c.serialNumber}</td>
              <td className="p-2 border">{c.installDate}</td>
              <td className="p-2 border">{c.lastMaintenanceDate}</td>
              <td className="p-2 border">
                <button
                  className="text-blue-600 mr-2"
                  onClick={() => navigate(`/components/${c.id}`)}
                >
                  View
                </button>
                <button
                  className="text-yellow-600 mr-2"
                  onClick={() => navigate(`/components/edit/${c.id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => deleteComponent(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentList;
