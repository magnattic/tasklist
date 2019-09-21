import { createClient } from "contentful";

const client = createClient({
  space: "tuj777sigfax",
  accessToken: process.env.REACT_APP_CONTENTFUL_API_KEY as string
});

export interface BlogEntry {
  title: string;
  description: string;
  body: string;
}

export const loadBlogEntry = async () => {
  return await client
    .getEntry<BlogEntry>("3K9b0esdy0q0yGqgW2g6Ke")
    .then(json => json.fields);
};
