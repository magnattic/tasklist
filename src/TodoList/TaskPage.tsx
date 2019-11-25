import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { db } from "../firebase";
import { TaskActions } from "../store/api.actions";
import { store, TaskState } from "../store/reducer";
import { Task } from "./task";
import { taskManager } from "./task-store";
import { TodoListSortable } from "./TodoList";

const { getTodos, addTask, removeTask } = taskManager(db);

getTodos(tasks => store.dispatch(TaskActions.tasksChanged({ tasks })));

const comp: FunctionComponent<{ tasks: Task[] }> = React.memo(props => {
  return (
    <div>
      <h2>TodoList ({props.tasks.length})</h2>
      <TodoListSortable
        tasks={props.tasks}
        onTaskAdded={addTask}
        onTaskRemove={removeTask}
      />
    </div>
  );
});

const mapStateToProps = (state: TaskState) => ({ tasks: state.tasks });

export const Taskpage = connect(mapStateToProps)(comp);
