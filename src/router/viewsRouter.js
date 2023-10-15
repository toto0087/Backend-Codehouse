import {Router} from "express"
const router = Router();
import { productsManager } from "../dao/db/productsManager.js";
import { socketServer } from "../app.js";


router.get('/', async (req, res) => {

    //const products = await productsManager.getProducts()

    res.render("home",{style:"home.css",products})
});


router.get('/realtimeproducts', async (req, res) => {

    //const products = await productsManager.getProducts()

    //socketServer.on("connection", socket => {
    //    socket.emit("getProducts",products)
    //})

    res.render("realtimeproducts",{style:"realtimeproducts.css"})

});


router.post('/realtimeproducts', async (req, res) => {
    const {title,price,thumbnail,stock,code,description} = req.body
    if(!title || !price || !thumbnail || !stock || !code || !description) 
    return res.status(400).json({error:"Faltan datos"})
    try {
        const createdProduct = await productsManager.create(req.body)   
        res.status(200).json({message:"product created" , product:createdProduct})     
    } catch (error) {
        req.status(500).json({error:"Error al crear el producto"})
    }
})



export default router;