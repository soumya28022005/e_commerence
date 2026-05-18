import express from "express";
import { userAuthentication } from "../middleware/userCheck.middleware.js";
import { orderfromcart } from "../controllers/order.controller.js";


const orderRouter= express.Router();

orderRouter.post("/orderrouter/:cartId", userAuthentication, orderfromcart);


export default orderRouter;