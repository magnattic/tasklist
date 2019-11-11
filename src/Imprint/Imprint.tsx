import marked from "marked";
import React, { useEffect, useState } from "react";
import { BlogEntry } from "../contentful/content-api";

export const Imprint: React.FC<{
  loadBlogEntry: () => Promise<BlogEntry>;
}> = props => {
  const [state, setState] = useState({ title: "", description: "", body: "" });
  useEffect(() => {
    props.loadBlogEntry().then(entry => {
      console.log(entry);
      setState({
        title: entry.title,
        description: entry.description,
        body: entry.body
      });
    });
  }, [props]);
  return (
    <div>
      <h1>{state.title}</h1>
      <p>{state.description}</p>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: marked(state.body) }}
      ></div>
    </div>
  );
};
