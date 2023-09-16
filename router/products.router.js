import {Router} from "express"

const ProductManager = require('./ProductManager'); // Importa el archivo ProductManager.js
const path = require('path');

// Crea una instancia de ProductManager
const productManager = new ProductManager(path.resolve(__dirname,"productos.json"));

const router = Router();

// Define una ruta para obtener todos los productos

app.get('/products', async (req, res) => {
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

app.get('/products/:id', async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        const product = await productManager.getProductById(id);
        res.status(200).json(product); 
        console.log(product)
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
});

export default router;