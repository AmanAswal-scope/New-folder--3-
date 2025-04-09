import { useState } from "react";
import Dashboard from "./Dashboard"; // adjust the path if needed

const DashboardWrapper = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleToggle = () => {
    setShowDashboard((prev) => !prev);
  };

  return (
    <div className="p-4">
      <button
        onClick={handleToggle}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {showDashboard ? "Hide Task completion statistics dashboard" : "Show Task completion statistics dashboard "}
      </button>

      {showDashboard && (
        <div className="mt-4">
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardWrapper;
