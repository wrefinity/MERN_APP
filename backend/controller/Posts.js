import Post from "../model/Posts.js";
import mongoose from "mongoose";
import { findAll, findId, creator, deletor, updator } from "./ModelActions.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await creator(Post, { ...req.body, userId });
    post && res.status(200).json(post);
  } catch (er) {
    res.status(210).json(er.message);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Post with the id: ${id}`);
  try {
    const updated = await updator(Post, id, req.body);
    updated && res.status(200).json(updated);
  } catch (er) {
    console.log(er);
    res.status(210).json(er.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const deleted = await deletor(Post, id);
    deleted && res.status(200).json("post deleted");
  } catch (er) {
    return res.status(210).json(er.message);
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await findAll(Post);
    res.status(200).json(posts);
  } catch (er) {
    console.log(er);
    return res.status(210).json(er.message);
  }
};

export const singlePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);
  try {
    const post = await findId(Post, id);
    post && res.status(200).json(post);
  } catch (er) {
    console.log(er);
    return res.status(500).json({ message: er.message });
  }
};
