import React, { useEffect, useState } from "react";
import API from "../services/api";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    await API.post("/posts", { text });
    setText("");
    fetchPosts();
  };

  const likePost = async (id) => {
    await API.put(`/posts/${id}/like`);
    fetchPosts();
  };

  const commentPost = async (id) => {
    const comment = prompt("Enter comment");
    if (!comment) return;

    await API.post(`/posts/${id}/comment`, { text: comment });
    fetchPosts();
  };

  return (
    <div>
      <h2>Feed</h2>

      <input
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      {posts.map((p) => (
        <div key={p._id} style={{ border: "1px solid gray", margin: "10px" }}>
          <h4>{p.username}</h4>
          <p>{p.text}</p>

          {p.imageUrl && <img src={p.imageUrl} width="200" alt="" />}

          <p>❤️ {p.likes.length}</p>
          <button onClick={() => likePost(p._id)}>Like</button>

          <p>💬 {p.comments.length}</p>
          <button onClick={() => commentPost(p._id)}>Comment</button>
        </div>
      ))}
    </div>
  );
};

export default Feed;