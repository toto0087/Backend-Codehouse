import {Router} from "express"
import CartManager from "../dao/fileSystem/CartManager.js"; 
import path from "path"

const router = Router();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try { 
        const cart = await CartManager.addCart(); 
        res.status(200).json(cart); 
    } catch (error) {
        res.status(400).json("Carrito no agregado"); 
    }
});

//Obtenemos por ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await CartManager.getcartById(id);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no encontrado"); 
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await CartManager.addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no agregado en carrito"); 
    }
  });

export default router