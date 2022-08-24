import React from "react";
import PostReaction from "./PostReaction";
import TimeAgo from "../TimeAgo";

const PostSingle = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)} ...</p>
      <p>
        <TimeAgo timestamp={posts.date} />
      </p>
      <PostReaction post={post} />
    </article>
  );
};
export default PostSingle;
