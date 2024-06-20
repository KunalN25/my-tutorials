export const fetchPosts = async (page, limit) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  const data = await response.json();
  return data;
};
