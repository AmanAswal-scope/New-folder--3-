import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../features/tasks/tasksSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.tasks.searchTerm);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      placeholder="Search tasks..."
      className="w-full p-2 border rounded mb-4"
    />
  );
};

export default SearchBar;
