import express from "express";
import upload from "../middleware/multer.js";    
import { createProduct, deleteProduct, updateProduct } from "../controllers/product.controller.js";
import { productAuthentication } from "../middleware/ProductAuthentication.middleware.js";
const productRouter = express.Router();

// createProduct
productRouter.post("/create-product",productAuthentication ,upload.single("productImage"), createProduct );    

// delete product
productRouter.delete("/delete-product/:id", productAuthentication, deleteProduct);

// edit prouduct
productRouter.patch("/editproduct/:id",productAuthentication,upload.single("productImage"), updateProduct)

export default productRouter;