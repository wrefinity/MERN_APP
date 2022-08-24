import express from "express";
import {
   createOrder,
   deleteOrder,
   getOrder,
   updateOrder,
   getOrders,
   getIncomes,
} from "../controller/Orders.js";
import {
   verifyTokenAndRoles,
   verifyTokenAndAdmin,
} from "../middleware/authenticate.js";

const router = express.Router();

router
   .route("/")
   .post(verifyTokenAndRoles, createOrder)
   .get(verifyTokenAndRoles, getOrders);
router
   .route("/:id")
   .patch(verifyTokenAndAdmin, updateOrder)
   .delete(verifyTokenAndAdmin, deleteOrder);
// router.get("/find/:userId", verifyTokenAndRoles, getOrder);
// router.get("/carts", verifyTokenAndAdmin, getOrders);
// router.get("/income", verifyTokenAndAdmin, getIncomes);

export default router;
