import { firestore } from "firebase";
import React, { FunctionComponent, useEffect, useState } from "react";
import "./App.css";
import { db } from "./firebase";
import logo from "./logo.svg";
import { TodoList } from "./TodoList/TodoList";

const getTodos = (
  db: firestore.Firestore,
  callback: (tasks: string[]) => void
) => {
  return db
    .collection("tasks")
    .onSnapshot(tasks => callback(tasks.docs.map(doc => doc.get("title"))));
};

const addTask = (task: string) => {
  db.collection("tasks").add({ title: task });
};

const App: FunctionComponent = () => {
  const [state, setState] = useState({
    tasks: [] as string[]
  });
  useEffect(() => {
    getTodos(db, todos => setState({ tasks: todos }));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
          {new Date().toISOString()}
        </p>
        <TodoList tasks={state.tasks} onTaskAdded={addTask} />
      </header>
    </div>
  );
};

export default App;
