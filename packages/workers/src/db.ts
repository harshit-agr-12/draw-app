import {prismaClient} from "@repo/db/client";

export async function saveMessage(msg : any){
    const message = msg.message;
    const roomId = msg.roomId;
    const userId = msg.userId;
    const chat = await prismaClient.chat.create({
        data : {
            messsage : message,
            roomId : roomId,
            userId : msg.userId
        }
    })
}