import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
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
      <div>
        <form onSubmit={addTask}>
          <input
            type="text"
            value={state.newTaskInput}
            onChange={changeInputText}
          ></input>
          <button type="submit">add</button>
        </form>
      </div>
      <div className="tasks list">
        {props.tasks.map((task, index) => (
          <SortableTaskRow
            index={index}
            key={task.id}
            title={task.title}
            onTaskRemove={props.onTaskRemove}
          />
        ))}
      </div>
    </div>
  );
});

export const TodoListSortable = SortableContainer(TodoList);

const TaskRow: FunctionComponent<{
  title: string;
  onTaskRemove: (title: string) => void;
}> = props => {
  const handleRemoveClick = (e: any) => {
    props.onTaskRemove(props.title);
    e.preventDefault();
  };

  return (
    <a className="list-item">
      <div className="level">
        <span className="level-left">{props.title}</span>
        <span className="level-right">
          <a className="delete" onClick={handleRemoveClick} />
        </span>
      </div>
    </a>
  );
};
const SortableTaskRow = SortableElement(TaskRow);
