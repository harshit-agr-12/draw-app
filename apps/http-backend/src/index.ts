import express from "express"
import {CreateUserSchema , SigninSchema , CreateRoomSchema} from "@repo/common/types"
import {prismaClient} from "@repo/db/client"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/be-common/config"
import bcrypt from "bcryptjs"
import { authMiddleware } from "./middleware.js"
import { string } from "zod"
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        msg : 'i am working'
    }).status(200)
})

app.post('/signup',async (req,res)=>{
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
        res.json({
            msg : "user already exist with this email"
        })
    }
})

app.post('/signin',async (req,res)=>{
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
            res.json({
                msg : "password provided is incorrect"
            })
            return
        }

       const userId = user.id

        const token = jwt.sign({userId : userId},JWT_SECRET)

        res.json({
            token : token
        }).status(200)

        return
    }catch(e){
        console.log(e)
        res.json({
            msg : "error user does not exist"
        })
    }
})

app.post('/room',authMiddleware,async(req,res)=>{
    const userId = req.userId;
    if(!userId){
        res.json({
            msg : "user does not exist"
        })
        return
    }
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            msg : "Incorrect Input"
        })
        return;
    }
    try{
        const room = await prismaClient.room.create({
            data : {
                slug : parsedData.data.slug as string,
                adminId : userId as string
            }
        })
    
        res.json({
            roomId : room.id
        })
    }catch(e){
        res.json({
            msg : "error something if off"
        })
        console.log(e)
        return
    }

})


app.listen(3001,()=>{
    console.log(`server is running at http://localhost:${3001}`)
})