import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/tasks/tasksSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  // Get current search term from Redux store to make input field controlled
  const searchTerm = useSelector((state) => state.tasks.searchTerm);

  return (
    <input
      type="text"
      value={searchTerm} // Keep the input in sync with Redux state
      onChange={(e) => dispatch(setSearchTerm(e.target.value))} // Update Redux state on input change
      placeholder="Search tasks..."
      className="w-full p-2 border rounded mb-4"
    />
  );
};

export default SearchBar;
