import express from "express";
import { userAuthentication } from "../middleware/userCheck.middleware";
import { orderfromcart } from "../controllers/order.controller";


const orderRouter= express.Router();

orderRouter.post("/orderrouter", userAuthentication, orderfromcart);


export default orderRouter;