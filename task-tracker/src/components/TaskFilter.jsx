import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/tasks/tasksSlice";

const TaskFilter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  return (
    <div className="flex justify-center gap-4 mb-4">
      {["all", "active", "completed"].map((status) => (
        <button
          key={status}
          onClick={() => dispatch(setFilter(status))}
          className={`px-3 py-1 rounded ${
            filter === status
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
