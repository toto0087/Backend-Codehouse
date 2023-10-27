import {Router} from "express"

import {productsManager} from "../dao/db/productsManager.js"; // Importa el archivo ProductManager.js

const router = Router();

// Define una ruta para obtener todos los productos

router.get('/', async (req, res) => {

    try {
        let products = await productsManager.findAll(req.query);
        res.status(200).json(products.payload); 
    } catch (error) {
        res.status(404).json("Prods no encontrados"); 
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const product = await productsManager.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
});

router.post('/', async (req, res) => {
    try {
        const prod = req.body
        const product = await productsManager.create(prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no publicado"); 
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const prod = req.body
        const product = await productsManager.update(id,prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no editado"); 
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await productsManager.delete(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Producto no eliminado"); 
    }
});

export default router;