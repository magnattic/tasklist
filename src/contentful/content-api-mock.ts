import { BlogEntry } from "./content-api";

export const loadBlogEntry = () =>
  Promise.resolve<BlogEntry>({
    title: "TestTitle",
    description: "This is just a test!",
    body: "Test Content"
  });
