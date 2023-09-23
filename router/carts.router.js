const {Router} = require("express")
const CartManager = require('../CartManager'); 
const path = require('path');



const router = Router();
// Crea una instancia de CartManager
const cartManager = new CartManager(path.resolve(__dirname,"../cart.json"));


// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
    try { 
        const cart = await cartManager.addCart(); 
        res.json({ message: 'Nuevo carrito creado', carrito: cart });
    } catch (error) {
        console.log(error);
        res.status(400).json("Carrito no agregado"); 
    }
});

//Obtenemos por ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const cart = await cartManager.getcartById(id);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no encontrado"); 
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await cartManager.addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        console.log(error)
        res.status(404).json("Producto no agregado en carrito"); 
    }
  });

  module.exports = router;