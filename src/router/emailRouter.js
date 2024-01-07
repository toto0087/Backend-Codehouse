import {Router} from "express"
import { sendEmailController } from "../controllers/email.controller.js"


const router = Router();

// Ruta para recibir el mail
router.post('/', sendEmailController);

export default router;