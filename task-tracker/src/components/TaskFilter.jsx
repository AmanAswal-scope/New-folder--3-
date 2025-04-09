import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter); // Get currently selected filter from Redux

  return (
    <div className="flex justify-center gap-4 mb-4">
      {/* Dynamically render buttons for each filter status */}
      {["all", "active", "completed"].map((status) => (
        <button
          key={status}
          onClick={() => dispatch(setFilter(status))} // Set selected filter on button click
          className={`px-3 py-1 rounded ${
            filter === status
              ? "bg-blue-600 text-white" // Highlight active filter
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)} {/* Capitalize first letter */}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
