import express, { Router } from "express"
import {CreateRoomSchema } from "@repo/common/types";
const router:Router = express.Router();
import {createRoomController , getRoomIdController , getRoomChatContoller, getUserRoomsController} from "../controllers/roomController.js"


router.post("/createRoom",createRoomController);

router.get("/user/rooms", getUserRoomsController);

router.get('/chats/:roomId',getRoomChatContoller)


router.get('/:slug',getRoomIdController);

export default router
