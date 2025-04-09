import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const loadTasksFromStorage = () => {
  const stored = localStorage.getItem('tasks');
  return stored ? JSON.parse(stored) : [];
};

const initialState = {
  past: [],
  present: {
    tasks: loadTasksFromStorage(),
    filter: 'all',
    searchTerm: '',
    selectedCategory: 'all',
  },
  future: [],
  loading: false,
};

export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (task, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(addTask(task));
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      state.present.tasks.push(action.payload);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },
    deleteTask: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      state.present.tasks = state.present.tasks.filter(task => task.id !== action.payload);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },
    toggleComplete: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      const task = state.present.tasks.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },
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
    reorderTasks: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state.present)));
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.present.tasks.splice(sourceIndex, 1);
      state.present.tasks.splice(destinationIndex, 0, removed);
      state.future = [];
      localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
    },
    setFilter: (state, action) => {
      state.present.filter = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.present.searchTerm = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.present.selectedCategory = action.payload;
    },
    undo: (state) => {
      if (state.past.length > 0) {
        const previous = state.past.pop();
        state.future.push(JSON.parse(JSON.stringify(state.present)));
        state.present = previous;
        localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const next = state.future.pop();
        state.past.push(JSON.parse(JSON.stringify(state.present)));
        state.present = next;
        localStorage.setItem('tasks', JSON.stringify(state.present.tasks));
      }
    },
    clearHistory: (state) => {
      state.past = [];
      state.future = [];
    },
  },
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

export default tasksSlice.reducer;
