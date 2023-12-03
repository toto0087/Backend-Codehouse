import {Router} from "express"
const router = Router();
import { productsManager } from "../dao/db/productsManager.js";
import checkSession from "../middleware/checksession.js";


router.get('/products',checkSession, async (req, res) => {
    const products = await productsManager.findAll(req.query)
    res.render("products",{style:"products.css",products})
});


router.get('/realtimeproducts',checkSession, async (req, res) => {
    res.render("realtimeproducts",{style:"realtimeproducts.css"})
});


router.get('/signup', async (req, res) => {
    res.render("signup",{style:"signup.css"})
});

router.get('/login', async (req, res) => {
    res.render("login",{style:"login.css"})
});





export default router;