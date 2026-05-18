import mongoose from "mongoose";

const ProductSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    sellerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    status:{
        type: String,
        enum: ["available", "out of stock", "discontinued"],
        default: "available",
    },
    rating:{
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews:{
        type: Number,
        default: 0,
    },
    imagePublicId: {
    type: String,
    required: true,
    }

}, {timestamps: true});

export const ProductModel= mongoose.model("product", ProductSchema);