import React, { useEffect, useState } from "react";
import { BlogEntry } from "../contentful/content-api";

export const Imprint: React.FC<{
  loadBlogEntry: () => Promise<BlogEntry>;
}> = props => {
  const [state, setState] = useState({ title: "", description: "" });
  useEffect(() => {
    props.loadBlogEntry().then(entry =>
      setState({
        title: entry.title,
        description: entry.description
      })
    );
  }, [props]);
  return (
    <div>
      <h1>{state.title}</h1>
      <p>{state.description}</p>
    </div>
  );
};
