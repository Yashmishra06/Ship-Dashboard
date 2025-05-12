import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useShips } from "../../Contexts/ShipContext";

const ShipDetail = () => {
  const { id } = useParams();
  const { ships } = useShips();
  const navigate = useNavigate();

  const ship = ships.find((s) => s.id === id);

  if (!ship) {
    return <div className="p-4 text-red-600">Ship not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{ship.name} - Details</h2>
      <div className="space-y-2">
        <p><strong>IMO Number:</strong> {ship.imo}</p>
        <p><strong>Flag:</strong> {ship.flag}</p>
        <p><strong>Status:</strong> {ship.status}</p>
      </div>
      <button
        onClick={() => navigate("/ships")}
        className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to List
      </button>
    </div>
  );
};

export default ShipDetail;
