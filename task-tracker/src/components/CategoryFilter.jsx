// This component allows the user to filter tasks by category
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../features/tasks/tasksSlice';


const CategoryFilter = () => {
  // Get the dispatch function to send actions to Redux store
  const dispatch = useDispatch();

  // Get the list of all tasks from Redux store
  const tasks = useSelector((state) => state.tasks.present.tasks);

  // Get the currently selected category from Redux store
  const selectedCategory = useSelector((state) => state.tasks.selectedCategory);

  // Create a list of unique categories from the tasks, adding "all" at the beginning
  const uniqueCategories = ['all', ...new Set(tasks.map((task) => task.category))];

  return (
    <select
      className="border px-2 py-1 rounded mb-4" 
      value={selectedCategory} 
      // When user selects a new category, update the Redux store
      onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
    >
      {uniqueCategories.map((cat, idx) => (
        <option key={idx} value={cat}>
          {/* Capitalize the first letter for display */}
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
