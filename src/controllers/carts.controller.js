import { findById ,create, update, deleteById, addProdCart,addCartPurchase,findAll } from "../services/carts.service.js";
import { findByCartId } from "../services/user.service.js";

function getCarts(req, res) {
    try {
        const carts = findAll();
        res.status(200).json(carts); 
    } catch (error) {
        res.status(404).json("Carritos no encontrados"); 
    }
}


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
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    console.log(carritoId,productoId);
    try {
        console.log("ENTRO EN CONTROLLER");
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


async function addCartWithPurchase(req, res) {
    const carritoId = req.params.cid;
    const user = await findByCartId(carritoId);
    try {
        const cart = addCartPurchase(carritoId,user);
        res.status(200).json(cart); 
    } catch (error) {
        res.status(404).json("Compra no realizada"); 
    }
}


export {
    createCart,
    getCartById,
    addProductCart,
    updateCart,
    updateProdCart,
    deleteCart,
    addCartWithPurchase,
    getCarts
}