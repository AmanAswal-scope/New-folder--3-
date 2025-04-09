import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

function ExportImport() {
  const tasks = useSelector((state) => state.tasks.present.tasks);
  const dispatch = useDispatch();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "tasks.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target.result);
        importedTasks.forEach(task => dispatch(addTask(task)));
      } catch (err) {
        alert("Invalid file");
      }
    };
    fileReader.readAsText(e.target.files[0]);
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Export Tasks
      </button>

      <label className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer">
        Import Tasks
        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  );
}

export default ExportImport;
