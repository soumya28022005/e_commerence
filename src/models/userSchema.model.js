import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name :{
        type: String,
        required: true,
        trim: true,
    },
    email :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Invalid email address"],
        trim: true,
    },
    password :{
        type: String,
        required: true, 
    },
    phoneNumber :{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits long"],
        trim: true,
    },
    role :{
        type: String,
        enum: ["user", "admin", "seller"],
        default: "user",
    }
}, {timestamps: true});

export const UserModel= mongoose.model("user", UserSchema);