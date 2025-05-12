
import React from "react";
import { Routes, Route } from "react-router-dom";
import JobList from "./components/Jobs/JobList";
import JobForm from "./components/Jobs/JobForm";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UnauthorizedPage from "./pages/UnauthorizedPage"; 
import ShipList from "./components/Ships/ShipList";
import ShipForm from "./components/Ships/ShipForm";
import ShipDetail from "./components/Ships/ShipDetail";
import ComponentList from "./components/Components/ComponentList";
import ComponentForm from "./components/Components/ComponentForm";
import ComponentDetail from "./components/Components/ComponentDetail";
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
<Route
  path="/components"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Engineer"]}>
      <ComponentList />
    </ProtectedRoute>
  }
/>
<Route
  path="/components/new"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <ComponentForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/components/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <ComponentForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/components/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Engineer"]}>
      <ComponentDetail />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs"
  element={
    <ProtectedRoute allowedRoles={["Admin", "Engineer"]}>
      <JobList />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs/new"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <JobForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/jobs/edit/:id"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <JobForm />
    </ProtectedRoute>
  }
/>
    </Routes>

    
  );
};

export default App;


