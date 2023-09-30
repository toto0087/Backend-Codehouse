import {Router} from "express"
const router = Router();
import ProductManager from "../impl/ProductManager.js";
import { socketServer } from "../app.js";


router.get('/', async (req, res) => {

    const products = await ProductManager.getProducts()

    res.render("home",{style:"home.css",products})
});


router.get('/realtimeproducts', async (req, res) => {

    const products = await ProductManager.getProducts()

    socketServer.on("connection", socket => {
        socket.emit("products",products)
    })

    res.render("realtimeproducts",{style:"realtimeproducts.css"})

});



export default router;