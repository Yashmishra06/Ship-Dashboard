import React, { createContext, useContext, useState, useEffect } from "react";

const ComponentContext = createContext();
export const useComponents = () => useContext(ComponentContext);

export const ComponentProvider = ({ children }) => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("components");
    if (data) setComponents(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const addComponent = (comp) => {
    setComponents((prev) => [...prev, { ...comp, id: crypto.randomUUID() }]);
  };

  const updateComponent = (updated) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteComponent = (id) => {
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <ComponentContext.Provider
      value={{ components, addComponent, updateComponent, deleteComponent }}
    >
      {children}
    </ComponentContext.Provider>
  );
};
