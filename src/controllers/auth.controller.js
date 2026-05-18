import { UserModel } from "../models/userSchema.model.js";
import {signUpSchema }  from "../validation/schema/auth.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// sign up controller

export const signUp= async (req, res)=>{
   
  try {

    // Validate input
    const validationresult = await signUpSchema.safeParse(req.body);

    //const validationresult= validateSignUpRequest(req.body);

    if (!validationresult.success) {
      return res.status(400).json({
        error: validationresult.error.issues.map((err) => err.message).join(", ")
      });
    }
   
     const {name, email, password, phoneNumber, role} = validationresult.data;

     // Check if alredy exit or not

     const alreadyExist= await UserModel.findOne({
        $or: [
            {email: email},
            {phoneNumber: phoneNumber}
        ]
     });

     if(alreadyExist){
        return res.status(400). json({error: "User with this email or phone number already exists"});
     }

     // pasword hash
     const hashpassword= await bcrypt.hash(password, 10);

        // Create a new user
        const newuser= await UserModel.create({
            name,
            email,
            password: hashpassword,
            phoneNumber,
            role,
        })
        // make token
        const token = jwt.sign ({id: newuser._id, role: newuser.role}, process.env.JWT_SECRET, {expiresIn: "1d"});
        // send token in cookie
            res.cookie ("token", token);

        // response send
        res.status(201).json({message: "User created successfully", user: newuser});
  }
catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// login controller 

export const signIn= async (req, res)=>{
  const {email,phoneNumber, password} = req.body;
// email and phone number both empty
  if(!email && !phoneNumber){ // email
    return res.status(400).json({error: "Email or phone number is required"});
  }

  // find user by email or phone number
  try {
    const user = await UserModel.findOne({
      $or: [
        {email: email},
        {phoneNumber: phoneNumber}
      ]
    })
    // if user not found
    if(!user){ return res.status(401). json({error: "Invalid email or phone number"})};
    // conpare pass
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){ // math korlo na
      return res.status(401).json({error: "Invalid password"});
    }
    // make token
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});
    // send token in cookie
    res.cookie("token", token);
    // response send
    res.status(200).json({message: "Login successful", user});

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

// delete user controller

export const deleteUser= async (req, res)=>{
  const id= req.params.id;
  try{
    const user = await UserModel.findById(id);
    if(!user){
        return res.status(404).json({error: "User not found"});
    }
    //delete user;
    await UserModel.findByIdAndDelete(user._id);
    //for my testing (delete korte hbe pore)
    res.status(200).json({message: "User deleted successfully"});
  }
  catch(error){
    res.status(500).json({error: "internal server error"});
  }

}