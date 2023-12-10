import { productsManager } from "../dao/db/productsManager";

async function getProducts(req, res) {
    try {
        let products = await productsManager.findAll(req.query);
        res.status(200).json(products); 
    } catch (error) {
        res.status(404).json("Prods no encontrados"); 
    }
}

async function getProductById(req, res) {
    const {id} = req.params
    try {
        const product = await productsManager.findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
}

async function createProduct(req, res) {
    try {
        const prod = req.body
        const product = await productsManager.create(prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no publicado"); 
    }
}

async function updateProduct(req, res) {
    try {
        const {id} = req.params
        const prod = req.body
        const product = await productsManager.update(id,prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no editado"); 
    }
}

async function deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = await productsManager.delete(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Producto no eliminado"); 
    }
}

export {getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct};