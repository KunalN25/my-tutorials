import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles.css";
import { fetchPosts } from "../services";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Add hasMore state

  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    const newPosts = await fetchPosts(page, 10);
    if (newPosts.length === 0) {
      setHasMore(false); // Stop making API calls if there are no more posts
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      loadMorePosts();
    }
  }, [loadMorePosts, hasMore]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <h1>Your Feed</h1>
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
