import React from "react";
import "./App.css";
import logo from "./logo.svg";
import { TodoList } from "./TodoList/TodoList";

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <TodoList />
    </header>
  </div>
);

export default App;
