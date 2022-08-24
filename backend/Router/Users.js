import express from "express";
import {
   updateUser,
   regPost,
   login_get,
   login_post,
   getUsers,
   getUser,
   deleteUsers,
   userStats,
   logout,
   changePassword,
   changeImage,
} from "../controller/Users.js";
import {
   verifyTokenAndRoles,
   verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

const router = express.Router();

router.route("/").post(regPost).get(verifyTokenAndAdmin, getUsers);

router
   .route("/:id")
   .delete(verifyTokenAndAdmin, deleteUsers)
   .patch(verifyTokenAndRoles, updateUser);

router.route("/login").get(login_get).post(login_post);

router.post("/changePassword", verifyTokenAndRoles, changePassword);
router.post("/changeImage", verifyTokenAndRoles, changeImage);
// // router.get("/find/:id", verifyTokenAndAdmin, getUser);

// //stat
// router.get("stats", verifyTokenAndAdmin, userStats);

// //logout
// router.get("/logout", logout);

export default router;
