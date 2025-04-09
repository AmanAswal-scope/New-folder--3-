import { useDispatch, useSelector } from 'react-redux';
import { setCategoryFilter } from '../features/tasks/tasksSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.present.tasks);
  const selectedCategory = useSelector((state) => state.tasks.selectedCategory);

  const uniqueCategories = ['all', ...new Set(tasks.map((task) => task.category))];

  return (
    <select
      className="border px-2 py-1 rounded mb-4"
      value={selectedCategory}
      onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
    >
      {uniqueCategories.map((cat, idx) => (
        <option key={idx} value={cat}>
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
