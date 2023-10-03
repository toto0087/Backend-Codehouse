import {Router} from "express"
import { socketServer } from "../app.js";
import ProductManager from "../impl/ProductManager.js"; // Importa el archivo ProductManager.js

const router = Router();

// Define una ruta para obtener todos los productos

router.get('/', async (req, res) => {
    const {limit} = req.query
    try {
        let products = await ProductManager.getProducts();
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
    try {
        const product = await ProductManager.getProductById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
});

router.post('/', async (req, res) => {
    try {
        const prod = req.body
        const product = await ProductManager.addProduct(prod);
        socketServer.emit('newProd', product);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no publicado"); 
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const prod = req.body
        const product = await ProductManager.updateProduct(id,prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no editado"); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await ProductManager.deleteProduct(id);
        socketServer.emit('deleteProd', product);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Producto no eliminado"); 
    }
});

export default router;