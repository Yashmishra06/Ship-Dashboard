import React from "react";
import { useAuth } from "../Contexts/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <p>Your role: {user?.role}</p>
    </div>
  );
}
