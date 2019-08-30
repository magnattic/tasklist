import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";

export const TodoList: FunctionComponent<{
  tasks: string[];
  onTaskAdded: (title: string) => void;
}> = props => {
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
      <h2>TodoList ({props.tasks.length})</h2>
      <ul>
        {props.tasks.map(task => (
          <Task key={task} title={task} />
        ))}
      </ul>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={state.newTaskInput}
          onChange={changeInputText}
        ></input>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export const Task: FunctionComponent<{ title: string }> = props => (
  <li>{props.title}</li>
);
