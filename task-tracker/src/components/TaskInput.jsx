import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAsync } from '../features/tasks/tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('--Select Priority--');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.tasks.loading);

  // Refs are used to manage focus between fields for better keyboard navigation
  const titleRef = useRef();
  const categoryRef = useRef();
  const priorityRef = useRef();
  const submitButtonRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Constructing a task object with a unique ID
    const newTask = {
      id: uuidv4(),
      title,
      priority,
      category,
      completed: false,
    };

    dispatch(addTaskAsync(newTask));
    
    // Reset fields and focus back to title for fast task entry
    setTitle('');
    setPriority('--Select Category--');
    setCategory('');
    titleRef.current.focus();
  };

  // Handles keyboard navigation between fields using Enter, ArrowDown, ArrowUp
  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();
      if (field === 'title') categoryRef.current.focus();
      else if (field === 'category') priorityRef.current.focus();
      else if (field === 'priority') submitButtonRef.current.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (field === 'category') titleRef.current.focus();
      else if (field === 'priority') categoryRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 bg-white rounded shadow-md">
      <input
        ref={titleRef}
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, 'title')} // Moves focus to next input on Enter/Arrow
        className="p-2 border rounded"
      />
      <input
        ref={categoryRef}
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, 'category')}
        className="p-2 border rounded"
      />
      <select
        ref={priorityRef}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, 'priority')}
        className="p-2 border rounded"
      >
        <option>--Select Priority--</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button
        ref={submitButtonRef}
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading} // Disable button while async task is processing
      >
        {loading ? 'Adding...' : 'Add Task'} // Dynamic label based on state
      </button>
      {loading && <p>Adding task...</p>} {/* Optional feedback indicator */}
    </form>
  );
};

export default TaskInput;
