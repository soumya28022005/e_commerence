import jwt from "jsonwebtoken";



export const productAuthentication = (req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error: "Unauthorized"});
        }
        const decoder= jwt.verify(token, process.env.JWT_SECRET);
        if(decoder.role!=="seller" && decoder.role!=="admin"){
            return res.status(403).json({error: "Forbidden"});
        }
        req.user= decoder;
        next();

    }catch(error){
            res.status(401).json({error: "Unauthorized"});
    }
}