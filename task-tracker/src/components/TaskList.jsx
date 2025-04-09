import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleComplete, updateTask, reorderTasks } from '../features/tasks/tasksSlice';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const TaskList = () => {
  // Extract state from Redux (with redux-undo, use .present)
  const { tasks, filter, searchTerm, selectedCategory } = useSelector((state) => state.tasks.present);
  const dispatch = useDispatch();

  // Local state for managing edit mode
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', priority: '' });

  // Set current task in edit mode
  const handleEditClick = (task) => {
    setEditId(task.id);
    setFormData({
      title: task.title,
      category: task.category,
      priority: task.priority
    });
  };

  // Save updated task and reset form
  const handleSaveClick = () => {
    dispatch(updateTask({ id: editId, updatedData: formData }));
    setEditId(null);
    setFormData({ title: '', category: '', priority: '' });
  };

  // Filter tasks based on completion status, search term, and category
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((task) => {
      if (selectedCategory === 'all') return true;
      return task.category === selectedCategory;
    });

  // Handle task drag and drop for reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(reorderTasks({
      sourceIndex: result.source.index,
      destinationIndex: result.destination.index,
    }));
  };

  // Keyboard shortcuts for saving/cancelling edit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveClick();
    }
    if (e.key === 'Escape') {
      setEditId(null); // cancel edit
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-4 space-y-2 max-w-2xl mx-auto"
          >
            {/* If no tasks match filter/search/category */}
            {filteredTasks.length === 0 ? (
              <p className="text-center text-gray-500">No tasks to show.</p>
            ) : (
              filteredTasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded shadow ${
                        task.completed ? 'bg-green-100' : 'bg-white'
                      }`}
                    >
                      {/* Task is in edit mode */}
                      {editId === task.id ? (
                        <div className="flex flex-col gap-2 flex-grow w-full">
                          <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                              setFormData({ ...formData, title: e.target.value })
                            }
                            onKeyDown={handleKeyDown}
                            className="border px-2 py-1 rounded w-full"
                            placeholder="Task title"
                          />
                          <input
                            type="text"
                            value={formData.category}
                            onChange={(e) =>
                              setFormData({ ...formData, category: e.target.value })
                            }
                            onKeyDown={handleKeyDown}
                            className="border px-2 py-1 rounded w-full"
                            placeholder="Category"
                          />
                          <input
                            type="text"
                            value={formData.priority}
                            onChange={(e) =>
                              setFormData({ ...formData, priority: e.target.value })
                            }
                            onKeyDown={handleKeyDown}
                            className="border px-2 py-1 rounded w-full"
                            placeholder="Priority (High/Medium/Low)"
                          />
                          <div className="flex gap-2 mt-2 flex-wrap">
                            <button
                              onClick={handleSaveClick}
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditId(null)}
                              className="bg-gray-500 text-white px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {/* Task in normal display mode */}
                          <div className="flex-grow space-y-1">
                            <h3
                              className={`font-semibold text-base sm:text-lg ${
                                task.completed ? 'line-through text-gray-500' : ''
                              }`}
                            >
                              {task.title}
                            </h3>
                            <div className="text-sm text-gray-600 flex flex-wrap gap-2">
                              <span>Category: {task.category}</span>
                              <span
                                className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                                  task.priority === 'High'
                                    ? 'bg-red-500'
                                    : task.priority === 'Medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-green-500'
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>
                          </div>

                          {/* Task action buttons */}
                          <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4 flex-wrap justify-end">
                            <button
                              onClick={() => dispatch(toggleComplete(task.id))}
                              className="bg-yellow-400 text-white px-2 py-1 rounded"
                            >
                              {task.completed ? 'Undo' : 'Done'}
                            </button>
                            <button
                              onClick={() => handleEditClick(task)}
                              className="bg-blue-400 text-white px-2 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => dispatch(deleteTask(task.id))}
                              className="bg-red-400 text-white px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => alert(`Share this task: http://localhost:5173/task/${task.id}`)}
                              className="bg-purple-500 text-white px-2 py-1 rounded"
                            >
                              Share
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {/* Placeholder for smooth dragging */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
