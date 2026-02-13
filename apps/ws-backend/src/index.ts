import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/be-common/config"
const wss = new WebSocketServer({port : 8080})
import {prismaClient} from "@repo/db/client"


interface User {
    rooms : string[],
    userId : string,
    ws : WebSocket;
}

const users : User[]= [];

function checkUser(token:string):string | null{
    try{
        const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload;

        if(!decoded || !decoded.userId){
            return null
        }
        return decoded.userId;
    }catch(err){
        console.log(err)
        return null
    }
}

wss.on("connection",(socket , req)=>{
    const url = req.url;
    if(!url){
        return;
    }
    console.log("i am running")
    socket.on("error", console.error)
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || ""; 
    const userId = checkUser(token) as string;
    if(userId == null){
        socket.close();
        return;
    }
    
    users.push({
        userId,
        ws : socket,
        rooms : []
    })

    socket.on("message" ,async (data)=>{
        try{
            const parsedData = JSON.parse(data as unknown as string); 
            if(parsedData.type === "join-room"){
                const user = users.find(x => x.ws === socket)
                user?.rooms.push(parsedData.roomId);

            }
    
            if(parsedData.type === "leave-room"){
                const user = users.find(x => x.ws === socket)
                if(!user){
                    return;
                }
                user.rooms =user.rooms.filter(roomId =>  roomId !== parsedData.roomId) 
                prismaClient.room//room schema -> id , slug -> roomname
            }
    
            if(parsedData.type === "chat"){
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prismaClient.chat.create({
                    data : {
                        userId,
                        message,
                        roomId
                    }
                });

                users.forEach(user => {
                    if(user.rooms.includes(roomId)){
                        user.ws.send(JSON.stringify({
                            "type" : "chat",
                            "message" : message,
                            "roomId" : roomId
                        }))
                    }
                })
            }
        }catch(err){
            console.log(err)
            socket.send("there is some erro")
        }
        
    })  

    socket.send("hi there")
})
