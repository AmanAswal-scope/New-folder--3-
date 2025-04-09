import React from 'react';
import { undo, redo } from '../features/tasks/tasksSlice';
import { useDispatch } from 'react-redux';

function UndoRedo() {
  const dispatch = useDispatch(); // ✅ Initialize dispatch here

  return (
    <div className="flex gap-4 mb-4 justify-center">
      <button
        onClick={() => dispatch(undo())}
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
      >
        Undo
      </button>
      <button
        onClick={() => dispatch(redo())}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Redo
      </button>
    </div>
  );
}

export default UndoRedo;
