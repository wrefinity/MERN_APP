import express from "express";
import {
  createComment,
  updateComment,
  deleteComment,
  allComments,
  singleComment,
} from "../controller/Comments";
import { verifyTokenAndRoles } from "../middleware/authenticate.js";

const router = express.Router();

router.route("/").post(verifyTokenAndRoles, createComment).get(allComments);
router
  .route("/:id")
  .delete(verifyTokenAndRoles, deleteComment)
  .patch(verifyTokenAndRoles, updateComment)
  .get(verifyTokenAndRoles, singleComment);

export default router;
