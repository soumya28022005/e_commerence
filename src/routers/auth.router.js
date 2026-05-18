import express from "express";
import { deleteUser, signIn, signUp } from "../controllers/auth.controller.js";


const authRouter = express.Router();

authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.delete("/delete-user/:id", deleteUser);


export default authRouter;