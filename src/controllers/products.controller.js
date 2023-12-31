import { findAll,findById,create,update,deleteById } from "../services/products.service.js";
import {errorMessages } from "../errors/error.js";
import ErrorClass from "../errors/staticError.js";

function getProducts(req, res) {
    try {
        let products = findAll(req.query);
        res.status(200).json(products); 
    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_FOUND); 
    }
}

function getProductById(req, res) {
    const {id} = req.params
    try {
        const product = findById(id);
        res.status(200).json(product); 
    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_FOUND);
    }
}

function createProduct(req, res) {
    try {
        const prod = req.body
        const product = create(prod);
        res.status(200).json(product); 

    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_ADDED);
    }
}

function updateProduct(req, res) {
    try {
        const {id} = req.params
        const prod = req.body
        const product = update(id,prod);
        res.status(200).json(product); 

    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_UPDATED); 
    }
}

function deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = deleteById(id);
        res.status(200).json(product);
    } catch (error) {
        ErrorClass.createError(errorMessages.PRODUCT_NOT_DELETED); 
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