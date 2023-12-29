import {Router} from "express"
import isUserNotAdm from "../middleware/isUserNotAdm.js";
import checkSession from "../middleware/checksession.js";
import createMessage from "../controllers/message.controller.js";

const router = Router();

router.post('/', checkSession,isUserNotAdm,createMessage)


export default router;