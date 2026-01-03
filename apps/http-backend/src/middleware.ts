import { JWT_SECRET } from "@repo/be-common/config";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export const authMiddleware = (req : Request,res : Response,next : NextFunction)=>{
    const token = req.headers.authorization?.split(" ")[1] as string
    console.log(token);
    const user = jwt.verify(token,JWT_SECRET) as JwtPayload;
    console.log(user);
    if(!user){
        res.json({
            msg : "token is incorrect"
        })
        return;
    }
    req.userId = user.userId;
    next();
}