import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ReplaySubject } from "rxjs";
import { loadSeasons } from "./show-api";

const valueChanged$ = new ReplaySubject<string>(1);

export const ShowBuddy: React.FC = React.memo(() => {
  const [state, setState] = useState({ search: "" });

  useEffect(() => {
    console.log("effect");
    const subscription = valueChanged$
      .pipe(loadSeasons())
      .subscribe(console.log);
    return () => subscription.unsubscribe();
  }, []);

  const searchValueChanged: ChangeEventHandler<HTMLInputElement> = e => {
    valueChanged$.next(e.target.value);
    setState({ search: e.target.value });
  };

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
});
