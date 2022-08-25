import React from "react";
import { useSelector } from "react-redux";
import { selectPostByUserId } from "./UserSlice";
import { useParams } from "react-router-redux";

const UserPost = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectPostByUserId(state, userId));

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPost(state);
    return allPosts.filter((post) => post.userId === userId);
  });

  return <div>UserPost</div>;
};

export default UserPost;
