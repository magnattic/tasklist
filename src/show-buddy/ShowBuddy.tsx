import React, { ChangeEventHandler, useState } from "react";

export const ShowBuddy: React.FC = () => {
  const [state, setState] = useState({ search: "" });

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e =>
    setState({ search: e.target.value });

  return (
    <div>
      <h1>ShowBuddy</h1>
      <input
        type="text"
        value={state.search}
        onChange={searchValueChanged}
      ></input>
    </div>
  );
};
