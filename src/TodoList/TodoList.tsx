import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState
} from "react";

export const TodoList: FunctionComponent = () => {
  const [state, setState] = useState({
    tasks: [] as string[],
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
    setState(state => ({
      ...state,
      tasks: [...state.tasks, state.newTaskInput],
      newTaskInput: ""
    }));
  };

  return (
    <div>
      <h2>TodoList ({state.tasks.length})</h2>
      <ul>
        {state.tasks.map(task => (
          <Task title={task} />
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
