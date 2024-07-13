import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles.css";
import { fetchPosts } from "../services";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    const newPosts = await fetchPosts(page, 10);
    if (newPosts.length === 0) {
      setHasMore(false); // Set hasMore to false if no more posts are returned
    } else {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
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
      if (loading || !hasMore) return; // Stop observing if loading or no more posts
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Trigger loading of new posts by changing page number
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
            key={post.id} // Use post.id directly
            ref={posts.length === index + 1 ? lastPostElementRef : null}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {/* Message indicating no more posts */}
    </div>
  );
};

export default PostsList;
