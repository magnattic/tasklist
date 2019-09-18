import React, { useEffect, useState } from "react";
import { loadBlogEntry } from "../contentful/content-api";

export const Imprint: React.FC = () => {
  const [state, setState] = useState({ title: "", description: "" });
  useEffect(() => {
    loadBlogEntry().then(entry =>
      setState({
        title: entry.fields.title,
        description: entry.fields.description
      })
    );
  }, []);
  return (
    <div>
      <h1>{state.title}</h1>
      <p>{state.description}</p>
    </div>
  );
};
