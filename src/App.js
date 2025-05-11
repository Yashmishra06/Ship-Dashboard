
import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UnauthorizedPage from "./pages/UnauthorizedPage"; 
import ShipList from "./components/Ships/ShipList";
import ShipForm from "./components/Ships/ShipForm";
import ShipDetail from "./components/Ships/ShipDetail";

import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Dashboard Route for all roles */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Engineer", "Inspector"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Add more protected routes here as needed */}

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route
  path="/ships"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
      <ShipList />
    </ProtectedRoute>
  }
/>
<Route
  path="/ships/new"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <ShipForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/ships/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <ShipForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/ships/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Inspector", "Engineer"]}>
      <ShipDetail />
    </ProtectedRoute>
  }
/>
    </Routes>

    
  );
};

export default App;


