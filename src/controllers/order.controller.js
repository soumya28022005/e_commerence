import { json } from "express";
import { cart } from "../models/cartSchema.model.js";
import { orderModel } from "../models/orderSchema.model.js";


export const orderfromcart= async (req,res)=>{
    const cartId= req.params.cartId;
    
    try{
        const userCart= await cart.findById(cartId);

        if(! userCart){
            return res.status(404).json({message: "cari is empty"});
        }
        if (userCart.userId.toString() !== req.user.id) {
        return res.status(403).json({message: "Unauthorized access to cart"});
        }

        const neworder= await orderModel.create({
            userId: userCart.userId,
            products:  userCart.products,
            totalprice:  userCart.totalprice,
        })
        await cart.findByIdAndDelete(cartId);
        return res.status(201).json({message: "your order successfully created", neworder: neworder});


    }catch(error){
        return res.status(500).json({message: "internal server error"});
    }

}

