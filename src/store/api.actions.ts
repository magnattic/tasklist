import { createAction } from "redux-starter-kit";
import { Task } from "../TodoList/task";

export const TaskActions = {
  tasksChanged: createAction<{ tasks: Task[] }>("[Firestore] Tasks changed"),
  taskAdded: createAction<{ title: string }>("[Task List] Task added"),
  taskRemoved: createAction("[Task List] Task removed")
};
