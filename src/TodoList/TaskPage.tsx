import React, { FunctionComponent, useEffect, useState } from "react";
import { db } from "../firebase";
import { Task } from "./task";
import { taskManager } from "./task-store";
import { TodoList } from "./TodoList";

export const Taskpage: FunctionComponent = () => {
  const { getTodos, addTask, removeTask } = taskManager(db);

  const [state, setState] = useState({ tasks: [] as Task[] });

  useEffect(() => getTodos(tasks => setState({ tasks })), [getTodos]);

  return (
    <div>
      <h2>TodoList ({state.tasks.length})</h2>
      <TodoList
        tasks={state.tasks}
        onTaskAdded={addTask}
        onTaskRemove={removeTask}
      />
    </div>
  );
};
