import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskFilter from "./components/TaskFilter";
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import DashboardWrapper from './components/DashboardWrapper';
import UndoRedo from './components/UndoRedo';
import ExportImport from './components/ExportImport';


function App() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">📝 Task Tracker</h1>
      <DashboardWrapper />
      <CategoryFilter />
      <SearchBar />
      <TaskInput />
      <TaskFilter />
      <TaskList />
      <UndoRedo />
      <ExportImport />
     
    </div>
  );
}

export default App;
