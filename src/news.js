import { readPosts } from "./stories.js";

const files = import.meta.glob("../content/news/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const news = readPosts(files);
