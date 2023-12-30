import { findAll,findById,create,update,deleteById } from "../services/products.service.js";

function getProducts(req, res) {
    try {
        let products = findAll(req.query);
        res.status(200).json(products); 
    } catch (error) {
        res.status(404).json("Prods no encontrados"); 
    }
}

function getProductById(req, res) {
    const {id} = req.params
    try {
        const product = findById(id);
        res.status(200).json(product); 
    } catch (error) {
        res.status(404).json("Producto no encontrado"); 
    }
}

function createProduct(req, res) {
    try {
        const prod = req.body
        const product = create(prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no publicado"); 
    }
}

function updateProduct(req, res) {
    try {
        const {id} = req.params
        const prod = req.body
        const product = update(id,prod);
        res.status(200).json(product); 

    } catch (error) {
        res.status(400).json("Producto no editado"); 
    }
}

function deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = deleteById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json("Producto no eliminado"); 
    }
}

export 
    {   
        getProducts, 
        getProductById, 
        createProduct, 
        updateProduct, 
        deleteProduct
    };