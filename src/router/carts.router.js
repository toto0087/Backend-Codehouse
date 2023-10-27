import {Router} from "express"
import {cartsManager} from "../dao/db/cartsManager.js"; 


const router = Router();

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try { 
        const cart = await cartsManager.create(req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(400).json("Carrito no agregado"); 
    }
});

//Obtenemos por ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await cartsManager.findById(id);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no encontrado"); 
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await cartsManager.addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no agregado en carrito"); 
    }
  });

router.put('/:cid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = await cartsManager.update(carritoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no actualizado"); 
    }
  });

router.put('/:cid/product/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await cartsManager.updateProdCart(carritoId,productoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no actualizado en carrito"); 
    }
});

router.delete('/cid', async (req, res) => { 
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = await cartsManager.delete(carritoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no eliminado"); 
    }
})

export default router