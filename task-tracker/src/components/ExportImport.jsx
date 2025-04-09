import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function ExportImport() {
  // Get current list of tasks from Redux store
  const tasks = useSelector((state) => state.tasks.present.tasks);
  const dispatch = useDispatch();

  // Convert task data to a downloadable JSON file and trigger download
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    
    // Create a temporary anchor element to simulate download
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tasks.json");
    
    // Append to DOM, trigger click, then remove it
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Read the uploaded JSON file, parse its contents, and dispatch each task to Redux
  const handleImport = (e) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        
        // Loop through the imported tasks and add each to the store
        importedTasks.forEach(task => dispatch(addTask(task)));
      } catch (err) {
        // If the file content is invalid JSON
        alert("Invalid file");
      }
    };

    // Read the selected file as plain text
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      {/* Button to export tasks to a JSON file */}
      <button
        onClick={handleExport}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export Tasks
      </button>

      {/* Styled label used as a custom file upload button */}
      <label className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
        Import Tasks
        {/* Hidden file input, triggered when user clicks the label */}
        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  );
}

export default ExportImport;
