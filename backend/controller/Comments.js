import Comment from "../model/Comments.js";
import mongoose from "mongoose";
import { findAll, findOne, findId, creator, deletor, updator } from "./ModelActions.js";

export const createComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const comment = await creator(Comment, {...req.body, userId });
    comment && res.status(200).json(comment);
  } catch (er) {
    res.status(500).json(er.message);
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message:`No comment with the id: ${id}`});
  try {
    const userId = req.user.id
    const match = await findOne(Comment, {userId, _id:id})
    if (match){
      const updated = await updator(Comment, id, req.body);
      updated && res.status(200).json(updated);
    }
    else{
      res.status(400).json({message:`permission denied`});
    }
  } catch (er) {
    res.status(500).json(er.message);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({message:`No comment with id: ${id}`});
  try {
    const userId = req.user.id
    const match = await findOne(Comment, {userId, _id:id})
    if (match){
      const deleted = await deletor(Comment, id, req.body);
        deleted && res.status(200).json("comment deleted");
    }
    else{
      res.status(400).json({message:`permission denied`});
    }
  } catch (er) {
    return res.status(210).json(er.message);
  }
};

export const allComments = async (req, res) => {
  try {
    const comments = await findAll(Comment);
    comments && res.status(200).json(comments);
  } catch (er) {
    console.log(er);
    return res.status(210).json(er.message);
  }
};

export const singleComment = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id))
     return res.status(404).send(`No post with id: ${id}`);
  try {
    const comments = await findId(Comment, id);
    comments && res.status(200).json(comments);
  } catch (er) {
    console.log(er);
    return res.status(500).json({ message: er.message });
  }
};
