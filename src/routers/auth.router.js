import express from "express";
import { deleteUser, signIn, signUp } from "../controllers/auth.controller.js";
import { userAuthentication } from "../middleware/userCheck.middleware.js";


const authRouter = express.Router();

authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.delete("/delete-user", userAuthentication, deleteUser);


export default authRouter;