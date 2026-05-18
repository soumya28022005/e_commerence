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

        const neworder= await orderModel.create({
            userId: userCart.userId,
            products:  userCart.products,
            totalprice:  userCart.totalprice,
        })

        return res.status(201).json({message: "your order successfully created", neworder: neworder});


    }catch(error){
        return res.status(500).json({message: "internal server error"});
    }

}

