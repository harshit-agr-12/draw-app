import {redis } from "../redis.js"
import { saveMessage } from "../db.js"

export async function startChatWorker(){
    while(true){
        const message = await redis.blPop("chat_queue",0);

        if(!message) continue;

        const data = JSON.parse(message.element);

        try{
            await saveMessage(data);
        }catch(err){
            console.error("DB failed, retrying...");
            await redis.lPush("chat_queue", message.element);
        }
    }
}