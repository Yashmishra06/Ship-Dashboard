import React, { createContext, useContext, useState, useEffect } from "react";

const ShipsContext = createContext();
export const useShips = () => useContext(ShipsContext);

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("ships");
    if (data) {
      setShips(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ships", JSON.stringify(ships));
  }, [ships]);

  const addShip = (ship) => {
    setShips((prev) => [...prev, { ...ship, id: crypto.randomUUID() }]);
  };

  const updateShip = (updatedShip) => {
    setShips((prev) =>
      prev.map((ship) => (ship.id === updatedShip.id ? updatedShip : ship))
    );
  };

  const deleteShip = (id) => {
    setShips((prev) => prev.filter((ship) => ship.id !== id));
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};
