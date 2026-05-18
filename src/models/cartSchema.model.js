import mongoose from "mongoose";

const prouctSchema= new mongoose.Schema({
    productId: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
            required: true
    }
})

const cartSchema= new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    products:[prouctSchema],
    totalprice: {
        type: Number,
        default: 0
    }

}, {timestamps: true})

export const cart= new mongoose.model("cart", cartSchema);