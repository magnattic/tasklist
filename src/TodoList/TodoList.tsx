import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import { Task } from "./task";
import "./TodoList.css";

export const TodoList: FunctionComponent<{
  tasks: Task[];
  onTaskAdded: (title: string) => void;
  onTaskRemove: (title: string) => void;
}> = React.memo(props => {
  const [state, setState] = useState({
    count: 0,
    newTaskInput: ""
  });
  const changeInputText = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setState(state => ({
      ...state,
      newTaskInput: value
    }));
  };

  const addTask = (event: FormEvent) => {
    event.preventDefault();
    props.onTaskAdded(state.newTaskInput);
    setState(state => ({
      ...state,
      newTaskInput: ""
    }));
  };

  return (
    <div>
      <ul className="tasks">
        <li>
          <form onSubmit={addTask}>
            <input
              type="text"
              value={state.newTaskInput}
              onChange={changeInputText}
            ></input>
            <button type="submit">add</button>
          </form>
        </li>
        {props.tasks.map(task => (
          <TaskRow
            key={task.id}
            title={task.title}
            onTaskRemove={props.onTaskRemove}
          />
        ))}
      </ul>
    </div>
  );
});

const TaskRow: FunctionComponent<{
  title: string;
  onTaskRemove: (title: string) => void;
}> = props => {
  const handleRemoveClick = (e: any) => {
    props.onTaskRemove(props.title);
    e.preventDefault();
  };

  return (
    <li>
      {props.title}{" "}
      <input type="button" onClick={handleRemoveClick} value="x" />
    </li>
  );
};
