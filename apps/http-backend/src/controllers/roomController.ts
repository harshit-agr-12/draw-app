import { Request, Response } from "express";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export async function getRoomIdController(req : Request,res:Response){
    const slug = req.params.slug;

    const room = await prismaClient.room.findUnique({
        where : {
            slug : slug
        }
    })

    res.json({
        "roomId" : room?.id
    })
}

export async function getUserRoomsController(req: Request, res: Response) {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({
            msg: "Unauthorized"
        });
        return;
    }

    try {
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        res.json({
            rooms
        });
    } catch (e) {
        res.status(500).json({
            msg: "Error fetching rooms"
        });
        console.log(e);
    }
}

export async function createRoomController(req : Request,res : Response){
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
}

//chat contain roomId and userId so we are searching on roomId to get chats related to that roomId
export async function getRoomChatContoller(req:Request,res:Response){
    const roomId = Number(req.params.roomId);
    try{
        const chats = await prismaClient.chat.findMany({
        where : {
            roomId : roomId
        },
        orderBy : {
            id : "asc"
        },
        take : 50
        })
        res.json({
            chats
        })
    }catch(err){
        res.json({
            msg : "error while doing something"
        })
        console.log(err)
    }
}