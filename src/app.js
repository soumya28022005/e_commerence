import express from "express";
import cookieParser from "cookie-parser";


import authrouter from "./routers/auth.router.js";
import productRouter from "./routers/product.router.js";
import cartRouter from "./routers/cart.router.js";
import orderRouter from "./routers/order.routers.js";

const app = express ();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authrouter);

// product route
app.use("/api/v1/product",productRouter);

// cart router

app.use("/api/v1/cart", cartRouter);


//order

app.use("/api/v1/order", orderRouter);


export default app;