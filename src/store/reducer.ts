import { createReducer } from "@reduxjs/toolkit";
import { createStore } from "redux";
import { Task } from "../TodoList/task";
import { TaskActions } from "./api.actions";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: []
};

export const taskReducer = createReducer(initialState, {
  [TaskActions.taskAdded.type]: (state, action) => ({
    ...state,
    tasks: [
      ...state.tasks,
      { id: action.payload.title, title: action.payload.title }
    ]
  }),
  [TaskActions.tasksChanged.type]: (state, action) => ({
    ...state,
    tasks: action.payload.tasks
  })
});

export const store = createStore(
  taskReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
