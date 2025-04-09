import { useState } from "react";
import Dashboard from "./Dashboard"; // adjust the path if the file is in a different folder

const DashboardWrapper = () => {
  // Local state to control whether the Dashboard is shown or hidden
  const [showDashboard, setShowDashboard] = useState(false);

  // Toggle the visibility state of the Dashboard
  const handleToggle = () => {
    setShowDashboard((prev) => !prev);
  };

  return (
    <div className="p-4">
      {/* Button toggles the dashboard visibility; label changes based on state */}
      <button
        onClick={handleToggle}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {showDashboard
          ? "Hide Task completion statistics dashboard"
          : "Show Task completion statistics dashboard "}
      </button>

      {/* Conditionally render the Dashboard only when showDashboard is true */}
      {showDashboard && (
        <div className="mt-4">
          <Dashboard />
        </div>
      )}
    </div>
  );
};

export default DashboardWrapper;
