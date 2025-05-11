import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">403 - Unauthorized</h1>
        <p className="text-lg mt-2">You do not have permission to view this page.</p>
      </div>
    </div>
  );
}
