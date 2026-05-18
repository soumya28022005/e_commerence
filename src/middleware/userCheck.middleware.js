import jwt from "jsonwebtoken";



export const userAuthentication = (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }
        const decoder= jwt.verify(token, process.env.JWT_SECRET);
        req.user= decoder;
        next();

    }catch(error){
            res.status(401).json({error: "Unauthorized"});
    }
}