import { WebSocketServer } from "ws";
import url from 'url'
import jwt, { JwtPayload } from "jsonwebtoken"
import {JWT_SECRET} from "@repo/be-common/config"
const wss = new WebSocketServer({port : 8080})


wss.on("connection",(socket , req)=>{

    console.log("i am running")

    const location = url.parse(req.url as string, true)
    const queryParams = location.query;
    
    socket.on("error", console.error)

    const token = queryParams.token

    const decode = jwt.verify(token as string, JWT_SECRET)

    if(!decode || (decode as JwtPayload).userId){
        socket.close();
        return;
    }

    socket.on("message" , (data)=>{
        socket.send("ong")
    })  

    socket.send("hi there")
})
