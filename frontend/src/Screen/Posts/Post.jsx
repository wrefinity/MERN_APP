import React from "react";
import PostList from "../../features/Posts/PostList";
import PostForm from "../../features/Posts/PostForm";

const Post = () => {
  return (
    <div>
      <PostForm />
      <PostList />
    </div>
  );
};

export default Post;
