import  jwt  from "jsonwebtoken";
import { User } from "../models/user";

export const isAuthenticated = async(req:any,res:any,next:any)=>{
    const {token} = req.cookies;

    if (!token)
    return res.status(404).json({
      success: false,
      message: "Error You have to login First!",
    });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET || "secret");
    //  @ts-ignore
    req.user = await User.findById(decodedData._id);
    next();


};