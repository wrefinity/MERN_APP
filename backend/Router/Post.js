import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  allPosts,
  singlePost,
} from "../controller/Posts.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndRoles,
} from "../middleware/authenticate.js";

const router = express.Router();

router.route("/").post(verifyTokenAndAdmin, createPost).get(allPosts);
router
  .route("/:id")
  .delete(verifyTokenAndAdmin, deletePost)
  .patch(verifyTokenAndAdmin, updatePost)
  .get(verifyTokenAndRoles, singlePost);

export default router;
