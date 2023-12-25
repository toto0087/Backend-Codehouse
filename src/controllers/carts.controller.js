import { findById ,create, update, deleteById, addProdCart } from "../services/carts.service.js";

function createCart(req, res) {
    try { 
        const cart = create(req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(400).json("Carrito no agregado"); 
    }
}

function getCartById(req, res) {
    const {id} = req.params
    try {
        const cart = findById(id);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no encontrado"); 
    }
}

function addProductCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no agregado en carrito"); 
    }
}

function updateCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = update(carritoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no actualizado"); 
    }
}

function updateProdCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = updateProdCart(carritoId,productoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no actualizado en carrito"); 
    }
}


function deleteCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = deleteById(carritoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no eliminado"); 
    }
}

export {
    createCart,
    getCartById,
    addProductCart,
    updateCart,
    updateProdCart,
    deleteCart
}