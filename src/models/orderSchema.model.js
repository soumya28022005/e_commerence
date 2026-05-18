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

const OrderSchema=  new mongoose.Schema({
     userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
      products: [prouctSchema],

      totalprice : {
        type: Number,
        required: true
       },
       status:{
        type: String,
        enum: ["ordered", "in process", "deliveed", "canceled"],
         default: "ordered"
       }

}, {timestamps: true});

export const orderModel= mongoose.model("order", OrderSchema);