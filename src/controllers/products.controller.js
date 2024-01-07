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

        const { title, description, stock, price, code } = req.body;

        let owner;

        // Verifica si el usuario es premium 
        if (req.user.role === 'premium') {
            // Asigna el correo electrónico del usuario como owner
            owner = req.user.email; 
        } else {
            // Si el usuario no es premium ni admin, se asigna por defecto "admin" como owner
            owner = 'admin';
        }

        const product =  create({ title, description, stock, price, code, owner });

        res.status(201).json(product);


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
        // Verifica si el usuario es premium o admin para permitir la eliminación
        if (req.user.role === 'premium' || req.user.role === 'admin') {
            const product = deleteById(id);
            res.status(200).json(product);
        } else {
            // Si el usuario no es premium ni admin, devuelve un error 403
            res.status(403).json({ message: 'Acceso no autorizado' });
        }
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