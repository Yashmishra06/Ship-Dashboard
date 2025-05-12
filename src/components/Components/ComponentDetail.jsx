import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useComponents } from "../../Contexts/ComponentContext";
import { useShips } from "../../Contexts/ShipContext";

const ComponentDetail = () => {
  const { id } = useParams();
  const { components } = useComponents();
  const { ships } = useShips();
  const navigate = useNavigate();

  const component = components.find((c) => c.id === id);

  const getShipName = (shipId) =>
    ships.find((s) => s.id === shipId)?.name || "Unknown";

  if (!component) {
    return <div className="p-4 text-red-600">Component not found</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{component.name}</h2>

      <div className="space-y-2">
        <p><strong>Ship:</strong> {getShipName(component.shipId)}</p>
        <p><strong>Serial Number:</strong> {component.serialNumber}</p>
        <p><strong>Installation Date:</strong> {component.installDate}</p>
        <p><strong>Last Maintenance Date:</strong> {component.lastMaintenanceDate}</p>
      </div>

      <button
        className="mt-6 bg-gray-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/components")}
      >
        Back to List
      </button>
    </div>
  );
};

export default ComponentDetail;
