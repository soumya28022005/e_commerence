import express from "express";
import { userAuthentication } from "../middleware/userCheck.middleware";
import {AddCart, getCart, removeCart} from "../controllers/cart.controller.js"


const cartRouter= express.Router();

cartRouter.post("/addCart/:id", userAuthentication, AddCart);

cartRouter.get("/allcart", userAuthentication, getCart);

cartRouter.delete("/deleteCart/:id", userAuthentication ,removeCart)

export default cartRouter;