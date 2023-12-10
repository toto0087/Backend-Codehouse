import { cartsManager } from "../dao/db/cartsManager";

async function createCart(req, res) {
    try { 
        const cart = await cartsManager.create(req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(400).json("Carrito no agregado"); 
    }
}

async function getCartById(req, res) {
    const {id} = req.params
    try {
        const cart = await cartsManager.findById(id);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no encontrado"); 
    }
}

async function addProdCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await cartsManager.addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no agregado en carrito"); 
    }
}

async function updateCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = await cartsManager.update(carritoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no actualizado"); 
    }
}

async function updateProdCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = await cartsManager.updateProdCart(carritoId,productoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Producto no actualizado en carrito"); 
    }
}


async function deleteCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = await cartsManager.delete(carritoId);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Carrito no eliminado"); 
    }
}

export {createCart,
        getCartById,
        addProdCart,
        updateCart,
        updateProdCart,
        deleteCart
}