import express, { Router } from "express";
const  router:Router = express.Router();
import {signupController,loginController} from "../controllers/authController.js"


router.post('/signup',signupController);

router.post('/login',loginController);

export default router;