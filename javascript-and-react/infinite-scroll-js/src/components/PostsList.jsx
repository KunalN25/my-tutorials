import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles.css";
import { fetchPosts } from "../services";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const loadMorePosts = async () => {
    setLoading(true);
    const newPosts = await fetchPosts(page, 10);
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    setLoading(false);
  };

  useEffect(() => {
    loadMorePosts();
  }, [page]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <ul>
        {posts.map((post, index) => (
          <li
            key={`${Math.random()} ${post.id}`}
            ref={posts.length === index + 1 ? lastPostElementRef : null}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PostsList;
