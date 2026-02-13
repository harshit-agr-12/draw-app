import { Request, Response } from "express";
import { CreateUserSchema , SigninSchema } from "@repo/common/types";
import bcrypt from "bcryptjs";
import { prismaClient } from "@repo/db/client";
import { JWT_SECRET } from "@repo/be-common/config";
import jwt from "jsonwebtoken"

export async function signupController(req:Request,res:Response){
        const parsedData = CreateUserSchema.safeParse(req.body);
        if(!parsedData.success){
            res.json({
                msg : "error give proper input"
            })
            return;
        }
        try{
            const password = await bcrypt.hash(parsedData.data.password,10);
            const user = await prismaClient.user.create({
                data : {
                    email : parsedData.data?.email as string,
                    password : password,
                    name : parsedData.data?.name as string
                }
            })
            res.json({
                userId : user.id
            })
        }catch(e){
            res.status(400).json({
                msg : "user already exist with this email"
            })
        }
}

export async function loginController(req : Request,res : Response){
    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            msg : "Incorrect Input type provided"
        })
        return;
    }
    try{
        const password = parsedData.data.password;
        const user = await prismaClient.user.findUnique({
            where :{
                email : parsedData.data.email as string
            }
        })
        if(!user){
            res.json({
                msg : "user with this email don't exist"
            })
            return
        }
        if(!(await bcrypt.compare(password,user.password))){
            throw new Error('password provided is incorrect')
        }
       const userId = user.id
        const token = jwt.sign({userId : userId},JWT_SECRET)
        res.json({
            token : token
        }).status(200)
        return
    }catch(e: any){
        
        res.status(400).json({
            message : e.message
        })
    }
}