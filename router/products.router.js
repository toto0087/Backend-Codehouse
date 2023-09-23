const {Router} = require("express")
const ProductManager = require('../ProductManager'); // Importa el archivo ProductManager.js
const path = require('path');

// Crea una instancia de ProductManager
const productManager = new ProductManager(path.resolve(__dirname,"../productos.json"));

const router = Router();

// Define una ruta para obtener todos los productos

router.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        let products = await productManager.getProducts();
        if(limit) {
            products = products.slice(0 , limit) 
        }
        res.status(200).json(products); 
    } catch (error) {
        res.status(404).json("Prods no encontrados"); 
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const product = await productManager.getProductById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
});

router.post('/', async (req, res) => {
    try {
        const prod = req.body
        const product = await productManager.addProduct(prod);
        res.status(200).json(product); 
        console.log(product)
    } catch (error) {
        res.status(400).json("Producto no publicado"); 
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const prod = req.body
        const product = await productManager.updateProduct(id,prod);
        res.status(200).json(product); 
        console.log(product)
    } catch (error) {
        res.status(400).json("Producto no editado"); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await productManager.deleteProduct(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Producto no eliminado"); 
    }
});

module.exports = router;