import React, { useEffect, useState } from "react";
import API from "../services/api";
import { uploadImage } from "../services/upload";
import "./feed.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    let imageUrl = "";

    if (image) {
      imageUrl = await uploadImage(image); // upload to cloudinary
    }

    await API.post("/posts", { text, imageUrl });

    setText("");
    setImage(null);
    fetchPosts();
  };

  const likePost = async (id) => {
    await API.put(`/posts/${id}/like`);
    fetchPosts();
  };

  return (
    <div className="feed-container">

      <div className="create-post">
        <input
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={createPost}>Post</button>
      </div>

      {posts.map((p) => (
        <div key={p._id} className="post-card">

          <div className="post-header">{p.username}</div>

          <div className="post-content">{p.text}</div>

          {p.imageUrl && (
            <img src={p.imageUrl} alt="" className="post-image" />
          )}

          <div className="post-actions">
            <button onClick={() => likePost(p._id)}>
              ❤️ {p.likes.length}
            </button>
            <span>💬 {p.comments.length}</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Feed;