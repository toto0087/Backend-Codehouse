import {Router} from "express"

import {messageManager} from "../dao/db/messageManager.js";

const router = Router();


router.get('/', async (req, res) => {

    res.render("chat")
});




export default router;