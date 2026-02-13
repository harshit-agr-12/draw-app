import express from "express"
import { authMiddleware } from "./middleware.js"
import userRouter from "./routes/user.js"
import roomRouter from "./routes/room.js"
import cors from "cors"
const app = express();


app.use(cors({
    origin : 'http://localhost:3000'
}))


app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/room',authMiddleware,roomRouter)


app.listen(3001,()=>{
    console.log(`server is running at port 3001`)
})