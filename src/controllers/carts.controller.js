import { findById ,create, update, deleteById, addProdCart,addCartPurchase,findAll } from "../services/carts.service.js";
import { findById as findProduct } from "../services/products.service.js";
import { findByCartId } from "../services/user.service.js";
import {errorMessages } from "../errors/error.js";
import ErrorClass from "../errors/staticError.js";


function getCarts(req, res) {
    try {
        const carts = findAll();
        res.status(200).json(carts); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_NOT_FOUND); 
    }
}


function createCart(req, res) {
    try { 
        const cart = create(req.body);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_NOT_ADDED);
    }
}

function getCartById(req, res) {
    const {id} = req.params
    try {
        const cart = findById(id);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_NOT_FOUND);
    }
}

 function addProductCart(req, res) {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;

    console.log('REQ USER AQUI: ', req.user);
    
    // User premium no puede agregar producto que le pertenece
    if(req.user.role === 'premium') {
        try {
            const product = findProduct(productoId);
    
            // Si el owner del producto es el mismo que el usuario que quiere agregarlo
            if (product.owner === req.user.email) {
                ErrorClass.createError(errorMessages.CART_PRODUCT_NOT_ADDED);
            }
        } catch (error) {
            console.error('Error al buscar el producto:', error);
        }
    }

    try {
        const cart = addProdCart(carritoId,productoId);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_PRODUCT_NOT_ADDED);
    }
}

function updateCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = update(carritoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_NOT_UPDATED);
    }
}

function updateProdCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    const productoId = parseInt(req.params.pid);
    try {
        const cart = updateProdCart(carritoId,productoId,req.body);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_PRODUCT_NOT_UPDATED);
    }
}


function deleteCart(req, res) {
    const carritoId = parseInt(req.params.cid);
    try {
        const cart = deleteById(carritoId);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.CART_NOT_DELETED);
    }
}


async function addCartWithPurchase(req, res) {
    const carritoId = req.params.cid;
    const user = await findByCartId(carritoId);
    try {
        const cart = addCartPurchase(carritoId,user);
        res.status(200).json(cart); 
    } catch (error) {
        ErrorClass.createError(errorMessages.PURCHASE_INCOMPLETE);
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