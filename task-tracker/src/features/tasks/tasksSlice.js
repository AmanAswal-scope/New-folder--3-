import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load tasks from localStorage when the app starts
const loadTasksFromStorage = () => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

// Initial state with undo/redo support (past, present, future)
const initialState = {
  past: [],
  present: {
    tasks: loadTasksFromStorage(),     // Current task list
    filter: 'all',                     // Filter: all | completed | active
    searchTerm: '',                    // Search keyword
    selectedCategory: 'all',           // Task category
  },
  future: [],
  loading: false,                      // For async operations like addTaskAsync
};

// Async thunk to simulate adding a task with delay
export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (task, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
    dispatch(addTask(task)); // Dispatch normal addTask reducer
  }
);

// Slice for tasks
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Add task and push current state to past for undo support
    addTask: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      state.present.tasks.push(action.payload);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },

    // Delete task by ID
    deleteTask: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      state.present.tasks = state.present.tasks.filter(task => task.id !== action.payload);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },

    // Toggle task completion
    toggleComplete: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      const task = state.present.tasks.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },

    // Update task details
    updateTask: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      const { id, updatedData } = action.payload;
      const index = state.present.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.present.tasks[index] = { ...state.present.tasks[index], ...updatedData };
      }
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },

    // Reorder task positions (drag and drop use case)
    reorderTasks: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.present.tasks.splice(sourceIndex, 1);
      state.present.tasks.splice(destinationIndex, 0, removed);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },

    // Set task filter (e.g., all, completed, active)
    setFilter: (state, action) => {
      state.present.filter = action.payload;
    },

    // Set search keyword
    setSearchTerm: (state, action) => {
      state.present.searchTerm = action.payload;
    },

    // Set category filter
    setCategoryFilter: (state, action) => {
      state.present.selectedCategory = action.payload;
    },

    // Undo the last change (if available)
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop();
        state.future.push(JSON.parse(JSON.stringify(state.present)));
        state.present = previous;
        localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
      }
    },

    // Redo the last undone change (if available)
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.pop();
        state.past.push(JSON.parse(JSON.stringify(state.present)));
        state.present = next;
        localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
      }
    },

    // Clear undo/redo history
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },

  // Handle loading state for addTaskAsync
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTaskAsync.fulfilled, (state) => {
        state.loading = false;
      });
  }
});

// Exporting actions
export const {
  addTask,
  deleteTask,
  toggleComplete,
  updateTask,
  setFilter,
  setSearchTerm,
  setCategoryFilter,
  reorderTasks,
  undo,
  redo,
  clearHistory
} = tasksSlice.actions;

// Export reducer to be used in the store
export default tasksSlice.reducer;
