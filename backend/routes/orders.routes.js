//backend\routes\orders.routes.js

import express from "express";
import { createOrder, getMyOrders } from "../controllers/orders.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/my", verifyToken, getMyOrders); // ✅ JWT protected route

export default router;
